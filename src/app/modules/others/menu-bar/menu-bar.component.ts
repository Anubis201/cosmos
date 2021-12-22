import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { MenuItem } from 'primeng/api'
import { BehaviorSubject } from 'rxjs'
import { UploadService } from 'src/app/services/upload.service'

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarComponent implements OnInit {
  @Input() isAuth: boolean

  @Output() logout = new EventEmitter<void>()

  isLoading = new BehaviorSubject<boolean>(false)

  constructor(
    private uploadService: UploadService,
    private fireAuth: AngularFireAuth,
  ) {}

  items: MenuItem[]
  avatar: string

  ngOnInit() {
    this.items = [
      {
        label: $localize `Dashboard`,
        routerLink: '/dashboard',
      },
    ]

    this.fireAuth.user.pipe().subscribe(user => {
      if (user?.uid) {
        this.getAvatar(user.uid)
      }
    })

    this.uploadService.percantage.subscribe(value => {
      if (value === 100) this.getAvatar()
    })
  }

  getAvatar(uid: undefined | string = undefined) {
    this.isLoading.next(true)
    this.uploadService.getAvatar(uid as string).subscribe({
      next: url => {
        this.avatar = url
        this.isLoading.next(false)
      },
      error: () => {
        this.avatar = '/assets/img/defualt.png'
        this.isLoading.next(false)
      }
    })
  }
}
