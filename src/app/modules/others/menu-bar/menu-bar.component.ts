import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[]

  @Output() logout = new EventEmitter<void>()

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'Project'},
            {label: 'Other'},
          ]
        },
          {label: 'Open'},
          {label: 'Quit'}
        ]
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        items: [
          {label: 'Account', icon: 'pi pi-fw pi-user', routerLink: 'account'},
        ]
      }
    ]
  }
}
