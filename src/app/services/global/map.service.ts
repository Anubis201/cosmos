import { Inject, Injectable } from '@angular/core'
import { PlanetModel } from 'src/app/models/planets/planet.model'
import { TD_SIZE, TR_SIZE } from '../tokens/map-size.token'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  table: PlanetModel[][] = []
  whereIsShip: { firstIndex: number, secondIndex: number }
  spice = 100

  private readonly maxRandom = this.tr * this.td - 1

  constructor(
    @Inject(TR_SIZE) private readonly tr: number,
    @Inject(TD_SIZE) private readonly td: number,
  ) {}

  createRandomMap(planets: PlanetModel[]) {
    planets.forEach(planet => this.assingElement(planet))
  }

  createEmptyTable() {
    this.table = new Array(this.tr).fill(null).map(() => (new Array(this.td).fill(null)))
  }

  isShipHere(trIndex: number, tdIndex: number) {
    return trIndex === this.whereIsShip?.firstIndex && tdIndex === this.whereIsShip?.secondIndex
  }

  resetMap() {
    this.whereIsShip = null as any
    this.table = []
    this.createEmptyTable()
  }

  moveShip(firstIndex: number, secondIndex: number) {
    this.whereIsShip = { firstIndex, secondIndex }
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min
  }

  private assingElement(planet: PlanetModel) {
    const randomIndex = this.getRandomInt(0, this.maxRandom)
    const firstIndex = Math.floor(randomIndex / this.td)
    const secondIndex = randomIndex % this.td

    if (this.checkNeigh(firstIndex, secondIndex) || this.table[firstIndex][secondIndex] || this.isShipHere(firstIndex, secondIndex)) {
      // When in this cell is element will draw the number again
      this.assingElement(planet)
    } else {
      // Assign element
      this.table[firstIndex][secondIndex] = planet
    }
  }

  private checkNeigh(firstIndex: number, secondIndex: number) {
    // upper
    if (firstIndex !== 0 && this.table[firstIndex - 1][secondIndex]) {
      return true
    }

    // bottom
    if (firstIndex !== this.tr - 1 && this.table[firstIndex + 1][secondIndex]) {
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
