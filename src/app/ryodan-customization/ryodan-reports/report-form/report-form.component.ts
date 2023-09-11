import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RyodanHttpService } from '../../common/services/ryodan-http.service';
import { BehaviorSubject, finalize } from 'rxjs';

@Component({
  selector: 'ryodan-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanReportFormComponent {
  @Output()
  readonly close = new EventEmitter<void>();

  readonly form = new FormGroup({
    description: new FormArray([new FormControl('', Validators.required)]),
    target: new FormControl('', Validators.required),
    wallet: new FormControl({ value: '', disabled: true }),
  });

  loading$ = new BehaviorSubject(false);

  constructor(private http: RyodanHttpService) {}

  get descriptionControl() {
    return this.form.get('description') as FormArray;
  }

  postReport() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.loading$.next(true);
    this.http
      .postReport({
        ...this.form.value,
        description: this.getDescription(),
      })
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () => this.close.emit(),
      });
  }

  addDescriptionControl() {
    this.descriptionControl.push(new FormControl('', Validators.required));
  }

  removeDescriptionControl(index: number) {
    this.descriptionControl.removeAt(index);
  }

  private getDescription() {
    const descriptionControlValues = this.form.get('description')!
      .value as string[];
    return JSON.stringify(descriptionControlValues);
  }
}
