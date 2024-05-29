import { Component } from "@angular/core";

@Component({
  selector: "ngx-footer",
  styleUrls: ["./footer.component.scss"],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a target="_blank">Kiasystem</a></b> 1403
    </span>
    <div class="socials">
      <a class="ion ion-social-github"></a>
      <a class="ion ion-social-facebook"></a>
      <a class="ion ion-social-twitter"></a>
      <a class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {}
