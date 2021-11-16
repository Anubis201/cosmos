import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-editable-item',
  templateUrl: './editable-item.component.html',
  styleUrls: ['./editable-item.component.css']
})
export class EditableItemComponent {
  @Input('labelText') label: string
  @Input('savedValue') saved: string | undefined | null
  @Input() control: any
  @Input() isPasswordInput = false

  @Output('onEnter') enter = new EventEmitter<string>()

  form = new FormControl(null)
}
