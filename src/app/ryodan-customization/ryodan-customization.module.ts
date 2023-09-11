import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RyodanWrapperComponent } from './common/components/ryodan-wrapper/ryodan-wrapper.component';
import { RyodanReportsComponent } from './ryodan-reports/ryodan-reports.component';
import { RyodanDataService } from './common/services/ryodan-data.service';
import { RyodanHttpService } from './common/services/ryodan-http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RyodanCustomizationInterceptor } from './common/interceptors/ryodan-customization.intercepter';
import { HttpService } from '../tools/services/http.service';
import { RyodanApplicationsComponent } from './ryodan-applications/ryodan-applications.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Interceptor } from '../tools/services/interceptor';
import { RyodanPopupComponent } from './common/components/ryodan-popup/ryodan-popup.component';
import { RyodanApplicationViewComponent } from './ryodan-applications/components/application-view/application-view.component';
import { ToolsModule } from '../tools/tools.module';
import { RyodanApplicationFormComponent } from './ryodan-applications/components/application-form/application-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RyodanReportFormComponent } from './ryodan-reports/report-form/report-form.component';
import { RyodanFilesControlComponent } from './common/components/ryodan-files-control/ryodan-files-control.component';

const routes: Routes = [
  {
    path: 'reports',
    component: RyodanReportsComponent,
    data: {
      title: '- Applications',
    },
  },
  {
    path: 'applications',
    component: RyodanApplicationsComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'reports',
  },
  {
    path: '**',
    redirectTo: 'reports',
  },
];

@NgModule({
  declarations: [
    RyodanWrapperComponent,
    RyodanReportsComponent,
    RyodanApplicationsComponent,
    RyodanPopupComponent,
    RyodanApplicationViewComponent,
    RyodanApplicationFormComponent,
    RyodanReportFormComponent,
    RyodanFilesControlComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgxSpinnerModule,
    ToolsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    RyodanDataService,
    RyodanHttpService,
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RyodanCustomizationInterceptor,
      multi: true,
    },
  ],
})
export class RyodanCustomizationModule {}
