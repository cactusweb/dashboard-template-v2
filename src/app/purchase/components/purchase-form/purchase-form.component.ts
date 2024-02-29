import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, map, Observable, take } from 'rxjs';
import { DropService } from '../../services/drop.service';

@Component({
  selector: 'purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss'],
  providers: [CurrencyPipe]
})
export class PurchaseFormComponent implements OnInit {
  form!: FormGroup
  loading: boolean = false;

  payment: Observable<{ way: string, currency: string, price: number }>

  showDisclaimer = false;
  disclaimerApproved = false;

  constructor(
    private drop: DropService,
    private currency: CurrencyPipe
  ) { 
    this.payment = drop.getDrop()
      .pipe(
        map(d => {
          return {
            way: d.payment_way,
            currency: d.currency,
            price: d.price
          }
        })
      )
  }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      agreement: new FormControl(false)
    })
  }

  onSubmit(){
    this.form.markAllAsTouched();
    if ( this.form.invalid || !this.form.controls['agreement'].value ) return;

    if ( !this.disclaimerApproved ){
      this.showDisclaimer = true;
      return
    }

    this.showDisclaimer = false;
    this.loading = true;
    this.drop.onPurchase( this.form.controls['email'].value )
      .pipe(
        take(1),
      )
      .subscribe({
        error: () => this.loading = false,
        next: d => d.key ? this.loading = false : null
      })

  }

  getDropPrice(payment: { way: string, currency: string, price: number }|null){
    if ( !payment || payment.way == 'Tinkoff' && payment.currency !== 'RUB' )
      return '';

    return ` ` + this.currency.transform(payment.price, payment.currency||'USD', 'symbol-narrow', '1.0-1');
  }

}