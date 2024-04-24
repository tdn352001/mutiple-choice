"use client";
import { PropsWithChildren, useEffect, useLayoutEffect, useRef } from "react";
import { useCurrentUser } from "@/hooks/services/user/use-current-user";
import { RemoveScroll } from "react-remove-scroll";
import { useUserStore } from "@/store/user";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const setUser = useUserStore((state) => state.setUser);
  const setIsCheckedAuth = useUserStore((state) => state.setIsCheckedAuth);
  const { isLoading, data } = useCurrentUser();

  useEffect(() => {
    document.body.style.display = isLoading ? "none" : "block";
    if (!isLoading) {
      setIsCheckedAuth(true);
      setUser(data?.data.user);
    }
  }, [isLoading]);

  return (
    <>
      {children}

      {isLoading && (
        <RemoveScroll>
          <div className="fixed inset-0 z-[9999] fade-in bg-white" />
        </RemoveScroll>
      )}
    </>
  );
};

export default AuthProvider;
