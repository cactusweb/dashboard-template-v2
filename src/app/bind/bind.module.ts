import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BindComponent } from './bind.component';
import { UserComponent } from './components/user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { ToolsModule } from '../tools/tools.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

const routes: Routes = [
  { path: '', component: BindComponent }
]

@NgModule({
  declarations: [
    BindComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ToolsModule,
    NgxMaskModule.forRoot()
  ],
})
export class BindModule { }
