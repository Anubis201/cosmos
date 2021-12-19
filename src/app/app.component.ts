import { animate, style, transition, trigger } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { MenuItem, MessageService } from 'primeng/api'
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
    trigger('bottomBarAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
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
