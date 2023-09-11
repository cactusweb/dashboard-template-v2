import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RyodanReport } from '../../common/interfaces/ryodan-customization.interfaces';
import { RyodanHttpService } from '../../common/services/ryodan-http.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'ryodan-report-view',
  templateUrl: './report-view.component.ts',
  styleUrls: ['./report-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanReportViewComponent implements OnInit {
  @Input()
  reportId!: string;

  report$!: Observable<RyodanReport>;

  reportDescriptionArr$ = this.report$.pipe(
    map((d) => JSON.parse(d.description))
  );

  constructor(private http: RyodanHttpService) {}

  ngOnInit(): void {
    this.getReport();
  }

  private getReport() {
    this.http.getReportById(this.reportId);
  }

  trackByIndex(index: number) {
    return index;
  }
}
