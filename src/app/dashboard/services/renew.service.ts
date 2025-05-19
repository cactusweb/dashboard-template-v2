import { Injectable } from '@angular/core';
import { finalize, map, Observable, of, take, tap, throwError } from 'rxjs';
import { Requests } from 'src/app/const';
import { NotificationsService } from 'src/app/notifications/services/notifications.service';
import { Order } from 'src/app/purchase/interfaces/order';
import { HttpService } from 'src/app/tools/services/http.service';
import { ToolsService } from 'src/app/tools/services/tools.service';

@Injectable()
export class RenewService {
  private order: Order | undefined;

  constructor(private http: HttpService, private tools: ToolsService) {}

  public getOrder(duraction?: number | null): Observable<Order> {
    if (this.order && this.order.duration == (duraction || 1))
      return of(this.order);

    return this.http
      .request(
        Requests['getRenewOrder'],
        null,
        undefined,
        `?duration=${duraction || 1}`
      )
      .pipe(tap((d) => (this.order = d)));
  }

  putOrder(data: Record<any, any>): Observable<any> {
    if (!this.order) {
      this.tools.generateNotification('Order is undefined', 'err');
      return throwError({ message: 'Order is undefined' });
    }

    return this.http.request(Requests['postOrderEmail'], data, this.order.id);
  }

  resetOrder() {
    this.order = undefined;
  }
}
