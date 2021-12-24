import { transition, trigger, useAnimation } from '@angular/animations'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { MessageService } from 'primeng/api'
import { BehaviorSubject } from 'rxjs'
import { first } from 'rxjs/operators'
import { StationPrizesData } from 'src/app/models/data/station-prizes.data'
import { StationPrizesEnum } from 'src/app/models/map/enums/station-prizes.enum'
import { PlanetModel } from 'src/app/models/planets/planet.model'
import { blurAnimation } from 'src/app/services/animations/animations'
import { PlanetsService } from 'src/app/services/collections/planets.service'
import { UsersService } from 'src/app/services/collections/users.service'
import { MapService } from 'src/app/services/global/map.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('blurAnimation', [
      transition('false => true', [
        useAnimation(blurAnimation, {
          params: {
            blurStart: 'Blur(0)',
            blurClose: 'Blur(3px)',
            time: '1000ms',
          }
        })
      ]),
      transition('true => false', [
        useAnimation(blurAnimation, {
          params: {
            blurStart: 'Blur(3px)',
            blurClose: 'Blur(0)',
            time: '1000ms',
          }
        })
      ])
    ]),
  ]
})
export class DashboardComponent implements OnInit {
  isloading = new BehaviorSubject<boolean>(false)

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
    return this.mapService.tableMode
  }

  get savedMap() {
    return this.mapService.savedMap
  }

  get lvl() {
    return this.mapService.lvl
  }

  ngOnInit() {
    this.fireAuth.user.pipe(first()).subscribe(user => {
      if (user) this.checkMapFromDatabase()
      else this.mapService.lvl.next(1)
    })
  }

  canShipMove(trIndex: number, tdIndex: number) {
    if (!this.whereIsShip.value) return

    return  (trIndex === this.whereIsShip.value?.firstIndex - 1 && tdIndex === this.whereIsShip.value?.secondIndex) ||
            (trIndex === this.whereIsShip.value?.firstIndex + 1 && tdIndex === this.whereIsShip.value?.secondIndex) ||
            (trIndex === this.whereIsShip.value?.firstIndex && tdIndex === this.whereIsShip.value?.secondIndex - 1) ||
            (trIndex === this.whereIsShip.value?.firstIndex && tdIndex === this.whereIsShip.value?.secondIndex + 1)
  }

  handleHideHello() {
    this.mapService.createEmptyTable()
    this.mapService.tableMode.next(null)
  }

  drop(firstIndex: number, secondIndex: number) {
    // this.mapService.whereIsShip is null when user use reset button
    if (!this.whereIsShip.value) {
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
          if (!this.savedMap.value) {
            this.mapService.tableMode.next('win')
            this.toast.add({ severity: 'success', summary: $localize `You reached Arrakis` })
          } else {
            this.mapService.restoreMap()
            this.toast.add({ severity: 'info', summary: $localize `Now repeat it in reality` })
          }
          break
        case 'Death':
          if (!this.savedMap.value) {
            this.mapService.tableMode.next('lose')
            this.toast.add({ severity: 'error', summary: $localize `DEATH` })
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

    if (!this.savedMap.value) {
      const prize = StationPrizesData[this.mapService.getRandomInt(0, 8)]

      switch(prize.type) {
        case StationPrizesEnum.spice:
          this.mapService.spice += prize.value as number
          this.toast.add({ severity: 'info', summary: $localize `You finded ${prize.value} spices` })
          break
        case StationPrizesEnum.nothing:
          this.toast.add({ severity: 'info', summary: $localize `There are nothing` })
          break
        case StationPrizesEnum.death:
          this.mapService.tableMode.next('lose')
          this.toast.add({ severity: 'error', summary: $localize `DEATH` })
          break
      }
    } else {
      this.toast.add({ severity: 'info', summary: $localize `WOW you will find a spice!` })
    }
  }

  private getPlanets() {
    this.isloading.next(true)
    this.planetsService.getPlanets()
      .subscribe({
        next: res => {
          this.planets = res.docs.map(doc => doc.data()) as PlanetModel[]
          this.mapService.createRandomMap(this.planets)
          this.mapService.saveToDatabase()
          this.isloading.next(false)
        },
        error: () => {
          this.toast.add({ severity: 'error', summary: $localize `Failed to get planets` })
          this.isloading.next(false)
        }
      })
  }

  private checkMapFromDatabase() {
    this.isloading.next(true)
    this.usersService.getUserData().subscribe({
      next: user => {
        if (user.map?.length) {
          this.mapService.table = user.map
          this.mapService.spice = user.spice
          this.mapService.whereIsShip.next(user.shipCord)
          this.mapService.savedMap.next(user.savedMap)
          this.mapService.tableMode.next(user.tableMode)
        }

        this.mapService.lvl.next(user.lvl ?? 1)
        this.isloading.next(false)
      },
      error: () => {
        this.toast.add({ severity: 'error', summary: $localize `Failed to get map` })
        this.isloading.next(false)
      }
    })
  }
}
