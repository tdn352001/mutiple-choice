"use client";

import ThemeProvider from "./theme-provider";
import QueryProvider from "./query-provider";
import AuthProvider from "@/components/layout/providers/auth-provider";
import { PropsWithChildren } from "react";

const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
