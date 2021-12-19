import { StationPrizesEnum } from '../map/enums/station-prizes.enum'
import { StationPrizesModel } from '../map/station-prizes.model'

export const StationPrizesData: StationPrizesModel[] = [
  {
    type: StationPrizesEnum.spice,
    value: 50,
    chance: '20%'
  },
  {
    type: StationPrizesEnum.spice,
    value: 25,
    chance: '35%',
  },
  {
    type: StationPrizesEnum.spice,
    value: 100,
    chance: '15%'
  },
  {
    type: StationPrizesEnum.nothing,
    value: null,
    chance: '20%'
  },
  {
    type: StationPrizesEnum.death,
    value: null,
    chance: '10%',
  }
]
