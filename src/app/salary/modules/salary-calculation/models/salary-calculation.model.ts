export class addWorkingTimesDto {
  workShopId: number;
  addWorkingTimes: addWorkingTimesDetailDto[];
}

export class addWorkingTimesDetailDto {
  employeeId: number;
  employeeName: string;
  personnelCode: string;
  year: string;
  month: string;
  totalAdvance: number;
  mozdRoozane: number;
  mozdMahane: number;
  ezefekari: number;
  haghOlad: number;
  haghMaskan: number;
  haghBon: number;
  mamooriat: number;
  mosaede: number;
  payeSanavat: number;
  padash: number;
  eydi: number;
  sanavatPayanSal: number;
  jamMazaya: number;
  kasriKar: number;
  tashilat: number;
  sayerKosoorat: number;
  jamKosoorat: number;
  jamHoghogh: number;
  jamHoghooghMashmool: number;
  bimePardakhti: number;
  maliatPardakhti: number;
  jamKhalesPardakhti: number;
  code: number;
  id?: number;
}
export class addDraftDto {
  workShopId: number;
  month: number;
  year: number;
}

export class deleteDto {
  workShopId: number;
  month: number;
  year: number;
}

export class taxDisketDto {
  id?: number;
  personnelCode: string;
  nationalityTypeId: number;
  nationalityTypeName: string;
  nationalCode: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  fullName: string;
  educationEvidenceName: string;
  employeeInsuranceTypeName: string;
  insuranceNumber: number;
  insuranceName: string;
  exemptionTypeName: string;
  countryOfCitizenshipName: string;
  countryOfResidenceName: string;
  postalCode: string;
  address: string;
  categoryName: string;
  organizationPostName: string;
  employmentTypeName: string;
  startDate: string;
  finishDate: string;
  retireDate: string;
}

export class taxDisketDto1 {
  id: number;
  year: number;
  monthnumber;
  codenumber;
  personnelCode: string;
  firstName: string;
  lastName: string;
  fullName: string;
  vaziatMahalKhedmat_3: number;
  estesnaMozoGhanonBodje_4: number;
  noeArz_5: number;
  nerkhTaseerArz_6: number;
  mabJamNakhales_7: number;
  mabHoghoghMazaya_8: number;
  maskan_9: number;
  mabKasrHoghoghMaskan_10: number;
  autoMobileEkhtesasi_11: number;
  mabKasrHoghoghAutoMobile_12: number;
  mabGheymatSayerMazaya_13: number;
  mabHoghoghMazayaMaliat_14: number;
  mabHagh_15: number;
  mabGharardad_16: number;
  ezafeKari_17: number;
  hazineSafar_18: number;
  mamoriat_19: number;
  karane_20: number;
  padash_21: number;
  padashAkharSal_22: number;
  eydiSalane_23: number;
  padashPayanKhedmat_24: number;
  khesaratEkhrage_25: number;
  bazKharidKhedmat_26: number;
  haghSanavat_27: number;
  hoghoghMorakhasiEstefadeNashode_28: number;
  sayerHoghoghMazaya_29: number;
  mabHoghoghMazayaNaghdiMaliat_30: number;
  mabGheymatMazayaGheyrNaghdi_31: number;
  mabMazayaGheyrMostaghimVaNaghdiMaliat_32: number;
  haghBimeDarman_33: number;
  haghBimeOmr_34: number;
  khalesPardakhti_35: number;
}
