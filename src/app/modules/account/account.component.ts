import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { FormBuilder, Validators } from '@angular/forms'
import firebase from 'firebase/compat'
import { MessageService } from 'primeng/api'
import { FileUpload } from 'src/app/models/classes/file-upload.class'
import { AuthService } from 'src/app/services/auth.service'
import { UploadService } from 'src/app/services/upload.service'
import User = firebase.User

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [MessageService]
})
export class AccountComponent implements OnInit {
  editImage = false
  showEditInput = false
  user: User | null
  selectedFiles: FileList
  currentFileUpload: FileUpload
  percentage: number | undefined = 0
  avatar: string
  isLoading: boolean

  form = this.fb.group({
    email: [null, [Validators.email]],
    displayName: null,
    password: null,
  })

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private fireAuth: AngularFireAuth,
    private toast: MessageService,
    private uploadService: UploadService,
  ) {}

  ngOnInit() {
    this.user = this.auth.user
    this.getAvatar()
  }

  upload(event: any) {
    const file = event.files[0] as File
    const changedFile = new File([file], `${this.auth.user?.email}`, { type: file.type })
    this.currentFileUpload = new FileUpload(changedFile)

    this.uploadService.uploadFile(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage as number)
        if (this.percentage === 100) {
          this.showEditInput = false
          this.toast.add({ severity: 'success', summary: 'Picture changed' })
          this.getAvatar()
        }
      },
      error => {
        this.showEditInput = false
        this.toast.add({ severity: 'error', summary: 'Failed to change picture' })
      }
    )
  }

  changeName() {
    this.fireAuth.user.subscribe(user => {
      user?.updateProfile({ displayName: this.form.get('displayName')?.value }).then(() => {
        this.form.get('displayName')?.patchValue(null)
        this.toast.add({ severity: 'success', summary: 'Name changed' })
      })
    })
  }

  changeEmail() {
    this.fireAuth.user.subscribe(user => {
      user?.updateEmail(this.form.get('email')?.value)
        .then(() => {
          this.form.get('email')?.patchValue(null)
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
          this.form.get('password')?.patchValue(null)
          this.toast.add({ severity: 'success', summary: 'Password changed' })
        })
        .catch(e => {
          this.toast.add({ severity: 'error', summary: e })
        })
    })
  }

  getAvatar() {
    this.isLoading = true
    this.uploadService.getAvatar().subscribe(url => {
      this.isLoading = false
      this.avatar = url
    })
  }
}
