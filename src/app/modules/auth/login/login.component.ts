import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['.././auth.component.css']
})
export class LoginComponent {
  @Input() isSaving: boolean

  @Output() loginToAccount = new EventEmitter<{ email: string, password: string }>()
  @Output() toRegister = new EventEmitter<void>()

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder) { }

  handleLogin() {
    this.loginToAccount.emit(this.form.value)
  }
}
