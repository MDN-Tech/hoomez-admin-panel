import type {
  User,
  UserRole,
} from "@/modules/auth/domain/entities/user_entity";

export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  dateOfBirth: string;
  isActive: boolean;
}

// Function to map API response to domain entity
export function fromJson(apiUser: UserModel): User {
  return {
    id: apiUser.id,
    firstName: apiUser.firstName,
    lastName: apiUser.lastName,
    email: apiUser.email,
    phoneNumber: apiUser.phoneNumber,
    role: apiUser.role as User["role"], // Type assertion since we validate the role
    dateOfBirth: new Date(apiUser.dateOfBirth),
    isActive: apiUser.isActive,
  };
}

// Function to map stored user string from localStorage to User object
export function fromStorage(storedUser: string | null): User | null {
  if (!storedUser) return null;

  try {
    const parsed = JSON.parse(storedUser);
    return {
      id: parsed.id,
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      email: parsed.email,
      phoneNumber: parsed.phoneNumber,
      role: parsed.role,
      dateOfBirth: new Date(parsed.dateOfBirth),
      isActive: parsed.isActive,
    };
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    return null;
  }
}
