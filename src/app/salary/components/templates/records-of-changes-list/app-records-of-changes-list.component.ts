import { Component } from "@angular/core";
import { propertyOf } from "../../../../shared/utilities/property-of";
import { AgGridInterFace } from "../../../../shared/interfaces/ag-grid.interface";

export class ReportDto {
  row_NO: string;
  workShopId: string;
  id: string;
  name: string;
}

@Component({
  selector: "ngx-app-records-of-changes-list",
  templateUrl: "./app-records-of-changes-list.component.html",
  styleUrls: ["./app-records-of-changes-list.component.scss"],
})
export class RecordsOfChangesListComponent {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<ReportDto>("row_NO"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<ReportDto>("workShopId"),
      hide: true,
    },
    {
      field: propertyOf<ReportDto>("id"),
      hide: true,
    },
    {
      field: propertyOf<ReportDto>("name"),
      hide: true,
    },
  ];
  rowDataDefault = new Array<ReportDto>();
}
