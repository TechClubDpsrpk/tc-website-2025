import { NextRequest, NextResponse } from "next/server";
import { getAuthCookie, verifyToken } from "@/lib/auth";

const protectedRoutes = ["/account"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
