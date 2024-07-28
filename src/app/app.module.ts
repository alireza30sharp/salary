import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import { ThemeModule } from "./@theme/theme.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from "@nebular/theme";
import { SharedModule } from "./shared/shared.module";
import {
  NbAuthJWTInterceptor,
  NbAuthModule,
  NbPasswordAuthStrategy,
  defaultAuthOptions,
  passwordStrategyOptions,
} from "./auth";
import { AuthGuard } from "./shared/guard/auth-guard.service";
import { AuthLoginGuard } from "./shared/guard/auth-guard-login.service";
import { LicenseManager } from "ag-grid-enterprise";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ShepherdService } from "angular-shepherd";
import { ClientPrerequisitsService } from "./services/client-prerequisits";
import { NgxWebstorageModule } from "ngx-webstorage";
import { ChangeWorkShopsService } from "./services/change-work-shop.service";

export function GetClientPrerequisits(
  clientPrerequis: ClientPrerequisitsService,
  changeWorkShopsService: ChangeWorkShopsService
) {
  const fn = () =>
    new Promise<void>((resolve, rej) => {
      clientPrerequis.getClientPrerequisits(true).subscribe((res) => {
        if (res.isOk && res.data) {
          let WorkShopsOptions = res.data
            .find((f) => f.cacheKey == "WorkShops")
            .cacheData.map((item) => ({
              label: item.workShopName,
              value: item.id,
              isDefault: item.isDefault,
            }));
          let employeList = res.data
            .find((f) => f.cacheKey == "Employees")
            .cacheData.map((item) => ({
              label: item.fullName,
              value: item.id,
            }));
          let benefitDeductions = res.data
            .find((f) => f.cacheKey == "BenefitDeductions")
            .cacheData.map((item) => ({
              label: item.fullName,
              value: item.id,
            }));
          changeWorkShopsService.setWorkShopsOptions(WorkShopsOptions);
          changeWorkShopsService.setEmployeList(employeList);
          changeWorkShopsService.setBenefitDeductionsList(benefitDeductions);
        }
        resolve();
      });
    });
  return fn;
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbAuthModule.forRoot(defaultAuthOptions),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    SharedModule,
    CoreModule.forRoot(),
    NgxWebstorageModule.forRoot({
      prefix: "SALARY",
      separator: ".",
      caseSensitive: false,
    }),
    NgbModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    ShepherdService,
    ClientPrerequisitsService,
    AuthGuard,
    AuthLoginGuard,
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },

    {
      provide: APP_INITIALIZER,
      useFactory: GetClientPrerequisits,
      deps: [ClientPrerequisitsService, ChangeWorkShopsService],
      multi: true,
    },
  ],
})
export class AppModule {
  constructor() {
    (LicenseManager.prototype as any).showValid = true;
    LicenseManager.prototype.validateLicense = () => {
      if ((LicenseManager.prototype as any).showValid) {
      }
      (LicenseManager.prototype as any).showValid = false;
      return true;
    };

    LicenseManager.prototype.isDisplayWatermark = () => {
      if ((LicenseManager.prototype as any).showValid) {
      }
      (LicenseManager.prototype as any).showValid = false;
      return false;
    };

    LicenseManager.prototype.getWatermarkMessage = () => {
      if ((LicenseManager.prototype as any).showValid) {
      }
      (LicenseManager.prototype as any).showValid = false;
      return "valid";
    };
  }
}
