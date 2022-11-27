import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Requests } from 'src/app/const';
import { Order } from 'src/app/purchase/interfaces/order';
import { HttpService } from 'src/app/tools/services/http.service';

@Injectable()
export class CryptoRenewService {
  private order: Order|undefined

  constructor(
    private http: HttpService
  ) { }

  public getRenewOrder(): Observable<Order>{
    if ( this.order )
      return of(this.order)
    
    return this.http.request( Requests['getRenewOrder'] )
      .pipe(
        tap(d => this.order = d)
      )
  }


  resetOrder(){
    this.order = undefined;
  }
}
