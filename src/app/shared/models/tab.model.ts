export class TabModelDto {
  active?: boolean;
  title: string;
  closable?: boolean;
  route?: string;
  imgSrc?: string;
  isNew?: boolean;
  queryParams?: Record<string, string | number | boolean>;
  tabId?: any;
}
