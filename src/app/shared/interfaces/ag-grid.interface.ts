import { ColDef } from "ag-grid-community";

export interface AgGridInterFace extends ColDef {
  startEditing?: boolean;
  requerd?: boolean;
  messageRequerd?: string;
  children?: any;
}

export enum TypeRcordModel {
  formation = "Formation",
  tubing = "tubing",
  cores = "cores",
}
