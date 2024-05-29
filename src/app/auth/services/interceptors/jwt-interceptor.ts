import { Inject, Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { NbAuthToken } from "../token/token";
import { NbAuthService } from "../auth.service";
import { NB_AUTH_OPTIONS } from "@nebular/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class NbAuthJWTInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {}
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.isAuthenticatedOrRefresh().pipe(
      switchMap((authenticated) => {
        if (authenticated) {
          return this.authService.getToken().pipe(
            switchMap((token: any) => {
              const JWT = `Bearer ${token.getValue()}`;
              req = req.clone({
                setHeaders: {
                  Authorization: JWT,
                },
              });
              return next.handle(req).pipe(
                catchError((err) => {
                  if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                      this.router.navigate(["auth"]);
                    }
                  }
                  return throwError(() => err);
                })
              );
            })
          );
        } else {
          //   this.authService.signing()
          return next.handle(req).pipe(
            catchError((err) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this.router.navigate(["auth"]);
                }
              }
              return throwError(() => err);
            })
          );
        }
      })
    );
  }
}
