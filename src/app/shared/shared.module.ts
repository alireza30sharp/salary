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
  MonthPickerComponent,
} from "./components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
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
import { ToastrModule } from "ngx-toastr";
import { TooltipComponent } from "./components/tooltip/tooltip.component";
import { TooltipDirective } from "./components/tooltip/tooltip.directive";
import { PrimengModule } from "./primeng.module";
import { LoadingComponent } from "./components/loading/loading.component";
import { GeneralFormComponent } from "./components/general-form/general-form.component";
import { GetElementIdPipe } from "./components/general-form/general-form-get-element-id.pipe";
import { GetValidatorMessagePipe } from "./components/general-form/general-form-get-validator-message.pipe";
import { HasReuqiredValidatorPipe } from "./components/general-form/general-form-has-required-validator.pipe";

const component = [
  GeneralFormComponent,
  LoadingComponent,
  MonthPickerComponent,
  ContextMenuComponent,
  TreeComponent,
  ReportComponent,
  PinCodeComponent,
  ToolsBarComponent,
  TooltipComponent,
  TooltipDirective,
  SkeletonFormLoadingComponent,
  GeneralHeaderComponent,
  GeneralLayoutComponent,
  GeneralPanelComponent,
  PushPullPanelComponent,
  AlertComponent,
  DropdownComponent,
  ListViewFilterComponent,
  grid.AgLink,
  grid.SelectCellRendererParams,
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
  grid.CellOperationsClickEvent,
  grid.CellEditorTimeComponent,
  grid.CellEditorCheckboxComponent,
  grid.SumRenderer,
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
  GetElementIdPipe,
  GetValidatorMessagePipe,
  HasReuqiredValidatorPipe,
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
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
    ngFormsModule,
    DevexpressModule,
    NgxMaskModule.forRoot(),
    DatePickerModule,
    PrimengModule,
  ],

  exports: [
    ThemeModule,
    ngFormsModule,
    NgSelectModule,
    FormsModule,
    ToastrModule,
    ReactiveFormsModule,
    Ag.AgGridModule,
    NbSpinnerModule,
    AngularSplitModule,
    NgbModule,
    DevexpressModule,
    NgxMaskModule,
    PrimengModule,
    ...component,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
