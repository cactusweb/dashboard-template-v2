import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLoaderComponent } from './components/btn-loader/btn-loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgvarDirective } from './directives/ngvar.directive';
import { CheckboxAgreementComponent } from './components/checkbox-agreement/checkbox-agreement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectControlComponent } from './components/select-control/select-control.component';



@NgModule({
  declarations: [
    BtnLoaderComponent,
    NgvarDirective,
    CheckboxAgreementComponent,
    SelectControlComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BtnLoaderComponent,
    NgvarDirective,
    CheckboxAgreementComponent,
    SelectControlComponent
  ]
})
export class ToolsModule { }
