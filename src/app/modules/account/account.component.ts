import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { FormBuilder, Validators } from '@angular/forms'
import firebase from 'firebase/compat'
import { MessageService } from 'primeng/api'
import { AuthService } from 'src/app/services/auth.service'
import User = firebase.User

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [MessageService]
})
export class AccountComponent implements OnInit {
  user: User | null

  form = this.fb.group({
    email: ['', [Validators.email]],
    displayName: '',
    password: '',
  })

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private fireAuth: AngularFireAuth,
    private toast: MessageService,
  ) {}

  ngOnInit() {
    this.user = this.auth.user
  }

  changeName() {
    this.fireAuth.user.subscribe(user => {
      user?.updateProfile({ displayName: this.form.get('displayName')?.value }).then(() => {
        this.form.get('displayName')?.patchValue('')
        this.toast.add({ severity: 'success', summary: 'Name changed' })
      })
    })
  }

  changeEmail() {
    this.fireAuth.user.subscribe(user => {
      user?.updateEmail(this.form.get('email')?.value)
        .then(() => {
          this.form.get('email')?.patchValue('')
          this.toast.add({ severity: 'success', summary: 'Email changed' })
        })
        .catch(e => {
          this.toast.add({ severity: 'error', summary: e })
        })
    })
  }

  changePassword() {
    this.fireAuth.user.subscribe(user => {
      user?.updatePassword(this.form.get('password')?.value)
        .then(() => {
          this.form.get('password')?.patchValue('')
          this.toast.add({ severity: 'success', summary: 'Password changed' })
        })
        .catch(e => {
          this.toast.add({ severity: 'error', summary: e })
        })
    })
  }
}
