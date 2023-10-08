import { InputHTMLAttributes } from "react";
import cn from "classnames";
import { IValidationSchema } from "@/interfaces";
import styles from "./Checkbox.module.scss";

interface ICheckboxParams extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  label?: string;
  error?: string;
  register: any;
  name: string;
  validation?: IValidationSchema;
}

export const Checkbox = ({
  name,
  type = "checkbox",
  required,
  register,
  label,
  error,
  validation,
}: ICheckboxParams) => {
  return (
    <div className={styles.formControlInput}>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && "*"}
        </label>
      )}
      <input
        className={cn({ [styles.error]: error || false })}
        id={name}
        type={type}
        {...register(name, validation)}
      />
    </div>
  );
};
