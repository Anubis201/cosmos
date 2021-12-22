import { Injectable } from '@angular/core'
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { BehaviorSubject, Observable } from 'rxjs'
import { FileUpload } from '../models/classes/file-upload.class'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthService,
  ) { }

  percantage = new BehaviorSubject<number | undefined>(0)

  uploadFile(fileUpload: FileUpload): Observable<number | undefined> {
    const path = '/avatars/' + fileUpload.file.name
    const uploadTask = this.storage.upload(path, fileUpload.file)

    uploadTask.percentageChanges().subscribe(value => {
      this.percantage.next(value)
    })

    return uploadTask.percentageChanges()
  }

  getAvatar(uid = this.authService.user?.uid) {
    const ref = this.storage.ref('/avatars').child(uid as string)
    return ref.getDownloadURL()
  }
}
