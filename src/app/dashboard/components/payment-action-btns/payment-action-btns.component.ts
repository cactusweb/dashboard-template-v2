import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { LicenseService } from '../../services/license.service';
import { RenewService } from '../../services/renew.service';

@Component({
  selector: 'app-payment-action-btns',
  templateUrl: './payment-action-btns.component.html',
  styleUrls: ['./payment-action-btns.component.scss'],
  providers: [RenewService]
})
export class PaymentActionBtnsComponent implements OnInit, AfterViewInit {
  loadingCancel: boolean = false;

  loadingRenew: boolean = false;
  showSuccessWindow: boolean = false;

  btnStates = {
    1: {
      width: 'auto',
      icon: true
    },
    2: {
      width: 'auto',
      icon: true
    }
  }

  constructor(
    private lic: LicenseService,
    private renew: RenewService,
    private eRef: ElementRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let btnWidth = (this.eRef.nativeElement['offsetWidth']-8)/2 + 'px'
      this.btnStates[1].width = btnWidth
      this.btnStates[2].width = btnWidth
    }, );
  }

  cancel(){
    this.loadingCancel = true;

    this.lic.cancelPayment()
      .pipe(
        take(1),
        finalize(() => this.loadingCancel = false)
      )
      .subscribe({error: () => {}})
  }

  async onRenew(){
    let success = true;
    this.loadingRenew = true;


    await this.renew.getOrder()
      .pipe(take(1)).toPromise()
      .then(w => {})
      .catch(e => success = false)

    if ( !success ){
      this.loadingRenew = false;
      return
    }

    this.renew.putOrder({})
      .pipe(
        take(1),
        finalize(() => this.loadingRenew = false)
      )
      .subscribe({
        next: () => {},
        error: () => this.renew.resetOrder(),
        complete: () => this.handleSuccessRenew()
      })
      
  }


  handleSuccessRenew(){
    this.lic.renewLicense();
    this.renew.resetOrder();
    this.showSuccessWindow = true;
  }

  onChangeBtnStates(maxBtn: 1|2, isHover: boolean){
    if (!isHover){
      let btnWidth = (this.eRef.nativeElement['offsetWidth']-8)/2 + 'px'
      let initial = {
        width: btnWidth,
        icon: true
      };

      this.btnStates = {
        1: initial,
        2: initial,
      }

      return
    }


    this.btnStates[maxBtn] = {
      icon: false,
      width: (this.eRef.nativeElement['offsetWidth']-8-48) + 'px'
    }

    this.btnStates[(maxBtn%2+1) as 1|2].width = '48px'
  }

}
