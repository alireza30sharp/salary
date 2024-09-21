import { Component } from "@angular/core";
import { ClientPrerequisitsService } from "../../../../services/client-prerequisits";

@Component({
  selector: "app-education-fields",
  templateUrl: "./education-fields.component.html",
})
export class EducationFieldsComponent {
  constructor(private clientPrerequis: ClientPrerequisitsService) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
    clientPrerequis.getBenefitDaductionClientPrerequisites().subscribe();
  }
}
