"use client";

import React, { Fragment, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RoutesMock } from "@/mock/routes";
import { ERoutes } from "@/enums/routes.enum";

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

export const Breadcrumb = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div>
      <ul className={containerClasses}>
        <li className={listClasses}>
          <Link href={ERoutes.Main}>{homeElement}</Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((_, index) => {
          const titleLink =
            RoutesMock[`/${pathNames.slice(0, index + 1).join("/")}` as ERoutes]
              ?.title;
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          let itemLink =
            titleLink && capitalizeLinks
              ? titleLink[0].toUpperCase() +
                titleLink.slice(1, titleLink.length)
              : titleLink;
          return (
            <Fragment key={index}>
              <li className={itemClasses}>
                <Link href={href}>{itemLink}</Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};
