import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import {
  PinCodeComponent,
  ReportComponent,
  ToolsBarComponent,
  SkeletonFormLoadingComponent,
  TreeComponent,
  GeneralHeaderComponent,
  GeneralLayoutComponent,
  GeneralPanelComponent,
  PushPullPanelComponent,
  DropdownComponent,
  ContextMenuComponent,
  AlertComponent,
  ListViewFilterComponent,
} from "./components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpRequest } from "@angular/common/http";
import { NgSelectModule } from "@ng-select/ng-select";
import { NbIconModule, NbSpinnerModule, NbToastrModule } from "@nebular/theme";
import * as Ag from "ag-grid-angular";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import * as grid from "./components/ag-grid";
import { ThemeModule } from "../@theme/theme.module";
import { FormsModule as ngFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { AngularSplitModule } from "angular-split";
import * as kiComponent from "./ki-components";
import { HighLightPipe } from "./pipes/highlight.pipe";
import { DevexpressModule } from "./devexpress.module";
import { DatePickerModule } from "./date-picker.module";
const component = [
  ContextMenuComponent,
  TreeComponent,
  ReportComponent,
  PinCodeComponent,
  ToolsBarComponent,
  SkeletonFormLoadingComponent,
  GeneralHeaderComponent,
  GeneralLayoutComponent,
  GeneralPanelComponent,
  PushPullPanelComponent,
  AlertComponent,
  DropdownComponent,
  ListViewFilterComponent,
  grid.AgLink,
  grid.AssignmentCellRenderer,
  grid.CellEditable,
  grid.CheckClickable,
  grid.ClickableAgent,
  grid.ConvertDateCellRenderer,
  grid.DeleteCellRenderer,
  grid.FlagStateCellRenderer,
  grid.percentCalc,
  grid.SelectUnitComponent,
  grid.CurrencyRendererComponent,
  grid.AgGridDataComponent,
  grid.CellEditorNumberComponent,
  kiComponent.KiButtonComponent,
  kiComponent.KiCheckboxComponent,
  kiComponent.KiConfirmationComponent,
  kiComponent.KiDatePickerComponent,
  kiComponent.KiFileInputComponent,
  kiComponent.KiFormGroupComponent,
  kiComponent.KiInputComponent,
  kiComponent.KiSpinnerComponent,
  kiComponent.KiSwitchComponent,
  kiComponent.KiTabComponent,
  kiComponent.KiTabGroupComponent,
  kiComponent.kiSelectComponent,
  kiComponent.kiModalComponent,
  kiComponent.UiTileComponent,
  kiComponent.KiValidationComponent,
  kiComponent.KiTextareaComponent,
  HighLightPipe,
];
@NgModule({
  declarations: [component],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
    CommonModule,
    NbSpinnerModule,
    Ag.AgGridModule,
    NgbModule,
    AngularSplitModule,
    ThemeModule.forRoot(),
    NbIconModule,
    NbToastrModule.forRoot({
      toastClass: "z-index-9",
      duration: 9000,
      limit: 1002,
    }),
    ngFormsModule,
    DevexpressModule,
    NgxMaskModule.forRoot(),
    DatePickerModule,
  ],

  exports: [
    NbIconModule,
    ThemeModule,
    ngFormsModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    Ag.AgGridModule,
    NbSpinnerModule,
    AngularSplitModule,
    NgbModule,
    NbToastrModule,
    DevexpressModule,
    NgxMaskModule,
    ...component,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
