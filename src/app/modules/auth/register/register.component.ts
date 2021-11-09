import { Component } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { FormBuilder, Validators } from '@angular/forms'
import { MessageService } from 'primeng/api'
import {Router} from '@angular/router'

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
  ) { }

  register() {
    this.isSaving = true
    this.fireAuth.createUserWithEmailAndPassword(
      this.form.get('email')?.value,
      this.form.get('password')?.value,
    )
      .then((res) => {
        this.toast.add({ severity: 'success', summary: 'Created user' })
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

  goToLogin() {
   this.router.navigateByUrl('login')
  }
}
