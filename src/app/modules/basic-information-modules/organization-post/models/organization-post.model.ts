export class OrganizationPostDto {
  id?: number;
  row_NO?: number;
  workShopId: number;
  post: string;
  orderIndex: number = 0;
  isDefault: boolean;
}
