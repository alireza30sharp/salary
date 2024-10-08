export class EmployeDto {
  workShopId?: number;
  row_NO?: number;
  id?: number;
  personnelCode: string;
  displayName?: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  birthCertificateCode: string;
  nationalCode: string;
  birthCertificateSerial: string;
  persianBirthDate: string;
  birthPlace: string;
  insuranceNumber: string;
  issuedPlace: string;
  gender: number = 1;
  firstMobile: string;
  secondMobile: string;
  telephone: string;
  email: string;
  address: string;
  isActive:boolean=true;
  comment: string;
}
