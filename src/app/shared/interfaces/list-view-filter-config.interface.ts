export interface ListViewFilterInterFace {
  showFromDate?: boolean;
  showToDate?: boolean;
  showEmployeeId?: boolean;
  showBenefitDeduction?: boolean;
  showFromAmount?: boolean;
  showToAmount?: boolean;
  showComment?: boolean;
}
export interface ListViewFilterDataInterFace {
  fromDate?: any;
  toDate?: any;
  employeeId?: number;
  benefitDeduction?: number;
  fromAmount?: number;
  toAmount?: number;
  comment?: string;
}
