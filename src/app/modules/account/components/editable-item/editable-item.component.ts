import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-editable-item',
  templateUrl: './editable-item.component.html',
  styleUrls: ['./editable-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableItemComponent {
  @Input('labelText') label: string
  @Input('savedValue') saved: string | undefined | null
  @Input() control: any
  @Input() isPasswordInput = false

  @Output('onEnter') enter = new EventEmitter<void>()

  isEdit = new BehaviorSubject<boolean>(false)
  form = new FormControl(null)

  openEdit() {
    this.control.patchValue(this.saved)
    this.isEdit.next(true)
  }

  close() {
    this.isEdit.next(false)
  }

  change() {
    this.enter.emit()
    this.isEdit.next(false)
  }
}
