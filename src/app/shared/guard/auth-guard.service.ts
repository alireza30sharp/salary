import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree  {
    return new Promise((resolve) => {
      this.authService.isAuthenticated().subscribe((res) => {
        if (!res) {
          this.router.navigate(["auth"]);
        } else {
          resolve(res);
        }
      });
    });
  }
}