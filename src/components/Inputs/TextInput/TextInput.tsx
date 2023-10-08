import { InputHTMLAttributes, useState } from "react";
import cn from "classnames";
import { Icon } from "@/components/Icon/Icon";
import { EIcons } from "@/enums/icons.enum";
import { IValidationSchema } from "@/interfaces";
import styles from "./TextInput.module.scss";

interface ITextInputParams extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  iconName?: EIcons;
  label: string;
  name: string;
  register: any;
  required?: boolean;
  type: string;
  validation?: IValidationSchema;
}

export const TextInput = ({
  error,
  iconName,
  label,
  name,
  register,
  required,
  type,
  validation,
}: ITextInputParams) => {
  const [activeType, setActiveType] = useState<string>(type);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const showPasswordHandler = () => {
    setIsShowPassword(!isShowPassword);
    setActiveType(!isShowPassword ? "text" : type);
  };

  return (
    <div className={styles.formControlInput}>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && "*"}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input id={name} type={activeType} {...register(name, validation)} />
        {iconName && (
          <Icon
            className={styles.infoIcon}
            size={21}
            color="#86BFEB80"
            name={iconName}
          />
        )}
        {type === "password" ? (
          <button
            type="button"
            onClick={showPasswordHandler}
            className={styles.showPasswordIcon}
          >
            <Icon
              size={21}
              color="#86BFEB80"
              name={!isShowPassword ? EIcons.Eye : EIcons.CloseEye}
            />
          </button>
        ) : null}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
