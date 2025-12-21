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