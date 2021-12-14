import { ShipCordModel } from '../map/ship-cord.model'
import { PlanetModel } from '../planets/planet.model'

export interface UserDataModel {
  map: PlanetModel[][]
  spice: number
  shipCord: ShipCordModel
}
