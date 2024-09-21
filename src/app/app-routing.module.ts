import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from "./auth";
import { AuthGuard } from "./shared/guard/auth-guard.service";
import { AuthLoginGuard } from "./shared/guard/auth-guard-login.service";
// import {
//   NbAuthComponent,
//   NbLoginComponent,
//   NbRegisterComponent,
//   NbLogoutComponent,
//   NbRequestPasswordComponent,
//   NbResetPasswordComponent,
// } from '@nebular/auth';
export const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: "salary",
    loadChildren: () =>
      import("./salary/salary.module").then((m) => m.SalaryModule),
  },
  // {
  //   path: "organization-units",
  //   loadChildren: () =>
  //     import("./modules/organization-units/organization-units.module").then(
  //       (m) => m.OrganizationUnitsModule
  //     ),
  // },
  {
    path: "auth",
    component: NbAuthComponent,
    children: [
      {
        path: "",
        component: NbLoginComponent,
      },
      {
        path: "login",
        component: NbLoginComponent,
        canActivate: [AuthLoginGuard],
      },
      {
        path: "register",
        component: NbRegisterComponent,
        canActivate: [AuthLoginGuard],
      },
      {
        path: "logout",
        component: NbLogoutComponent,
      },
      {
        path: "request-password",
        component: NbRequestPasswordComponent,
        canActivate: [AuthLoginGuard],
      },
      {
        path: "reset-password",
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: "", redirectTo: "salary", pathMatch: "full" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
