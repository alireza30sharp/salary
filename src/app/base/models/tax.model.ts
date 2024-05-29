export class TaxDto {
  workShopId: number;
  comment: string;
  toMoney: number;
  fromMoney: number;
  taxRate: number;
  taxType: number = 1;
  row_No?: number;
  id?: number;
  code?: number;
  taxTypeName?: string;
  fromMoneyStr?: string;
  toMoneyStr?: string;
}
