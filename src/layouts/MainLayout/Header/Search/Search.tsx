import styles from "./Search.module.scss";
import { Icon } from "@/components/Icon/Icon";
import { EIcons } from "@/enums/icons.enum";
import { useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import cn from "classnames";

export const Search = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const showContentHandler = () => {
    setIsShow(!isShow);
  };

  const wrapperRef = useOutsideClick(() => {
    setIsShow(false);
  });
  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button className={styles.btn} onClick={showContentHandler}>
        <Icon size={20} color="#fff" name={EIcons.Search} />
      </button>
      <div className={cn(styles.content, { [styles.isShow]: isShow })}>
        <input type="text" />
      </div>
    </div>
  );
};
