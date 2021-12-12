import { NgModule } from '@angular/core'
import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { SharedModule } from '../shared/shared.module';
import { MessageComponent } from './hello/message.component'

@NgModule({
  declarations: [
    DashboardComponent,
    MessageComponent,
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
