import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(http: HttpClient, cookie: CookieService) {}

  refresh(this: any) {
    let data = { refresh: this.cookie.get('refresh') };
    this.http
      .post(`${environment.backend}/api/auth/jwt/refresh/`, data)
      .subscribe((res: any) => {
        this.cookie.set('jwt', res['access']);
        this.cookie.set('refresh', res['refresh']);
      });
  }
}
