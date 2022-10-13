import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'checkbox-agreement',
  templateUrl: './checkbox-agreement.component.html',
  styleUrls: ['./checkbox-agreement.component.scss'],
  providers: [{ 
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => CheckboxAgreementComponent),
   multi: true
  }]
})
export class CheckboxAgreementComponent implements ControlValueAccessor {
  val: boolean = false;
  siteUrl = environment.landing || environment.site


  constructor() { }

  onChange(_: any){}
  
  writeValue(val: any) {
    this.val = val;
    this.onChange(this.val)
  }

  registerOnChange(fn: () => void) {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
  }

}
