import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AccountComponent } from './account.component'
import { AccountRoutingModule } from './account-routing.module'
import { InplaceModule } from 'primeng/inplace'
import { InputTextModule } from 'primeng/inputtext'
import { FieldsetModule } from 'primeng/fieldset'
import { ImageModule } from 'primeng/image'
import { EditElementDirective } from 'src/app/services/directives/edit-element/edit-element.directive'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ToastModule } from 'primeng/toast';
import { EditableItemComponent } from './components/editable-item/editable-item.component'
import { FileUploadModule } from 'primeng/fileupload'
import { HttpClientModule } from '@angular/common/http'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ProgressBarModule } from 'primeng/progressbar'

@NgModule({
  declarations: [
    AccountComponent,
    EditElementDirective,
    EditableItemComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    InplaceModule,
    InputTextModule,
    FieldsetModule,
    ImageModule,
    ToastModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProgressSpinnerModule,
    ProgressBarModule,
  ]
})
export class AccountModule { }
