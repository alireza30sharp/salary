import { ValidatorFn } from '@angular/forms';

export const getValidatorFnName = (input: ValidatorFn): string => {
  const output = input.name;

  console.log(input.name);

  if (!output) {
    const inputFnBody = input.toString().replace(/\s/g, '');

    if (
      inputFnBody.includes(
        "control=>{if(isEmptyInputValue(control.value)){returnnull;//don'tvalidateemptyvaluestoallowoptionalcontrols}constvalue=control.value;returnregex.test(value)?null:{'pattern':{'requiredPattern':regexStr,'actualValue':value}};}"
      )
    )
      return 'pattern';

    if (
      inputFnBody.includes(
        "{'minlength':{'requiredLength':minLength,'actualLength':control.value.length}}"
      )
    )
      return 'minlength';

    if (
      inputFnBody.includes(
        "{'maxlength':{'requiredLength':maxLength,'actualLength':control.value.length}}"
      )
    )
      return 'maxlength';

    if (inputFnBody.includes("{'min':{'min':min,'actual':control.value}}")) return 'min';

    if (inputFnBody.includes("{'max':{'max':max,'actual':control.value}}")) return 'max';
  }

  return output;
};
