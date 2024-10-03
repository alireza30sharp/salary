type InputType = "number" | "text";

export interface SectionData {
  label: string; // لیبل فیلد (مثل جمع دستمزد ماهانه)
  type?: InputType; // نوع فیلد (مثل number یا string)
  value: any; // مقدار فیلد
  separator?: boolean; // آیا باید جداکننده اضافه شود یا خیر
}

export interface Section {
  title?: string; // عنوان اختیاری برای هر بخش
  columns: SectionData[][]; // هر ستون شامل چندین کلید و مقدار است
}
