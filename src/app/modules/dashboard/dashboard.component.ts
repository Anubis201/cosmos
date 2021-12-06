import { Component, OnInit } from '@angular/core'
import { PlanetsService } from '../../services/collections/planets.service'
import { PlanetModel } from '../../models/planets/planet.model'
import { firstArraksisMap } from 'src/app/levels/firstArraksis'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  planets: PlanetModel[] = []
  table: any[][] = [] // 5x7

  constructor(
    private planetsService: PlanetsService,
  ) { }

  ngOnInit() {
    this.getPlanets()
    this.setPosition(firstArraksisMap)
  }

  getPlanets() {
    this.planetsService.getPlanets()
      .subscribe({
        next: res => {
          this.planets = res.docs.map(doc => doc.data()) as PlanetModel[]
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
