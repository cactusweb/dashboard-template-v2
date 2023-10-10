import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  filter,
  finalize,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { RyodanApplicationTarget } from 'src/app/ryodan-customization/common/interfaces/ryodan-customization.interfaces';
import { RyodanDataService } from 'src/app/ryodan-customization/common/services/ryodan-data.service';
import { RyodanHttpService } from 'src/app/ryodan-customization/common/services/ryodan-http.service';
import { SelectOption } from 'src/app/tools/components/select-control/select-control.component';

@Component({
  selector: 'ryodan-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanApplicationFormComponent {
  @Output()
  readonly close = new EventEmitter<void>();

  readonly form = new FormGroup({
    description: new FormControl(''),
    target: new FormControl('', Validators.required),
    wallet: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  readonly loading$ = new BehaviorSubject(false);

  readonly targets$ = this.data.applicationTargets$.pipe(
    tap((d) => {
      if (d) return;
      this.http.getApplicationTargets();
    }),
    filter((d) => !!d),
    map((d) =>
      d!.map(
        (target) =>
          ({ display: target.name, value: target.name } as SelectOption)
      )
    )
  );

  readonly needWallet$ = of(false).pipe(switchMap(() => this.isWalletNeed()));

  constructor(
    private http: RyodanHttpService,
    private data: RyodanDataService
  ) {}

  postApplication() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.loading$.next(true);

    this.http
      .postApplication(this.form.value)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () => this.close.emit(),
        error: () => {},
      });
  }

  private isWalletNeed() {
    return combineLatest([
      this.form.get('target')!.valueChanges,
      this.data.applicationTargets$ as Observable<RyodanApplicationTarget[]>,
    ]).pipe(
      map(
        ([target, allTargets]) =>
          allTargets.find((t) => t.name === target)!.need_wallet
      ),
      tap((d) => this.form.get('wallet')![d ? 'enable' : 'disable']())
    );
  }
}
