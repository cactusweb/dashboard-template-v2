import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RyodanDataService } from '../common/services/ryodan-data.service';
import { RyodanHttpService } from '../common/services/ryodan-http.service';
import {
  RyodanApplication,
  RyodanReportStates,
  RyodanShortReport,
} from '../common/interfaces/ryodan-customization.interfaces';
import { BehaviorSubject } from 'rxjs';
import { RyodanAccessServise } from '../common/services/ryodan-access.service';

@Component({
  selector: 'ryodan-reports',
  templateUrl: './ryodan-reports.component.html',
  styleUrls: ['./ryodan-reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanReportsComponent implements OnInit {
  readonly reports$ = this.dataService.reports$;
  readonly pending$ = this.dataService.reportsPending$;

  viewingReport: null | RyodanShortReport = null;

  editedReport: RyodanShortReport | null = null;
  readonly formOpened$ = new BehaviorSubject(false);

  constructor(
    private dataService: RyodanDataService,
    private http: RyodanHttpService,
    private accessService: RyodanAccessServise
  ) {}

  ngOnInit(): void {
    this.accessService.validateAccess();
    this.getReports();
  }

  getReports() {
    this.http.getReports();
  }

  onViewReport(report: RyodanShortReport | RyodanApplication) {
    this.viewingReport = report as RyodanShortReport;
  }

  onEditReport(report: RyodanShortReport | RyodanApplication) {
    this.editedReport = report as RyodanShortReport;
    this.formOpened$.next(true);
  }

  onCloseReportForm() {
    this.formOpened$.next(false);
    this.editedReport = null;
  }
}
