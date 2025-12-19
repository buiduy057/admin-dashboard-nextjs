import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Auth",
  description: "Auth",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await cookies()).get("accessToken");

  if (session) {
    redirect("/");
  }
  return <div>{children}</div>;
}
