import { getSafeRedirect } from "@/lib/utils/redirect";
import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/sign-in", "/sign-up", "/reset-password", "/api/auth"];

export function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    const isPublic = PUBLIC_ROUTES.some((route) =>
        route === "/" ? pathname === "/" : pathname.startsWith(route),
    );
    if (isPublic) return NextResponse.next();

    const sessionCookie = getSessionCookie(request, { cookiePrefix: "vh" });

    if (!sessionCookie) {
        const originalUrl = pathname + search;
        const signInUrl = new URL("/sign-in", request.url);
        signInUrl.searchParams.set("redirect", getSafeRedirect(originalUrl));

        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = { matcher: ["/((?!_next|static|favicon.ico|.*\\..*).*)"] };
