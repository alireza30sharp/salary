import { Component } from "@angular/core";
import { ClientPrerequisitsService } from "../../services/client-prerequisits";

@Component({
  selector: "app-monthly-performance",
  templateUrl: "./monthly-performance.component.html",
})
export class MonthlyPerformanceComponent {
  constructor(private clientPrerequis: ClientPrerequisitsService) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
    clientPrerequis.getBenefitDaductionClientPrerequisites().subscribe();
  }
}
