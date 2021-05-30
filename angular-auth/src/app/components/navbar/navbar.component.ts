import { UserService } from './../../services/user.service';
import { Emitters } from './../../emitters/emitters';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authenticated: boolean = false;
  constructor(private user: UserService) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }

  submit(): void {
    this.user.logout()
  }
}
