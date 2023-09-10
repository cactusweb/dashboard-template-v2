import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RyodanApplication } from 'src/app/ryodan-customization/common/interfaces/ryodan-customization.interfaces';

@Component({
  selector: 'ryodan-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanApplicationViewComponent {
  @Input()
  application!: RyodanApplication;

  getDescriptionAsArr(): string[] {
    return JSON.parse(this.application.description);
  }

  trackByIndex(index: number) {
    return index;
  }
}
