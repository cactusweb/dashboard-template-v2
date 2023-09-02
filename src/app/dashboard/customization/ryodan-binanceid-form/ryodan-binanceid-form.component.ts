import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, finalize, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LicenseService } from '../../services/license.service';
import { License } from '../../interfaces/license';
import { NotificationsService } from 'src/app/notifications/services/notifications.service';

@Component({
  selector: 'customization-ryodan-binanceid-form',
  templateUrl: './ryodan-binanceid-form.component.html',
  styleUrls: ['./ryodan-binanceid-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanBinanceIDFormComponent {
  @Output()
  close = new EventEmitter<void>();

  readonly form = new FormGroup({
    binanceId: new FormControl('', Validators.required),
  });

  readonly loading$ = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private licService: LicenseService,
    private notifications: NotificationsService
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  onEscape() {
    this.close.emit();
  }

  putBinanceId() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.loading$.next(true);

    this.http
      .post<License>(
        `${environment.middleApiUrl} + /binanceId`,
        this.form.value
      )
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe((lic) => {
        this.licService.license = lic;
        this.notifications.create({
          text: 'Binance ID saved',
          type: 'success',
        });
        this.close.emit();
      });
  }
}
