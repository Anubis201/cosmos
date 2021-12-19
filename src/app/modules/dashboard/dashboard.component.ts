import { animate, style, transition, trigger } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { MessageService } from 'primeng/api'
import { first } from 'rxjs/operators'
import { PlanetModel } from 'src/app/models/planets/planet.model'
import { PlanetsService } from 'src/app/services/collections/planets.service'
import { UsersService } from 'src/app/services/collections/users.service'
import { MapService } from 'src/app/services/global/map.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('blurAnimation', [
      transition('false => true', [
        style({ filter: 'Blur(0)' }),
        animate('1000ms', style({ filter: 'Blur(3px)' }))
      ]),
      transition('true => false', [
        style({ filter: 'Blur(3px)' }),
        animate('1000ms', style({ filter: 'Blur(0)' }))
      ])
    ]),
  ]
})
export class DashboardComponent implements OnInit {
  isloading = false
  planets: PlanetModel[] = []

  constructor(
    private mapService: MapService,
    private planetsService: PlanetsService,
    private toast: MessageService,
    private usersService: UsersService,
    private fireAuth: AngularFireAuth,
  ) { }

  get map() {
    return this.mapService.table
  }

  get whereIsShip() {
    return this.mapService.whereIsShip
  }

  get tableMode() {
    return  this.mapService.tableMode
  }

  get savedMap() {
    return this.mapService.savedMap
  }

  get lvl() {
    return this.mapService.lvl.value
  }

  ngOnInit() {
    this.fireAuth.user.pipe(first()).subscribe(user => {
      if (user) this.checkMapFromDatabase()
    })
  }

  canShipMove(trIndex: number, tdIndex: number) {
    return  (trIndex === this.whereIsShip?.firstIndex - 1 && tdIndex === this.whereIsShip?.secondIndex) ||
            (trIndex === this.whereIsShip?.firstIndex + 1 && tdIndex === this.whereIsShip?.secondIndex) ||
            (trIndex === this.whereIsShip?.firstIndex && tdIndex === this.whereIsShip?.secondIndex - 1) ||
            (trIndex === this.whereIsShip?.firstIndex && tdIndex === this.whereIsShip?.secondIndex + 1)
  }

  handleHideHello() {
    this.mapService.createEmptyTable()
    this.mapService.tableMode = null
  }

  drop(firstIndex: number, secondIndex: number) {
    // this.mapService.whereIsShip is null when user use reset button
    if (!this.mapService.whereIsShip) {
      this.getPlanets()
      this.mapService.moveShip(firstIndex, secondIndex)
      return
    }

    if (this.canShipMove(firstIndex, secondIndex)) {
      this.mapService.moveShip(firstIndex, secondIndex)

      switch(this.mapService.table[firstIndex][secondIndex]?.type) {
        case 'Station':
          this.station(firstIndex, secondIndex)
          this.mapService.saveToDatabase()
          break
        case 'Planet':
          if (!this.savedMap) {
            this.mapService.tableMode = 'win'
            this.toast.add({ severity: 'success', summary: $localize `You reached Arrakis` })
          } else {
            this.mapService.restoreMap()
            this.toast.add({ severity: 'info', summary: $localize `Now repeat it in reality` })
          }
          break
        case 'Death':
          if (!this.savedMap) {
            this.mapService.tableMode = 'lose'
            this.toast.add({ severity: 'error', summary: $localize `Next time use spices` })
          } else {
            this.mapService.restoreMap()
            this.toast.add({ severity: 'info', summary: $localize `Oops, here is death` })
          }
          break
        case 'Asteroids':
        default:
          break
      }

      this.mapService.saveToDatabase()
    }
  }

  isShipHere(trIndex: number, tdIndex: number) {
    return this.mapService.isShipHere(trIndex, tdIndex)
  }

  handleTryAgain() {
    this.mapService.resetMap()
  }

  handleNextLevel() {
    this.mapService.nextLevel()
  }

  handleBackLevel() {
    this.mapService.backLevel()
  }

  private station(firstIndex: number, secondIndex: number) {
    this.mapService.table[firstIndex][secondIndex] = null as any

    if (!this.savedMap) {
      this.mapService.spice += 100
      this.toast.add({ severity: 'info', summary: $localize `You finded 100 spices` })
    } else {
      this.toast.add({ severity: 'info', summary: $localize `WOW you will find a spice!` })
    }
  }

  private getPlanets() {
    this.isloading = true
    this.planetsService.getPlanets()
      .subscribe({
        next: res => {
          this.planets = res.docs.map(doc => doc.data()) as PlanetModel[]
          this.mapService.createRandomMap(this.planets)
          this.mapService.saveToDatabase()
          this.isloading = false
        },
        error: () => {
          this.toast.add({ severity: 'error', summary: $localize `Failed to get planets` })
          this.isloading = false
        }
      })
  }

  private checkMapFromDatabase() {
    this.isloading = true
    this.usersService.getUserData().subscribe({
      next: user => {
        if (user.map?.length) {
          this.mapService.table = user.map
          this.mapService.spice = user.spice
          this.mapService.whereIsShip = user.shipCord
          this.mapService.savedMap = user.savedMap
          this.mapService.tableMode = user.tableMode
        }

        this.mapService.lvl.next(user.lvl ?? 1)
        this.isloading = false
      },
      error: () => {
        this.toast.add({ severity: 'error', summary: $localize `Failed to get map` })
        this.isloading = false
      }
    })
  }
}
