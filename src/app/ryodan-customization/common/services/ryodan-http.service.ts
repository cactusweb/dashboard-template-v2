import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/tools/services/http.service';
import { RyodanDataService } from './ryodan-data.service';
import {
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
  RyodanApplicationTarget,
  RyodanReport,
  RyodanShortReport,
  RyodanWallet,
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

  getWallets() {
    this.request<RyodanWallet[]>(
      'wallet',
      RyodanRequests['getWallets']
    ).subscribe({
      next: (d) => (this.dataService.wallets = d),
      error: () => {},
    });
  }

  deleteWallet(walletId: string) {
    return this.request<void>(
      'wallet',
      RyodanRequests['deleteWallet'],
      undefined,
      walletId
    ).pipe(
      withLatestFrom(this.dataService.wallets$),
      tap(
        ([, wallets]) =>
          (this.dataService.wallets = wallets!.filter((w) => w.id !== walletId))
      ),
      map(() => {}),
      take(1)
    );
  }

  receiveWallets(data: Record<string, any>) {
    return this.request<RyodanWallet[]>(
      'wallet',
      RyodanRequests['receiveWallets'],
      data
    ).pipe(
      map((wallets) => wallets.map((w) => ({ ...w, isNew: true }))),
      withLatestFrom(this.dataService.wallets$),
      tap(
        ([newWallets, oldWallets]) =>
          (this.dataService.wallets = [...newWallets, ...oldWallets!])
      ),
      map(([newWallets]) => newWallets),
      take(1)
    );
  }

  postFile(data: FormData) {
    return this.request<{ url: string }>(
      undefined,
      RyodanRequests['postFile'],
      data
    ).pipe(map((d) => d.url));
  }

  deleteFile(url: string) {
    return this.request<void>(undefined, RyodanRequests['deleteFile'], { url });
  }

  private request<T>(
    type: 'report' | 'application' | 'wallet' | undefined,
    reqParams: Req,
    body: any = '',
    urlParam: string = '',
    urlQuery: string = ''
  ) {
    this.changePendingState(type, true);

    return this.http
      .request(reqParams, body, urlParam, urlQuery)
      .pipe(
        finalize(() => this.changePendingState(type, false))
      ) as Observable<T>;
  }

  private changePendingState(
    type: 'report' | 'application' | 'wallet' | undefined,
    state: boolean
  ) {
    if (!type) return;

    switch (type) {
      case 'report':
        this.dataService.reportsPending = state;
        break;
      case 'application':
        this.dataService.applicationsPending = state;
        break;
      case 'wallet':
        this.dataService.walletsPending = state;
        break;
    }
  }
}
