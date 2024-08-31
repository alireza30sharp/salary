export interface TabModel {
  tabId?: string;
  active?: boolean;
  title: string;
  closable?: boolean;
  route?: string;
  imgSrc?: string;
  supTag?: string;
  isNew?: boolean;
  content?: any;
  contentUrl?: any;
  screenshot?: any;
  showPreview?: any;
  screenshotUrl?: any;
  previewVisible?: any;
  previewImage?: any;
  previewImageUrl?: string; // افزودن تصویر کوچک
  previewContent?: string; // اضافه کردن محتوا برای پیش‌نمایش
}
