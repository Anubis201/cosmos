import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { TooltipModule } from 'primeng/tooltip'

import { AppComponent } from './app.component'
import { AuthComponent } from './modules/auth/auth.component'
import { AppRoutingModule } from './app-routing.module'
import { environment } from '../environments/environment'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { ReactiveFormsModule } from '@angular/forms'
import { ToastModule } from 'primeng/toast'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TableModule } from 'primeng/table'
import { MenubarModule } from 'primeng/menubar'
import { MenuBarComponent } from './modules/others/menu-bar/menu-bar.component'
import { LeftAsideComponent } from './modules/left-aside/left-aside.component'

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    AuthComponent,
    LeftAsideComponent,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    InputTextModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserAnimationsModule,
    TooltipModule,
    TableModule,
    MenubarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
