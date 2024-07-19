import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SelectListService {
  constructor(private http: HttpClient) {}

  public getFormationNameList() {
    return this.http.get<any>(
      `${environment.doApiUrl}Formations/FormationName`
    );
  }
  public getTubingSizeList() {
    return this.http.get<any>(`${environment.doApiUrl}Tubings/TubingSize`);
  }
  public getSectionsHoleSizeList() {
    return this.http.get<any>(`${environment.doApiUrl}Sections/HoleSize`);
  }
  getFormationName(): Promise<string[]> {
    return new Promise((resolve) => {
      this.getFormationNameList().subscribe((res) => {
        if (res.result) {
          resolve(res.result.map((x: any) => x.name) as string[]);
        } else resolve([]);
      });
    });
  }
  getTubingSize(): Promise<string[]> {
    return new Promise((resolve) => {
      this.getTubingSizeList().subscribe((res) => {
        if (res.result) {
          resolve(res.result.map((x: any) => x.value) as any[]);
        } else resolve([]);
      });
    });
  }
  getSectionsHoleSize(): Promise<string[]> {
    return new Promise((resolve) => {
      this.getSectionsHoleSizeList().subscribe((res) => {
        if (res.result) {
          resolve(res.result.map((x: any) => x.value) as any[]);
        } else resolve([]);
      });
    });
  }
}
