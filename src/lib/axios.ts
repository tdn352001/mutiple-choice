import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { sessionManager } from "@/lib/session";

export interface ApiError {
  code?: number | string;
  message?: string;
  status?: number;
}

const axiosClient = axios.create({
  baseURL: "http://14.225.205.150:8000/api",
});

axiosClient.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    const accessToken = sessionManager.accessToken;
    console.log({ accessToken });
    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
      axiosClient.defaults.headers.common["Authorization"] =
        "Bearer " + accessToken;
    }
  }

  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const handleError = (error: any): ApiError => {
  if (axios.isAxiosError(error)) {
    const serverError = error.response?.data;

    return {
      status: error.response?.status,
      code: serverError?.code || error.code,
      message: serverError?.message || error.message,
    };
  }

  return {
    code: error.code,
    message: error.message,
  };
};

const getApi = <T = any, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>,
): Promise<T> =>
  axiosClient
    .get<T, T, D>(url, config)
    .catch((error) => Promise.reject(handleError(error)));

const postApi = <T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
): Promise<T> =>
  axiosClient
    .post<T, T, D>(url, data, config)
    .catch((error) => Promise.reject(handleError(error)));

const putApi = <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
): Promise<R> =>
  axiosClient
    .put<T, R, D>(url, data, config)
    .catch((error) => Promise.reject(handleError(error)));

const patchApi = <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
): Promise<R> =>
  axiosClient
    .patch<T, R, D>(url, data, config)
    .catch((error) => Promise.reject(handleError(error)));

const deleteApi = <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>,
): Promise<R> =>
  axiosClient
    .delete<T, R, D>(url, config)
    .catch((error) => Promise.reject(handleError(error)));

export { getApi, postApi, putApi, patchApi, deleteApi };
export default axiosClient;
