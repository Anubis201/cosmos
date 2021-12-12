import { Component } from '@angular/core'
import { MessageService } from 'primeng/api'
import { PlanetModel } from 'src/app/models/planets/planet.model'
import { PlanetsService } from 'src/app/services/collections/planets.service'
import { MapService } from 'src/app/services/global/map.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isloading = false
  planets: PlanetModel[] = []

  constructor(
    private mapService: MapService,
    private planetsService: PlanetsService,
    private toast: MessageService,
  ) { }

  get map() {
    return this.mapService.table
  }

  get whereIsShip() {
    return this.mapService.whereIsShip
  }

  get tableMode() {
    return  this.mapService.tableMode
  }

  canShipMove(trIndex: number, tdIndex: number) {
    return  (trIndex === this.whereIsShip?.firstIndex - 1 && tdIndex === this.whereIsShip?.secondIndex) ||
            (trIndex === this.whereIsShip?.firstIndex + 1 && tdIndex === this.whereIsShip?.secondIndex) ||
            (trIndex === this.whereIsShip?.firstIndex && tdIndex === this.whereIsShip?.secondIndex - 1) ||
            (trIndex === this.whereIsShip?.firstIndex && tdIndex === this.whereIsShip?.secondIndex + 1)
  }

  handleHideHello() {
    this.mapService.createEmptyTable()
    this.mapService.tableMode = null
  }

  drop(firstIndex: number, secondIndex: number) {
    // this.mapService.whereIsShip is null when user use reset button
    if (!this.planets.length || this.mapService.whereIsShip === null) {
      this.getPlanets()
      this.mapService.moveShip(firstIndex, secondIndex)
      return
    }

    if (this.canShipMove(firstIndex, secondIndex)) {
      this.mapService.moveShip(firstIndex, secondIndex)

      switch(this.mapService.table[firstIndex][secondIndex]?.type) {
        case 'Station':
          this.station(firstIndex, secondIndex)
          break
        case 'Planet':
          this.mapService.tableMode = 'win'
          this.toast.add({ severity: 'success', summary: $localize `You reached Arrakis` })
          break
        case 'Death':
          this.mapService.tableMode = 'lose'
          this.toast.add({ severity: 'error', summary: $localize `Next time use spices` })
          break
        case 'Asteroids':
        default:
          break
      }
    }
  }

  isShipHere(trIndex: number, tdIndex: number) {
    return this.mapService.isShipHere(trIndex, tdIndex)
  }

  handleTryAgain() {
    this.mapService.resetMap()
  }

  private station(firstIndex: number, secondIndex: number) {
    this.mapService.spice += 50
    this.mapService.table[firstIndex][secondIndex] = null as any
    this.toast.add({ severity: 'info', summary: $localize `You finded 50 spices` })
  }

  private getPlanets() {
    this.isloading = true
    this.planetsService.getPlanets()
      .subscribe({
        next: res => {
          this.planets = res.docs.map(doc => doc.data()) as PlanetModel[]
          this.mapService.createRandomMap(this.planets)
          this.isloading = false
        },
        error: () => {
          this.toast.add({ severity: 'error', summary: $localize `Failed to get planets` })
          this.isloading = false
        }
      })
  }
}
