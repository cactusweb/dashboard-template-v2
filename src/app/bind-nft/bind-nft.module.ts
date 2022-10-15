import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BindNftComponent } from './bind-nft.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { StatusErrComponent } from './components/status-err/status-err.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { NftService } from './services/nft.service';
import { NftInterceptor } from './services/nft.interceptor';
import { HttpService } from '../tools/services/http.service';

const routes: Routes = [
  { path: '', component: BindNftComponent }
]

@NgModule({
  declarations: [
    BindNftComponent,
    FormComponent,
    StatusErrComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  providers: [
    NftService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NftInterceptor,
      multi: true
    }
  ],
})
export class BindNftModule { }
