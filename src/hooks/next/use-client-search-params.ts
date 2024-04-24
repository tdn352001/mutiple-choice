import { useRef } from "react";

const IS_SERVER = typeof window === "undefined";

export const useClientSearchParams = () => {
  const searchParams = useRef<URLSearchParams>(
    IS_SERVER
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search),
  );

  return searchParams.current;
};
