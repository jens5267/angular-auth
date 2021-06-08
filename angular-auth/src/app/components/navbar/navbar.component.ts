import { Emitters } from './../../emitters/emitters';
import { Component, OnInit } from '@angular/core';

import { AuthServiceService } from './../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authenticated: boolean = false;
  constructor(private auth: AuthServiceService) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }

  submit(): void {
    this.auth.logout();
  }
}
