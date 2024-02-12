import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isCookiesExist = !!request.cookies.get("user_token");
  const isLoginPage = pathname.startsWith("/login");
  const isRegisterPage = pathname.startsWith("/register");

  // Allow visiting login and register pages without being logged in
  if (
    (isCookiesExist === false && !isLoginPage && !isRegisterPage) ||
    (isCookiesExist && (isLoginPage || isRegisterPage))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect logged-in users from login and register pages
  if (isCookiesExist && (isLoginPage || isRegisterPage)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
