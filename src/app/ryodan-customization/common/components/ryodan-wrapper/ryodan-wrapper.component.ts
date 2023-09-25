import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RyodanReportStates } from '../../interfaces/ryodan-customization.interfaces';
import { NgxSpinnerService } from 'ngx-spinner';

const ItemStates = RyodanReportStates;

@Component({
  selector: 'ryodan-wrapper',
  templateUrl: './ryodan-wrapper.component.html',
  styleUrls: ['./ryodan-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanWrapperComponent implements OnChanges {
  @Input()
  showList: boolean = false;

  @Input()
  pending = false;

  @Output()
  update = new EventEmitter<void>();

  readonly ItemStates = ItemStates;

  constructor(private spinnerService: NgxSpinnerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pending'])
      this.spinnerService[this.pending ? 'show' : 'hide']();
  }
}
