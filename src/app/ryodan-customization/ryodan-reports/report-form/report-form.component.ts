import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RyodanHttpService } from '../../common/services/ryodan-http.service';
import { BehaviorSubject, finalize, map } from 'rxjs';

@Component({
  selector: 'ryodan-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanReportFormComponent implements OnInit {
  @Input()
  reportId: string | undefined;

  @Output()
  readonly close = new EventEmitter<void>();

  readonly form = new FormGroup({
    description: new FormArray([new FormControl('', Validators.required)]),
    images: new FormControl([], Validators.required),
  });

  loading$ = new BehaviorSubject(false);

  constructor(private http: RyodanHttpService) {}

  get descriptionControl() {
    return this.form.get('description') as FormArray;
  }

  ngOnInit(): void {
    this.patchReport();
  }

  postReport() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const data = {
      ...this.form.value,
      description: this.getDescription(),
    };

    const req = this.reportId
      ? this.http.putReport(data, this.reportId)
      : this.http.postReport(data);

    this.loading$.next(true);

    req.pipe(finalize(() => this.loading$.next(false))).subscribe({
      next: () => this.close.emit(),
    });
  }

  addDescriptionControl() {
    this.descriptionControl.push(new FormControl('', Validators.required));
  }

  removeDescriptionControl(index: number) {
    this.descriptionControl.removeAt(index);
  }

  private patchReport() {
    if (!this.reportId) return;
    this.loading$.next(true);
    this.http
      .getReportById(this.reportId)
      .pipe(
        finalize(() => this.loading$.next(false)),
        map((report) => ({
          ...report,
          description: JSON.parse(report.description) as string[],
        }))
      )
      .subscribe((res) => {
        this.descriptionControl.removeAt(0);
        res.description.forEach(() =>
          this.descriptionControl.push(new FormControl('', Validators.required))
        );
        this.form.patchValue(res);
      });
  }

  private getDescription() {
    const descriptionControlValues = this.form.get('description')!
      .value as string[];
    return JSON.stringify(descriptionControlValues);
  }
}
