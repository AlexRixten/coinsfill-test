"use client";

import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";
import { Button } from "@/components/Button/Button";
import { canvasPreview } from "@/utils/canvasPreview";
import { readFileAsync } from "@/utils/uploadFile";
import styles from "./CropImage.module.scss";
import "react-image-crop/dist/ReactCrop.css";
import { axiosInstance } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { throwToastFX } from "@/utils/throwToast";
import { ERoutes } from "@/enums/routes.enum";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { putImage } from "@/services";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

interface ICropImageParams {
  file: File;
  onCancel: () => void;
}

export const CropImage = ({ file, onCancel }: ICropImageParams) => {
  const { mutate } = useSWRConfig();

  const session = useSession();
  const router = useRouter();
  const [imgSrc, _] = useState(URL.createObjectURL(file));
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  async function onCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;

    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );

    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    const base64 = await readFileAsync(blob);
    putImage(base64 as string).then(() => {
      mutate("get-image");
      router.push(ERoutes.Profile);
    });
  }

  return (
    <div className={styles.wrapper}>
      {!!imgSrc && (
        <div className={styles.cropWrapper}>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            circularCrop
            renderSelectionAddon={() => {
              return (
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: "1px solid black",
                    objectFit: "contain",
                    width: completedCrop?.width,
                    height: completedCrop?.height,
                    visibility: "hidden",
                  }}
                />
              );
            }}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ transform: `scale(1) rotate(0deg)` }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
      )}
      <div className={styles.groupBtns}>
        <Button title="Сохранить" variant="blue" onClick={onCropClick} />
        <Button title="Отменить" variant="default" onClick={onCancel} />
      </div>
    </div>
  );
};
