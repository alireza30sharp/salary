export class PaymentLocationDto {
  id?: number;
  workShopId: number;
  location: string;
  orderIndex: number = 0;
  isDefault: boolean;
}
