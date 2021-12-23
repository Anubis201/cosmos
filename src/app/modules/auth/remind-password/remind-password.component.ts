import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: ['.././auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemindPasswordComponent {
  @Input() isSaving: boolean

  @Output() toLogin = new EventEmitter<void>()
  @Output() remindPassword = new EventEmitter<string>()

  constructor(private fb: FormBuilder) { }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  })

  handleRemindPassword() {
    this.remindPassword.emit(this.form.get('email')?.value)
  }
}
