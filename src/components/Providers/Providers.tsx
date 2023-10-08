"use client";

import { SessionProvider as Provider } from "next-auth/react";
import { FC, PropsWithChildren } from "react";

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider>{children}</Provider>;
};

import { SWRConfig } from "swr";
export const SWRProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SWRConfig>{children}</SWRConfig>;
};
