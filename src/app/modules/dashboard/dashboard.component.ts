import { Component, OnInit } from '@angular/core'
import { PlanetsService } from '../../services/collections/planets.service'
import { PlanetModel } from '../../models/planets/planet.model'
import { firstArraksisMap } from 'src/app/levels/firstArraksis'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  planets: PlanetModel[] = []
  table: any[][] = [] // 8x8

  isloading = false

  constructor(
    private planetsService: PlanetsService,
    private toast: MessageService,
  ) { }

  ngOnInit() {
    this.getPlanets()
    this.setPosition(firstArraksisMap)
  }

  getPlanets() {
    this.isloading = true
    this.planetsService.getPlanets()
      .subscribe({
        next: res => {
          this.planets = res.docs.map(doc => doc.data()) as PlanetModel[]
          this.isloading = false
        },
        error: () => {
          this.isloading = false
          this.toast.add({ severity: 'error', summary: $localize `Failed to get planets` })
        }
      })
  }

  findPlanet(name: string) {
    return this.planets.find((planet) => planet.name === name) as PlanetModel
  }

  private setPosition(map: any[][]) {
    this.table = map
  }
}
