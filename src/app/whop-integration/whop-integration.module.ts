import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { WhopIntegrationComponent } from './whop-integration.component';
import { ToolsModule } from '../tools/tools.module';
import { CommonModule } from '@angular/common';

const route: Route = {
  path: '',
  component: WhopIntegrationComponent,
};

@NgModule({
  declarations: [WhopIntegrationComponent],
  imports: [CommonModule, RouterModule.forChild([route]), ToolsModule],
})
export class WhopIntegrationModule {}
