import { Component, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'
import { PlanetModel } from 'src/app/models/planets/planet.model'
import { PlanetsService } from 'src/app/services/collections/planets.service'
import { MapService } from 'src/app/services/global/map.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isloading = false
  showHello = true
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

  ngOnInit() {

  }

  findPlanet(name: string) {
    return this.planets.find((planet) => planet.name === name) as PlanetModel
  }

  canShipMove(trIndex: number, tdIndex: number) {
    return  (trIndex === this.whereIsShip?.firstIndex - 1 && tdIndex === this.whereIsShip?.secondIndex) ||
            (trIndex === this.whereIsShip?.firstIndex + 1 && tdIndex === this.whereIsShip?.secondIndex) ||
            (trIndex === this.whereIsShip?.firstIndex && tdIndex === this.whereIsShip?.secondIndex - 1) ||
            (trIndex === this.whereIsShip?.firstIndex && tdIndex === this.whereIsShip?.secondIndex + 1)
  }

  handleHideHello() {
    this.mapService.createEmptyTable()
    this.showHello = false
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

      switch(this.findPlanet(this.mapService.table[firstIndex][secondIndex])?.type) {
        case 'Station':
          this.station(firstIndex, secondIndex)
          break
        case 'Planet':
          this.planet()
          break
        default:
          break
      }
    }
  }

  isShipHere(trIndex: number, tdIndex: number) {
    return this.mapService.isShipHere(trIndex, tdIndex)
  }

  private station(firstIndex: number, secondIndex: number) {
    this.mapService.spice += 50
    this.mapService.table[firstIndex][secondIndex] = null as any
  }

  private planet() {
    alert('WIN')
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
