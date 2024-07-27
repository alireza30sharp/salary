export class EmploymentTypesDto {
  id?: number;
  workShopId: number;
  typeText: string;
  orderIndex: number = 0;
  isDefault: boolean;
}
