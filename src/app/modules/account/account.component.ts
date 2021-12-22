import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { FormBuilder, Validators } from '@angular/forms'
import firebase from 'firebase/compat'
import { MessageService } from 'primeng/api'
import { BehaviorSubject } from 'rxjs'
import { first } from 'rxjs/operators'
import { FileUpload } from 'src/app/models/classes/file-upload.class'
import { AuthService } from 'src/app/services/auth.service'
import { UploadService } from 'src/app/services/upload.service'
import User = firebase.User

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
  isLoading = new BehaviorSubject<boolean>(false)

  editImage = false
  showEditInput = false
  percentage: number | undefined = 0

  user: User | null
  selectedFiles: FileList
  currentFileUpload: FileUpload
  avatar: string

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
    const changedFile = new File([file], `${this.auth.user?.uid}`, { type: file.type })
    this.currentFileUpload = new FileUpload(changedFile)

    this.uploadService.uploadFile(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage as number)
        if (this.percentage === 100) {
          this.showEditInput = false
          this.toast.add({ severity: 'success', summary: $localize `Picture changed` })
          this.getAvatar()
        }
      },
    )
  }

  changeName() {
    this.fireAuth.user.pipe(first()).subscribe(user => {
      user?.updateProfile({ displayName: this.form.get('displayName')?.value }).then(() => {
        this.toast.add({ severity: 'success', summary: $localize `Name changed` })
      })
    })
  }

  changeEmail() {
    this.fireAuth.user.pipe(first()).subscribe(user => {
      user?.updateEmail(this.form.get('email')?.value)
        .then(() => {
          this.form.get('email')?.patchValue(null)
          this.toast.add({ severity: 'success', summary: $localize `Email changed` })
        })
        .catch(e => {
          this.toast.add({ severity: 'error', summary: e })
        })
    })
  }

  changePassword() {
    this.fireAuth.user.pipe(first()).subscribe(user => {
      user?.updatePassword(this.form.get('password')?.value)
        .then(() => {
          this.form.get('password')?.patchValue(null)
          this.toast.add({ severity: 'success', summary: $localize `Password changed` })
        })
        .catch(e => {
          this.toast.add({ severity: 'error', summary: e })
        })
    })
  }

  getAvatar() {
    this.isLoading.next(true)
    this.uploadService.getAvatar().subscribe({
      next: url => {
        this.avatar = url
        this.isLoading.next(false)
      },
      error: () => {
        this.avatar = '/assets/img/defualt.png'
        this.isLoading.next(false)
      }
    })
  }
}
