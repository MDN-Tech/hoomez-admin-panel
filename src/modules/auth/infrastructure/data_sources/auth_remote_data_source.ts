import { HttpClient } from "@/core/api/http_client";
import type {
  LoginResponse,
  TokenRefreshResponse,
} from "../../domain/entities/token_entity";
import type { LoginParams } from "../../domain/params/auth_params";
import { endpoints } from "@/core/api/endpoints";

export class AuthRemoteDataSource {
  private httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async login(params: LoginParams): Promise<LoginResponse> {
    const response = await this.httpClient.post<LoginResponse>(
      endpoints.login,
      params,
    );

    return response.data;
  }

  async logout() {
    this.httpClient.post(endpoints.logout);
  }

  async refreshToken(refreshToken: string): Promise<TokenRefreshResponse> {
    const response = await this.httpClient.post<TokenRefreshResponse>(
      endpoints.refreshToken,
      { refreshToken },
    );

    return response.data;
  }
}
