import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ToolsModule } from './tools/tools.module';
import { HttpService } from './tools/services/http.service';
import { Interceptor } from './tools/services/interceptor';
import { AppRoutingModule } from './app-routing.module';
import { MainModule } from './main/main.module';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToolsModule,
    MainModule,
    LoginModule
  ],
  providers: [
    HttpService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
