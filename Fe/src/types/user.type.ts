export type UserRole = "ADMIN" | "EDITOR" | "USER";
export interface User {
  id: number;
  email: string;
  role: UserRole;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserPayload {
  email: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserPayload {
  email?: string;
  role?: UserRole;
  is_active?: boolean;
}