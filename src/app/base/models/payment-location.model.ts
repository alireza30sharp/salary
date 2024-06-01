export class PaymentLocationDto {
  id?: number;
  workShopId: number;
  location: string;
  orderIndex: number;
  isDefault: boolean;
}
