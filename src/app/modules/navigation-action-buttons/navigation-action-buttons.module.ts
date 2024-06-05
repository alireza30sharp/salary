import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@share/shared.module';
import * as _pages from './pages';
import * as _organisms from './components/organisms';

import { NavigationActionButtonsRoutingModule } from './navigation-action-buttons-routing.module';
import { NavigationActionButtonsComponent } from './navigation-action-buttons.component';

@NgModule({
  declarations: [
    NavigationActionButtonsComponent,
    _pages.NavigationActionButtonsListComponent,
    _pages.NavigationActionButtonsAddComponent,
    _pages.NavigationActionButtonsEditComponent,
    _pages.NavigationActionButtonsTreeComponent,
    _organisms.NavigationActionButtonsFormComponent,
    _organisms.NavigationActionButtonsTreeFormComponent,
  ],
  imports: [CommonModule, NavigationActionButtonsRoutingModule, SharedModule],
})
export class NavigationActionButtonsModule {}
