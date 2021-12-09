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
        animate('2000ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('2000ms', style({ opacity: 0 }))
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
    console.log(event)
    if (event.toState === 'void') {
      this.hideHello.emit()
    }
  }
}
