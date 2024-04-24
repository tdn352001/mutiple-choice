"use client";

import { PropsWithChildren } from "react";
import { useUserStore } from "@/store/user";
import { redirect } from "next/navigation";
import { routers } from "@/lib/constants/routers";

const IS_SERVER = typeof window === "undefined";

const Layout = ({ children }: PropsWithChildren) => {
  return children;
};

export default Layout;
