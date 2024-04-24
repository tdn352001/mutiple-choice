import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: userService.getMe,
    retry: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
