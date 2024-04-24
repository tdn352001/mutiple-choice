import { getApi, postApi } from "@/lib/axios";
import { GetMeResponse, UpdatePasswordRequest } from "./types";

export * from "./types";

export const userService = {
  getMe() {
    return getApi<GetMeResponse>("/user/me");
  },
  updatePassword(request: UpdatePasswordRequest) {
    return postApi("/update_password", request);
  },
};
