import { SavedMapModel } from '../map/saved-map.model'
import { ShipCordModel } from '../map/ship-cord.model'
import { TableModeType } from '../map/table-mode.type'
import { PlanetModel } from '../planets/planet.model'

export interface UserDataModel {
  map: PlanetModel[][]
  spice: number
  shipCord: ShipCordModel
  savedMap: SavedMapModel | null
  tableMode: TableModeType
  lvl: number
}
