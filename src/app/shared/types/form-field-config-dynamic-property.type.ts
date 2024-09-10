type CallbackParamsType<TMODEL = any> = {
  data: TMODEL;
};

export type FormFieldConfigDynamicPropertyType<DynamicPropertyType = any, TMODEL = any> =
  | DynamicPropertyType
  | ((params: CallbackParamsType<TMODEL>) => DynamicPropertyType)
  | ((params: CallbackParamsType<TMODEL>) => Promise<DynamicPropertyType>);
