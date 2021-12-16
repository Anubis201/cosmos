import { PlanetModel } from '../planets/planet.model'
import { ShipCordModel } from './ship-cord.model'

export interface SavedMapModel {
  ship: ShipCordModel
  table: PlanetModel[][]
}
