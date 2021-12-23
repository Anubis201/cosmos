import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['.././auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  @Input() isSaving: boolean

  @Output() createAccount = new EventEmitter<{ email: string, displayName: string, password: string }>()
  @Output() toLogin = new EventEmitter<void>()

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    displayName: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder) { }

  handleCreateAccount() {
    this.createAccount.emit(this.form.value)
  }
}
