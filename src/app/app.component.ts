import { transition, trigger, useAnimation } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { MenuItem, MessageService } from 'primeng/api'
import { opacityAnimation, transformAnimation } from './services/animations/animations'
import { AuthService } from './services/auth.service'
import { MapService } from './services/global/map.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
    trigger('bottomBarAnimation', [
      transition(':enter', [
        useAnimation(opacityAnimation, {
          params: {
            opacityStart: '0',
            opacityClose: '1',
            time: '500ms',
            delay: '500ms'
          }
        })
      ]),
      transition(':leave', [
        useAnimation(opacityAnimation, {
          params: {
            opacityStart: '1',
            opacityClose: '0',
            time: '500ms',
            delay: '0ms'
          }
        })
      ]),
    ]),
  ]
})
export class AppComponent implements OnInit {
  items: MenuItem[]
  dockItems: MenuItem[]

  constructor(
    private authService: AuthService,
    private mapService: MapService,
    private toast: MessageService,
  ) {}

  get isAuth() {
    return !!this.authService.user
  }

  get whereIsShip() {
    return this.mapService.whereIsShip
  }

  get spice() {
    return this.mapService.spice as any
  }

  get tableMode() {
    return this.mapService.tableMode
  }

  get savedMap() {
    return this.mapService.savedMap
  }

  get isDashboard() {
    return location.pathname === '/dashboard'
  }

  get isAccount() {
    return location.pathname === '/account'
  }

  get lvl() {
    return this.mapService.lvl.value
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

   this.dockItems = [
      {
        label: 'Refresh game',
        icon: 'assets/img/refresh.svg',
        tooltip: 'Refresh game',
        command: () => this.resetMap(),
      },
      {
        label: 'Spice',
        icon: 'assets/img/spice.png',
        tooltip: this.savedMap ? 'Back to reality' : 'Use spice',
        command: () => this.savedMap ? this.backAbility() : this.ability(),
      },
    ]
  }

  logout() {
    this.authService.logout()
  }

  resetMap() {
    this.mapService.resetMap()
  }

  backAbility() {
    this.mapService.restoreMap()
    this.dockItems[1].tooltip = 'Use spice'
    this.toast.add({ severity: 'info', summary: $localize `You are back` })
  }

  ability() {
    if (this.spice < 100) {
      this.toast.add({ severity: 'error', summary: $localize `You need 100 spices` })
    } else {
      this.mapService.ability()
      this.dockItems[1].tooltip = 'Back to reality'
      this.toast.add({ severity: 'info', summary: $localize `You used 100 spices` })
    }
  }
}
