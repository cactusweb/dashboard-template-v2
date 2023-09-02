import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { LicenseService } from '../../services/license.service';
import { map } from 'rxjs';
import { License } from '../../interfaces/license';

@Component({
  selector: 'customization-ryodan-window',
  templateUrl: './ryodan-window.component.html',
  styleUrls: ['./ryodan-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanWindowComponent {
  binanceId$ = this.licenseService.$license.pipe(
    map((d) => d as License),
    map((d) => {
      try {
        return (
          JSON.parse(d.description)['binanceId'] || (null as string | null)
        );
      } catch {
        return null;
      }
    })
  );

  isShowEditForm = false;

  constructor(
    public tools: ToolsService,
    private licenseService: LicenseService
  ) {}
}
