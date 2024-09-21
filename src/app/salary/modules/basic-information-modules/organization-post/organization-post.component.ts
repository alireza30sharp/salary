import { Component } from "@angular/core";
import { ClientPrerequisitsService } from "../../../../services/client-prerequisits";

@Component({
  selector: "app-organization-post",
  templateUrl: "./organization-post.component.html",
})
export class OrganizationPostComponent {
  constructor(private clientPrerequis: ClientPrerequisitsService) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
    clientPrerequis.getBenefitDaductionClientPrerequisites().subscribe();
  }
}
