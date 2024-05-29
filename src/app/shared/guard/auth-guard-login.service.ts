import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { NbAuthService } from "../../auth";

@Injectable()
export class AuthLoginGuard implements CanActivate {
  constructor(private authService: NbAuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve) => {
      this.authService.isAuthenticated().subscribe((res) => {
        if (res) {
          this.router.navigate(["salary"]);
        } else {
          resolve(!res);
        }
      });
    });
  }
}
