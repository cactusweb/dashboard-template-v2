import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  RyodanApplication,
  RyodanReportStates,
  RyodanShortReport,
} from '../../interfaces/ryodan-customization.interfaces';

const ItemStates = RyodanReportStates;

@Component({
  selector: 'ryodan-common-list',
  templateUrl: './ryodan-common-list.component.html',
  styleUrls: ['./ryodan-common-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanCommonList {
  @Input()
  items: (RyodanApplication | RyodanShortReport)[] | null = null;

  @Output()
  viewItem = new EventEmitter<RyodanApplication | RyodanShortReport>();

  @Output()
  editItem = new EventEmitter<RyodanApplication | RyodanShortReport>();

  readonly ItemStates = ItemStates;

  trackById(index: number, item: RyodanApplication | RyodanShortReport) {
    return item.id;
  }
}
