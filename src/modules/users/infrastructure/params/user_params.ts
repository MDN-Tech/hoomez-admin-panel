import type { UserRole } from "@/modules/auth/domain/entities/user_entity";

export interface GetUsersParams {
  role?: UserRole;
  search?: string;
  isActive?: boolean;
}

export interface UserStatusParams {
  userId: string;
}
