export interface TabInterface {
  id?: string;
  text: string;
  link?: string;
  data?: any;
  contentHeight?: string;
  overflow?: 'scroll' | 'auto' | 'hidden';
  iconClassName?: string;
  groupName?: string;
  isBold?: boolean;
  otherSide?: boolean;
}
