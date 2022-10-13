import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BindCardComponent } from './bind-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolsModule } from '../tools/tools.module';



@NgModule({
  declarations: [
    BindCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToolsModule
  ],
  exports: [BindCardComponent]
})
export class BindCardModule { }
