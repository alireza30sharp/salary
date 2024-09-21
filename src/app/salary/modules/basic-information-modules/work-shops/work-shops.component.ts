import { Component } from "@angular/core";
import { ClientPrerequisitsService } from "../../../../services/client-prerequisits";

@Component({
  selector: "app-work-shops",
  templateUrl: "./work-shops.component.html",
})
export class WorkShopsComponent {
  constructor(private clientPrerequis: ClientPrerequisitsService) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
    clientPrerequis.getBenefitDaductionClientPrerequisites().subscribe();
  }
}
