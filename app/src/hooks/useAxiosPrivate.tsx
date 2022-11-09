import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../axios";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export default function useAxiosPrivate() {
  const { token } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (config.headers) {
          if (!config.headers.authorization) {
            config.headers.authorization = `Bearer ${token ?? "."}`;
          }
        }
        return config;
      },
      async (error) => {
        await Promise.reject(error);
      },
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 401 && previousRequest) {
          const newToken = await refresh();
          if (previousRequest.headers) {
            previousRequest.headers.authorization = `Bearer ${newToken}`;
          }
          return axiosPrivate(previousRequest);
        }
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [token, refresh]);

  return axiosPrivate;
}
