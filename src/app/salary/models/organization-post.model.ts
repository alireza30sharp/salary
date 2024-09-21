export class OrganizationPostDto {
  id?: number;
  workShopId: number;
  post: string;
  orderIndex: number = 0;
  isDefault: boolean;
}
