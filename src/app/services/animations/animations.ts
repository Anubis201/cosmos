import { animate, animation, style } from '@angular/animations'

export const blurAnimation = animation([
  style({ filter: '{{ blurStart }}' }),
  animate('{{ time }}', style({ filter: '{{ blurClose }}' }))
])

export const opacityAnimation = animation([
  style({ opacity: '{{ opacityStart }}' }),
  animate('{{ time }} {{ delay }}', style({ opacity: '{{ opacityClose }}' }))
])

export const transformAnimation = animation([
  style({ transform: '{{ transformStart }}' }),
  animate('{{ time }}', style({ transform: '{{ transformClose }}' }))
])
