export interface IValidationSchema {
  required?: IRequired;
  pattern?: IPattern;
  minLength?: IMinLength;
  maxLength?: IMaxLength;
  validate?: (value: any) => any;
}

interface IRequired {
  value: boolean;
  message: string;
}

interface IPattern {
  value: any;
  message: string;
}

interface IMinLength {
  value: number;
  message: string;
}

interface IMaxLength {
  value: number;
  message: string;
}

export interface IIconListParams {
  viewBox?: string;
  data: JSX.Element;
}
