import { Component } from "@angular/core";
import { ClientPrerequisitsService } from "../../services/client-prerequisits";

@Component({
  selector: "app-advance",
  templateUrl: "./advance.component.html",
})
export class AdvanceComponent {
  constructor(private clientPrerequis: ClientPrerequisitsService) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
  
  }
}
