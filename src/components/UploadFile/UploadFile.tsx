"use client";

import styles from "./UploadFile.module.scss";
import { EIcons } from "@/enums/icons.enum";
import { Icon } from "@/components/Icon/Icon";
import { ChangeEvent } from "react";
import { readFileAsync } from "@/utils/uploadFile";
import { throwToastFX } from "@/utils/throwToast";

interface IUploadFileParams {
  changeHandler: (value: File) => void;
}

export const UploadFile = ({ changeHandler }: IUploadFileParams) => {
  const uploadFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget || !event.currentTarget.files) return;

    const file = event.currentTarget.files[0];
    if (file.size > 5000000) {
      throwToastFX({
        title: "Изображение превышает 5Мб",
        type: "error",
      });
      return;
    }
    if (file) changeHandler(file);
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="file"
        id="upload"
        accept="image/png, image/jpeg, image/gif"
        onChange={uploadFileHandler}
        hidden
      />
      <label htmlFor="upload" className={styles.btn}>
        <Icon size={15} color="white" name={EIcons.Upload} />
        Выбрать файл
      </label>
    </div>
  );
};
