import { deleteCookie, getCookie, setCookie } from "cookies-next";
import axiosClient from "@/lib/axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { ACCESS_TOKEN_KEY } from "@/lib/constants/keys";

export class SessionManager {
  tempAccessToken: string = "";

  get accessToken() {
    return getCookie(ACCESS_TOKEN_KEY) as string;
  }

  set accessToken(token: string | undefined) {
    if (token) {
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const jwtPayload = jwtDecode<JwtPayload>(token);

      setCookie(ACCESS_TOKEN_KEY, token, {
        expires: new Date(Number(jwtPayload.exp) * 1000),
      });
    } else {
      delete axiosClient.defaults.headers.common["Authorization"];
      deleteCookie(ACCESS_TOKEN_KEY);
    }
  }
}

export const sessionManager = new SessionManager();
