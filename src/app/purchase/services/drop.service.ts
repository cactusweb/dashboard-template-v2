import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, filter, finalize, map, Observable, take, tap, throwError } from 'rxjs';
import { Requests } from 'src/app/const';
import { License } from 'src/app/dashboard/interfaces/license';
import { LicenseService } from 'src/app/dashboard/services/license.service';
import { Req } from 'src/app/tools/interfaces/req-map';
import { HttpService } from 'src/app/tools/services/http.service';
import { environment } from 'src/environments/environment';
import { Drop } from '../interfaces/drop';
import { TinkoffService } from './tinkoff.service';

declare const TinkoffWidget: any;

@Injectable({
  providedIn: 'root'
})
export class DropService {
  private drop: Drop|undefined;
  private loading: boolean = false;

  public $purchaseState = new BehaviorSubject<'btn' | 'form' | 'payment' | 'status-check' | 'status-failed' | 'status-success' | 'status-payment-failed'>('btn')

  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute,
    private tinkoff: TinkoffService,
    private lic: LicenseService
  ) { 
  }


  getDrop(): Observable<Drop>{
    if ( this.drop ) 
      return new BehaviorSubject<Drop>(this.drop)

    this.loading = true;

    return this.http.request( this.getDropAuthReq(), this.getDropAuthBody() )
            .pipe(
              take(1),
              finalize(() => this.loading = false),
              tap(d => this.drop = d)
            )
  }

  private getDropAuthReq(): Req{
    return this.activatedRoute.snapshot.queryParams['referral_code'] ?
      Requests['getReferral']
    :
      Requests['getDrop'];
  }

  private getDropAuthBody(){
    return {
      owner_name: environment.ownerName,
      password: this.activatedRoute.snapshot.queryParams['password'],   
      code: this.activatedRoute.snapshot.queryParams['referral_code']   
    }
  }




  onPurchase(email: string): Observable<any>{
    if ( !this.drop ) return EMPTY
    let obs = this.drop.payment_way === '' ? this.purchaseFree(email) : this.purchasePaid(email);
    return obs
  }



  private purchasePaid(email: string){
    return this.http.request( Requests['postOrderEmail'], { email }, this.drop?.id )
      .pipe(
        tap(d => this.$purchaseState.next('payment')),
        tap(d => this.drop?.payment_way == 'Ameria' ? window.location.href = d.payment_url : null),
        tap(d => {
          if ( this.drop?.payment_way == 'Tinkoff' )
            TinkoffWidget.pay(this.tinkoff.getForm(this.drop, email))
        })
      )
  }


  private purchaseFree( email: string ): Observable<License>{
    if ( !this.drop ) return EMPTY

    return this.http.request( Requests['purchaseFree'], { email }, this.drop.id )
      .pipe(
        tap(d => this.$purchaseState.next('status-success')),
        map((l: License) => {
          return { ...l, expires_in: l.expires_in*1000, bought_at: l.bought_at*1000, created_at: l.created_at*1000 }
        }),
        tap(d => this.lic.onNewLicense(d)),
        catchError(err => {
          this.$purchaseState.next('status-failed')
          return throwError(err)
        })
      )
  }



}
