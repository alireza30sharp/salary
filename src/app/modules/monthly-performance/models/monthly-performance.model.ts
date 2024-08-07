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
  details: any[];
  deleteDetails: Array<string>;
}

export class addWorkingTimesDetailDto {
  employeeId: number;
  personalCode: string;
  yearNum: number;
  monthNum: number;
  dayWorkShiftDays: number;
  dayWorkShiftHours: number;
  dayWorkShiftMinutes: number;
  nightWorkShiftDays: number;
  nightWorkShiftHours: number;
  nightWorkShiftMinutes: number;
  overTimeWorkShiftDays: number;
  overTimeWorkShiftHours: number;
  overTimeWorkShiftMinutes: number;
  vacationWorkShiftDays: number;
  vacationWorkShiftHours: number;
  vacationWorkShiftMinutes: number;
  vacationDays: number;
  vacationHours: number;
  vacationMinutes: number;
  code: number;
  id?: number;
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
