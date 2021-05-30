import { Emitters } from './../../emitters/emitters';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  message: any;
  jwt: string = this.cookie.get('jwt');
  refresh_token: string = this.cookie.get('refresh');
  constructor(private cookie: CookieService, private user: UserService) {}

  ngOnInit(): void {
      this.user.verify(this.jwt, this.refresh_token);
  }
}
