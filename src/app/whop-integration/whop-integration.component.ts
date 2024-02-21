import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { LicenseService } from '../dashboard/services/license.service';
import { Router } from '@angular/router';
import { License } from '../dashboard/interfaces/license';
import { ToolsService } from '../tools/services/tools.service';

@Component({
  selector: 'csd-whop-integration-component',
  templateUrl: './whop-integration.component.html',
  styleUrls: ['./whop-integration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhopIntegrationComponent implements OnInit {
  readonly loading$ = new BehaviorSubject(false);
  constructor(
    private http: HttpClient,
    private licService: LicenseService,
    private router: Router,
    private tools: ToolsService
  ) {}

  ngOnInit(): void {
    if (this.licService.lastFetch + 10 * 1000 > Date.now()) {
      return;
    }
    this.loading$.next(true);
    this.licService
      .fetchLicense()
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
      });
  }

  onRecieveLicense() {
    this.loading$.next(true);
    this.http
      .get<License>('https://whop-integration.encoreio.com' + '/license')
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err: any) => {
          if (err?.error?.message) {
            this.tools.generateNotification(err.error.message, 'err');
          }
        },
      });
  }
}
