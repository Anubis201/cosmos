import { StationPrizesEnum } from '../map/enums/station-prizes.enum'
import { StationPrizesModel } from '../map/station-prizes.model'

// 9 length
export const StationPrizesData: StationPrizesModel[] = [
  {
    type: StationPrizesEnum.spice,
    value: 25,
  },
  {
    type: StationPrizesEnum.spice,
    value: 25,
  },
  {
    type: StationPrizesEnum.spice,
    value: 25,
  },
  {
    type: StationPrizesEnum.spice,
    value: 50,
  },
  {
    type: StationPrizesEnum.spice,
    value: 50,
  },
  {
    type: StationPrizesEnum.spice,
    value: 100,
  },
  {
    type: StationPrizesEnum.nothing,
    value: null,
  },
  {
    type: StationPrizesEnum.nothing,
    value: null,
  },
  {
    type: StationPrizesEnum.death,
    value: null,
  }
]
