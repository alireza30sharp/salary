import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject, Subject, of } from "rxjs";
import { ApiUrlService } from "../api-url.service";
import { catchError, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ChangeWorkShopsService {
  WorkShopsSource$ = new Subject<string>();
  activeWorkShopsSource$ = this.WorkShopsSource$.asObservable();
  constructor() {}
}
