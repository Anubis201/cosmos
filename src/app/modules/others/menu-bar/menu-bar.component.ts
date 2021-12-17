import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  @Input() isAuth: boolean

  @Output() logout = new EventEmitter<void>()

  items: MenuItem[]

  ngOnInit() {
    this.items = [
      {
        label: $localize `Dashboard`,
        routerLink: '/dashboard',
      },
      // {
      //   label: $localize `About`,
      //   routerLink: '/about',
      // },
    ]
  }
}
