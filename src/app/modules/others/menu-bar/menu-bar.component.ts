import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { MenuItem } from 'primeng/api'
import { first } from 'rxjs/operators'
import { UploadService } from 'src/app/services/upload.service'

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  @Input() isAuth: boolean

  @Output() logout = new EventEmitter<void>()

  constructor(
    private uploadService: UploadService,
    private fireAuth: AngularFireAuth,
  ) {}

  items: MenuItem[]
  avatar: string
  isLoading = false

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
    this.fireAuth.user.pipe(first()).subscribe(() => {
      this.getAvatar()
    })

    this.uploadService.percantage.subscribe(value => {
      if (value === 100) this.getAvatar()
    })
  }

  getAvatar() {
    this.isLoading = true
    this.uploadService.getAvatar().subscribe({
      next: url => {
        this.avatar = url
        this.isLoading = false
      },
      error: () => {
        this.avatar = '/assets/img/defualt.png'
        this.isLoading = false
      }
    })
  }
}
