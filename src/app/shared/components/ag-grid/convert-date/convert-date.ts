import { Component } from '@angular/core';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-ag-grid-convert-date',
  templateUrl: './convert-date.html',
  styleUrls: ['./convert-date.scss'],
})
export class ConvertDateCellRenderer {
  private params: any;
  date: string = null;
  locale: 'fa' | 'en' = 'en';
  format: string = 'YYYY-MM-DD';
  agInit(params: any): void {
    this.params = params;
    if (this.params && this.params.value) {
      if (this.params.locale) {
        this.locale = this.params.locale;
      }
      if (this.params.format) {
        this.format = this.params.format;
      }
      this.date = moment
        .from(this.params.value, 'en', this.format)
        .locale(this.locale)
        .format(this.format);
    } else {
      this.date = this.params.value;
    }
  }
}
