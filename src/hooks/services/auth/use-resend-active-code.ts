import { AppMutationOptions } from "@/lib/types/queries";
import { authService } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

export const useResendActiveCode = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: authService.resendActiveCode,
    ...options,
  });
};
