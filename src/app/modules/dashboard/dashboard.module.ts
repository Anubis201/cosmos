import { NgModule } from '@angular/core'
import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { SharedModule } from '../shared/shared.module';
import { HelloComponent } from './hello/hello.component'

@NgModule({
  declarations: [
    DashboardComponent,
    HelloComponent,
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
