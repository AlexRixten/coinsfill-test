"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import cn from "classnames";
import { Icon } from "@/components/Icon/Icon";
import { NavbarMock } from "@/mock/navbar";
import { RoutesMock } from "@/mock/routes";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const pathname = usePathname();
  const session = useSession();

  return (
    session?.data && (
      <nav className={styles.wrapper}>
        <ul>
          {NavbarMock.map((value) => {
            const navbarItem = RoutesMock[value];
            return (
              <li key={value}>
                <Link
                  href={value}
                  className={cn({ [styles.active]: pathname === value })}
                >
                  <Icon
                    size={20}
                    color="currentColor"
                    name={navbarItem.iconName}
                  />
                  {navbarItem.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    )
  );
};
