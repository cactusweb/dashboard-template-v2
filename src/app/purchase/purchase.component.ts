import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DropService } from './services/drop.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  purchaseState: Observable<'btn'|'form'|'payment'|'status-check'|'status-failed'|'status-success'|'status-payment-failed'>

  constructor(
    private drop: DropService,
    private activatedRoute: ActivatedRoute
  ) {
    this.checkPurchaseState()
    this.purchaseState = drop.$purchaseState.asObservable();
  }

  ngOnInit(): void {
  }

  checkPurchaseState(){
    let status = this.activatedRoute.snapshot.queryParams['status']
    if ( status == 'pending' ) this.drop.$purchaseState.next('status-check'); else
    if ( status == 'payment-failed' ) this.drop.$purchaseState.next('status-payment-failed')
  }

}
