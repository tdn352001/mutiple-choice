"use client";

import { PropsWithChildren } from "react";
import { useUserStore } from "@/store/user";
import { redirect } from "next/navigation";
import { routers } from "@/lib/constants/routers";

const IS_SERVER = typeof window === "undefined";

const Layout = ({ children }: PropsWithChildren) => {
  const isCheckedAuth = useUserStore((state) => state.isCheckedAuth);
  const user = useUserStore.getState().user;

  if (isCheckedAuth && !user) {
    const callbackUrl = IS_SERVER
      ? routers.dashboard
      : window.location.pathname;
    redirect(`${routers.login}?callbackUrl=${callbackUrl}`);
  }

  return children;
};

export default Layout;
