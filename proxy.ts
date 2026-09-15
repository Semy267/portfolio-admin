import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/content") ||
    pathname.startsWith("/media") ||
    pathname.startsWith("/appearance") ||
    pathname.startsWith("/settings")
  ) {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    try {
      const response = await fetch(`${apiBase}/api/v1/auth/get-session`, {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      });

      if (!response.ok) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const data = await response.json();
      if (!data || !data.session) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      console.error("Middleware Auth Check Error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/content/:path*",
    "/media/:path*",
    "/appearance/:path*",
    "/settings/:path*",
  ],
};
