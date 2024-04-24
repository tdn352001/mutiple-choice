import { postApi } from "@/lib/axios";
import {
  ActiveUserRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ResendActiveCodeRequest,
} from "@/services/auth/type";

export * from "./type";

export const authService = {
  login(request: LoginRequest) {
    return postApi<LoginResponse>("/login", request);
  },
  register(request: RegisterRequest) {
    return postApi("/register", request);
  },

  activeUser(request: ActiveUserRequest) {
    return postApi("/activation_code", request);
  },
  resendActiveCode(request: ResendActiveCodeRequest) {
    return postApi("/resend_activation_code", request);
  },
};
