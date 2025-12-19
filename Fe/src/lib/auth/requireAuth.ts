/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {jwtDecode} from "jwt-decode";
type Role = "ADMIN" | "USER";

export async function requireAuth(roles?: Role[]) {
  const session: any = (await cookies()).get("accessToken");
  if (!session) {
    redirect("/login");
  }
  const payload = jwtDecode<any>(session?.value);
  if (roles && roles.includes(payload.role)) {
    redirect("/403");
  }
  return session;
}
