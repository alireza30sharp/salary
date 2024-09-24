export class WorkShopsDto {
  radifPeyman: string;
  workShopId?: number;
  row_NO?: number;
  workShopName: string;
  workShopCode: string;
  companyName: string;
  employerName: string;
  workShopAddress: string;
  socialSecurityBranchName: string;
  isActive: boolean = true;
  isDefault: boolean;
  isActiveString?: string;
  isDefaultString?: string;
}

export class WorkShopsFilter {
  WorkShopName?: any;
  WorkShopCode?: any;
  DateFrom?: any;
  DateTo?: any;
  EmployeeId?: any;
  PriceTo?: any;
  PriceFrom?: any;
  Statues?: any;
  RequestDateFrom?: any;
  RequestDateTo?: any;
  PageNumber: any = 0;
  PageSize: any = 20;
  InsuranceType?: any;
  ExemptionType?: any;
  Id?: any;
}
