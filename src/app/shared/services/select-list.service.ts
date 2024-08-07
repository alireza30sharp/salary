import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SelectListService {
  constructor(private http: HttpClient) {}
  getSectionsHoleSize(): Promise<any[]> {
    return new Promise((resolve) => {
      let a = [
        { label: "alireza", value: "5" },
        { label: "علیرضا", value: "6" },
        { label: "یاصر", value: "7" },
        { label: "امین", value: "4" },
        { label: "حامد", value: "5" },
        { label: "احمد", value: "6" },
      ];
      resolve(a);
    });
  }
}
