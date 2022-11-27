import { Component, OnInit, Output } from '@angular/core';
import { finalize, take } from 'rxjs';
import { DropService } from '../../services/drop.service';

@Component({
  selector: 'drop-status-btn',
  templateUrl: './drop-status-btn.component.html',
  styleUrls: ['./drop-status-btn.component.scss']
})
export class DropStatusBtnComponent implements OnInit {
  loading: boolean = true;
  isActive: boolean = false;

  paymentWay: '' | 'Tinkoff' | 'Ameria' | 'Crypto' = '';

  constructor(
    public drop: DropService
  ) { }

  ngOnInit(): void {
    this.getDrop();
  }

  getDrop(){
    this.drop.getDrop()
      .pipe(
        take(1),
        finalize(() => this.loading = false),
      )
      .subscribe({
        next: w => {
          this.isActive = true
          this.paymentWay = w.payment_way
        },
        error: () => this.isActive = false
      })
  }

}
