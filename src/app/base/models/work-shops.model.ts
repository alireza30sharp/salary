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
  WorkShopName: string;
  WorkShopCode: string;
  PageNumber: number = 0;
  PageSize: number = 20;
}
