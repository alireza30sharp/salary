import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Paths } from '@share/utilities/paths';
import * as _pages from './pages';
import { NavigationActionButtonsComponent } from './navigation-action-buttons.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationActionButtonsComponent,
    children: [
      {
        path: Paths.navigationActionButtons.list().path,
        component: _pages.NavigationActionButtonsListComponent,
      },
      {
        path: Paths.navigationActionButtons.add().path,
        component: _pages.NavigationActionButtonsAddComponent,
      },
      {
        path: Paths.navigationActionButtons.edit().path,
        component: _pages.NavigationActionButtonsEditComponent,
      },
      {
        path: Paths.navigationActionButtons.navigationTree().path,
        component: _pages.NavigationActionButtonsTreeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavigationActionButtonsRoutingModule {}
