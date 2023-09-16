import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, take, throwError } from 'rxjs';
import { LicenseService } from 'src/app/dashboard/services/license.service';
import { ToolsService } from 'src/app/tools/services/tools.service';

@Injectable()
export class RyodanAccessServise {
  constructor(
    private lic: LicenseService,
    private router: Router,
    private tools: ToolsService
  ) {}

  validateAccess() {
    if (this.lic.license) {
      return;
    }

    this.lic
      .fetchLicense()
      .pipe(
        take(1),
        catchError((err) => {
          this.router.navigate(['/bind']);
          return throwError(err);
        })
      )
      .subscribe({
        next: () => {},
        error: (err) => this.tools.generateNotification(err.error.message),
      });
  }
}
