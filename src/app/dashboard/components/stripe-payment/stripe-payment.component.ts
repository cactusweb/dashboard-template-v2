import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { License } from '../../interfaces/license';
import { LicensePayment } from '../../interfaces/license-payment';
import { StripePaymentService } from './services/stripe-payment.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripePaymentComponent {
  @Input()
  paymentData!: LicensePayment;

  loading = false;

  readonly REFUND_LINK =
    'https://discord.com/channels/1102872915587891232/1186270282835574814';

  readonly MANAGE_PAYMENT_LINK = 'http://encoreio.cc/manage';

  constructor(
    private stripeService: StripePaymentService,
    private cdr: ChangeDetectorRef
  ) {}

  createCustomer() {
    this.loading = true;

    this.stripeService
      .createCustomer()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({});
  }

  goToPortal() {
    this.loading = true;
    this.stripeService.goToPortal().subscribe({
      complete: () => {
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }
}
