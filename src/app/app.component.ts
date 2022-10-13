import { AfterViewInit, Component } from '@angular/core';
import { LicensePayment } from './dashboard/interfaces/license-payment';
import { SeoService } from './tools/services/seo.service';
import { ToolsService } from './tools/services/tools.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private seo: SeoService
  ){
    seo.autoUpdateTags();
  }
}
