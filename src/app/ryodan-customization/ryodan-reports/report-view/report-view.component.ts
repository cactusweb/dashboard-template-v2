import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RyodanHttpService } from '../../common/services/ryodan-http.service';
import { Observable } from 'rxjs';
import { RyodanReport } from '../../common/interfaces/ryodan-customization.interfaces';

@Component({
  selector: 'ryodan-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanReportViewComponent implements OnInit {
  @Input()
  reportId!: string;

  report$!: Observable<RyodanReport>;

  reportDescriptionArr$!: Observable<string[]>;

  constructor(private http: RyodanHttpService) {}

  ngOnInit(): void {
    this.report$ = this.http.getReportById(this.reportId);
  }

  trackByIndex(index: number) {
    return index;
  }

  getDescriptionArr(description: string) {
    return JSON.parse(description) as string[];
  }
}
