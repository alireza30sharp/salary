import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject, Subject, of } from "rxjs";
import { ApiUrlService } from "../api-url.service";
import { catchError, tap } from "rxjs/operators";
import { WorkShopsOptionsInterFace } from "../shared/interfaces/work-shops-options.interFace";

@Injectable({ providedIn: "root" })
export class ChangeWorkShopsService {
  WorkShopsSource$ = new Subject<string>();
  activeWorkShopsSource$ = this.WorkShopsSource$.asObservable();
  //-
  employeListSource$ = new Subject<string>();
  employeListData$ = this.employeListSource$.asObservable();
  //
  //-
  benefitDeductionsSource$ = new Subject<string>();
  benefitDeductionsData$ = this.benefitDeductionsSource$.asObservable();
  //-
  private _WorkShopsOptionsSource$ = new ReplaySubject<
    Array<WorkShopsOptionsInterFace>
  >();
  WorkShopsOptionsData$ = this._WorkShopsOptionsSource$.asObservable();
  setWorkShopsOptions(list: Array<WorkShopsOptionsInterFace>) {
    this._WorkShopsOptionsSource$.next(list);
  }
  constructor() {}
}
