import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, finalize, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Requests } from '../const';
import { AdditionalActivationPlan } from '../dashboard/interfaces/additional-activation-plan';
import { LicenseService } from '../dashboard/services/license.service';
import { Order } from '../purchase/interfaces/order';
import { TinkoffService } from '../purchase/services/tinkoff.service';
import { SelectOption } from '../tools/components/select-control/select-control.component';
import { HttpService } from '../tools/services/http.service';

declare const TinkoffWidget: any;

@Component({
  selector: 'additional-activations-popup',
  templateUrl: './additional-activations-popup.component.html',
  styleUrls: ['./additional-activations-popup.component.scss']
})
export class AdditionalActivationsPopupComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  @Output() onGetOrder = new EventEmitter<Order>();
  @Output() onSuccess = new EventEmitter();
  
  loading: boolean = false;

  form!: FormGroup

  selectOptions: SelectOption[] = []
  activationPlans: AdditionalActivationPlan[] = [];

  needAgreement: boolean = false;

  constructor(
    private lic: LicenseService,
    private currency: CurrencyPipe,
    private http: HttpService,
    private tinkoff: TinkoffService,
  ) { }
  
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent){
    this.onClose.emit();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      duration: new FormControl('', Validators.required)
    })

    this.getActivationPlans();
  }

  getActivationPlans(){
    this.lic.getAdditionalActivationPlans()
      .pipe(
        take(1),
        tap(d => this.activationPlans = d ),
        map(d => d.map(plan => {
          return {
            display: `${this.getPeriodNameByDays(plan.duration)} - ${this.getPrice(plan.price)}`,
            value: plan.duration
          }
        }))
      )
      .subscribe({
        next: res => this.selectOptions = res,
        error: () => {}
      })
  }

  getPeriodNameByDays(daysCount: number|null){
    if ( !daysCount ) return 'Lifetime license-bounded'
    if ( daysCount % 7 == 0 ) return `${daysCount / 7} week(s)`; 
    if ( daysCount % 30 == 0 ) return `${daysCount / 30} month(s)`;
    if ( daysCount % 365 == 0 ) return `${daysCount / 365} year(s)`;
    
    return `${daysCount} day(s)`;
  }

  getPrice( price: number ){
    return this.currency.transform( price, this.lic._license?.payment.currency||'USD', 'symbol-narrow', '1.0-1')
  }

  getChoosenDurationPrice(){
    if ( this.form.get('duration')!.value === '' ) return '';

    let price = this.activationPlans.find(plan => this.form.get('duration')!.value == plan.duration)!.price
    return this.getPrice(price)
  }

  onSubmit(){
    this.form.markAllAsTouched();

    if ( this.form.get('duration')!.value === '' ) return;
    
    if (!this.needAgreement){
      this.needAgreement = true;
      return
    }
    this.needAgreement = false;
    this.loading = true;
    (this.http.request( Requests['getAdditionalActivationOrder'], this.form.value ) as Observable<Order>)
      .pipe(
        take(1),
        switchMap(order => {
          if ( order.payment_way == 'Crypto' ) return of(order)
          return this.putOrder(order.id)
        }),
        finalize(() => this.loading = false),
      )
      .subscribe({
        next: val => {
          if ( val.payment_way == 'Crypto' ) 
            this.onGetOrder.emit(val);
        },
        error: () => {}
      })
  }

  putOrder( orderId: string ): Observable<Order>{
    let email = this.lic._license?.payment.email||'';
    type res = { email: string, order: Order, payment_url?: string }

    return (this.http.request( Requests['postOrderEmail'], { email: email }, orderId ) as Observable<res>)
      .pipe(
        take(1),
        tap( d => d.order.status == 5 ? this.onSuccessBuy() : null ),
        filter(d => d.order.status !== 5 ),
        tap(d => (d.order.payment_way == 'Ameria' || d.order.payment_way === 'Stripe') && d.payment_url ? window.location.href = d.payment_url : null),
        tap(d => {
          if ( d.order.payment_way == 'Tinkoff' )
            TinkoffWidget.pay(this.tinkoff.getForm(d.order, email, true))
        }),
        map(d => d.order)
      )
  }

  onSuccessBuy(){
    this.onSuccess.emit();
    
  }

}