import styles from "./Profile.module.scss";
import { EIcons } from "@/enums/icons.enum";
import { Icon } from "@/components/Icon/Icon";
import Link from "next/link";
import { ERoutes } from "@/enums/routes.enum";
import { useState } from "react";
import cn from "classnames";
import { signOut } from "next-auth/react";
import useOutsideClick from "@/hooks/useOutsideClick";
import useSWR from "swr";
import { getImage } from "@/services";
import Image from "next/image";

export const Profile = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { data: imageFile, isLoading } = useSWR("get-image", getImage, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    // revalidateOnReconnect: false,
  });

  const showContentHandler = () => {
    setIsShow(!isShow);
  };

  const wrapperRef = useOutsideClick(() => {
    setIsShow(false);
  });

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button className={styles.btn} onClick={showContentHandler}>
        {imageFile ? (
          <Image
            src={URL.createObjectURL(imageFile)}
            width={30}
            height={30}
            alt="img"
            className="rounded object-cover border-amber-100 "
          />
        ) : (
          <Icon size={20} color="#fff" name={EIcons.User} />
        )}
      </button>
      <div className={cn(styles.content, { [styles.isShow]: isShow })}>
        <Link href={ERoutes.Profile}>Профиль</Link>
        <Link href={ERoutes.Settings}>Настройки</Link>
        <Link href="#" onClick={() => signOut({ callbackUrl: ERoutes.Main })}>
          Выход
        </Link>
      </div>
    </div>
  );
};
