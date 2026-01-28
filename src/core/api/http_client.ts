// src/core/api/http_client.ts
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import type { AuthLocalDataSource } from "@/modules/auth/infrastructure/data_sources/auth_local_data_source";
import { endpoints } from "./endpoints";

export class HttpClient {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
  }> = [];

  private authLocalDataSource: AuthLocalDataSource;

  constructor(authLocalDataSource: AuthLocalDataSource) {
    this.authLocalDataSource = authLocalDataSource;

    this.instance = axios.create({
      baseURL:
        import.meta.env.VITE_NODE_ENV === "dev"
          ? import.meta.env.VITE_BACKEND_URL
          : "/api",
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor() {
    const excludedEndpoints = [endpoints.auth.login];

    this.instance.interceptors.request.use(
      async (config) => {
        const token = this.authLocalDataSource.getAccessToken();
        if (
          token &&
          config.headers &&
          !excludedEndpoints.includes(config.url || "")
        ) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  private initializeResponseInterceptor() {
    const excludedEndpoints = [
      endpoints.auth.login,
      endpoints.auth.logout,
      endpoints.auth.refreshToken,
    ];

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !excludedEndpoints.includes(originalRequest.url || "")
        ) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                return this.instance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = this.authLocalDataSource.getRefreshToken();
            if (!refreshToken) {
              throw new Error("No refresh token available");
            }

            // You'll need to inject the remote data source or make the refresh call directly
            const response = await axios.post<{ accessToken: string }>(
              endpoints.auth.refreshToken,
              { refreshToken },
            );

            const { accessToken } = response.data;
            this.authLocalDataSource.saveTokens(accessToken, refreshToken);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }

            this.processQueue(null, accessToken);
            return this.instance(originalRequest);
          } catch (error) {
            this.processQueue(error, null);
            window.location.href = "/"; // Redirect to login or home page
            return Promise.reject(error);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
    );
  }

  private processQueue(error: unknown, token: string | null) {
    this.failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else if (token) {
        promise.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  // Public API methods
  public get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  public post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  public patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  public put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  public delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}
