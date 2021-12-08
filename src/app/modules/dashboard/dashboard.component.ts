import { Component, OnInit } from '@angular/core'
import { PlanetsService } from '../../services/collections/planets.service'
import { PlanetModel } from '../../models/planets/planet.model'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  planets: PlanetModel[] = []
  table: string[][] = []
  isloading = false

  private readonly tr = 7
  private readonly td = 8
  private readonly maxRandom = this.tr * this.td - 1

  constructor(
    private planetsService: PlanetsService,
    private toast: MessageService,
  ) { }

  ngOnInit() {
    this.getPlanets()
  }

  getPlanets() {
    this.isloading = false
    this.planetsService.getPlanets()
      .subscribe({
        next: res => {
          this.planets = res.docs.map(doc => doc.data()) as PlanetModel[]
          this.createRandomMap()
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

  private createEmptyTable(firstSizeArray: number, secondSizeArray: number) {
    this.table = new Array(firstSizeArray).fill(null).map(() => (new Array(secondSizeArray).fill(null)))
  }

  private createRandomMap() {
    this.createEmptyTable(this.tr, this.td)
    this.planets.forEach(planet => this.assingElement(planet.name))
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min
  }

  private assingElement(planetName: string) {
    const randomIndex = this.getRandomInt(0, this.maxRandom)
    const firstIndex = Math.floor(randomIndex / this.td)
    const secondIndex = randomIndex % this.td

    if (this.checkNeigh(firstIndex, secondIndex) || this.table[firstIndex][secondIndex]) {
      // When in this cell is element will draw the number again
      this.assingElement(planetName)
    } else {
      // Assign element
      this.table[firstIndex][secondIndex] = planetName
    }
  }

  private checkNeigh(firstIndex: number, secondIndex: number) {
    // upper
    if (firstIndex !== 0 && this.table[firstIndex - 1][secondIndex]) {
      return true
    }

    // bottom
    if (firstIndex !== this.tr - 1 && this.table[firstIndex + 1][secondIndex]) {
      console.log('botom')
      return true
    }

    // right
    if (secondIndex !== this.td - 1 && this.table[firstIndex][secondIndex + 1]) {
      return true
    }

    // left
    if (secondIndex !== 0 && this.table[firstIndex][secondIndex - 1]) {
      return true
    }

    return false
  }
}
