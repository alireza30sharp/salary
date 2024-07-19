export class  wageOrdersDto {
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
}

export class wageOrderDetailDto {
  benefitDeductionId: number;
  price: number;
  calculateOnInsurance: boolean;
  calculateOnTax: boolean;
  id: string;
  actionType: number;
}