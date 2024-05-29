export interface response<T> {
  data: T;
  isOk: boolean;
  domainStatuesCode: any;
  messages: string[];
}
export interface Data<T> {
  data: T;
  totalCount: number;
  currentPage: number;
  pageSize: number;
}
