import { InjectionToken } from '@angular/core'

export const TR_SIZE = new InjectionToken<number>('TrSize')
export const TD_SIZE = new InjectionToken<number>('TDSize')

export const mapSizeToken = [
  { provide: TR_SIZE, useValue: 5 },
  { provide: TD_SIZE, useValue: 6 },
]
