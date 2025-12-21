import type { User } from "@/modules/auth/domain/entities/user_entity";
import { fromStorage } from "@/modules/auth/infrastructure/mappers/user_mapper";

export class TokenStorageService {
  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  getUser(): User | null {
    return fromStorage(localStorage.getItem("user"));
  }

  setUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  clearUser() {
    localStorage.removeItem("user");
  }

  clearStorage() {
    localStorage.clear();
  }
}
