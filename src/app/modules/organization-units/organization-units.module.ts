import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as _pages from './pages';
import * as _organisms from './components/organisms';
import { OrganizationUnitsComponent } from './organization-units.component';
import { OrganizationUnitsRoutingModule } from './organization-units-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    OrganizationUnitsComponent,
    _pages.OrganizationUnitsTreeComponent,
    _organisms.OrganizationUnitsFormComponent,
  ],
  imports: [CommonModule, OrganizationUnitsRoutingModule, SharedModule],
})
export class OrganizationUnitsModule {}
