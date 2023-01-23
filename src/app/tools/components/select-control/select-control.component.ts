import { ChangeDetectorRef, Component, ElementRef, forwardRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type Value = string|number|null;

export interface SelectOption{
  display: string|number,
  value: Value
}

@Component({
  selector: 'select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectControlComponent),
    multi: true
  }]
})
export class SelectControlComponent implements ControlValueAccessor {
  value: Value = null;

  showDropDown: boolean = false

  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = 'Choose the value';
  touched: boolean = false;

  onChange!: (_: any) => void;
  onTouche!: () => void;

  constructor(
    private eRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }


  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if( this.eRef.nativeElement.contains(event.target) || !this.showDropDown ) return
    console.log('asdsd')
    this.changeState();
  }

  changeState( event?: MouseEvent ){
    if ( event && (event.target as HTMLElement ).tagName == "LI" ){
      return
    }
     
    this.showDropDown = !this.showDropDown;
    if ( !this.showDropDown ){
      this.touched = true;
      this.onTouche()
    }
  }
  
  setValue(val: Value){
    this.value = val;
    this.onChange(val)
    this.changeState()
  }

  writeValue(val: Value): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouche = fn;
  }

  getDisplayValue(){
    return this.options.find(opt => opt.value === this.value)!.display
  }

}
