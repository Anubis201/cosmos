import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-editable-image',
  templateUrl: './editable-image.component.html',
  styleUrls: ['./editable-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableImageComponent {
  @Input() isEdit: boolean
  @Input() avatar: string
  @Input() percentage: number | undefined

  @Output() upload = new EventEmitter<any>()

  showIcon = false
}
