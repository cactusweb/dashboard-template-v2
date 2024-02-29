import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/tools/services/http.service';
import { StripePaymentRequests } from '../consts/stripe-payment.consts';
import { Observable, Subject, finalize, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripePaymentService {
  constructor(private http: HttpService) {}

  createCustomer() {
    return (
      this.http.request(
        StripePaymentRequests['getCustomerCreatingLink']
      ) as Observable<{ url: string }>
    ).pipe(
      map((d) => d.url),
      tap((d) => (window.location.href = d))
    );
  }

  goToPortal() {
    const completed$ = new Subject<void>();

    const complete = () => {
      completed$.next();
      completed$.complete();
    };

    (
      this.http.request(StripePaymentRequests['getPortalLink']) as Observable<{
        url: string;
      }>
    )
      .pipe(
        map((d) => d.url),
        finalize(() => complete())
      )
      .subscribe({
        next: (link) => (window.location.href = link),
      });
    return completed$.asObservable();
  }
}
