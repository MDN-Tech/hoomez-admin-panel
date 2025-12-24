import type { UserResponse } from "../../infrastructure/mappers/user_mapper";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  dateOfBirth: Date;
  isActive: boolean;
}

export function toJson(user: User): UserResponse {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    dateOfBirth: user.dateOfBirth.toISOString(),
    isActive: user.isActive,
  };
}

export type UserRole = "admin" | "customer" | "supplier";
