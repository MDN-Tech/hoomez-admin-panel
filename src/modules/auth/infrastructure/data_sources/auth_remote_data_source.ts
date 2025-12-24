import { HttpClient } from "@/core/api/http_client";
import type { LoginResponse } from "../../domain/entities/token_entity";
import type { LoginParams } from "../../domain/params/auth_params";
import { endpoints } from "@/core/api/endpoints";

export class AuthRemoteDataSource {
  private httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async login(params: LoginParams): Promise<LoginResponse> {
    const response = await this.httpClient.post<LoginResponse>(
      endpoints.auth.login,
      params,
    );

    return response.data;
  }

  async logout() {
    try {
      await this.httpClient.get(endpoints.auth.logout);
    } catch (error) {
      console.log(error);
    }
  }
}
