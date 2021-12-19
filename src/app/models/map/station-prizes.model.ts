import { StationPrizesEnum } from './enums/station-prizes.enum'

export interface StationPrizesModel {
  type: StationPrizesEnum
  value: number | null
  chance: string
}
