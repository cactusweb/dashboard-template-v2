import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LicenseService } from 'src/app/dashboard/services/license.service';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { DropService } from '../../services/drop.service';

@Component({
  selector: 'status-success',
  templateUrl: './status-success.component.html',
  styleUrls: ['./status-success.component.scss']
})
export class StatusSuccessComponent implements OnInit {
  licenseKey!: Observable<string>

  constructor(
    private lic: LicenseService,
    public tools: ToolsService
  ) {
    this.licenseKey = lic.getLicense()
      .pipe(
        map(d => d.key)
      )
  }

  ngOnInit(): void {
  }

}
