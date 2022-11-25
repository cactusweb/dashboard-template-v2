import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ReferralComponent } from './components/referral/referral.component';
import { ActionComponent } from './components/action/action.component';
import { UserComponent } from './components/user/user.component';
import { KeyInfoComponent } from './components/key-info/key-info.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LicenseInfoComponent } from './components/license-info/license-info.component';
import { ReferralGiftsComponent } from './components/referral-gifts/referral-gifts.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { ToolsModule } from '../tools/tools.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BindCardModule } from '../bind-card/bind-card.module';
import { UnbindApproveComponent } from './components/unbind-approve/unbind-approve.component';
import { CryptoRenewComponent } from './components/crypto-renew/crypto-renew.component';
import { CryptoPaymentModule } from '../crypto-payment/crypto-payment.module';

const routes: Routes = [
  { path: '', component: DashboardComponent }
]

@NgModule({
  declarations: [
    DashboardComponent,
    ReferralComponent,
    ActionComponent,
    UserComponent,
    KeyInfoComponent,
    PaymentComponent,
    LicenseInfoComponent,
    ReferralGiftsComponent,
    UnbindApproveComponent,
    CryptoRenewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToolsModule,
    BindCardModule,
    CryptoPaymentModule
  ],
  providers: [DatePipe, CurrencyPipe]
})
export class DashboardModule { }
