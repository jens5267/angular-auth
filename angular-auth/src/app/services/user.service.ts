import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Emitters } from '../emitters/emitters';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {}
  verify(jwt: string, refresh: string) {
    if (jwt.length < 1 || refresh.length < 1) {
      Emitters.authEmitter.emit(false);
    } else {
      this.http
        .post(`${environment.backend}/api/auth/jwt/verify`, { token: jwt })
        .subscribe(
          (res: any) => {
            Emitters.authEmitter.emit(true);
            this.router.navigate(['/']);
          },
          (err: any) => {
            this.refresh(refresh);
          }
        );
    }
  }
  refresh(token: string) {
    this.http
      .post(`${environment.backend}/api/auth/jwt/refresh/`, { refresh: token })
      .subscribe(
        (res: any) => {
          Emitters.authEmitter.emit(true);
          this.setJwt(res['access']);
          this.router.navigate(['/']);
        },
        (err: any) => {
          Emitters.authEmitter.emit(false);
          this.router.navigate(['/']);
        }
      );
  }
  setJwt(token: string) {
    this.cookie.set('jwt', token);
  }
  logout() {
    this.cookie.delete('jwt');
    this.cookie.delete('refresh');
    window.location.reload();
  }
}
