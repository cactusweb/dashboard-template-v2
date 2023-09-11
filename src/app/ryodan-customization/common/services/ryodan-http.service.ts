import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/tools/services/http.service';
import { RyodanDataService } from './ryodan-data.service';
import {
  BehaviorSubject,
  Observable,
  finalize,
  map,
  of,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import {
  RyodanApplication,
  RyodanApplicationStates,
  RyodanApplicationTarget,
  RyodanReport,
  RyodanShortReport,
} from '../interfaces/ryodan-customization.interfaces';
import { RyodanRequests } from '../constants/req.constants';
import { Req } from 'src/app/tools/interfaces/req-map';
import { ToolsService } from 'src/app/tools/services/tools.service';

@Injectable()
export class RyodanHttpService {
  constructor(
    private http: HttpService,
    private dataService: RyodanDataService,
    private tools: ToolsService
  ) {}

  getApplications() {
    this.request<RyodanApplication[]>(
      'application',
      RyodanRequests['getApplications']
    ).subscribe({
      next: (res) => (this.dataService.applications = res),
      error: () => {},
    });
  }

  getReports() {
    this.request<RyodanShortReport[]>(
      'report',
      RyodanRequests['getReports']
    ).subscribe({
      next: (res) => (this.dataService.reports = res),
      error: () => {},
    });
  }

  postApplication(data: Record<string, any>) {
    return this.request<RyodanApplication>(
      'application',
      RyodanRequests['postApplication'],
      data
    ).pipe(
      withLatestFrom(this.dataService.applications$),
      tap(
        ([newApp, oldApps]) =>
          (this.dataService.applications = [newApp, ...oldApps!])
      ),
      switchMap(([newApp]) => of(newApp)),
      tap(() =>
        this.tools.generateNotification('Application created', 'success')
      ),
      take(1)
    );
  }

  postReport(data: Record<string, any>) {
    return this.request<RyodanShortReport>(
      'report',
      RyodanRequests['postReport'],
      data
    ).pipe(
      withLatestFrom(this.dataService.reports$),
      tap(
        ([newRep, oldReps]) =>
          (this.dataService.reports = [newRep, ...oldReps!])
      ),
      switchMap(([newRep]) => of(newRep)),
      tap(() =>
        this.tools.generateNotification('Application created', 'success')
      ),
      take(1)
    );
  }

  putReport(data: Record<string, any>, reportId: string) {
    return this.request<RyodanShortReport>(
      'report',
      RyodanRequests['putReport'],
      data,
      reportId
    ).pipe(
      withLatestFrom(this.dataService.reports$),
      tap(
        ([editRep, oldReps]) =>
          (this.dataService.reports = oldReps!.map((rep) =>
            rep.id === editRep.id ? editRep : rep
          ))
      ),
      switchMap(([editRep]) => of(editRep)),
      take(1)
    );
  }

  getReportById(id: string) {
    return this.request<RyodanReport>(
      'report',
      RyodanRequests['getReportById'],
      undefined,
      id
    );
  }

  getApplicationTargets() {
    return this.request<RyodanApplicationTarget[]>(
      undefined,
      RyodanRequests['getApplicationTargets']
    ).subscribe({
      next: (d) => (this.dataService.applicationTargets = d),
      error: () => {},
    });
  }

  private request<T>(
    type: 'report' | 'application' | undefined,
    reqParams: Req,
    body: any = '',
    urlParam: string = '',
    urlQuery: string = ''
  ) {
    if (type)
      type === 'report'
        ? (this.dataService.reportsPending = true)
        : (this.dataService.applicationsPending = true);

    return this.http.request(reqParams, body, urlParam, urlQuery).pipe(
      finalize(() => {
        if (type)
          type === 'report'
            ? (this.dataService.reportsPending = false)
            : (this.dataService.applicationsPending = false);
      })
    ) as Observable<T>;
  }
}
