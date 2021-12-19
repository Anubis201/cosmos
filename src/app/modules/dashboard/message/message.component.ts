import { animate, style, transition, trigger } from '@angular/animations'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AnimationEvent } from "@angular/animations"
import { TableModeType } from 'src/app/models/map/table-mode.type'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  animations: [
    trigger('text', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })) // 1500ms
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 })) // 1500ms
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
