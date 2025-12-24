import type { HttpClient } from "@/core/api/http_client";
import { endpoints } from "@/core/api/endpoints";
import type { UserType } from "../../domain/entities/user_entity";
import type { GetUsersParams } from "../params/user_params";

export class UserRemoteDataSource {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getUsers(params?: GetUsersParams): Promise<UserType[]> {
    const response = await this.httpClient.get<UserType[]>(
      endpoints.users.getUsers,
      { params },
    );
    return response.data;
  }

  async getUserById(id: string): Promise<UserType> {
    const response = await this.httpClient.get<UserType>(
      endpoints.users.getUserById(id),
    );
    return response.data;
  }

  async activateUser(id: string): Promise<UserType> {
    const response = await this.httpClient.patch<UserType>(
      endpoints.users.activateUser(id),
    );
    return response.data;
  }

  async deactivateUser(id: string): Promise<UserType> {
    const response = await this.httpClient.patch<UserType>(
      endpoints.users.deactivateUser(id),
    );
    return response.data;
  }
}
