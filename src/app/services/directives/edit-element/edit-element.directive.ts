import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
  selector: '[appEditElement]'
})
export class EditElementDirective {
  @Input() appEditElement: string | null | undefined = ''

  constructor(private element: ElementRef) {
    element.nativeElement.style.cursor = 'pointer'
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.innerHTML = this.appEditElement + '<i style="margin-left: 10px;" class="pi pi-pencil"></i>'
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.innerHTML = this.appEditElement
  }
}
