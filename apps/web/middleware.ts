import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);



export default async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    // Check if this is a protected route before handling i18n


    // Handle internationalization after authentication check
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (auth routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - Files with extensions (static assets)
         */
        '/((?!api/auth|trpc|_next/static|_next/image|favicon.ico|.*\\.).*)'
    ]
};
