import { ColDef } from "ag-grid-community";

export interface AgGridInterFace extends ColDef {
  children?: any;
}

export enum TypeRcordModel {
  formation = "Formation",
  tubing = "tubing",
  cores = "cores",
}
