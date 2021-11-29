import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ToastModule } from 'primeng/toast'
import { TooltipModule } from 'primeng/tooltip'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ProgressBarModule } from 'primeng/progressbar'
import { HttpClientModule } from '@angular/common/http'
import { FieldsetModule } from 'primeng/fieldset'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FileUploadModule } from 'primeng/fileupload'
import { ImageModule } from 'primeng/image'
import { TabViewModule } from 'primeng/tabview'

const imports = [
  CommonModule,
  ToastModule,
  TooltipModule,
  TableModule,
  ButtonModule,
  InputTextModule,
  ProgressSpinnerModule,
  ProgressBarModule,
  HttpClientModule,
  FieldsetModule,
  ImageModule,
  FormsModule,
  FileUploadModule,
  TabViewModule,
  ReactiveFormsModule,
]

@NgModule({
  declarations: [

  ],
  imports,
  exports: [
    ...imports,
  ]
})

export class SharedModule { }
