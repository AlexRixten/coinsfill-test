"use client";
import { useState } from "react";
import styles from "./CreateAvatar.module.scss";
import { UploadFile } from "@/components/UploadFile/UploadFile";
import { CropImage } from "@/app/settings/upload-avatar/CreateAvatar/CropImage/CropImage";

export const CreateAvatar = () => {
  const [file, setFile] = useState<File | null>(null);

  const changeFileHandler = (value: File) => {
    setFile(value);
  };

  const cancelHandler = () => {
    setFile(null);
  };

  return (
    <div className={styles.wrapper}>
      {file ? (
        <>
          <h1>Фото для аватарки</h1>
          <CropImage file={file} onCancel={cancelHandler} />
        </>
      ) : (
        <>
          <h1>Загрузка аватара</h1>
          <p>
            Загрузите файл размером до 5Мб <br />
            По формату: JPG, PNG, GIF
          </p>
          <UploadFile changeHandler={changeFileHandler} />
        </>
      )}
    </div>
  );
};
