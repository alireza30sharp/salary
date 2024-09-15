import { Component } from "@angular/core";
import { ClientPrerequisitsService } from "../../../services/client-prerequisits";

@Component({
  selector: "app-educatio-evidences",
  templateUrl: "./educatio-evidences.component.html",
})
export class EducationEvidencesComponent {
  constructor(private clientPrerequis: ClientPrerequisitsService) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
    clientPrerequis.getBenefitDaductionClientPrerequisites().subscribe();
  }
}
