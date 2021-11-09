import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AccountComponent } from './account.component'
import { AccountRoutingModule } from './account-routing.module'
import { InplaceModule } from 'primeng/inplace'
import { InputTextModule } from 'primeng/inputtext'

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    InplaceModule,
    InputTextModule,
  ]
})
export class AccountModule { }
