export class AdvanceDto {
  workShopId: number;
  year: number;
  month: number;
  employeeId: number;
  requestedAmount: number;
  comment: string;
  id?: number;
  row_NO?: number;
  code?: number;
}

export class AdvanceListDto {
  row_NO: number;
  id: number;
  workShopId: number;
  employeeId: number;
  personnelCode?: string;
  persianStartDate?: string;
  requestDate?: string;
  requestedAmount?: number;
  firstName?: string;
  lastName?: string;
  confirmedAmount?: number;
}

export class AdvanceFilter {
  RequestDateFrom?: string;
  RequestDateTo?: string;
  confirmedAmount?: number;
}
