import { Component } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { FormBuilder, Validators } from '@angular/forms'
import { MessageService } from 'primeng/api'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    displayName: ['', Validators.required],
    password: ['', Validators.required],
  })
  isSaving: boolean

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
        return res.user?.updateProfile({
          displayName: this.form.get('displayName')!.value,
          photoURL: 'user',
        })
      })
      .catch((err) => {
        this.toast.add({ severity: 'error', summary: err.message })
      })
      .finally(() => {
        this.isSaving = false
      })
  }

  toLogin() {
    this.authService.goToLogin()
  }
}
