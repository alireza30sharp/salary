export class EmploymentOrdersDto {
  workShopId?: number;
  row_NO?: number;
  id?: number;
  organizationUnitId: number;
  employeeId:number; 
  organizationPostId:number;
  paymentLocationId: number;
  persianDateStr:string;
  employmentTypeId:number;
  employmentTypeName?:string;
  fullEmployeeName?:string;
  lastName?:string;
  organizationPostName?:string;
  organizationUnitName?:string;
  paymentLocationName:string;
  persianStartDate:string;
  personnelCode:string;
}
