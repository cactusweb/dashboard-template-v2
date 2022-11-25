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
        map((d: Order) => {
          return {
            ...d,
            crypto: [
              {
                amount: 50,
                id: 1,
                coin: {name: 'BUSD', fullname: 'Binance USD', image: 'https://cryptologos.cc/logos/binance-usd-busd-logo.png'},
                network: 'BSC (BEP20)',
                recipient: '0x0c31a4C9Acc1d1f7504985dB8a0cCd29567c0497'
              },
              {
                amount: 0.025,
                id: 2,
                coin: {name: 'ETH', fullname: 'Ethereum', image: 'https://d33wubrfki0l68.cloudfront.net/f9bf7321ed7d9045fac8e374993c9420fe730b45/121d3/static/6b935ac0e6194247347855dc3d328e83/13c43/eth-diamond-black.png'},
                network: 'ERC20',
                recipient: '0x0c31a4C9Acc1d1f7504985dB8a0cCd29567c0497'
              },
              {
                amount: 4.5,
                id: 3,
                coin: {name: 'SOL', fullname: 'Solana', image: 'https://cdn-icons-png.flaticon.com/512/6001/6001527.png'},
                network: 'SOL',
                recipient: 'E5xvnPxww5t7MvA54rX3ha1niM8wU5tcs1C1ZJwijghR'
              },
            ]
          }
        }),
        tap(d => this.order = d)
      )
  }


  resetOrder(){
    this.order = undefined;
  }
}
