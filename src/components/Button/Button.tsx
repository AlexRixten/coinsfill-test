import styles from "./Button.module.scss";
import { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import { EIcons } from "@/enums/icons.enum";
import { Icon } from "@/components/Icon/Icon";

interface IButtonParams extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant: "yellow" | "blue" | "default";
  iconName?: EIcons;
}

export const Button = ({
  title,
  variant,
  onClick,
  type,
  iconName,
}: IButtonParams) => {
  return (
    <button
      type={type || "button"}
      className={cn(styles.btn, { [styles[variant]]: true })}
      onClick={onClick}
    >
      {iconName && <Icon size={15} color="white" name={iconName} />}
      {title}
    </button>
  );
};
