import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import * as uuid from "uuid";
import * as XLSX from "xlsx";
import {
  AsyncTransactionsFlushed,
  CellEditingStoppedEvent,
  CellFocusedEvent,
  CellKeyDownEvent,
  ChartToolPanelsDef,
  FirstDataRenderedEvent,
  GetRowIdFunc,
  GetRowIdParams,
  GridOptions,
  GridReadyEvent,
  GridSizeChangedEvent,
  PaginationNumberFormatterParams,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SuppressKeyboardEventParams,
  ValueParserParams,
} from "ag-grid-community";
import "ag-grid-enterprise";
import { CustomLoadingCellRenderer } from "../loading-cell-renderer/loading";
import { AgGridMaster } from "../../../interfaces/aggrid-master";
import { AgGridInterFace } from "../../../interfaces/ag-grid.interface";
import { NbThemeService } from "@nebular/theme";
@Component({
  selector: "ag-grid-data",
  templateUrl: "./ag-grid-data.component.html",
  styleUrls: ["./ag-grid-data.component.scss"],
})
export class AgGridDataComponent extends AgGridMaster implements AfterViewInit {
  constructor(
    private _modalService: NgbModal,
    private themeService: NbThemeService
  ) {
    super(_modalService);
    themeService.onThemeChange().subscribe((res) => {
      if (res.name === "dark") {
        this.class = "ag-theme-quartz-auto-dark";
      } else if (res.name === "default") {
        this.class = "ag-theme-quartz";
      } else if (res.name === "cosmic") {
        this.class = "ag-theme-alpine-dark";
      } else if (res.name === "corporate") {
        this.class = "ag-theme-balham";
      }
    });
    this.gridOptions.onCellFocused = this.cellFocused.bind(this);
  }
  ngAfterViewInit(): void {}
  @Input() set isEditMode(flag: boolean) {
    this._isEditMode = flag;
    setTimeout(() => {
      if (this._isEditMode) {
        this.onNewSelected();
      }
    }, 10);
  }
  @Input() set columnsDefault(columns: AgGridInterFace[]) {
    this.columnsTable = columns;
    if (this._isEditMode) {
      this.isShowToolbar = true;
      this.enableFillHandle = false;
      this.undoRedoCellEditing = true;
      let col = columns.filter((col) => col.editable);
      if (col.length > 0) {
        let findEditing = col.find((f) => f.context?.startEditing);
        if (findEditing) {
          this.startEditingCell = findEditing.field;
        } else {
          this.startEditingCell = col[0].field;
        }
        this.rowValue = this.extractFields(col, "field");
        this.undoRedoCellEditingLimit = Object.keys(col).length;
      }
    }
  }
  @Input() activeToolBar: boolean = false;
  @Input() popupParent: any;
  @Input() defaultColDef: AgGridInterFace = {
    rowGroup: false,
  };
  @Input() suppressRowClickSelection: boolean = false;
  @Input() rowSelection: "single" | "multiple" = "single";
  @Input() suppressAggFuncInHeader: boolean = false;
  @Input() showTotal: boolean = false;
  @Input() editType;
  @Input() set rowDataDefault(list: any[]) {
    this.rowData = list;
    if (this.showTotal) {
      this.calculateTotal();
    }
  }
  @Input() set showSideBar(option: boolean) {
    this.gridOptions.sideBar = option;
  }
  @Input() set isAgGridUpdate(value) {
    // this.agGridUpdate();
  }

  @Input() class: string = "ag-theme-quartz";
  @Input() idGrid: string;
  @Input() rowId: string;
  @Input() pagination: boolean = true;
  @Input() paginationPageSize: number = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 20, 50, 100];
  paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return "[" + params.value.toLocaleString() + "]";
  };
  pivotPanelShow: "always" | "onlyWhenPivoting" | "never" = "always";
  @Output() selectedRowsChange = new EventEmitter<any>();
  @Output() removeCellChange = new EventEmitter<any>();
  @Output() editCellChange = new EventEmitter<any>();
  @Output() saveCellChange = new EventEmitter<any>();
  @Output() DesignerclickEvent = new EventEmitter<any>();
  autoGroupColumnDef: AgGridInterFace = {
    minWidth: 300,
  };
  autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: "fitGridWidth",
  };

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    if (this.rowId) {
      return params.data[this.rowId]
        ? params.data[this.rowId]?.toString()
        : uuid.v4();
    } else {
      return params.data.uniqueId;
    }
  };
  public chartThemeOverrides: any = {
    common: {
      title: {
        enabled: true,
        text: "Medals by Age",
      },
    },
    bar: {
      axes: {
        category: {
          label: {
            rotation: 0,
          },
        },
      },
    },
  };
  public chartToolPanelsDef: ChartToolPanelsDef = {
    panels: ["data", "format"],
  };
  public loadingCellRenderer: any = CustomLoadingCellRenderer;
  public loadingCellRendererParams: any = {
    loadingMessage: "One moment please...",
  };

  _isEditMode: boolean = false;
  rowValue: any;
  startEditingCell: string = null;
  columnsTable: AgGridInterFace[] = [];
  public asyncTransactionWaitMillis = 4000;
  changeModel = new Subject<void>();
  selectedRows: any;
  currentChartRef: any;
  recorder: any;
  isShowToolbar: boolean = false;
  private lastFocusedColumn: string = null;
  currentRowDataEditing: any = {};
  ///------undo
  enableFillHandle: boolean = false;
  undoRedoCellEditing: boolean = false;
  undoRedoCellEditingLimit: number = 0;
  onSelectionChanged() {
    this.selectedRows = this.gridApi.getSelectedRows();
    this.selectedRowsChange.emit(this.selectedRows);
  }
  calculateTotal() {
    // شناسایی ستون‌های با فیلد جمع کل
    const columnsWithSum = this.columnsTable.flatMap((column) =>
      column.children
        ? column.children.filter((child) => child.aggFunc === "sum")
        : column.aggFunc === "sum"
        ? [column]
        : []
    );

    // ایجاد یک شیء برای ذخیره مقادیر جمع کل
    const totals: any = { totalLabel: "جمع کل:" };

    // محاسبه جمع کل برای هر ستون
    columnsWithSum.forEach((column) => {
      totals[column.field] = this.rowData.reduce(
        (sum, row) => sum + parseFloat(row[column.field] || "0"),
        0
      );
    });
    this.columnsTable.unshift({
      field: "totalLabel",
      headerName: "",
      valueGetter: (params) => params.data.totalLabel,
      cellStyle: { fontWeight: "bold" },
      cellRenderer: "agAnimateShowChangeCellRenderer",
    });
    this.pinnedBottomRowData = [totals];
  }

  // calculateTotal() {
  //   // شناسایی ستون‌های با فیلد جمع کل
  //   const columnsWithSum = this.columnsTable.filter(
  //     (column) => column.aggFunc === "sum"
  //   );

  //   // ایجاد یک شیء برای ذخیره مقادیر جمع کل
  //   const totals: any = { totalLabel: "جمع کل:" };

  //   // محاسبه جمع کل برای هر ستون
  //   columnsWithSum.forEach((column) => {
  //     totals[column.field] = this.rowData.reduce(
  //       (sum, row) => sum + parseFloat(row[column.field] || "0"),
  //       0
  //     );
  //   });

  //   // اضافه کردن جمع کل‌ها به داده‌های ردیف پایین
  //   this.pinnedBottomRowData = [totals];
  //   this.columnsTable.unshift({
  //     field: "totalLabel",
  //     headerName: "",
  //     valueGetter: (params) => params.data.totalLabel,
  //     cellStyle: { fontWeight: "bold" },
  //     cellRenderer: "agAnimateShowChangeCellRenderer",
  //   });
  // }
  pinnedBottomRowData: any[];
  cellEditingStopped(event: CellEditingStoppedEvent) {
    // Check if all required fields are filled
    const isValid = this.validateRequiredFields(event.data, this.columnsTable);
    if (!isValid) {
      event.data.isEdited = true;
      this.SaveSelected();
      const newValue = event.newValue;

      this.onFlashOneCell(newValue);
    }
  }
  onFlashOneCell(newValue: any) {
    if (this.gridApi && this.lastFocusedColumn) {
      // دریافت سلول متمرکز فعلی
      const focusedCell = this.gridApi.getFocusedCell();
      if (focusedCell) {
        // دریافت rowNode از gridApi با استفاده از rowIndex
        const rowNode = this.gridApi.getDisplayedRowAtIndex(
          focusedCell.rowIndex
        );

        if (rowNode) {
          rowNode.setDataValue(this.lastFocusedColumn, newValue);
          // فلش کردن سلول‌ها با استفاده از rowNode و ستون متمرکز
          this.gridApi.flashCells({
            rowNodes: [rowNode],
            columns: [this.lastFocusedColumn],
          });
          // this.gridApi.refreshCells({
          //   rowNodes: [rowNode],
          //   force: true,
          // });
        }
      }
    }
  }

  // onFlashOneCell() {
  //   if (this.gridApi && this.lastFocusedColumn) {
  //     // دریافت سلول متمرکز فعلی
  //     const focusedCell = this.gridApi.getFocusedCell();
  //     if (focusedCell) {
  //       // دریافت rowNode از gridApi با استفاده از rowIndex
  //       const rowNode = this.gridApi.getRowNode(
  //         focusedCell.rowIndex.toString()
  //       );

  //       // فلش کردن سلول‌ها با استفاده از rowNode و ستون متمرکز
  //       this.gridApi.flashCells({
  //         rowNodes: [rowNode],
  //         columns: [this.lastFocusedColumn],
  //       });
  //     }
  //   }
  // }

  cellEditingStarted(event) {
    const focusedCell = this.gridApi.getFocusedCell();
    if (focusedCell) {
      const column = focusedCell.column;
      const colDef = column.getColDef();
      if (colDef.editable) {
        this.gridApi.startEditingCell({
          rowIndex: focusedCell.rowIndex,
          colKey: column.getColId(),
        });
      }
    }
  }
  tabToNextCell(params: any) {
    const lastColumnIndex = this.columnsTable.length - 1;
    const nextCell = params.nextCellPosition;
    if (
      nextCell.column.getColId() === this.columnsTable[lastColumnIndex].field
    ) {
      if (this.validateRequiredFields(this.rowData, this.columnsTable)) {
        this.onNewSelected();
      }
    }
    return nextCell;
  }

  cellFocused(event: any) {
    const focusedCell = this.gridApi.getFocusedCell();
    if (focusedCell) {
      const column = focusedCell.column;
      this.lastFocusedColumn = column.getColId(); // به روز رسانی ستون متمرکز

      const colDef = column.getColDef();
      if (colDef.editable) {
        this.gridApi.startEditingCell({
          rowIndex: focusedCell.rowIndex,
          colKey: column.getColId(),
        });
      }
    }
  }
  onCellKeyDown(event: any) {
    if (!event.event) {
      return;
    }
    const keyboardEvent = event.event as unknown as KeyboardEvent;
    const key = keyboardEvent.key;
    if (key.length) {
      if (key === "ArrowLeft" || key === "ArrowRight") {
        const key = event.event.key;
        const rowIndex = event.rowIndex;
        const column = event.column;
        const gridApi = event.api;
        let nextColumn;
        const allColumns = this.gridApi.getColumns();
        const currentColumnIndex = allColumns.indexOf(column);

        if (key === "ArrowLeft") {
          nextColumn = allColumns[currentColumnIndex + 1]; // جلو رفتن
        } else {
          nextColumn = allColumns[currentColumnIndex - 1]; // عقب رفتن
        }

        if (nextColumn) {
          event.event.preventDefault(); // جلوگیری از رفتار پیش‌فرض کلید جهت‌نما
          gridApi.stopEditing();
          gridApi.setFocusedCell(rowIndex, nextColumn.getColId());
          gridApi.startEditingCell({ rowIndex, colKey: nextColumn.getColId() });
        }
      } else if (key === "s") {
        var rowNode = event.node;
        var newSelection = !rowNode.isSelected();
        rowNode.setSelected(newSelection);
      } else if (key === "+") {
        if (!this.validateRequiredFields(event.data, this.columnsTable)) {
          this.onNewSelected();
        } else {
          alert("لطفا فیلد های اجباری را وارد کنید");
        }
      }
    }
  }

  rowClassRules = {
    // apply green to 2008
    "edit-rowClassRules": (params) => {
      if (params.data.isEdited && params.data.id) {
        return true;
      }
    },
    "add-rowClassRules": (params) => {
      if (params.data.isEdited && !params.data.id) {
        return true;
      }
    },
  };
  validateRequiredFields(obj, columns) {
    for (let column of columns) {
      if (
        column.context &&
        column.context.requerd &&
        (obj[column.field] === null ||
          obj[column.field] === 0 ||
          obj[column.field] === undefined ||
          obj[column.field] === "")
      ) {
        return true;
      }
    }
    return false;
  }

  designerclickEvent(event) {
    this.DesignerclickEvent.emit();
  }
  onStartFeed(newItems: any[]) {
    var resultCallback = () => {
      console.log("transactionApplied() - ");
    };
    this.gridApi.applyTransactionAsync({ update: newItems }, resultCallback);
  }
  override removeCell(row: any): void {
    this.removeCellChange.emit(row);
  }
  override editCell(row: any): void {
    this.editCellChange.emit(row);
  }

  private restoreState(state) {
    // let state = window.localStorage.getItem('save');
    // setTimeout(() => {
    //   this.gridOptions.columnApi.applyColumnState({
    //     state: state,
    //     applyOrder: true,
    //   });
    // }, 900);
  }
  onSave() {
    if (this.idGrid != "") {
      // this._localStorageService.setlocalStorage(
      //   this.idGrid,
      //  // this.gridOptions.columnApi.getColumnState()
      // );
    }
  }
  SaveSelected() {
    //this.agGridUpdate();
    let filter = this.rowData.filter((data) => data.isEdited);
    this.saveCellChange.emit(filter);
  }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
    // params.api.createRangeChart({
    //   chartContainer: document.querySelector("#myChart") as HTMLElement,
    //   cellRange: {
    //     rowStartIndex: 0,
    //     rowEndIndex: 79,
    //     columns: ["from", "to", "holeSectionSize"],
    //   },
    //   chartType: "groupedColumn",
    //   aggFunc: "sum",
    // });
  }
  onGridSizeChanged(params: GridSizeChangedEvent) {
    // get the current grids width
    var gridWidth = document.querySelector(".ag-body-viewport")!.clientWidth;
    // keep track of which columns to hide/show
    var columnsToShow = [];
    var columnsToHide = [];
    // iterate over all columns (visible or not) and work out
    // now many columns can fit (based on their minWidth)
    var totalColsWidth = 0;
    var allColumns = params.api.getColumns().filter((m) => {
      let ColDef = m.getColDef();
      return !ColDef.hide;
    });

    if (allColumns && allColumns.length > 0) {
      for (var i = 0; i < allColumns.length; i++) {
        var column = allColumns[i];
        totalColsWidth += column.getMinWidth() || 0;
        if (totalColsWidth > gridWidth) {
          columnsToHide.push(column.getColId());
        } else {
          columnsToShow.push(column.getColId());
        }
      }
    }
    // show/hide columns based on current grid width
    params.api.setColumnsVisible(columnsToShow, true);
    params.api.setColumnsVisible(columnsToHide, false);
    // wait until columns stopped moving and fill out
    // any available space to ensure there are no gaps
    window.setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 10);
  }
  onNewSelected() {
    if (this.rowValue) {
      this.rowValue.isEdited = false;
      this.rowValue.uniqueId = uuid.v4();
      this.rowData.push(Object.assign({}, this.rowValue));
      this.agGridUpdate();
      let index = this.rowData.length - 1;
      this.startEditingCol(this.startEditingCell, index);
    }

    this.countItemEdited = this.getCountEdited();
  }
  extractFields(arr, field) {
    var result = {};
    arr.forEach(function (item) {
      result[item[field]] = null;
    });
    return result;
  }

  onCancel() {
    this.gridApi.stopEditing(true);
    this.rowData = this.rowData.filter((data) => data.isEdited == false);
    this.agGridUpdate();
  }
  onAsyncTransactionsFlushed(e: AsyncTransactionsFlushed) {
    console.log(
      "========== onAsyncTransactionsFlushed: applied " +
        e.results.length +
        " transactions"
    );
  }
  onFlushTransactions() {
    this.gridApi.flushAsyncTransactions();
  }

  //=====
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    try {
      if (target.files.length !== 1)
        throw new Error("Cannot use multiple files");
      let reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        let data: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });
        let headerRow = data.splice(0, 1);
        headerRow = headerRow.length ? headerRow[0] : [];
        let fromActMd = headerRow.indexOf("from Act");
        let toActMd = headerRow.indexOf("to Act");
        let date = headerRow.indexOf("Date");
        let sampleDescription = headerRow.indexOf("Description");
        let NOT_EXIST = -1;
        if ([fromActMd, toActMd, date, sampleDescription].includes(NOT_EXIST)) {
          return;
        }
        data = data.filter((row) => row.length);
        // row data
        data.forEach((row: any[]) => {
          let indexFinded = this.rowData.findIndex(
            (f) =>
              (f.key ? f.key.trim() : null) ==
              (row[toActMd] ? row[toActMd] : null)
          );
          // چک کن اگه مقادیر وارد شده با مقادیر قبلی فرق داشت فلگ ویرایش رو روشن کن
          // جهت جلوگیری از ارسال درخواست های اضافه
          let isEdited = false;
          if (indexFinded >= 0) {
            let currentItem = this.rowData[indexFinded];
            isEdited =
              currentItem.fromActMd != row[fromActMd] ||
              currentItem.toActMd != row[toActMd] ||
              currentItem.date != row[date] ||
              currentItem.sampleDescription != row[sampleDescription];
          } else {
            isEdited = true;
          }
          if (
            row[fromActMd] ||
            row[toActMd] ||
            row[date] ||
            row[sampleDescription]
          ) {
            let item: any = {
              isEdited,
              date: row[date],
              sampleDescription: row[sampleDescription],
              fromActMd: row[fromActMd],
              toActMd: row[toActMd],
              // isEdited,
              // repeat: null,
              // ar: row[arIndex],
              // fa: row[faIndex],
              // key: row[keyIndex],
              // id:
              //   indexFinded > -1 ? this.rowData[indexFinded].id || null : null,
            };
            if (indexFinded >= 0) {
              this.rowData[indexFinded] = item;
            } else {
              item.uniqueId = uuid.v4();
              this.rowData.unshift(item);
            }
          }
        });
        target["value"] = null;
        this.agGridUpdate();
        this.countItemEdited = this.getCountEdited();
      };
      reader.onerror = () => {
        target["value"] = null;
      };
      reader.readAsBinaryString(target.files[0]);
    } catch (ex) {
      target["value"] = null;
      evt.target.value = null;
    }
  }
}
