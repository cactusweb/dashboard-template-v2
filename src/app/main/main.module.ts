import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { RouterLoaderComponent } from './components/router-loader/router-loader.component';



@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    RouterLoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavComponent,
    FooterComponent
  ]
})
export class MainModule { }
