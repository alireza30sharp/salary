import { Component } from "@angular/core";
import { ClientPrerequisitsService } from "../../../../services/client-prerequisits";

@Component({
  selector: "app-insurance-type",
  templateUrl: "./insurance-type.component.html",
})
export class InsuranceTypeComponent {
  constructor(private clientPrerequis: ClientPrerequisitsService) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
    clientPrerequis.getBenefitDaductionClientPrerequisites().subscribe();
  }
}
