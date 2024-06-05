import { Component, Input } from '@angular/core';
import { GeneralActionType } from 'src/app/shared/types/general-action.type';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent {
  @Input() items: GeneralActionType[] = [];
  @Input() actionRefData?: any;

  clickHandler(e: Event, data: GeneralActionType) {
    const clonedData = { ...data };
    if (this.actionRefData && !data.data) {
      clonedData.data = this.actionRefData;
    }
    data.click && data.click(e, this.actionRefData ? clonedData : data);
  }
}
