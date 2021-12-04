import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-left-aside',
  templateUrl: './left-aside.component.html',
  styleUrls: ['./left-aside.component.css']
})
export class LeftAsideComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  get name() {
    return this.authService.user?.email
  }

  ngOnInit(): void {
  }
}
