import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RyodanWallet } from '../../common/interfaces/ryodan-customization.interfaces';
import { RyodanHttpService } from '../../common/services/ryodan-http.service';
import { BehaviorSubject, finalize } from 'rxjs';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ryodan-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanWalletsListComponent {
  @Input()
  wallets!: RyodanWallet[] | null;

  pending$ = new BehaviorSubject(false);

  constructor(
    private http: RyodanHttpService,
    public tools: ToolsService,
    private spinner: NgxSpinnerService
  ) {}

  getPhrase(wallet: RyodanWallet) {
    const words = wallet.phrase.split(' ');
    return window.innerWidth > 780
      ? `${words.shift() || ''} ${words.shift() || ''} ... ${words.pop() || ''}`
      : `... ${words.pop()}`;
  }

  deleteWallet(walletId: string) {
    this.pending$.next(true);
    this.spinner.show();

    this.http
      .deleteWallet(walletId)
      .pipe(
        finalize(() => {
          this.pending$.next(false);
          this.spinner.hide();
        })
      )
      .subscribe({
        error: () => {},
      });
  }

  trackById(index: number, wallet: RyodanWallet) {
    return wallet.id;
  }
}
