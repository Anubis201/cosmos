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
  table: string[][] = [] // 8x8
  isloading = false

  constructor(
    private planetsService: PlanetsService,
    private toast: MessageService,
  ) { }

  ngOnInit() {
    this.getPlanets()
  }

  getPlanets() {
    this.isloading = true
    this.planetsService.getPlanets()
      .subscribe({
        next: res => {
          this.planets = res.docs.map(doc => doc.data()) as PlanetModel[]
          this.randomMap()
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

  private createTable() {
    this.table = new Array(8).fill(null).map(() => (new Array(8).fill(null)))
  }

  private randomMap() {
    this.createTable()
    this.planets.forEach(planet => this.assingElement(planet.name))
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min
  }

  private assingElement(planetName: string) {
    const findIndex = this.getRandomInt(0, 63)
    const firstIndex = Math.floor(findIndex / 8)
    const secondIndex = findIndex % 8

    // TODO 1. Element nie może być w sądziedztwie innego elementu
    // TODO 2. Dodać elementy blokujące na mapie min.skały, może nebule
    if (this.table[firstIndex][secondIndex] && this.checkNeigh(firstIndex, secondIndex)) {
      // When in this cell is element will draw the number again
      this.assingElement(planetName)
    } else {
      // Assign element
      this.table[firstIndex][secondIndex] = planetName
    }
  }

  private checkNeigh(firstIndex: number, secondIndex: number) {
    // upper
    if (this.table[firstIndex - 1][secondIndex]) {
      return true
    }

    // bottom
    if (this.table[firstIndex + 1][secondIndex]) {
      return true
    }

    // right
    if (this.table[firstIndex][secondIndex + 1]) {
      return true
    }

    // left
    if (this.table[firstIndex + 1][secondIndex - 1]) {
      return true
    }

    return false
  }
}
