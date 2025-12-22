import type { AuthLocalDataSource } from "../../infrastructure/data_sources/auth_local_data_source";
import type { AuthRemoteDataSource } from "../../infrastructure/data_sources/auth_remote_data_source";
import { fromJson } from "../../infrastructure/mappers/user_mapper";
import type { User } from "../entities/user_entity";
import type { LoginParams } from "../params/auth_params";

export class AuthRepository {
  private readonly remoteDataSource: AuthRemoteDataSource;
  private readonly localDataSource: AuthLocalDataSource;
  constructor(
    localDataSource: AuthLocalDataSource,
    remoteDataSource: AuthRemoteDataSource,
  ) {
    this.localDataSource = localDataSource;
    this.remoteDataSource = remoteDataSource;
  }

  async login(params: LoginParams): Promise<void> {
    const response = await this.remoteDataSource.login(params);
    this.localDataSource.saveTokens(
      response.accessToken,
      response.refreshToken,
    );

    this.localDataSource.setCurrentUser(fromJson(response.user));
  }

  async logout() {
    this.localDataSource.clearTokens();
    this.localDataSource.clearUser();
    this.remoteDataSource.logout();
  }

  getCurrentUser(): User | null {
    return this.localDataSource.getCurrentUser();
  }

  isAuthenticated(): boolean {
    const token = this.localDataSource.getAccessToken();
    return !!token; // Simple check - you might want to add token expiration check
  }
}
