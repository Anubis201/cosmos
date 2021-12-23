import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { MessageService } from 'primeng/api'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { UsersService } from 'src/app/services/collections/users.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  isSaving: boolean

  get pathName() {
    return location.pathname
  }

  constructor(
    private fireAuth: AngularFireAuth,
    private toast: MessageService,
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  register({ email, displayName, password }: { email: string, displayName: string, password: string }) {
    this.isSaving = true
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.toast.add({ severity: 'success', summary: $localize `Created user` })
        this.router.navigateByUrl('dashboard')
        this.isSaving = false
        this.usersService.setUserData({ map: [], spice: null, shipCord: null}, res.user?.uid)
        res.user?.updateProfile({ displayName })
      })
      .catch((err) => {
        this.toast.add({ severity: 'error', summary: err.message })
        this.isSaving = false
      })
  }

  login({ email, password }: { email: string, password: string }) {
    this.isSaving = true
    this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.toast.add({ severity: 'success', summary: $localize `Success` })
        this.router.navigateByUrl('dashboard')
        this.isSaving = false
      })
      .catch((err) => {
        this.toast.add({ severity: 'error', summary: err.message })
        this.isSaving = false
      })
  }

  resetPassword(email: string) {
    this.isSaving = true
    this.fireAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.toast.add({ severity: 'success', summary: $localize `Success, check email!` })
        this.isSaving = false
      })
      .catch((err) => {
        this.toast.add({ severity: 'error', summary: err.message })
        this.isSaving = false
      })
  }

  toRegister() {
    this.authService.goToRegister()
  }

  toLogin() {
    this.authService.goToLogin()
  }
}
