import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgFrameworkComponent } from 'ag-grid-angular';
import * as moment from 'jalali-moment';

import {
  DateFilter,
  DateFilterModel,
  IFloatingFilter,
  IFloatingFilterParams,
} from 'ag-grid-community';
import { Subject, Subscription } from 'rxjs';

export interface DateFilterParams extends IFloatingFilterParams {
  inputDisabled?: boolean;
}

@Component({
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent
  implements
    IFloatingFilter,
    AgFrameworkComponent<DateFilterParams>,
    OnDestroy,
    OnInit
{
  /** The form control for the datepicker input. */
  inputDate: any;

  /** Boolean indicating if the input is disabled. */
  inputDisabled = false;
  inputSubjext = new Subject<string>();
  /** The date filter parameters. */
  private params: DateFilterParams;

  /** RxJS Subscription. */
  private subscription: Subscription;
  locale: 'fa' | 'en' = 'en';
  format: string = 'YYYY-MM-DD';
  agInit(params: DateFilterParams): void {
    this.params = params;
    if (params.hasOwnProperty('inputDisabled')) {
      this.inputDisabled = params.inputDisabled;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.inputSubjext.subscribe({
      error: console.error,
      next: (date: any) => {
        var f, dd;
        if (date && date._d) {
          f = moment
            .from(date._d, 'en', this.format)
            .locale(this.locale)
            .format(this.format) as any;
          dd = new Date(f);
        } else {
          dd = null;
        }
        this.params.parentFilterInstance((instance: DateFilter) =>
          instance.onFloatingFilterChanged('equals', dd ? dd : null)
        );
      },
    });
  }

  onParentModelChanged(parentModel: DateFilterModel): void {
    if (parentModel) {
      // const date = parse(
      //   parentModel.dateFrom,
      //   'yyyy-MM-dd HH:mm:ss',
      //   new Date()
      // );
      // this.dateControl.setValue(formatISO(date), {
      //   emitEvent: false,
      // });
    } else {
      // this.dateControl.setValue('');
    }
  }
}
