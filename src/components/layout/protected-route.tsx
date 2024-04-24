import { PropsWithChildren } from "react";
import { useUserStore } from "@/store/user";
import { routers } from "@/lib/constants/routers";
import { redirect } from "next/navigation";

const IS_SERVER = typeof window === "undefined";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
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

export default ProtectedRoute;
