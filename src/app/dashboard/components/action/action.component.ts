import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { finalize, map, Observable, take, tap } from 'rxjs';
import { Requests } from 'src/app/const';
import { HttpService } from 'src/app/tools/services/http.service';
import { LicenseService } from '../../services/license.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit, AfterViewInit {
  unbindable!: Observable<boolean>;

  loadingJoinDs: boolean = false;
  loadingUnbind: boolean = false;
  loading: boolean = false;

  showUnbindApprovement: boolean = false

  constructor(
    private lic: LicenseService,
    private http: HttpService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.unbindable = this.lic.getLicense()
      .pipe(
        take(1),
        map(d => d.unbindable),
        finalize(() => this.loading = false),
      )
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onUnbind(){
    this.loadingUnbind = true;

    this.lic.unbindLicense()
      .pipe(
        take(1),
        finalize(() => this.loadingUnbind = false)
      )
      .subscribe({
        next: () => {},
        error: () => {}
      })
  }

  onJoin(){
    this.loadingJoinDs = true;

    this.http.request( Requests['joinServer'] )
      .pipe(
        take(1),
        finalize(() => this.loadingJoinDs = false)
      )
      .subscribe({
        next: d => window.open(d.url, '_blank')?.focus(),
        error: () => {}
      })
  }

}
