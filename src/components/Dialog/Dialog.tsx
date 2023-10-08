"use client";

import { FC, JSX, ReactNode, useEffect, useRef } from "react";
import styles from "./Dialog.module.scss";
import { Icon } from "@/components/Icon/Icon";
import { EIcons } from "@/enums/icons.enum";

interface IDialogParams {
  title: string;
  onOk?: () => void;
  onOkTitle?: string;
  onClose?: () => void;
  onCloseTitle?: string;
  isVisible: boolean;
  content: ReactNode;
}

export const Dialog: FC<IDialogParams> = ({
  title,
  onOk,
  onOkTitle = "Ok",
  onClose,
  onCloseTitle = "Cancel",
  isVisible = false,
  content,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isVisible) dialogRef?.current?.show();
    else dialogRef?.current?.close();
  }, [isVisible]);

  const closeDialog = () => {
    dialogRef?.current?.close();
    onClose && onClose();
  };

  const clickOk = () => {
    onOk && onOk();
    closeDialog();
  };

  const dialog: JSX.Element | null = isVisible ? (
    <dialog ref={dialogRef} className={styles.wrapper}>
      <div className={styles.container}>
        <button className={styles.close} onClick={closeDialog}>
          <Icon size={15} color="#1E1E2E" name={EIcons.Close} />
        </button>
        {/*<h3>{title}</h3>*/}
        <div className={styles.content}>{content}</div>
      </div>
    </dialog>
  ) : null;

  return dialog;
};
