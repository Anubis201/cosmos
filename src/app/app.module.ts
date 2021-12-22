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
import { MenuBarComponent } from './modules/others/menu-bar/menu-bar.component'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { SharedModule } from './modules/shared/shared.module'
import { mapSizeToken } from './services/tokens/map-size.token'
import { ServiceWorkerModule } from '@angular/service-worker'
import { PasswordInputComponent } from './modules/auth/password-input/password-input.component'
import { BottomViewComponent } from './modules/others/bottom-view/bottom-view.component'

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    AuthComponent,
    PasswordInputComponent,
    BottomViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    ...mapSizeToken
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
