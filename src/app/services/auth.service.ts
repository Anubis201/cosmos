import { Injectable } from '@angular/core'
import {AngularFireAuth} from '@angular/fire/compat/auth'
import firebase from 'firebase/compat'
import {Router} from '@angular/router'
import User = firebase.User

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) { }

  checkAuthState() {
    this.fireAuth.authState
      .subscribe((auth) => {
        this.user = auth

        if (this.user === null) {

          this.router.navigateByUrl('login')

        } else {

          if (window.location.pathname !== '/dashboard') return

          this.router.navigateByUrl('dashboard')
        }
      })
  }

  logout() {
    this.fireAuth.signOut()
  }
}
