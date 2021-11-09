import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { MessageService } from 'primeng/api'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  isSaving: boolean

  constructor(
    private fireAuth: AngularFireAuth,
    private fb: FormBuilder,
    private toast: MessageService,
    private router: Router,
  ) { }

  login() {
    this.isSaving = true
    this.fireAuth.signInWithEmailAndPassword(
      this.form.get('email')?.value,
      this.form.get('password')?.value,
    )
      .then(() => {
        this.toast.add({ severity: 'success', summary: 'Success' })
      })
      .catch((err) => {
        this.toast.add({ severity: 'error', summary: err.message })
      })
      .finally(() => {
        this.isSaving = false
      })
  }

  goToRegister() {
    this.router.navigateByUrl('register')
  }
}
