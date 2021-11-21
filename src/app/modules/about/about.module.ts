import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AboutRoutingModule } from './about-routing.module'
import { TableModule } from 'primeng/table'
import { AboutComponent } from './about.component'
import { TabViewModule } from 'primeng/tabview'
import { CardModule } from 'primeng/card'

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    TableModule,
    TabViewModule,
  ]
})
export class AboutdModule { }
