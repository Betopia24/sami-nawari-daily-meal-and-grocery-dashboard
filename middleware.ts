import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Retrieve the token from cookies
  const token = request.cookies.get("accessToken")?.value;

  // Define routes that should be accessible without authentication
  const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/forgot-password");

  // Define routes that require authentication
  const isProtectedRoute = pathname.startsWith("/dashboard");

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
      // Decode JWT payload without verifying signature (Edge compatible)
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const decoded = JSON.parse(jsonPayload);

      if (decoded.role !== "ADMIN") {
        // If logged in but not an admin, redirect back to login or an unauthorized page
        // We delete the token cookie so they are forced to log in again as admin
        const response = NextResponse.redirect(new URL("/sign-in?error=unauthorized", request.url));
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      }
    } catch (e) {
      // Invalid token
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (isAuthRoute && token) {
    // If trying to access auth routes (like sign-in) but already logged in, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
