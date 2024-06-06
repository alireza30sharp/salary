import { RequireAtLeastOne } from "../utilities/utility-types";

export type GeneralActionType<TDATA = any> = {
  tooltip?: string;
  labelFor?: string;
  data?: TDATA;
  click?: (event: Event, args?: GeneralActionType<TDATA>) => void;
} & RequireAtLeastOne<{
  text: string;
  iconClassName: string;
  items: GeneralActionType<TDATA>[];
}>;
