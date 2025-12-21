import type { UserModel } from "../../infrastructure/mappers/user_mapper";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
}

export interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export type ApiError = Error | { message: string; status?: number };

export interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: ApiError) => void;
}
