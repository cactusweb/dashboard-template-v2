import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, take, tap, throwError } from 'rxjs';
import { ToolsService } from '../tools/services/tools.service';
import { License } from './interfaces/license';
import { LicenseService } from './services/license.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  license!: Observable<License>
  loading: boolean = false;


  constructor(
    private lic: LicenseService,
    private router: Router,
    private tools: ToolsService
  ) { }

  ngOnInit(): void {
    this.validateAccess();
  }

  getLicense(){
    this.license = this.lic.getLicense()
      .pipe(
        tap(d => this.loading = false)
      )
  }


  validateAccess(){
    this.loading = true;

    if ( this.lic._license )
      return this.getLicense();

    this.lic.fetchLicense()
      .pipe(
        take(1),
        catchError(err => {
          this.router.navigate(['/bind'])
          return throwError(err)
        })
      )    
      .subscribe({
        next: () => this.getLicense(),
        error: (err) => this.tools.generateNotification(err.error.message),
      })
  }



}
