import { Component } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { FormBuilder, Validators } from '@angular/forms'
import { MessageService } from 'primeng/api'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [MessageService]
})
export class AuthComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    displayName: [''],
    password: ['', Validators.required],
  })

  isSaving: boolean

  get isLoginPage() {
    let is = location.pathname === '/login'

    if (is) this.form.get('displayName')?.clearValidators()

    else this.form.get('displayName')?.addValidators(Validators.required)

    this.form.updateValueAndValidity()

    return is
  }

  constructor(
    private fireAuth: AngularFireAuth,
    private fb: FormBuilder,
    private toast: MessageService,
    private router: Router,
    private authService: AuthService,
  ) { }

  register() {
    this.isSaving = true
    this.fireAuth.createUserWithEmailAndPassword(
      this.form.get('email')?.value,
      this.form.get('password')?.value,
    )
      .then((res) => {
        this.toast.add({ severity: 'success', summary: 'Created user' })
        this.router.navigateByUrl('dashboard')
        this.isSaving = false
        return res.user?.updateProfile({
          displayName: this.form.get('displayName')!.value,
          photoURL: 'user',
        })
      })
      .catch((err) => {
        this.toast.add({ severity: 'error', summary: err.message })
        this.isSaving = false
      })
  }

  login() {
    this.isSaving = true
    this.fireAuth.signInWithEmailAndPassword(
      this.form.get('email')?.value,
      this.form.get('password')?.value,
    )
      .then(() => {
        this.toast.add({ severity: 'success', summary: 'Success' })
        this.router.navigateByUrl('dashboard')
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