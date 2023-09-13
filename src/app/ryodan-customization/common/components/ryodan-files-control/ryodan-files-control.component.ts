import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RyodanHttpService } from '../../services/ryodan-http.service';
import { BehaviorSubject, finalize } from 'rxjs';

type ImgUrls = string[];

@Component({
  selector: 'ryodan-files-control',
  templateUrl: './ryodan-files-control.component.html',
  styleUrls: ['./ryodan-files-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RyodanFilesControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanFilesControlComponent implements ControlValueAccessor {
  onChange!: (val: ImgUrls) => void;
  onTouche!: () => void;

  private _imgUrls: ImgUrls = [];

  readonly loading$ = new BehaviorSubject(false);

  constructor(
    private cdr: ChangeDetectorRef,
    private http: RyodanHttpService
  ) {}

  get imgUrls() {
    return this._imgUrls;
  }

  set imgUrls(data: ImgUrls) {
    this._imgUrls = data;
    this.onChange(data);
  }

  writeValue(imgUrls: ImgUrls): void {
    this._imgUrls = imgUrls;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (val: ImgUrls) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouche = fn;
  }

  trackByIndex(index: number) {
    return index;
  }

  onFileInputEvent(event: Event) {
    const formData = this.getFormData(event);
    if (!formData) return;
    this.loading$.next(true);
    this.http
      .postFile(formData)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: (url) => (this.imgUrls = [...this.imgUrls, url]),
        error: () => {},
      });
  }

  removeFile(url: string) {
    this.loading$.next(true);

    this.http
      .deleteFile(url)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () =>
          (this.imgUrls = this.imgUrls.filter((imgUrl) => imgUrl !== url)),
        error: () => {},
      });
  }

  private getFormData(event: Event): FormData | null {
    const target = (event.target || event.srcElement) as HTMLInputElement;
    const file = (target.files as FileList)[0];

    if (!file) {
      return null;
    }

    const formData: FormData = new FormData();
    formData.set('file', file, file.name);

    return formData;
  }
}
