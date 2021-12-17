import { Inject, Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'
import { SavedMapModel } from 'src/app/models/map/saved-map.model'
import { ShipCordModel } from 'src/app/models/map/ship-cord.model'
import { TableModeType } from 'src/app/models/map/table-mode.type'
import { PlanetModel } from 'src/app/models/planets/planet.model'
import { AuthService } from '../auth.service'
import { UsersService } from '../collections/users.service'
import { TD_SIZE, TR_SIZE } from '../tokens/map-size.token'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  table: PlanetModel[][] = []
  whereIsShip: ShipCordModel
  spice = 300
  tableMode: TableModeType = 'hello'
  savedMap: SavedMapModel | null

  private readonly maxRandom = this.tr * this.td - 1

  constructor(
    @Inject(TR_SIZE) private readonly tr: number,
    @Inject(TD_SIZE) private readonly td: number,
    private toast: MessageService,
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  createRandomMap(planets: PlanetModel[]) {
    planets.forEach(planet => this.assingElement(planet))
  }

  createEmptyTable() {
    this.table = new Array(this.tr).fill(null).map(() =>
      (new Array(this.td).fill(null).map(() =>
      (this.getRandomInt(0, 1) ? { name: '', type: 'Death' } : { name: '', type: 'Asteroids' }))))
  }

  isShipHere(trIndex: number, tdIndex: number) {
    return trIndex === this.whereIsShip?.firstIndex && tdIndex === this.whereIsShip?.secondIndex
  }

  resetMap() {
    this.whereIsShip = null as any
    this.table = []
    this.tableMode = null
    this.spice = 300
    this.savedMap = null
    this.saveToDatabase()
    this.createEmptyTable()
  }

  moveShip(firstIndex: number, secondIndex: number) {
    this.whereIsShip = { firstIndex, secondIndex }
  }

  ability() {
    this.spice -= 100
    this.savedMap = {
      ship: this.whereIsShip,
      table: JSON.parse(JSON.stringify(this.table)),
    }
  }

  restoreMap() {
    if (!this.savedMap) return

    this.table = this.savedMap.table
    this.whereIsShip = this.savedMap.ship
    this.savedMap = null
  }

  saveToDatabase() {
    if (!this.authService.user) return

    this.usersService.updateUserData({
      map: this.convertArrayToObject(this.table),
      spice: this.spice,
      shipCord:this.whereIsShip,
    }).subscribe({
      error: () => {
        this.toast.add({ severity: 'error', summary: $localize `Failed to save game` })
      }
    })
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min
  }

  // fuck firebase!
  private convertArrayToObject(array2d: PlanetModel[][]) {
    return array2d.map(firstElement => { return {...firstElement.map(secondElement => ({...secondElement}))}})
  }

  private assingElement(planet: PlanetModel) {
    const randomIndex = this.getRandomInt(0, this.maxRandom)
    const firstIndex = Math.floor(randomIndex / this.td)
    const secondIndex = randomIndex % this.td

    if ((this.checkNeigh(firstIndex, secondIndex) || this.table[firstIndex][secondIndex].name.length || this.isShipHere(firstIndex, secondIndex))) {
      // When in this cell is element will draw the number again
      this.assingElement(planet)
    } else {
      // Assign element
      this.table[firstIndex][secondIndex] = planet
    }
  }

  private checkNeigh(firstIndex: number, secondIndex: number) {
    // upper
    if (firstIndex !== 0 && this.table[firstIndex - 1][secondIndex].name.length) {
      return true
    }

    // bottom
    if (firstIndex !== this.tr - 1 && this.table[firstIndex + 1][secondIndex].name.length) {
      return true
    }

    // right
    if (secondIndex !== this.td - 1 && this.table[firstIndex][secondIndex + 1].name.length) {
      return true
    }

    // left
    if (secondIndex !== 0 && this.table[firstIndex][secondIndex - 1].name.length) {
      return true
    }

    return false
  }
}
