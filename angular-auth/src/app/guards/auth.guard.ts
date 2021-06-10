import { Emitters } from './../emitters/emitters';
import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private routes: Router, private user: UserService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.user.verify()) {
      Emitters.authEmitter.emit(true);
      return true;
    } else {
      this.routes.navigate(['/login']);
      Emitters.authEmitter.emit(false);
      return false;
    }
  }
}
