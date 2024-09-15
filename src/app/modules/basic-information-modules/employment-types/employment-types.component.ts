import { Component } from "@angular/core";
import { ClientPrerequisitsService } from "../../../services/client-prerequisits";

@Component({
  selector: "app-employment-types",
  templateUrl: "./employment-types.component.html",
})
export class EmploymentTypesComponent {
  constructor(private clientPrerequis: ClientPrerequisitsService) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
    clientPrerequis.getBenefitDaductionClientPrerequisites().subscribe();
  }
}
