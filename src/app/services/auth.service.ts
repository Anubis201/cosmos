import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router'
import firebase from 'firebase/compat'
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
      })
  }

  logout() {
    this.fireAuth.signOut()

    setTimeout(() => {
      this.router.navigateByUrl('login')
    })
  }

  goToLogin() {
    this.router.navigateByUrl('login')
  }

  goToRegister() {
    this.router.navigateByUrl('register')
  }
}
