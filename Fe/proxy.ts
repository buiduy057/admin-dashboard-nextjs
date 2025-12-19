/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_PAGES = ["/login", "/register"];
const AUTH_PAGES_LOGGED = ["/dashboard"];
const PUBLIC_PATHS = ["/api/auth", "/unauthorized"];

export async function proxy(req: any) {
  // console.log('aa')
  // const url = new URL(req.url);
  // const pathname = url.pathname;

  // const token: any = await getToken({
  //   req,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });

  // // ✅ Allow public routes (tránh redirect loop)
  // if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
  //   return NextResponse.next();
  // }
  //  // ✅ Đã login → không cho quay lại login
  // if (token && AUTH_PAGES.includes(pathname)) {
  //   return NextResponse.redirect(new URL("/dashboard", url));
  // }

  //  // ❌ Chưa login → chặn dashboard
  // if (!token && AUTH_PAGES_LOGGED.includes(pathname)) {
  //   return NextResponse.redirect(new URL("/login", url));
  // }

  return NextResponse.next();
}
