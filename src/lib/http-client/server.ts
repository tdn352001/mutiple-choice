import { API_URL } from "@/lib/constants/api";
import { HttpClient } from "@/lib/http-client";
import { sessionManager } from "@/lib/session";
import { BaseApiQueryParams } from "@/lib/types/query-params";
import { GetCourseByIdResponse, GetCourseResponse } from "@/services/courses";

export const serverHttp = new HttpClient({
  baseUrl: API_URL,
  headers: {
    Authorization: sessionManager.accessToken,
  },
});

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
};

export const serverFetchService = {
  async getCourse(
    params: BaseApiQueryParams = defaultParams,
  ): Promise<GetCourseResponse["data"]> {
    const defaultResponse = {
      courses: [],
      meta: {
        current_page: 1,
        total_pages: 0,
        total_items: 0,
      },
    };

    try {
      const res = await serverHttp.get<GetCourseResponse>("/course", {
        params,
        next: {
          tags: ["courses", JSON.stringify(params)],
        },
      });

      return res.data?.data || defaultResponse;
    } catch (error) {
      return defaultResponse;
    }
  },
  async getCourseById(id: string) {
    const res = await serverHttp.get<GetCourseByIdResponse>(`/course/${id}`, {
      next: {
        tags: [`courses-${id}`],
        revalidate: 60,
      },
    });

    return res.data;
  },
};
