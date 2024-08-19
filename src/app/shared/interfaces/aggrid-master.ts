import {
  GridOptions,
  GridApi,
  ColDef,
  GetDataPath,
  ValueFormatterParams,
  ValueParserParams,
} from "ag-grid-community";
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbDatepickerModule,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationDialogComponent } from "../components/confirmation-dialog/confirmation-dialog.component";
import { AgGridInterFace } from "./ag-grid.interface";
export class AgGridMaster {
  modalRef: NgbModal;
  loading = false;
  data = [];
  countItemEdited = 0;
  countItemSelected = 0;
  selectRow = {};
  top = 50;
  skip = 0;
  gridApi: GridApi;
  rowData = [];

  loadmoreFlag = false;

  overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">در حال بارگذاری</span>';

  overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">رکوردی یافت نشد</span>';

  gridOptions: GridOptions = {
    enableRangeSelection: false,
    rowSelection: "multiple",
    suppressDragLeaveHidesColumns: false,
    suppressMakeColumnVisibleAfterUnGroup: false,
    rowGroupPanelShow: "onlyWhenGrouping",
    // sideBar: true,
    sideBar: {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
          minWidth: 225,
          width: 225,
          maxWidth: 225,
        },
        {
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
          minWidth: 180,
          maxWidth: 400,
          width: 250,
        },
      ],
      position: "right",
      defaultToolPanel: "",
    },
    enableRtl: true,
    localeText: agGridLocaleText,
    animateRows: true,
    enableCharts: true,
    context: {
      thisComponent: this,
    },
    statusBar: {
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
        { statusPanel: "agTotalRowCountComponent", align: "center" },
        { statusPanel: "agFilteredRowCountComponent" },
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" },
      ],
    },
    suppressAdvancedFilterEval: true,
    suppressAggFilteredOnly: true,
    suppressAutoSize: true,
    suppressBrowserResizeObserver: true,
    suppressCellFocus: true,
    suppressExcelExport: true,
    suppressExpandablePivotGroups: true,
    suppressRowDrag: true,
    suppressClearOnFillReduction: true,
  };

  ckeditorConfig = {
    height: "250px",
    width: "100%",
    language: "fa",
    skin: "kama",
    removePlugins: "elementspath",
  };

  constructor(public modalService: NgbModal) {}

  onFilterChanged($event) {}

  onGridReady(params) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    // const updateValues = () => {
    //   var rowCount = params.api!.getDisplayedRowCount();
    //   // pick 2 cells at random to update
    //   for (var i = 0; i < 2; i++) {
    //     var row = Math.floor(Math.random() * rowCount);
    //     var rowNode = params.api!.getDisplayedRowAtIndex(row)!;
    //     var col = ["dayWorkShiftDays"][Math.floor(Math.random() * 6)];
    //     rowNode.setDataValue(col, Math.floor(Math.random() * 10000));
    //   }
    // };
    // setInterval(updateValues, 250);
    // var columnDefs = this.gridApi.getColumnDefs();

    // this.gridApi.updateGridOptions(columnDefs as any);
    // if (params.api.setGridOption) {
    //   params.api.setGridOption('rowData', this.rowData);
    //   this.startFeed(params.api);
    // }
  }
  startFeed(api: GridApi) {
    var count = 1;
    setInterval(() => {
      var thisCount = count++;
      var updatedIndexes: any = {};
      var newItems: any[] = [];
      for (var i = 0; i < UPDATE_COUNT; i++) {
        // pick one index at random
        var index = Math.floor(Math.random() * this.rowData.length);
        // dont do same index twice, otherwise two updates for same row in one transaction
        if (updatedIndexes[index]) {
          continue;
        }
        var itemToUpdate = this.rowData[index];
        var newItem: any = copyObject(itemToUpdate);
        // copy previous to current value
        newItem.previous = newItem.current;
        // then create new current value
        newItem.current = Math.floor(Math.random() * 100000) + 100;
        newItems.push(newItem);
      }
      var resultCallback = () => {
        console.log("transactionApplied() - " + thisCount);
      };
      api.applyTransactionAsync({ update: newItems }, resultCallback);
      console.log("applyTransactionAsync() - " + thisCount);
    }, 500);
  }
  onRowClicked(item) {}

  handleScroll(event) {
    if (!this.loadmoreFlag) return;

    const grid = document.getElementById("defaultGrid");
    if (grid) {
      const gridBody = grid.querySelector(".ag-body-viewport") as any;
      const scrollPos = gridBody.offsetHeight + event.top;
      const scrollDiff = gridBody.scrollHeight - scrollPos;

      if (scrollDiff <= 3) {
        this.skip += this.top;
        this.loadMore(this.skip, this.top);
      }
    }
  }

  setData(data: any[]) {
    this.data = data as any;
    setTimeout(() => {
      this.loading = false;
    }, 250);
  }

  customItems(params) {
    return [];
  }

  openConfirmDialog(row: any) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent);
    modalRef.result.then((result) => {
      if (result == "confirm") {
        this.removeCell(row);
      }
    });
  }

  getContextMenuItems(params) {
    const custom = params.context.thisComponent.customItems(params);

    var result = [
      {
        name: "Delete",
        icon: '<span class="ag-icon  ag-icon-cancel text-danger"></span>',
        cssClasses: ["text-danger"],
        action: () => {
          params.context.thisComponent.openConfirmDialog(params.node.data);
        },
      },
      {
        name: "Edit",
        icon: '<span class="ag-icon icon-fo-edit text-primary"></span>',
        cssClasses: ["text-info"],
        action: () => {
          params.context.thisComponent.editCell(params.node.data);
        },
      },
    ];
    return [
      ...result,
      ...custom,
      "copy",
      "copyWithHeaders",
      "export",
      "separator",
      "chartRange",
    ];
  }

  removeCell(row) {
    console.log("remove clicked !");
  }

  editCell(row) {
    console.log("edit clicked !");
  }

  loadMore(skip: number, top: number) {
    console.log("End Scroll!");
  }

  pushData(data) {
    if (this.top > data.length) {
      this.loadmoreFlag = false;
    }
    const index = this.gridApi.getDisplayedRowCount();
  }

  getDataPath: GetDataPath = function (data) {
    return data.orgHierarchy;
  };

  ToTree(data: any[], key?: string, parenyKey?: string, nameKey?: string) {
    function treePath(item, arr) {
      arr = [item[nameKey as any]].concat(arr);
      if (item[parenyKey as any]) {
        item = data.find((f) => f[key as any] === item[parenyKey as any]);
        return item ? treePath(item, arr) : arr;
      } else {
        return arr;
      }
    }

    data.forEach((f) => {
      f.orgHierarchy = treePath(f, []);
    });

    return data;
  }
  agGridUpdate() {
    if (this.gridApi) {
      this.gridApi.setGridOption("rowData", this.rowData);
      this.gridApi.redrawRows();
      this.gridApi.sizeColumnsToFit();
      this.countItemEdited = this.getCountEdited();
    }
  }
  getCountEdited() {
    return this.rowData.filter((f) => f.isEdited).length;
  }
  cellValueChanged(event) {
    if (event.newValue != event.oldValue) {
      let rowIndex = this.rowData.indexOf(event.data);
      this.rowData[rowIndex].isEdited = true;
      this.countItemEdited = this.getCountEdited();
    }
  }
  startEditing(row) {
    Object.keys(row).forEach((key, index) => {
      this.gridApi.startEditingCell({
        rowIndex: 0,
        colKey: key,
      });
    });
  }
  startEditingCol(key, index = 0) {
    this.gridApi.startEditingCell({
      rowIndex: index,
      colKey: key,
    });
  }
}
var UPDATE_COUNT = 20;

function copyObject(object: any) {
  // start with new object
  var newObject: any = {};
  // copy in the old values
  Object.keys(object).forEach((key) => {
    newObject[key] = object[key];
  });
  return newObject;
}
export enum TypeFilter {
  contains = "@=",
  notContains = "!@=",
  equals = "==",
  notEqual = "!=",
  startsWith = "_=",
  endsWith = "!_=",
}
export enum SortType {
  "asc" = "",
  "desc" = "-",
}

export const agGridLocaleText = {
  // Set Filter
  selectAll: "(انتخاب همه)",
  selectAllSearchResults: "(انتخاب همه نتایج جستجو)",
  addCurrentSelectionToFilter: "افزودن انتخاب فعلی به فیلتر",
  searchOoo: "جستجو...",
  blanks: "(خالی)",
  noMatches: "هیچ موردی یافت نشد",

  // Number Filter & Text Filter
  filterOoo: "فیلتر...",
  equals: "برابر با",
  notEqual: "برابر نیست با",
  blank: "خالی",
  notBlank: "غیر خالی",
  empty: "انتخاب کنید",

  // Number Filter
  lessThan: "کمتر از",
  greaterThan: "بزرگتر از",
  lessThanOrEqual: "کمتر یا مساوی با",
  greaterThanOrEqual: "بزرگتر یا مساوی با",
  inRange: "بین",
  inRangeStart: "از",
  inRangeEnd: "تا",

  // Text Filter
  contains: "شامل",
  notContains: "شامل نمی‌شود",
  startsWith: "شروع شود با",
  endsWith: "پایان یابد با",

  // Date Filter
  dateFormatOoo: "yyyy-mm-dd",
  before: "قبل از",
  after: "بعد از",

  // Filter Conditions
  andCondition: "و",
  orCondition: "یا",

  // Filter Buttons
  applyFilter: "اعمال",
  resetFilter: "بازنشانی",
  clearFilter: "پاک کردن",
  cancelFilter: "لغو",

  // Filter Titles
  textFilter: "فیلتر متنی",
  numberFilter: "فیلتر عددی",
  dateFilter: "فیلتر تاریخی",
  setFilter: "فیلتر تنظیم",

  // Group Column Filter
  groupFilterSelect: "انتخاب فیلد:",

  // Advanced Filter
  advancedFilterContains: "شامل",
  advancedFilterNotContains: "شامل نمی‌شود",
  advancedFilterTextEquals: "برابر با",
  advancedFilterTextNotEqual: "برابر نیست با",
  advancedFilterStartsWith: "شروع شود با",
  advancedFilterEndsWith: "پایان یابد با",
  advancedFilterBlank: "خالی است",
  advancedFilterNotBlank: "غیر خالی است",
  advancedFilterEquals: "=",
  advancedFilterNotEqual: "!=",
  advancedFilterGreaterThan: ">",
  advancedFilterGreaterThanOrEqual: ">=",
  advancedFilterLessThan: "<",
  advancedFilterLessThanOrEqual: "<=",
  advancedFilterTrue: "برابر با صحیح است",
  advancedFilterFalse: "برابر با غلط است",
  advancedFilterAnd: "و",
  advancedFilterOr: "یا",
  advancedFilterApply: "اعمال",
  advancedFilterBuilder: "سازنده",
  advancedFilterValidationMissingColumn: "ستون موجود نیست",
  advancedFilterValidationMissingOption: "گزینه موجود نیست",
  advancedFilterValidationMissingValue: "مقدار موجود نیست",
  advancedFilterValidationInvalidColumn: "ستون یافت نشد",
  advancedFilterValidationInvalidOption: "گزینه یافت نشد",
  advancedFilterValidationMissingQuote: "نقل قول پایانی موجود نیست",
  advancedFilterValidationNotANumber: "مقدار عددی نیست",
  advancedFilterValidationInvalidDate: "مقدار تاریخی معتبر نیست",
  advancedFilterValidationMissingCondition: "شرط موجود نیست",
  advancedFilterValidationJoinOperatorMismatch:
    "عملگرهای پیوست در یک شرط باید یکسان باشند",
  advancedFilterValidationInvalidJoinOperator: "عملگر پیوست یافت نشد",
  advancedFilterValidationMissingEndBracket: "پرانتز پایانی موجود نیست",
  advancedFilterValidationExtraEndBracket: "پرانتزهای پایانی اضافی",
  advancedFilterValidationMessage:
    "عبارت دارای خطا است. ${variable} - ${variable}.",
  advancedFilterValidationMessageAtEnd:
    "عبارت دارای خطا است. ${variable} در انتهای عبارت.",
  advancedFilterBuilderTitle: "فیلتر پیشرفته",
  advancedFilterBuilderApply: "اعمال",
  advancedFilterBuilderCancel: "لغو",
  advancedFilterBuilderAddButtonTooltip: "افزودن فیلتر یا گروه",
  advancedFilterBuilderRemoveButtonTooltip: "حذف",
  advancedFilterBuilderMoveUpButtonTooltip: "انتقال به بالا",
  advancedFilterBuilderMoveDownButtonTooltip: "انتقال به پایین",
  advancedFilterBuilderAddJoin: "افزودن گروه",
  advancedFilterBuilderAddCondition: "افزودن فیلتر",
  advancedFilterBuilderSelectColumn: "انتخاب یک ستون",
  advancedFilterBuilderSelectOption: "انتخاب یک گزینه",
  advancedFilterBuilderEnterValue: "وارد کردن مقدار...",

  // Side Bar
  columns: "ستون‌ها",
  filters: "فیلترها",

  // columns tool panel
  pivotMode: "حالت پیوت",
  groups: "گروه های سطر",
  rowGroupColumnsEmptyMessage: "اینجا را برای تنظیم گروه های سطر بکشید",
  values: "مقادیر",
  valueColumnsEmptyMessage: "برای تجمیع اینجا را بکشید",
  pivots: "برچسب‌های ستون",
  pivotColumnsEmptyMessage: "برای تنظیم برچسب های ستون بکشید",

  // Header of the Default Group Column
  group: "گروه",

  // Row Drag
  rowDragRow: "ردیف",
  rowDragRows: "ردیف ها",

  // Other
  loadingOoo: "در حال بارگذاری...",
  loadingError: "خطا",
  noRowsToShow: "هیچ ردیفی برای نمایش وجود ندارد",
  enabled: "فعال شده",

  // Menu
  pinColumn: "ستون ثابت",
  pinLeft: "ثابت سمت چپ",
  pinRight: "ثابت سمت راست",
  noPin: "بدون ثابت",
  valueAggregation: "تجمیع مقادیر",
  noAggregation: "بدون تجمیع",
  autosizeThiscolumn: "اندازه‌گیری خودکار این ستون",
  autosizeAllColumns: "اندازه‌گیری خودکار همه‌ی ستون‌ها",
  groupBy: "گروه بندی بر اساس",
  ungroupBy: "حذف گروه بندی بر اساس",
  ungroupAll: "حذف همه‌ی گروه بندی‌ها",
  addToValues: "افزودن ${variable} به مقادیر",
  removeFromValues: "حذف ${variable} از مقادیر",
  addToLabels: "افزودن ${variable} به برچسب‌ها",
  removeFromLabels: "حذف ${variable} از برچسب‌ها",
  resetColumns: "تنظیم مجدد ستون‌ها",
  expandAll: "باز کردن تمام گروه‌های سطر",
  collapseAll: "بستن تمام گروه‌های سطر",
  copy: "کپی",
  ctrlC: "Ctrl+C",
  ctrlX: "Ctrl+X",
  copyWithHeaders: "کپی با سربرگ",
  copyWithGroupHeaders: "کپی با سربرگ گروه",
  cut: "برش",
  paste: "چسباندن",
  ctrlV: "Ctrl+V",
  export: "خروجی",
  csvExport: "خروجی به فرمت CSV",
  excelExport: "خروجی به فرمت Excel",
  columnFilter: "فیلتر ستون",
  columnChooser: "انتخاب ستون‌ها",
  sortAscending: "مرتب سازی صعودی",
  sortDescending: "مرتب سازی نزولی",
  sortUnSort: "پاک کردن مرتب سازی",

  // Enterprise Menu Aggregation and Status Bar
  sum: "جمع",
  first: "اولین",
  last: "آخرین",
  min: "کمینه",
  max: "بیشینه",
  none: "هیچ",
  count: "تعداد",
  avg: "میانگین",
  filteredRows: "ردیف‌های فیلتر شده",
  selectedRows: "ردیف‌های انتخاب شده",
  totalRows: "مجموع ردیف‌ها",
  totalAndFilteredRows: "ردیف‌ها",
  more: "بیشتر",
  to: "به",
  of: "از",
  page: "صفحه",
  pageLastRowUnknown: "?",
  nextPage: "صفحه بعدی",
  lastPage: "صفحه آخر",
  firstPage: "صفحه اول",
  previousPage: "صفحه قبلی",
  pageSizeSelectorLabel: "انتخاب اندازه صفحه:",
  footerTotal: "جمع",

  // Pivoting
  pivotColumnGroupTotals: "مجموع",

  // Enterprise Menu (Charts)
  pivotChartAndPivotMode: "نمودار Pivot & حالت Pivot",
  pivotChart: "نمودار Pivot",
  chartRange: "محدوده نمودار",

  columnChart: "ستونی",
  groupedColumn: "گروهی",
  stackedColumn: "پشته‌ای",
  normalizedColumn: "100% پشته‌ای",

  barChart: "میله‌ای",
  groupedBar: "گروهی",
  stackedBar: "پشته‌ای",
  normalizedBar: "100% پشته‌ای",

  pieChart: "دایره‌ای",
  pie: "دایره",
  donut: "دونات",

  line: "خط",

  xyChart: "X Y (پراکنده)",
  scatter: "پراکنده",
  bubble: "حبابی",

  areaChart: "منطقه‌ای",
  area: "منطقه",
  stackedArea: "پشته‌ای",
  normalizedArea: "100% پشته‌ای",

  histogramChart: "هیستوگرام",
  histogramFrequency: "فرکانس",

  polarChart: "قطبی",
  radarLine: "رادار خطی",
  radarArea: "رادار منطقه‌ای",
  nightingale: "مرغ خوشخوان",
  radialColumn: "ستون شعاعی",
  radialBar: "میله شعاعی",

  statisticalChart: "آماری",
  boxPlot: "نمودار جعبه‌ای",
  rangeBar: "میله بازه",
  rangeArea: "منطقه بازه",

  hierarchicalChart: "سلسله مراتبی",
  treemap: "نمودار شبکه",
  sunburst: "Sunburst",

  specializedChart: "ویژه",
  waterfall: "آبشار",
  heatmap: "نقشه حرارت",

  combinationChart: "ترکیبی",
  columnLineCombo: "ستون و خط",
  AreaColumnCombo: "منطقه و ستون",

  // Charts
  pivotChartTitle: "نمودار Pivot",
  rangeChartTitle: "نمودار محدوده",
  settings: "نمودار",
  data: "داده‌ها",
  format: "فرمت",
  categories: "دسته‌بندی‌ها",
  defaultCategory: "(هیچ)",
  series: "سری‌ها",
  switchCategorySeries: "تغییر دسته / سری",
  categoryValues: "مقادیر دسته",
  seriesLabels: "برچسب‌های سری",
  aggregate: "تجمیع",
  xyValues: "مقادیر XY",
  paired: "حالت جفتی",
  axis: "محور",
  xAxis: "محور افقی",
  yAxis: "محور عمودی",
  polarAxis: "محور قطبی",
  radiusAxis: "محور شعاعی",
  navigator: "پیمایشگر",
  zoom: "بزرگنمایی",
  animation: "انیمیشن",
  crosshair: "خط موازی",
  color: "رنگ",
  thickness: "ضخامت",
  preferredLength: "طول ترجیحی",
  xType: "نوع X",
  axisType: "نوع محور",
  automatic: "اتوماتیک",
  category: "دسته",
  number: "عدد",
  time: "زمان",
  timeFormat: "فرمت زمان",
  autoRotate: "چرخش اتوماتیک",
  labelRotation: "چرخش",
  circle: "دایره",
  polygon: "چندضلعی",
  orientation: "جهت",
  fixed: "ثابت",
  parallel: "موازی",
  perpendicular: "عمودی",
  radiusAxisPosition: "موقعیت",
  ticks: "خطوط کوتاه",
  gridLines: "خطوط شبکه",
  width: "عرض",
  height: "ارتفاع",
  length: "طول",
  padding: "فاصله",
  spacing: "فاصله",
  chart: "نمودار",
  title: "عنوان",
  titlePlaceholder: "عنوان نمودار - برای ویرایش دوباره دوباره کلیک کنید",
  background: "پس‌زمینه",
  font: "فونت",
  top: "بالا",
  right: "راست",
  bottom: "پایین",
  left: "چپ",
  labels: "برچسب‌ها",
  calloutLabels: "برچسب‌های فراخوان",
  sectorLabels: "برچسب‌های بخش",
  positionRatio: "نسبت موقعیت",
  size: "اندازه",
  shape: "شکل",
  minSize: "حداقل اندازه",
  maxSize: "حداکثر اندازه",
  legend: "راهنما",
  position: "موقعیت",
  markerSize: "اندازه نشانگر",
  markerStroke: "ضخامت حاشیه نشانگر",
  markerPadding: "فاصله حاشیه نشانگر",
  itemSpacing: "فاصله موارد",
  itemPaddingX: "فاصله موارد X",
  itemPaddingY: "فاصله موارد Y",
  layoutHorizontalSpacing: "فاصله افقی",
  layoutVerticalSpacing: "فاصله عمودی",
  strokeWidth: "ضخامت خط",
  offset: "آفست",
  offsets: "آفست‌ها",
  tooltips: "توضیحات",
  callout: "فراخوان",
  markers: "نشانگرها",
  shadow: "سایه",
  blur: "تاری",
  xOffset: "آفست X",
  yOffset: "آفست Y",
  lineWidth: "ضخامت خط",
  lineDash: "نقطه چین",
  lineDashOffset: "آفست خط",
  scrollingZoom: "پیمایش",
  scrollingStep: "مرحله پیمایش",
  selectingZoom: "انتخاب",
  durationMillis: "مدت (ms)",
  crosshairLabel: "برچسب",
  crosshairSnap: "چسبیدن به نقطه",

  // ARIA
  ariaAdvancedFilterBuilderItem:
    "${variable}. سطح ${variable}. برای ویرایش فشار دهید.",
  ariaAdvancedFilterBuilderItemValidation:
    "${variable}. سطح ${variable}. ${variable} برای ویرایش فشار دهید.",
  ariaAdvancedFilterBuilderList: "لیست سازنده فیلتر پیشرفته",
  ariaAdvancedFilterBuilderFilterItem: "شرط فیلتر",
  ariaAdvancedFilterBuilderGroupItem: "گروه فیلتر",
  ariaAdvancedFilterBuilderColumn: "ستون",
  ariaAdvancedFilterBuilderOption: "گزینه",
  ariaAdvancedFilterBuilderValueP: "مقدار",
  ariaAdvancedFilterBuilderJoinOperator: "عملگر اتصال",
  ariaAdvancedFilterInput: "ورودی فیلتر پیشرفته",
  ariaAdvancedFilterDateInput: "ورودی تاریخ فیلتر پیشرفته",
  ariaAdvancedFilterTimeInput: "ورودی زمان فیلتر پیشرفته",
  ariaAdvancedFilterNumberInput: "ورودی عددی فیلتر پیشرفته",

  // ARIA Grid
  ariaActiveRow: "ردیف فعال",

  //  ARIA Grid Cell Type
  ariaDate: "تاریخ ستون",

  // ARIA Row Selected Status
  ariaRowSelected: "ردیف انتخاب شده",

  // ARIA Row Drag Status
  ariaRowDrag: "برای جابجایی ردیف فشار دهید",

  // ARIA Grid Column Header Type
  ariaSortAscending: "مرتب سازی صعودی",
  ariaSortDescending: "مرتب سازی نزولی",
  ariaSortUnSort: "پاک کردن مرتب سازی",

  // ARIA Grid Row Height
  ariaRowHeight: "ارتفاع ردیف",

  // Column Menu
  columnMenuLabel: "منو ستون",
  columnMenuShowColumns: "نمایش ستون‌ها",
  columnMenuFilter: "فیلتر",
  columnMenuAddColumns: "افزودن ستون‌ها",
  columnMenuGroupBy: "گروه بندی بر اساس",
  columnMenuUngroupBy: "حذف گروه بندی بر اساس",
  columnMenuResetColumns: "تنظیم مجدد ستون‌ها",
  columnMenuPinColumn: "ستون ثابت",
  columnMenuPinLeft: "ثابت سمت چپ",
  columnMenuPinRight: "ثابت سمت راست",
  columnMenuNoPin: "بدون ثابت",
  columnMenuValueAgg: "تجمیع مقادیر",
  columnMenuValueAggSum: "مجموع",
  columnMenuValueAggMin: "کمینه",
  columnMenuValueAggMax: "بیشینه",
  columnMenuValueAggFirst: "اولین",
  columnMenuValueAggLast: "آخرین",
  columnMenuValueAggCount: "تعداد",
  columnMenuValueAggAvg: "میانگین",
  columnMenuValueAggNone: "بدون تجمیع",
  columnMenuFilterIn: "فیلتر در ...",
  columnMenuFilterOut: "فیلتر خارج از ...",
  columnMenuSelectAll: "انتخاب همه",
  columnMenuFilterOoo: "فیلتر ...",
  columnMenuFilterOooEmpty: "(خالی)",
  columnMenuFilterOooNotEmpty: "(غیر خالی)",

  // ARIA
  ariaColumnMenuLabel: "منو ستون",
  ariaColumnMenuShowColumns: "نمایش ستون‌ها",
  ariaColumnMenuFilter: "فیلتر",
  ariaColumnMenuColumnGroup: "گروه ستون",
  ariaColumnMenuValueColumns: "ستون‌های مقدار",
  ariaColumnMenuPivotMode: "حالت پیوت",
  ariaColumnMenuGroups: "گروه‌های ستون",
  ariaColumnMenuValues: "مقادیر",
  ariaColumnMenuAutoColumns: "ستون‌های خودکار",
  ariaColumnMenuPinColumn: "ستون ثابت",
  ariaColumnMenuPinLeft: "ثابت سمت چپ",
  ariaColumnMenuPinRight: "ثابت سمت راست",
  ariaColumnMenuNoPin: "بدون ثابت",
  ariaColumnMenuSum: "جمع",
  ariaColumnMenuMin: "کمینه",
  ariaColumnMenuMax: "بیشینه",
  ariaColumnMenuFirst: "اولین",
  ariaColumnMenuLast: "آخرین",
  ariaColumnMenuNone: "هیچ",
  ariaColumnMenuFilterIn: "فیلتر در",
  ariaColumnMenuFilterOut: "فیلتر خارج از",
  ariaColumnMenuSelectAll: "انتخاب همه",
  ariaColumnMenuFilterOoo: "فیلتر ...",
  ariaColumnMenuFilterOooEmpty: "(خالی)",
  ariaColumnMenuFilterOooNotEmpty: "(غیر خالی)",

  // Enterprise Menu Aggregation and Status Bar

  average: "میانگین",

  // Clipboard

  // Tool Panel
  rowGroupColumns: "ستون‌های گروه سطر",
  valueColumns: "ستون‌های مقدار",
  toolPanelButton: "دکمه پنل ابزار",

  // Row Group Panel

  // Scale Tool Panel
  from: "از",
  zoomLevel: "سطح بزرگنمایی",

  // Undo Redo
  undo: "واگرد",
  redo: "پیش برو",

  // Status Bar
  aggregation: "تجمیع",
  autoPages: "صفحات خودکار",
  pageCount: "تعداد صفحات",

  // Mini Charts
  miniChartAxisTooltipValue: "مقدار محور (فشار برای تغییر مقدار)",
  miniChartAxisTooltipCategory: "دسته محور (فشار برای تغییر مقدار)",

  // Multi Columns Filter Panel
  multiColumns: "فیلتر چند ستونی",

  // Multi columns Filter Conditions
  filterAnd: "و",
  filterOr: "یا",

  // Enterprise Menu Aggregation and Status Bar

  // Tool Panel
};
export function chartTooltipRenderer({ datum, xKey, yKey }: any) {
  return {
    content: `${formatDate(datum[xKey])}: ${datum[yKey]}`,
  };
}
export function formatDate(date: Date | number) {
  return Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: undefined,
  }).format(new Date(date));
}
export function numberValueParser(params: ValueParserParams) {
  return Number(params.newValue);
}
export function formatNumber(number: number) {
  return Math.floor(number).toLocaleString();
}
export function numberCellFormatter_valueFormatter(
  params: ValueFormatterParams
) {
  return Math.floor(params.value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
export function timeCellFormatter(params: ValueFormatterParams) {
  if (params.value) {
    let valueStr = params.value.toString().padStart(4, "0"); // Ensure the value is 4 digits long
    let hours = valueStr.substring(0, 2); // First two digits for hours
    let minutes = valueStr.substring(2, 4); // Last two digits for minutes

    return `${hours}:${minutes}`;
  } else {
    return `00:00`;
  }
}
export function number_valueParser(params: ValueParserParams) {
  return Number(params.newValue);
}
export function number_valueParser1(number: number) {
  return Math.floor(number).toLocaleString();
}
