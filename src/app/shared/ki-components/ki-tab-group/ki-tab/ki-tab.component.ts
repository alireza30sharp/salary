import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TabInterface } from '../tab.interface';

@Component({
  selector: 'ki-tab',
  templateUrl: './ki-tab.component.html',
})
export class KiTabComponent implements OnInit, TabInterface {
  @Input() id?: string;
  @Input() text: string;
  @Input() link?: string;
  @Input() active?: boolean;
  @Input() data?: any;
  @Input() contentHeight?: string;
  @Input() iconClassName?: string;
  @Input() groupName?: string;
  @Input() isBold?: boolean;
  @Input() otherSide?: boolean;

  constructor() {}

  ngOnInit(): void {}
}
