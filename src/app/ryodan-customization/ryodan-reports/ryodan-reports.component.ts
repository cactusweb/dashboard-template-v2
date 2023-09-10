import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RyodanDataService } from '../common/services/ryodan-data.service';
import { RyodanHttpService } from '../common/services/ryodan-http.service';
import {
  RyodanApplication,
  RyodanShortReport,
} from '../common/interfaces/ryodan-customization.interfaces';

@Component({
  selector: 'ryodan-reports',
  templateUrl: './ryodan-reports.component.html',
  styleUrls: ['./ryodan-reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanReportsComponent implements OnInit {
  readonly reports$ = this.dataService.reports$;
  readonly pending$ = this.dataService.reportsPending$;

  viewingReportId: null | string = null;

  constructor(
    private dataService: RyodanDataService,
    private http: RyodanHttpService
  ) {}

  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    this.http.getReports();
  }

  onViewReport(report: RyodanShortReport | RyodanApplication) {
    this.viewingReportId = report.id;
  }
}
