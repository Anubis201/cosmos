import { Injectable } from '@angular/core'
import { PlanetModel } from 'src/app/models/planets/planet.model'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  table: string[][] = []
  whereIsShip: { firstIndex: number, secondIndex: number }

  // TODO inject this value
  private readonly tr = 7
  private readonly td = 8
  private readonly maxRandom = this.tr * this.td - 1

  createRandomMap(planets: PlanetModel[]) {
    planets.forEach(planet => this.assingElement(planet.name))
  }

  createEmptyTable() {
    this.table = new Array(this.tr).fill(null).map(() => (new Array(this.td).fill(null)))
  }

  isShipHere(trIndex: number, tdIndex: number) {
    return trIndex === this.whereIsShip?.firstIndex && tdIndex === this.whereIsShip?.secondIndex
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min
  }

  private assingElement(planetName: string) {
    const randomIndex = this.getRandomInt(0, this.maxRandom)
    const firstIndex = Math.floor(randomIndex / this.td)
    const secondIndex = randomIndex % this.td

    if (this.checkNeigh(firstIndex, secondIndex) || this.table[firstIndex][secondIndex] || this.isShipHere(firstIndex, secondIndex)) {
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
