import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { getLocale } from "./lib/locale";
import { i18n } from "./lib/utils";

const guardedRoutes = ["dashboard"];

// eslint-disable-next-line consistent-return
export async function middleware(request: NextRequest) {
  const {
    nextUrl: { pathname },
  } = request;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
  if (pathnameIsMissingLocale) {
    // Redirect if there is no locale
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }

  const pathnameWithoutLocale = pathname.split("/").slice(2).join("/");
  const locale = getLocale(request);
  if (
    guardedRoutes.some((route) => pathnameWithoutLocale.includes(route))
    && !(await getToken({ req: request }))
  ) {
    const response = NextResponse.redirect(
      new URL(`/${locale}/login?callback=${request.url}`, request.url),
    );
    return response;
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
