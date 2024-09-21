import { Component } from "@angular/core";
import { ClientPrerequisitsService } from "../../../../services/client-prerequisits";

@Component({
  selector: "app-payment-location",
  templateUrl: "./payment-location.component.html",
})
export class PaymentLocationComponent {
  constructor(private clientPrerequis: ClientPrerequisitsService) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
    clientPrerequis.getBenefitDaductionClientPrerequisites().subscribe();
  }
}
