import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { WorkshopMonthlyInfoComponent } from "./components/workshop-monthly-info/workshop-monthly-info.component";
import * as _components from "./components";
import { CommonModule } from "@angular/common";
import { NumberSeparatorPipe } from "./pipes/number-separator.pipe";
const component = [
  _components.WorkshopMonthlyInfoComponent,
  NumberSeparatorPipe,
];
@NgModule({
  declarations: [component, WorkshopMonthlyInfoComponent],
  imports: [CommonModule],

  exports: [...component],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedBusinessModule {}
