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
  planets: PlanetModel[] = []

  constructor(
    private mapService: MapService,
    private planetsService: PlanetsService,
    private toast: MessageService,
  ) { }

  get map() {
    return this.mapService.table
  }

  ngOnInit() {
    this.getPlanets()
  }

  findPlanet(name: string) {
    return this.planets.find((planet) => planet.name === name) as PlanetModel
  }

  private getPlanets() {
    this.isloading = false
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
