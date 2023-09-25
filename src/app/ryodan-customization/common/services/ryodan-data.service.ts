import { Injectable } from '@angular/core';
import {
  RyodanApplication,
  RyodanApplicationTarget,
  RyodanShortReport,
  RyodanWallet,
} from '../interfaces/ryodan-customization.interfaces';
import { BehaviorSubject, distinctUntilChanged, share } from 'rxjs';
import { distinctUntilChangedJSON } from '../utils/pipelines.utils';

@Injectable()
export class RyodanDataService {
  private readonly _applicationsPending$ = new BehaviorSubject(false);
  private readonly _reportsPending$ = new BehaviorSubject(false);
  private readonly _walletsPending$ = new BehaviorSubject(false);

  private readonly _applications$ = new BehaviorSubject<
    RyodanApplication[] | null
  >(null);

  private readonly _applicationTargets$ = new BehaviorSubject<
    RyodanApplicationTarget[] | null
  >(null);

  private readonly _reports$ = new BehaviorSubject<RyodanShortReport[] | null>(
    null
  );

  private readonly _wallets$ = new BehaviorSubject<RyodanWallet[] | null>(null);

  get reports$() {
    return this._reports$
      .asObservable()
      .pipe(share(), distinctUntilChangedJSON());
  }

  set reports(data: RyodanShortReport[]) {
    this._reports$.next(data);
  }

  get applications$() {
    return this._applications$
      .asObservable()
      .pipe(share(), distinctUntilChangedJSON());
  }

  set applications(data: RyodanApplication[]) {
    this._applications$.next(data);
  }

  get applicationsPending$() {
    return this._applicationsPending$
      .asObservable()
      .pipe(share(), distinctUntilChanged());
  }

  set applicationsPending(data: boolean) {
    this._applicationsPending$.next(data);
  }

  get reportsPending$() {
    return this._reportsPending$
      .asObservable()
      .pipe(share(), distinctUntilChanged());
  }

  set reportsPending(data: boolean) {
    this._reportsPending$.next(data);
  }

  get applicationTargets$() {
    return this._applicationTargets$
      .asObservable()
      .pipe(share(), distinctUntilChangedJSON());
  }

  set applicationTargets(data: RyodanApplicationTarget[]) {
    this._applicationTargets$.next(data);
  }

  get wallets$() {
    return this._wallets$
      .asObservable()
      .pipe(share(), distinctUntilChangedJSON());
  }

  set wallets(data: RyodanWallet[]) {
    this._wallets$.next(data);
  }

  get walletsPending$() {
    return this._walletsPending$
      .asObservable()
      .pipe(share(), distinctUntilChanged());
  }

  set walletsPending(data: boolean) {
    this._walletsPending$.next(data);
  }
}
