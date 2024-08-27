export class addWorkingTimesDto {
  workShopId: number;
  addWorkingTimes: addWorkingTimesDetailDto[];
}

export class addWorkingTimesDetailDto {
  employeeId: number;
  personalCode: string;
  yearNum: number;
  monthNum: number;
  dayWorkShiftDays: number;
  dayWorkShiftHours: number;
  dayWorkShiftMinutes: number;
  nightWorkShiftDays: number;
  nightWorkShiftHours: number;
  nightWorkShiftMinutes: number;
  overTimeWorkShiftDays: number;
  overTimeWorkShiftHours: number;
  overTimeWorkShiftMinutes: number;
  vacationWorkShiftDays: number;
  vacationWorkShiftHours: number;
  vacationWorkShiftMinutes: number;
  vacationDays: number;
  vacationHours: number;
  vacationMinutes: number;
  code: number;
  absenceDays: number;
  absanceHours: number;
  absanceHoursMinutes: number;
  missionDays: number;
  missionHours: number;
  missionMinutes: number;
  earnedLeaveDays: number;
  earnedLeaveHours: number;
  earnedLeaveMinutes: number;
  sickLeaveDays: number;
  sickLeaveHours: number;
  sickLeaveMinutes: number;
  withOutPayLeaveDays: number;
  withOutPayLeaveHours: number;
  withOutPayLeaveMinutes: number;
  workDeficitDays: number;
  workDeficitHours: number;
  workDeficitMinutes: number;
  id?: number;
}
export class addDraftDto {
  workShopId: number;
  yearNum: number;
  monthNum: number;
}

export class deleteDto {
  workShopId: number;
  month: number;
  year: number;
}
