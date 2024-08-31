import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  DEFAULT_MEDIA_BREAKPOINTS,
  NbLayoutDirection,
  NbInputModule,
  NbCardModule,
  NbCheckboxModule,
  NbRadioModule,
  NbStepperModule,
} from "@nebular/theme";
import { NbSecurityModule } from "@nebular/security";

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  TinyMCEComponent,
} from "./components";
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from "./pipes";
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from "./layouts";
import { DEFAULT_THEME } from "./styles/theme.default";
import { COSMIC_THEME } from "./styles/theme.cosmic";
import { CORPORATE_THEME } from "./styles/theme.corporate";
import { DARK_THEME } from "./styles/theme.dark";
import { SharedModule } from "../shared/shared.module";
import { kiSelectHeaderComponent } from "./components/ki-select-header/ki-select-header.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { DynamicTabsComponent } from "./components/dynamic-tabs/dynamic-tabs.component";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
} from "@angular/cdk/drag-drop";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { SafeUrlPipe } from "./pipes/safeUrl";

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbInputModule,
  NbCardModule,
  NbButtonModule,
  NbActionsModule,
  NbUserModule,
  NbCheckboxModule,
  NbRadioModule,
  NbStepperModule,
  NbIconModule,
  NbEvaIconsModule,
  NbContextMenuModule,
];
const COMPONENTS = [
  kiSelectHeaderComponent,
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  DynamicTabsComponent,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
  SafeUrlPipe,
];

@NgModule({
  imports: [
    DragDropModule,

    FormsModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    ...NB_MODULES,
  ],
  exports: [CommonModule, ...PIPES, ...COMPONENTS, ...NB_MODULES],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: "default",
          },
          [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME],
          DEFAULT_MEDIA_BREAKPOINTS,
          NbLayoutDirection.RTL
        ).providers,
      ],
    };
  }
}
