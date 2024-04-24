import { User } from "@/services/auth";

export type GetMeResponse = {
  data: {
    user: User;
  };
};

export type UpdatePasswordRequest = {
  old_password: string;
  new_password: string;
};
