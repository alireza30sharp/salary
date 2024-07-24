import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import * as _organisms from "./components/organisms";
import { OrganizationUnitsRoutingModule } from "./organization-units-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { OrganizationUnitsComponent } from "./organization-units.component";
import { ThemeModule } from "../../@theme/theme.module";
import { NbLayoutModule, NbThemeModule } from "@nebular/theme";

@NgModule({
  declarations: [
    _pages.OrganizationUnitsTreeComponent,
    _pages.OrganizationUnitsEditComponent,
    _pages.OrganizationUnitsAddComponent,
    _organisms.OrganizationUnitsFormComponent,
    OrganizationUnitsComponent,
  ],
  imports: [CommonModule, OrganizationUnitsRoutingModule, SharedModule],
})
export class OrganizationUnitsModule {}
