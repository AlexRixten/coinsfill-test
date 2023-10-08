"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Profile } from "./Profile/Profile";
import { Search } from "./Search/Search";
import { ERoutes } from "@/enums/routes.enum";
import styles from "./Header.module.scss";
import { useEffect } from "react";

export const Header = () => {
  const session = useSession();

  useEffect(() => {
    if (!session.data?.user.token) return;
  }, [session.data?.user.token]);

  return (
    <header className={styles.wrapper}>
      <Link href={ERoutes.Main} className={styles.logo}>
        <Image src="/logo.svg" alt="logo" width={30} height={47} />
        <h3>СoinsFill</h3>
      </Link>
      {session?.data && (
        <div className={styles.btnsGroup}>
          <Search />
          <Profile />
        </div>
      )}
    </header>
  );
};
