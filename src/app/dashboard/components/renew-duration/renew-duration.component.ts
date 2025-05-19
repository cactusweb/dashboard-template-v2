import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  inject,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  BehaviorSubject,
  finalize,
  map,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { Order } from 'src/app/purchase/interfaces/order';
import { LicenseService } from '../../services/license.service';
import { HttpService } from 'src/app/tools/services/http.service';
import { CryptoPaymentComponent } from 'src/app/purchase/components/crypto-payment/crypto-payment.component';
import { ToolsModule } from '../../../tools/tools.module';
import { RenewService } from '../../services/renew.service';

@Component({
  selector: 'csd-dashboard-renew-duration',
  templateUrl: './renew-duration.component.html',
  styleUrls: ['./renew-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RenewService],
})
export class CsdDashboardRenewDurationComponent {
  @Output()
  readonly orderGenerated = new EventEmitter<Order>();

  readonly duractionControl = new FormControl(1, Validators.required);
  readonly loading$ = new BehaviorSubject(false);

  readonly ownerSupportLink;

  constructor(
    private renewService: RenewService,
    private licenseService: LicenseService
  ) {
    this.ownerSupportLink = this.licenseService?.license?.owner.support_link;
  }

  onSubmit() {
    this.loading$.next(true);

    this.renewService
      .getOrder(this.duractionControl.value)
      .pipe(
        take(1),
        finalize(() => this.loading$.next(false))
      )
      .subscribe({
        next: (v) => this.orderGenerated.emit(v),
        error: (e) => {},
      });
  }
}
