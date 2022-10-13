import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { RouterModule, Routes } from '@angular/router';
import { DropStatusBtnComponent } from './components/drop-status-btn/drop-status-btn.component';
import { ToolsModule } from '../tools/tools.module';
import { PurchaseFormComponent } from './components/purchase-form/purchase-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchaseFormTitleComponent } from './components/purchase-form-title/purchase-form-title.component';
import { StatusCheckComponent } from './components/status-check/status-check.component';
import { StatusSuccessComponent } from './components/status-success/status-success.component';
import { StatusFailedComponent } from './components/status-failed/status-failed.component';

const routes: Routes = [
  { path: '', component: PurchaseComponent }
]

@NgModule({
  declarations: [
    PurchaseComponent,
    DropStatusBtnComponent,
    PurchaseFormComponent,
    PurchaseFormTitleComponent,
    StatusCheckComponent,
    StatusSuccessComponent,
    StatusFailedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ToolsModule
  ]
})
export class PurchaseModule { }
