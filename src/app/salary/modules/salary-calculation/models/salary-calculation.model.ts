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
