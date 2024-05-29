import { Injectable } from "@angular/core";
import { ShepherdService } from "angular-shepherd";
import { defaultStepOptions } from "../models/shepherd-config";
import Step from "shepherd.js/src/types/step";

@Injectable({
  providedIn: "root",
})
export class TourService {
  tour: ShepherdService;
  constructor(tour: ShepherdService) {
    this.tour = tour;
    this.tour.defaultStepOptions = defaultStepOptions as any;
    this.tour.modal = true;
    this.tour.confirmCancel = false;
  }

  addSteps(step: Array<any>) {
    this.tour.addSteps(step);
    this.tour.start();
  }
}
