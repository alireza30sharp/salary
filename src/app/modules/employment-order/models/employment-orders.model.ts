export class EmploymentOrdersDto {
  workShopId: number;
  employeeId: number;
  organizationUnitId: number;
  organizationPostId: number;
  paymentLocationId: number;
  employmentTypeId: number;
  persianDateStr: string;
  id?: number;
  row_NO?: number;
  code?: number;
}
export class EmploymentOrdersListDto {
  workShopId: number;
  employeeId: number;
  organizationUnitId: number;
  organizationPostId: number;
  paymentLocationId: number;
  employmentTypeId: number;
  persianDateStr: string;
  id?: number;
  row_NO?: number;
  code?: number;
  employmentTypeCode?: number;
  employmentTypeName?: string;
  firstName?: string;
  fullEmployeeName?: string;
  lastName?: string;
  organizationPostCode?: number;
  organizationPostName?: string;
  organizationUnitCode?: number;
  organizationUnitName?: string;
  paymentLocationCode?: number;
  paymentLocationName?: string;
  persianStartDate?: string;
  personnelCode?: string;
}
