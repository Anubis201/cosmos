import { transition, trigger, useAnimation } from '@angular/animations'
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { MenuItem, MessageService } from 'primeng/api'
import { opacityAnimation } from 'src/app/services/animations/animations'
import { MapService } from 'src/app/services/global/map.service'

@Component({
  selector: 'app-bottom-view',
  templateUrl: './bottom-view.component.html',
  styleUrls: ['./bottom-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
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
export class BottomViewComponent implements OnInit {
  @Input() isDashboard: boolean

  dockItems: MenuItem[]

  constructor(
    private mapService: MapService,
    private toast: MessageService,
  ) { }

  get whereIsShip() {
    return this.mapService.whereIsShip
  }

  get tableMode() {
    return this.mapService.tableMode
  }

  get savedMap() {
    return this.mapService.savedMap
  }

  get lvl() {
    return this.mapService.lvl
  }

  get spice() {
    return this.mapService.spice as any
  }

  ngOnInit() {
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

  resetMap() {
    this.mapService.resetMap()
  }

  backAbility() {
    this.mapService.restoreMap()
    this.dockItems[1].tooltip = 'Use spice'
    this.toast.add({ severity: 'info', summary: $localize `You are back` })
  }

  ability() {
    if (this.spice < 50) {
      this.toast.add({ severity: 'error', summary: $localize `You need 50 spices` })
    } else {
      this.mapService.ability()
      this.dockItems[1].tooltip = 'Back to reality'
      this.toast.add({ severity: 'info', summary: $localize `You used 50 spices` })
    }
  }
}
