import api from "../lib/axios";
import { UserPayload, User } from "../types/user.type";

/* ================== LOGIN ================== */
export const login = (payload: UserPayload) =>
  api.post<User>("/auth/login", payload);

/* ================== REGISTER ================== */
export const register = (payload: UserPayload) =>
  api.post<User>("/auth/register", payload);

/* ================== LOGOUT ================== */
export const logout = () =>
  api.get<User>("/auth/logout");