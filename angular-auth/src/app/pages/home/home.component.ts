import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  authenticated: boolean = false;
  message: any;
  jwt: string = this.cookie.get('jwt');
  constructor(
    private cookie: CookieService,
    private user: UserService,
  ) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    if (this.user.verify()) {
      Emitters.authEmitter.emit(true);
      console.log('ok bro 😂');
    } else {
      Emitters.authEmitter.emit(false);
    }
  }
}
