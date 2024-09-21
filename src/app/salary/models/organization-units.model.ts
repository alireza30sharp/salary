export class OrganizationUnitsDto {
  id?: number;
  row_NO?: number;
  parentId?: number;
  workShopId: number;
  unitLevel: number;
  code?: number;
  name: string;
  comment: string;
}
export class OrganizationUnitsModel {
  workShopId: number;
  id: number;
  parentId: number;
}
