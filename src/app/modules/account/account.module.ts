import { NgModule } from '@angular/core'
import { AccountComponent } from './account.component'
import { AccountRoutingModule } from './account-routing.module'
import { EditElementDirective } from 'src/app/services/directives/edit-element/edit-element.directive'
import { EditableInputComponent } from './editable-input/editable-input.component'
import { SharedModule } from '../shared/shared.module'
import { EditableImageComponent } from './editable-image/editable-image.component'

@NgModule({
  declarations: [
    AccountComponent,
    EditElementDirective,
    EditableInputComponent,
    EditableImageComponent
  ],
  imports: [
    AccountRoutingModule,
    SharedModule,
  ]
})
export class AccountModule { }
