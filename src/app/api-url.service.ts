import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";

const BASE_URL = environment.apiUrl + "/api/";
const BASE_URL_v1 = BASE_URL + "/api/v1/";
@Injectable({
  providedIn: "root",
})
export class ApiUrlService {
  constructor() {}
  UserAuth = {
    Login: BASE_URL + "UserAuth/Login",
  };
  Parents = {
    ParentVerifyRequest: BASE_URL + "Parents/ParentVerifyRequest",
    VerificationCode: BASE_URL + "VerificationCode/VerificationCode",
  };
  WorkShops = {
    GetWorkShopList: BASE_URL + "BasicInformation/WorkShops/GetWorkShopList",
    GetWorkShopById: BASE_URL + "BasicInformation/WorkShops/GetWorkShopById",
    Add: BASE_URL + "BasicInformation/WorkShops/Add",
    Edit: BASE_URL + "BasicInformation/WorkShops/Edit",
    Delete: BASE_URL + "BasicInformation/WorkShops/Delete",
  };
  BenefitDeduction = {
    GetBenefitsDeductions:
      BASE_URL + "BasicInformation/BenefitDeduction/GetBenefitsDeductions",
    Add: BASE_URL + "BasicInformation/BenefitDeduction/Add",
    Delete: BASE_URL + "BasicInformation/BenefitDeduction/Delete",
    Edit: BASE_URL + "BasicInformation/BenefitDeduction/Edit",
    getById: BASE_URL + "BasicInformation/BenefitDeduction/GetById",
    GetBenefitDaductionClientPrerequisites:
      BASE_URL +
      "BasicInformation/BenefitDeduction/GetBenefitDaductionClientPrerequisites",
  };
  Tax = {
    GetAllTaxData: BASE_URL + "BasicInformation/TaxTable/GetAllTaxData",
    Add: BASE_URL + "BasicInformation/TaxTable/Add",
    Delete: BASE_URL + "BasicInformation/TaxTable/Delete",
    Edit: BASE_URL + "BasicInformation/TaxTable/Edit",
    getById: BASE_URL + "BasicInformation/TaxTable/GetById",
  };
  EducationEvidences = {
    GetAllEducationEvidences:
      BASE_URL + "BasicInformation/EducationEvidences/GetAllEducationEvidences",
    Add: BASE_URL + "BasicInformation/EducationEvidences/Add",
    Delete: BASE_URL + "BasicInformation/EducationEvidences/Delete",
    Edit: BASE_URL + "BasicInformation/EducationEvidences/Edit",
    getById: BASE_URL + "BasicInformation/EducationEvidences/GetById",
  };
  EducationFields = {
    GetAllEducationFields:
      BASE_URL + "BasicInformation/EducationFields/GetAllEducationEvidences",
    Add: BASE_URL + "BasicInformation/EducationFields/Add",
    Delete: BASE_URL + "BasicInformation/EducationFields/Delete",
    Edit: BASE_URL + "BasicInformation/EducationFields/Edit",
    getById: BASE_URL + "BasicInformation/EducationFields/GetById",
  };
  EmploymentTypes = {
    GetAllEducationEvidences:
      BASE_URL + "BasicInformation/EmploymentTypes/GetAllEducationEvidences",
    Add: BASE_URL + "BasicInformation/EmploymentTypes/Add",
    Delete: BASE_URL + "BasicInformation/EmploymentTypes/Delete",
    Edit: BASE_URL + "BasicInformation/EmploymentTypes/Edit",
    getById: BASE_URL + "BasicInformation/EmploymentTypes/GetById",
    GetEmploymentTypeClientPrerequisites:
      BASE_URL +
      "BasicInformation/EmploymentTypes/GetEmploymentTypeClientPrerequisites",
  };
  OrganizationPost = {
    GetAllOrganizationPosts:
      BASE_URL + "BasicInformation/OrganizationPost/GetAllOrganizationPosts",
    Add: BASE_URL + "BasicInformation/OrganizationPost/Add",
    Delete: BASE_URL + "BasicInformation/OrganizationPost/Delete",
    Edit: BASE_URL + "BasicInformation/OrganizationPost/Edit",
    getById: BASE_URL + "BasicInformation/OrganizationPost/GetById",
    GetOrganizationPostClientPrerequisites:
      BASE_URL +
      "BasicInformation/OrganizationPost/GetOrganizationPostClientPrerequisites",
  };
  OrganizationUnits = {
    GetAllOrganizationUnits:
      BASE_URL + "BasicInformation/OrganizationUnits/GetAllOrganizationUnits",
    Add: BASE_URL + "BasicInformation/OrganizationUnits/Add",
    Delete: BASE_URL + "BasicInformation/OrganizationUnits/Delete",
    Edit: BASE_URL + "BasicInformation/OrganizationUnits/Edit",
    getById: BASE_URL + "BasicInformation/OrganizationUnits/GetById",
    GetOrganizationUnitClientPrerequisites:
      BASE_URL +
      "BasicInformation/OrganizationUnits/GetOrganizationUnitClientPrerequisites",
  };
  PaymentLocation = {
    GetAllPaymentLocations:
      BASE_URL + "BasicInformation/PaymentLocation/GetAllPaymentLocations",
    Add: BASE_URL + "BasicInformation/PaymentLocation/Add",
    Delete: BASE_URL + "BasicInformation/PaymentLocation/Delete",
    Edit: BASE_URL + "BasicInformation/PaymentLocation/Edit",
    getById: BASE_URL + "BasicInformation/PaymentLocation/GetById",
    GetPaymentLocationClientPrerequisites:
      BASE_URL +
      "BasicInformation/PaymentLocation/GetPaymentLocationClientPrerequisites",
  };
  clientPrerequisits = {
    GetClientPrerequisits:
      BASE_URL + "ClientPrerequisits/GetClientPrerequisties",
  };
  Employees = {
    GetEmployeeList: BASE_URL + "Employees/GetEmployeeList",
    Add: BASE_URL + "Employees/Add",
    Delete: BASE_URL + "Employees/Delete",
    Edit: BASE_URL + "Employees/Edit",
    getById: BASE_URL + "Employees/GetEmployeeInformation",
    GetEmployeeClientPrerequisites:
      BASE_URL + "Employees/GetEmployeeClientPrerequisites",
  };
  BenefitDeductionEmployees = {
    GetBenefitDeductionEmployeesList:
      BASE_URL + "BenefitDeductionEmployees/GetBenefitDeductionEmployeesList",
    Add: BASE_URL + "BenefitDeductionEmployees/Add",
    Delete: BASE_URL + "BenefitDeductionEmployees/Delete",
    Edit: BASE_URL + "BenefitDeductionEmployees/Edit",
    getById: BASE_URL + "BenefitDeductionEmployees/GetEmployeeInformation",
  };
  EmploymentOrders = {
    GetAllEmploymentOrder: BASE_URL + "EmploymentOrders/GetAllEmploymentOrder",
    Add: BASE_URL + "EmploymentOrders/Add",
    Delete: BASE_URL + "EmploymentOrders/Delete",
    Edit: BASE_URL + "EmploymentOrders/Edit",
    getById: BASE_URL + "EmploymentOrders/GetEmploymentOrderById",
  };
  WageOrders = {
    GetWageOrderListOfEmployee:
      BASE_URL + "WageOrders/GetWageOrderListOfEmployee",
    Add: BASE_URL + "WageOrders/Add",
    Delete: BASE_URL + "WageOrders/Delete",
    Edit: BASE_URL + "WageOrders/Edit",
    getById: BASE_URL + "WageOrders/GetWageOrderInformationById",
  };

  WorkingTimes = {
    AddDraft: BASE_URL + "WorkingTimes/AddDraft",
    Add: BASE_URL + "WorkingTimes/Add",
    Edit: BASE_URL + "WorkingTimes/Edit",
    Delete: BASE_URL + "WorkingTimes/Delete",
  };
  SalaryList = {
    GetSalaryListOfEmployee: BASE_URL + "SalaryList/GetSalaryListOfEmployee",
    Add: BASE_URL + "SalaryList/Add",
    Delete: BASE_URL + "SalaryList/Delete",
  };
  TaxDisket = {
    GetTaxDisketReport: BASE_URL + "TaxDisket/GetTaxDisketReport",
    Add: BASE_URL + "TaxDisket/Add",
    Delete: BASE_URL + "TaxDisket/Delete",
  };
  InsuranceDisket = {
    GetInsuranceDisketReport:
      BASE_URL + "InsuranceDisket/GetInsuranceDisketReport",
    Add: BASE_URL + "InsuranceDisket/Add",
    Delete: BASE_URL + "InsuranceDisket/Delete",
    ChangeInsuranceDisketListNumber:
      BASE_URL + "InsuranceDisket/ChangeInsuranceDisketListNumber",
  };
  Advance = {
    GetAll: BASE_URL + "Advance/GetAdvanceList",
    Add: BASE_URL + "Advance/Add",
    Delete: BASE_URL + "Advance/DeleteAdvance",
    Edit: BASE_URL + "Advance/Update",
    getById: BASE_URL + "Advance/GetAdvanceById",
  };
  InsuranceType = {
    GetAll: BASE_URL + "BasicInformation/InsuranceType/GetAllCategories",
    Add: BASE_URL + "BasicInformation/InsuranceType/Add",
    Delete: BASE_URL + "BasicInformation/InsuranceType/Delete",
    Edit: BASE_URL + "BasicInformation/InsuranceType/Edit",
    getById: BASE_URL + "BasicInformation/InsuranceType/GetById",
  };
  ExemptionTypes = {
    GetAll: BASE_URL + "BasicInformation/ExemptionTypes/GetAllCategories",
    Add: BASE_URL + "BasicInformation/ExemptionTypes/Add",
    Delete: BASE_URL + "BasicInformation/ExemptionTypes/Delete",
    Edit: BASE_URL + "BasicInformation/ExemptionTypes/Edit",
    getById: BASE_URL + "BasicInformation/ExemptionTypes/GetById",
  };
}
