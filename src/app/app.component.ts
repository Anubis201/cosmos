import { transition, trigger, useAnimation } from '@angular/animations'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { opacityAnimation, transformAnimation } from './services/animations/animations'
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // TODO Check this
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('barAnimation', [
      transition(':enter', [
        useAnimation(transformAnimation, {
          params: {
            transformStart: 'translateY(-80px)',
            transformClose: 'translateY(0)',
            time: '400ms',
          }
        })
      ]),
      transition(':leave', [
        useAnimation(transformAnimation, {
          params: {
            transformStart: 'translateY(0)',
            transformClose: 'translateY(-80px)',
            time: '400ms',
          }
        })
      ])
    ]),
    trigger('mainAnimation', [
      transition(':enter', [
        useAnimation(opacityAnimation, {
          params: {
            opacityStart: '0',
            opacityClose: '1',
            time: '500ms',
            delay: '600ms'
          }
        })
      ]),
      transition(':leave', [
        useAnimation(opacityAnimation, {
          params: {
            opacityStart: '1',
            opacityClose: '0',
            time: '500ms',
            delay: '600ms'
          }
        })
      ]),
    ]),
  ]
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private fireAuth: AngularFireAuth,
  ) {}

  get isAuth() {
    return this.fireAuth.user
  }

  get isDashboard() {
    return location.pathname === '/dashboard'
  }

  get isAccount() {''
    return location.pathname === '/account'
  }

  ngOnInit() {
    this.authService.checkAuthState()
  }
}
