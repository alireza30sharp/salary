import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {} from 'stream';

@Component({
  selector: 'app-push-pull-panel',
  templateUrl: './push-pull-panel.component.html',
  styleUrls: ['./push-pull-panel.component.scss'],
})
export class PushPullPanelComponent implements OnChanges {
  @Input() showDetailPanel?: boolean;

  @Output() moveEndCallback = new EventEmitter<never>();

  masterPanelScrollIsDisabled?: boolean = false;
  detailPanelScrollIsDisabled?: boolean = true;
  transitionDelay = 700;

  private timeoutRef: any = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showDetailPanel']) {
      clearTimeout(this.timeoutRef);
      if (this.showDetailPanel) {
        this.detailPanelScrollIsDisabled = false;
        this.timeoutRef = setTimeout(() => {
          this.masterPanelScrollIsDisabled = true;
          this.moveEndCallback.emit();
        }, this.transitionDelay);
      } else {
        this.masterPanelScrollIsDisabled = false;
        this.timeoutRef = setTimeout(() => {
          this.detailPanelScrollIsDisabled = true;
          this.moveEndCallback.emit();
        }, this.transitionDelay);
      }
    }
  }
}
