export type UserRole = "ADMIN" | "EDITOR" | "USER";
export interface Product {
  id: number;
  name: string;
  price: number;
  status: string;
  category_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductPayload {
  id?: string;
  name: string;
  price: number;
  status: string;
  category_id: number;
}

export interface UpdateUserPayload {
  email?: string;
  role?: UserRole;
  is_active?: boolean;
}
