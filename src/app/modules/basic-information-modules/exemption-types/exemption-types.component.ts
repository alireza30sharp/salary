import { Component } from "@angular/core";
import { ClientPrerequisitsService } from "../../../services/client-prerequisits";

@Component({
  selector: "app-exemption-types",
  templateUrl: "./exemption-types.component.html",
})
export class ExemptionTypesComponent {
  constructor(private clientPrerequis: ClientPrerequisitsService) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
    clientPrerequis.getBenefitDaductionClientPrerequisites().subscribe();
  }
}
