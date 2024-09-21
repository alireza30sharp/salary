import { Component } from "@angular/core";
import { ClientPrerequisitsService } from "../../../services/client-prerequisits";

@Component({
  selector: "app-salary-calculation",
  templateUrl: "./salary-calculation.component.html",
})
export class SalaryCalculationComponent {
  constructor(private clientPrerequis: ClientPrerequisitsService) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
    clientPrerequis.getBenefitDaductionClientPrerequisites().subscribe();
  }
}
