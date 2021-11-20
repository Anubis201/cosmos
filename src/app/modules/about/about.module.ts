import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AboutRoutingModule } from './about-routing.module'
import { TableModule } from 'primeng/table'
import { AboutComponent } from './about.component'

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    TableModule,
  ]
})
export class AboutdModule { }
