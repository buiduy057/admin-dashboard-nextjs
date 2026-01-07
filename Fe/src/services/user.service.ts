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


/* ================== GET USER ================== */
export const getUser = (payload:{ page:number}) =>
  api.get(`/users${payload.page ? `?page=${payload.page}` : ""}`);


/* ================== ADD USER ================== */
export const addUser = (payload: UserPayload) =>
  api.post<User>("/users/", payload);

/* ================== EDIT USER ================== */
export const editUser = (payload: UserPayload) =>{
  const { id, ...body } = payload;
  return api.put<User>(`/users/${id}`, body);
};

/* ================== REMOVE USER ================== */
export const removeUser = (payload: {id : string}) =>{
  const { id } = payload;
  return api.delete<User>(`/users/${id}`);
};