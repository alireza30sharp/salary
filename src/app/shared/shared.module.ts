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

const component = [
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
  grid.CellEditorCheckboxComponent,
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
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
    ngFormsModule,
    DevexpressModule,
    NgxMaskModule.forRoot(),
    DatePickerModule,
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
    ...component,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
