import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-stripe-disclaimer',
  templateUrl: './stripe-disclaimer.component.html',
  styleUrls: ['./stripe-disclaimer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripeDisclaimerComponent {
  @Output()
  approve = new EventEmitter<void>();
}
