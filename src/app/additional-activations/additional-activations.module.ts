import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AdditionalActivationsPopupComponent } from './additional-activations-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolsModule } from '../tools/tools.module';



@NgModule({
  declarations: [
    AdditionalActivationsPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToolsModule
  ],
  exports: [
    AdditionalActivationsPopupComponent
  ],
  providers: [CurrencyPipe]
})
export class AdditionalActivationsModule { }
