import { UserService } from './../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private cookie: CookieService,
    private http: HttpClient,
    private user: UserService
  ) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.cookie.get('jwt')}`,
    });
    this.http
      .get(`${environment.backend}/api/auth/users/me/`, { headers: headers })
      .subscribe(
        (res: any) => {},
        (err: any) => {
          this.user.refresh();
        }
      );
  }
}
