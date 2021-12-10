import { animate, style, transition, trigger } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { AuthService } from './services/auth.service'
import { MapService } from './services/global/map.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('barAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-80px)' }),
        animate('400ms', style({ transform: 'translateY(0px)' }))
      ]),
      transition(':leave', [
        animate('400ms', style({ transform: 'translateY(-80px)' }))
      ])
    ]),
    trigger('asideAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-400px)' }),
        animate('400ms', style({ transform: 'translateX(0px)' }))
      ]),
      transition(':leave', [
        animate('400ms', style({ transform: 'translateX(-400px)' }))
      ])
    ]),
    trigger('mainAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 600ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms 600ms', style({ opacity: 0 }))
      ]),
    ]),
  ]
})
export class AppComponent implements OnInit {
  items: MenuItem[]

  constructor(
    private authService: AuthService,
    private mapService: MapService,
  ) {}

  get isAuth() {
    return !!this.authService.user
  }

  get whereIsShip() {
    return this.mapService.whereIsShip
  }

  ngOnInit() {
    this.authService.checkAuthState()

    this.items = [
    {
      label: 'English',
      routerLink: '/en',
    },
    {
      label: 'Polski',
      routerLink: '/pl',
    }
   ]
  }

  logout() {
    this.authService.logout()
  }

  resetMap() {
    this.mapService.whereIsShip = null as any
    this.mapService.table = []
    this.mapService.createEmptyTable()
  }
}
