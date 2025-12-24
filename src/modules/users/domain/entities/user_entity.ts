import type { UserRole } from "@/modules/auth/domain/entities/user_entity";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  dateOfBirth: string | Date;
  isActive: boolean;
  createdAt?: string;
}

export interface Admin extends User {
  role: "admin";
}

export interface Customer extends User {
  role: "customer";
}

export interface Supplier extends User {
  role: "supplier";
  businessName?: string;
  businessType?: string;
  businessPhone?: string;
  supplierStreet?: string;
  supplierCity?: string;
  supplierZipCode?: string;
  supplierCountry?: string;
}

export type UserType = Admin | Customer | Supplier;
