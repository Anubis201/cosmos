import { Injectable } from '@angular/core'
import { PlanetModel } from 'src/app/models/planets/planet.model'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  table: string[][] = []

  private readonly tr = 7
  private readonly td = 8
  private readonly maxRandom = this.tr * this.td - 1

  createRandomMap(planets: PlanetModel[]) {
    this.createEmptyTable(this.tr, this.td)
    planets.forEach(planet => this.assingElement(planet.name))
  }

  private createEmptyTable(firstSizeArray: number, secondSizeArray: number) {
    this.table = new Array(firstSizeArray).fill(null).map(() => (new Array(secondSizeArray).fill(null)))
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
