import { DeductionsEnum } from "../../../../shared/models/deductions.enum";

export class wageOrdersDto {
  workShopId: number;
  employeeId: number;
  persianStartDate: string;
  employerInsurance: number;
  workerInsurance: number;
  unEmploymentInsurance: number;
  hasInsurance: boolean;
  isTaxable: boolean;
  comment: string;
  details: wageOrderDetailDto[];
  deleteDetails: Array<string>;
}

export class wageOrderDetailDto {
  benefitDeductionId: number;
  price: number;
  calculateOnInsurance: boolean;
  calculateOnTax: boolean;
  id: string;
  actionType: actionTypeEnum;
  benefitDeductionType: DeductionsEnum;
}
export class wageOrderListDto {
  row_NO: number;
  id: number;
  employeeName: string;
  persianStartDate: string;
  comment: string;
  employerInsurance: string;
  unEmploymentInsurance: string;
  workerInsurance: string;
  personnelCode: string;
  employeeId: number;
  code: number;
  firstName: string;
  lastName: string;
}

export enum actionTypeEnum {
  add = 0,
  edit = 1,
}
