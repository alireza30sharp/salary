export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const faxRegex = /^[+]?[0-9()\-\s]*$/;
export const phoneRegex = /^(?:\+?98|0)?9\d{9}/;
export const phonetel =
  /^(?:\+?98|0)?(21|2[2-9]|3[1-3]|4[1-4]|5[1-5]|6[1-6]|7[1-6]|8[1-3]|90)\d{6}/;

function isEmailValid(email: string): boolean {
  return emailRegex.test(email);
}

function isFaxValid(fax: string): boolean {
  return faxRegex.test(fax);
}

function isPhoneValid(phone: string): boolean {
  return phoneRegex.test(phone);
}
function isphonetelValid(phone: string): boolean {
  return phonetel.test(phone);
}
export default {
  emailRegex,
  faxRegex,
  phoneRegex,
  phonetel,
  isEmailValid,
  isFaxValid,
  isPhoneValid,
  isphonetelValid,
};
