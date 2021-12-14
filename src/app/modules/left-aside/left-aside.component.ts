import { Component, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'
import { UserDataModel } from 'src/app/models/users/user-data.model'
import { AuthService } from 'src/app/services/auth.service'
import { UsersService } from 'src/app/services/collections/users.service'

@Component({
  selector: 'app-left-aside',
  templateUrl: './left-aside.component.html',
  styleUrls: ['./left-aside.component.css']
})
export class LeftAsideComponent implements OnInit {
  userData: UserDataModel
  isLoadingUserData = true

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private toast: MessageService,
  ) { }

  get name() {
    return this.authService.user?.email
  }

  ngOnInit() {
    this.getUserInfo()
  }

  updateWork() {
    // this.usersService.updateUserData({ work: this.userData.work + 1, lastTimeWorkUpdate: new Date() })
    // .then(() => {
    //   this.getUserInfo()
    // })
    // .catch(() => {
    //   this.toast.add({ severity: 'error', summary: $localize `Error` })
    // })
  }

  private getUserInfo() {
    // this.isLoadingUserData = true
    // this.usersService.getUserData().subscribe({
    //   next: user => {
    //     this.userData = user.data() as UserDataModel
    //     this.isLoadingUserData = false
    //   },
    //   error: () => {
    //     this.toast.add({ severity: 'error', summary: $localize `Failed to get user data` })
    //     this.isLoadingUserData = false
    //   }
    // })
  }
}
