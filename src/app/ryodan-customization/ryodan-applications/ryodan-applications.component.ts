import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RyodanDataService } from '../common/services/ryodan-data.service';
import { RyodanHttpService } from '../common/services/ryodan-http.service';
import {
  RyodanApplication,
  RyodanReport,
  RyodanShortReport,
} from '../common/interfaces/ryodan-customization.interfaces';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ryodan-applications',
  templateUrl: './ryodan-applications.component.html',
  styleUrls: ['./ryodan-applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanApplicationsComponent implements OnInit {
  readonly applications$ = this.dataService.applications$;
  readonly pending$ = this.dataService.applicationsPending$;

  viewingApplication: null | RyodanApplication = null;

  formOpened$ = new BehaviorSubject(false);

  constructor(
    private dataService: RyodanDataService,
    private httpService: RyodanHttpService
  ) {}

  ngOnInit(): void {
    this.getApplications();
  }

  getApplications() {
    this.httpService.getApplications();
  }

  onViewApplication(application: RyodanShortReport | RyodanApplication) {
    this.viewingApplication = application as RyodanApplication;
  }
}
