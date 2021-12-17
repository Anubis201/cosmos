import { Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./../auth.component.css']
})
export class PasswordInputComponent {
  @Input() control: FormControl | any

  showPassword = false
}
