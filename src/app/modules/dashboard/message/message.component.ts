import { transition, trigger, useAnimation } from '@angular/animations'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AnimationEvent } from "@angular/animations"
import { TableModeType } from 'src/app/models/map/table-mode.type'
import { opacityAnimation } from 'src/app/services/animations/animations'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  animations: [
    trigger('text', [
      transition(':enter', [
        useAnimation(opacityAnimation, {
          params: {
            opacityStart: '0',
            opacityClose: '1',
            time: '1000ms',
            delay: '0ms'
          }
        })
      ]),
      transition(':leave', [
        useAnimation(opacityAnimation, {
          params: {
            opacityStart: '1',
            opacityClose: '0',
            time: '1000ms',
            delay: '0ms'
          }
        })
      ]),
    ]),
  ]
})
export class MessageComponent {
  @Input() mode: TableModeType
  @Input() lvl: number | null

  @Output() hideHello = new EventEmitter<void>()
  @Output() tryAgain = new EventEmitter<void>()
  @Output() nextLevel = new EventEmitter<void>()
  @Output() backLevel = new EventEmitter<void>()

  isOpen = true

  get helloAnimation() {
    return this.mode === 'hello' ? this.isOpen ? 'open' : 'closed' : false
  }

  onAnimationEvent(event: AnimationEvent) {
    if (event.toState === 'open') {
      this.isOpen = false
    }

    if (event.toState === 'void') {
      this.hideHello.emit()
    }
  }
}
