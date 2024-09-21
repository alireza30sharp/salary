import { Component } from "@angular/core";
import { ClientPrerequisitsService } from "../../../services/client-prerequisits";

@Component({
  selector: "app-employment-order",
  templateUrl: "./employment-order.component.html",
})
export class EmploymentOrderComponent {
  constructor(private clientPrerequis: ClientPrerequisitsService) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
    clientPrerequis
      .getOrganizationUnitClientPrerequisites(true)
      .subscribe((res) => {});
    clientPrerequis
      .GetOrganizationPostClientPrerequisites(true)
      .subscribe((res) => {});
    clientPrerequis
      .GetPaymentLocationClientPrerequisites(true)
      .subscribe((res) => {});
    clientPrerequis
      .GetEmploymentTypeClientPrerequisites(true)
      .subscribe((res) => {});
  }
}
