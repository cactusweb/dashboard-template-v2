import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { take, tap } from 'rxjs';
import { LicenseService } from 'src/app/dashboard/services/license.service';
import { DropService } from '../../services/drop.service';

@Component({
  selector: 'status-check',
  templateUrl: './status-check.component.html',
  styleUrls: ['./status-check.component.scss'],
})
export class StatusCheckComponent implements OnInit {
  checkCount: number = 0;
  loading: boolean = true;

  constructor(
    private lic: LicenseService,
    private drop: DropService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.getLicense(), 200);
  }

  getLicense(){
    if ( this.checkCount == 6 ){
      this.loading = false;
      return this.drop.$purchaseState.next('status-failed');
    }

    this.checkCount++;
    this.lic.fetchLicense()
      .pipe(
        take(1),
        tap(d => {
          this.loading = false;
          this.drop.$purchaseState.next('status-success')
        })
      )
      .subscribe({
        error: () => setTimeout(() => this.getLicense(), 800)
      })
  }

}
