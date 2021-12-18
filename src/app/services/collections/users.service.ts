import { Injectable } from '@angular/core'
import { AngularFirestore } from "@angular/fire/compat/firestore"
import { from } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserDataModel } from 'src/app/models/users/user-data.model'
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

  updateUserData(data: UserDataModel) {
    return from(this.userCollectionRef.update(data))
  }

  getUserData() {
    return this.userCollectionRef.get().pipe(map(data => (this.prepareData(data.data() as Object))))
  }

  private prepareData(obj: any) {
    const convert = (obj: any) => Object.keys(obj).map((key) => obj[key])

    return {
      spice: obj.spice,
      shipCord: obj.shipCord,
      map: Object.keys(obj.map).map((key) => convert(obj.map[key])),
      savedMap: obj.savedMap ? {
        ...obj.savedMap,
        table:  Object.keys(obj.savedMap.table).map((key) => convert(obj.savedMap.table[key]))
      } : null
    }
  }
}
