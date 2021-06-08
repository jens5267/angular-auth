import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {}

  register(data: any): Observable<any> {
    return this.http.post(`${environment.backend}/api/auth/register`, data);
  }
  login(data: any): Observable<any> {
    return this.http.post(`${environment.backend}/api/auth/login`, data);
  }
  logout(): void {
    this.clear();
    this.router.navigate(['/']);
    return window.location.reload();
  }
  clear() {
    this.cookie.delete('jwt');
    this.cookie.delete('refresh');
  }
}
