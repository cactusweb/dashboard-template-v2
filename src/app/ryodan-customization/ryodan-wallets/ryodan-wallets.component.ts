import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RyodanDataService } from '../common/services/ryodan-data.service';
import { RyodanHttpService } from '../common/services/ryodan-http.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ryodan-wallets',
  templateUrl: './ryodan-wallets.component.html',
  styleUrls: ['./ryodan-wallets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanWalletsComponent implements OnInit {
  readonly wallets$ = this.dataService.wallets$;
  readonly pending$ = this.dataService.walletsPending$;

  readonly formOpened$ = new BehaviorSubject(false);

  constructor(
    private dataService: RyodanDataService,
    private http: RyodanHttpService
  ) {}

  ngOnInit(): void {
    this.getWallets();
  }

  getWallets() {
    this.http.getWallets();
  }
}
