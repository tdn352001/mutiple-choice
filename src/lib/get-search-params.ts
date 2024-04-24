const IS_SERVER = typeof window === "undefined";

export const getSearchParams = () => {
  return IS_SERVER
    ? new URLSearchParams()
    : new URLSearchParams(window.location.search);
};
