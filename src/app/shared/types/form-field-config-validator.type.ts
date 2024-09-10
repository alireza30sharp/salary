import { ValidatorFn } from '@angular/forms';

export type FormFieldConfigValidatorType = {
  type: ValidatorFn;
  message?: string;
};
