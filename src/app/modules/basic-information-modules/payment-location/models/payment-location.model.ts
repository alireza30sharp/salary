export class PaymentLocationDto {
  id?: number;
  row_NO?: any;
  workShopId: number;
  location: string;
  orderIndex: number = 0;
  isDefault: boolean;
}
