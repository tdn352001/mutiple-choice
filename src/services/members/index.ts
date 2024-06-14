import { deleteApi, getApi, putApi } from "@/lib/axios";
import {
  GetMemberParams,
  GetMemberResponse,
  UpdateMemberInfoRequest,
  UpdateMemberPasswordRequest,
} from "@/services/members/type";

export * from "./type";

export const memberService = {
  getMembers(params?: GetMemberParams) {
    return getApi<GetMemberResponse>("/get_users", {
      params,
    });
  },

  updateMemberInfo(
    memberId: string | number,
    request: UpdateMemberInfoRequest,
  ) {
    return putApi(`/admin/update_user/${memberId}`, request);
  },

  updateMemberPassword(
    memberId: string | number,
    request: UpdateMemberPasswordRequest,
  ) {
    return putApi(`/admin/update_user_password/${memberId}`, request);
  },

  deleteMember(id: string | number) {
    return deleteApi(`/${id}`);
  },
};
