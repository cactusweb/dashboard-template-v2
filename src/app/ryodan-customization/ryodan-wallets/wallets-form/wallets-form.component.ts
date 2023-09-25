import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RyodanHttpService } from '../../common/services/ryodan-http.service';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { BehaviorSubject, finalize } from 'rxjs';

@Component({
  selector: 'ryodan-wallets-form',
  templateUrl: './wallets-form.component.html',
  styleUrls: ['./wallets-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanWalletsFormComponent {
  @Output()
  close = new EventEmitter<void>();

  readonly form = new FormGroup({
    quantity: new FormControl(null, Validators.required),
  });

  readonly loading$ = new BehaviorSubject(false);

  constructor(private http: RyodanHttpService, private tools: ToolsService) {}

  receiveWallets() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.loading$.next(true);

    this.http
      .receiveWallets(this.form.value)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () => {
          this.tools.generateNotification('Wallets received!', 'success');
          this.close.emit();
        },
      });
  }
}
