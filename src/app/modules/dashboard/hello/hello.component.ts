import { animate, style, transition, trigger } from '@angular/animations'
import { Component, EventEmitter, Output } from '@angular/core'
import { AnimationEvent } from "@angular/animations"

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
  animations: [
    trigger('text', [
      transition('void => open', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })) // 1500ms
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 })) // 1500ms
      ]),
    ]),
  ]
})
export class HelloComponent {
  isOpen = true

  @Output() hideHello = new EventEmitter<void>()

  onAnimationEvent(event: AnimationEvent) {
    if (event.toState === 'open') {
      this.isOpen = false
    }

    if (event.toState === 'void') {
      this.hideHello.emit()
    }
  }
}
