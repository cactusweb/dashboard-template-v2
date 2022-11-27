import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Requests } from 'src/app/const';
import { LicenseService } from 'src/app/dashboard/services/license.service';
import { Order } from 'src/app/purchase/interfaces/order';
import { DropService } from 'src/app/purchase/services/drop.service';
import { TinkoffService } from 'src/app/purchase/services/tinkoff.service';
import { HttpService } from 'src/app/tools/services/http.service';

declare const TinkoffWidget: any;

@Injectable({
  providedIn: 'root'
})
export class BindCardService {
  bindOrder: Order|undefined;

  constructor(
    private http: HttpService,
    private tinkoff: TinkoffService,
  ) { }

  getBindOrder(): Observable<Order>{
    if ( this.bindOrder ) return new BehaviorSubject<Order>(this.bindOrder).asObservable();

    return this.http.request( Requests['startSub'] )
      .pipe(
        tap(d => this.bindOrder = d)
      )
  }

  goToPayment(email: string){
    return this.http.request( Requests['postOrderEmail'], { email }, this.bindOrder?.id )
      .pipe(
        tap(d => this.bindOrder?.payment_way == 'Ameria' ? window.location.href = d.payment_url : null),
        tap(d => {
          if ( this.bindOrder?.payment_way == 'Tinkoff' )
            TinkoffWidget.pay(this.tinkoff.getForm(this.bindOrder, email, true))
        })
      )
  }
}
