import { NgModule } from '@angular/core'
import { AccountComponent } from './account.component'
import { AccountRoutingModule } from './account-routing.module'
import { EditElementDirective } from 'src/app/services/directives/edit-element/edit-element.directive'
import { EditableItemComponent } from './components/editable-item/editable-item.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    AccountComponent,
    EditElementDirective,
    EditableItemComponent
  ],
  imports: [
    AccountRoutingModule,
    SharedModule,
  ]
})
export class AccountModule { }
