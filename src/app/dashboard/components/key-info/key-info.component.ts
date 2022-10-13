import { Component, Input, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { License } from '../../interfaces/license';
import { LicenseService } from '../../services/license.service';

@Component({
  selector: 'app-key-info',
  templateUrl: './key-info.component.html',
  styleUrls: ['./key-info.component.scss']
})
export class KeyInfoComponent implements OnInit {
  @Input() license!: License|null;
  loading: boolean = false;

  constructor(
    private lic: LicenseService,
    public tools: ToolsService
  ) { }

  ngOnInit(): void {
  }

  onReset(){
    this.loading = true;

    this.lic.resetLicense()
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      )
      .subscribe({
        error: () => {}
      })
  }

}
