export class WorkShopsDto {
  workShopId?: number;
  row_NO?: number;
  workShopName: string;
  workShopCode: string;
  companyName: string;
  employerName: string;
  workShopAddress: string;
  socialSecurityBranchName: string;
  isActive: boolean;
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
  PageNumber: any = 0;
  PageSize: any = 20;
}
