import { Component, Input, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { Requests } from 'src/app/const';
import { Order } from 'src/app/purchase/interfaces/order';
import { HttpService } from 'src/app/tools/services/http.service';
import { CryptoRenewService } from './crypto-renew.service';

@Component({
  selector: 'app-crypto-renew',
  templateUrl: './crypto-renew.component.html',
  styleUrls: ['./crypto-renew.component.scss'],
  providers: [CryptoRenewService]
})
export class CryptoRenewComponent implements OnInit {
  @Input() disabled: boolean = false;
  order: Order|undefined

  loading: boolean = false;

  showPayment: boolean = false;

  constructor(
    private crypto: CryptoRenewService
  ) { }

  ngOnInit(): void {
  }

  getOrder(){
    this.loading = true;

    this.crypto.getRenewOrder()
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: v => {
          this.order = v
          this.showPayment = true;
        },
        error: e => {}
      })
  }

}
