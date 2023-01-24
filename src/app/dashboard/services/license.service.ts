import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, finalize, map, Observable, of, take, tap } from 'rxjs';
import { Requests } from 'src/app/const';
import { HttpService } from 'src/app/tools/services/http.service';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { AdditionalActivationPlan } from '../interfaces/additional-activation-plan';
import { License } from '../interfaces/license';
import { ReferralPrize, ReferralPrizes } from '../interfaces/referral-prize';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  private referralPrizes: ReferralPrizes|undefined;
  private additionalActivationPlans: AdditionalActivationPlan[]|undefined;

  public _license!: License|null

  set license(d: License|null){
    this._license = d;
    this.$license.next(this._license)
  }

  get license(){
    return this._license
  }

  private $license = new BehaviorSubject<License|null>(null)

  public loading: boolean = false;
  public lastFetch: number = 0;

  constructor(
    private http: HttpService,
    private router: Router,
    private tools: ToolsService
  ) { }

  getLicense( update: boolean = false ): Observable<License>{
    if ( (update || !this.license) && !this.loading && (this.lastFetch+10*1000) < Date.now() ){
      this.fetchLicense()
        .pipe(
          take(1),
        )
        .subscribe({ next: () => {}, error: () => {} })
    }

    // @ts-ignore
    return this.$license.asObservable()
      .pipe(
        filter(u => !!u)
      )

  }

  
  public fetchLicense(): Observable<License>{
    this.loading = true;
    return this.http.request( Requests['getLicense'] )
      .pipe(
        map((l: License) => {
          return { ...l, expires_in: l.expires_in*1000, bought_at: l.bought_at*1000, created_at: l.created_at*1000 }
        }),
        tap(d => this.license = d),
        finalize(() => this.lastFetch = Date.now()),
        finalize(() => this.loading = false)
        // catchError(err => {
        //   // if ( !this.user ){
        //     // this.$user.error(err);
        //     // this.$user = new BehaviorSubject<User|null>(null)
        //   // }

        //   return throwError(err)
        // })
      )
  }


  public resetLicense(): Observable<undefined>{
    return this.http.request( Requests['resetLicense'] )
      .pipe(
        tap(() => {
          if ( !this.license ) return
          this.license.activations.devices = [];
          this.tools.generateNotification('Activations reseted', 'success')
        })
      )
  }


  public unbindLicense(): Observable<undefined>{
    return this.http.request( Requests['unbindLicense'] )
      .pipe(
        tap(() => this.license = null),
        tap(() => this.tools.generateNotification('Licenses unbinded', 'err')),
        tap(() => this.router.navigate(['/bind'])),
        tap(() => this.lastFetch = Date.now())
      )
  }


  public bindLicense( data: { key: string } ): Observable<License>{
    return this.http.request( Requests['bindLicense'], data )
      .pipe(
        map((l: License) => {
          return { ...l, expires_in: l.expires_in*1000, bought_at: l.bought_at*1000, created_at: l.created_at*1000 }
        }),
        tap(d => this.license = d),
        tap(() => this.router.navigate(['/dashboard'])),
        tap(() => this.tools.generateNotification('Licenses binded', 'success')),
        tap(() => this.lastFetch = Date.now())
      )
  }


  public cancelPayment(): Observable<any>{
    return this.http.request( Requests['stopSub'] )
      .pipe(
        take(1),
        tap(() => {
          let lic = this.license;
          if ( !lic ) return;
          lic.payment = { ...lic.payment, last_4: '', exp_date: '' };
          this.license = lic;
        })
      )
      // .subscribe({
      //   next: () => {
      //     let license = this.license;
      //   }
      // })
  }


  public onNewLicense( lic: License ){
    this.license = lic;
  }



  public getReferral(): Observable<ReferralPrize[]>{
    if ( this.referralPrizes ) return new BehaviorSubject<ReferralPrize[]>(this.referralPrizes.prizes).asObservable()

    return this.http.request( Requests['getReferralPrizes'] )
      .pipe(
        tap( d => this.referralPrizes = d ),
        map( d => d.prizes)
      )
  }

  public getAdditionalActivationPlans(): Observable<AdditionalActivationPlan[]>{
    if ( this.additionalActivationPlans )
      return of(this.additionalActivationPlans);

    return this.http.request( Requests['getAdditionalActivationPlans'] )
      .pipe(
        map( d => d.plans ),
        tap( d => this.additionalActivationPlans = d ),
      )
  }


  public renewLicense(){
    if ( !this.license ) return
    
    this.license = {
      ...this.license,
      expires_in: this.license.expires_in ? new Date(this.license.expires_in).setMonth(new Date(this.license.expires_in).getMonth()+1) : this.license.expires_in
    }
  }


  public addActivation(){
    if ( !this.license ) return;

    this.license = {
      ...this.license,
      activations: {
        ...this.license.activations,
        quantity: this.license.activations.quantity+1
      }
    }
  }
}
