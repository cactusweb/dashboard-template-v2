import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { RyodanReportStates } from '../../interfaces/ryodan-customization.interfaces';

@Component({
  selector: 'ryodan-popup',
  templateUrl: './ryodan-popup.component.html',
  styleUrls: ['./ryodan-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanPopupComponent {
  @Output()
  close = new EventEmitter<void>();

  @Input()
  windowTitle!: string;

  @Input()
  state!: string;

  readonly RyodanReportStates = RyodanReportStates;

  @HostListener('document:keydown.escape', ['$event'])
  onEscape() {
    this.close.emit();
  }
}
