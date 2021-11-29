import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { AuthComponent } from './modules/auth/auth.component'
import { AppRoutingModule } from './app-routing.module'
import { environment } from '../environments/environment'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MenubarModule } from 'primeng/menubar'
import { MenuBarComponent } from './modules/others/menu-bar/menu-bar.component'
import { LeftAsideComponent } from './modules/left-aside/left-aside.component'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { SharedModule } from './modules/shared/shared.module'

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    AuthComponent,
    LeftAsideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MenubarModule,
    AngularFireStorageModule,
    AngularFireModule,
    SharedModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
