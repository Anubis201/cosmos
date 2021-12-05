import { Injectable } from '@angular/core'
import { AngularFirestore } from "@angular/fire/compat/firestore"
import { AuthService } from '../auth.service'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) { }

  get userCollectionRef() {
    return this.firestore.collection('users').doc(this.authService.user?.uid)
  }

  setUserData(data: Object, userId: string | undefined) {
    return this.firestore.collection('users').doc(userId).set(data)
  }

  updateUserData(data: Object) {
    return this.userCollectionRef.update(data)
  }

  getUserData() {
    return this.userCollectionRef.get()
  }
}
