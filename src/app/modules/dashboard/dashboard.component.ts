import { Component, OnInit } from '@angular/core'
import { PlanetsService } from '../../services/collections/planets.service'
import { PlanetModel } from '../../models/planets/planet.model'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  planets: PlanetModel[] = []
  cols: any[]

  constructor(
    private planetsService: PlanetsService,
  ) { }

  ngOnInit() {
    this.getPlanets()

    this.cols = [
      { field: 'name', header: 'Name' }
    ]
  }

  getPlanets() {
    this.planetsService.getPlanets()
      .subscribe({
        next: res => {
          this.planets = res.docs.map(doc => doc.data()) as PlanetModel[]
        }
      })
  }

}
