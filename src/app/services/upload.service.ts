import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { FileUpload } from '../models/classes/file-upload.class'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private authService: AuthService,
  ) { }

  uploadFile(fileUpload: FileUpload): Observable<number | undefined> {
    const path = '/avatars/' + fileUpload.file.name
    const ref = this.storage.ref(path)
    const uploadTask = this.storage.upload(path, fileUpload.file)

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          this.savePicture(url)
        })
      })
    ).subscribe()

    return uploadTask.percentageChanges()
  }

  getAvatar() {
    const ref = this.storage.ref('/avatars').child(this.authService.user?.uid as string)
    return ref.getDownloadURL()
  }

  private savePicture(url: string) {
    this.auth.user.subscribe(user => user?.updateProfile({ photoURL: url }))
  }
}
