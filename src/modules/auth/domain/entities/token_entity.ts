import type { UserResponse } from "../../infrastructure/mappers/user_mapper";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}

export interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
}
