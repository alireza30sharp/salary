import { Component } from "@angular/core";
import { ClientPrerequisitsService } from "../../../services/client-prerequisits";

@Component({
  selector: "app-wage-orders",
  templateUrl: "./wage-orders.component.html",
})
export class WageOrdersComponent {
  constructor(private clientPrerequis: ClientPrerequisitsService) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
    clientPrerequis.getBenefitDaductionClientPrerequisites().subscribe();
  }
}
