"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = () => {
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("coinsFill_token");

    if (token) {
      const decodedJwt = parseJwt(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        signOut({ callbackUrl: "/" });
        localStorage.removeItem("coinsFill_token");
      }
    }
  }, [pathname]);

  return null;
};

export default AuthVerify;
