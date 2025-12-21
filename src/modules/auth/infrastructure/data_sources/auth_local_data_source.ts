import type { TokenStorageService } from "@/core/services/token_storage_service";
import type { User } from "../../domain/entities/user_entity";

export class AuthLocalDataSource {
  private storage: TokenStorageService;

  constructor(storage: TokenStorageService) {
    this.storage = storage;
  }

  getAccessToken() {
    return this.storage.getAccessToken();
  }

  getRefreshToken() {
    return this.storage.getRefreshToken();
  }

  saveTokens(accessToken: string, refreshToken: string) {
    this.storage.setTokens(accessToken, refreshToken);
  }

  clearTokens() {
    this.storage.clearTokens();
  }

  getCurrentUser(): User | null {
    return this.storage.getUser();
  }

  setCurrentUser(user: User) {
    this.storage.setUser(user);
  }

  clearUser() {
    this.storage.clearUser();
  }
}
