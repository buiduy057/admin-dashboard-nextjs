/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Role = "ADMIN" | "USER";

export async function requireAuth(roles?: Role[]) {
  const session: any = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  if (roles && roles.includes(session.user.role)) {
    redirect("/403");
  }
  return session;
}
