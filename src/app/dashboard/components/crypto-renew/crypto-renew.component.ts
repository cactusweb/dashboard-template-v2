import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, finalize, take } from 'rxjs';
import { Order } from 'src/app/purchase/interfaces/order';
import { LicenseService } from '../../services/license.service';
import { RenewService } from '../../services/renew.service';

@Component({
  selector: 'app-crypto-renew',
  templateUrl: './crypto-renew.component.html',
  styleUrls: ['./crypto-renew.component.scss'],
  providers: [RenewService],
})
export class CryptoRenewComponent implements OnInit {
  @Input() disabled: boolean = false;
  order: Order | undefined;

  showPayment: boolean = false;
  showSuccessWindow: boolean = false;
  readonly showPaymentDuration$ = new BehaviorSubject(false);

  constructor(private renew: RenewService, private license: LicenseService) {}

  ngOnInit(): void {}

  getOrder() {
    this.showPaymentDuration$.next(true);
  }

  onSuccessRenew() {
    this.showPayment = false;
    this.showPaymentDuration$.next(false);
    this.order = undefined;
    this.renew.resetOrder();
    this.license.renewLicense();
    this.showSuccessWindow = true;
  }
}
