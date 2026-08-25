import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Retrieve the token from cookies
  const token = request.cookies.get("auth_token")?.value;

  // Define routes that should be accessible without authentication
  const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/forgot-password");

  // Define routes that require authentication
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // if (isProtectedRoute && !token) {
  //   // If trying to access a protected route without a token, redirect to sign-in
  //   const url = new URL("/sign-in", request.url);
  //   // Optional: save the callback url to redirect back after login
  //   // url.searchParams.set("callbackUrl", pathname);
  //   return NextResponse.redirect(url);
  // }

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
