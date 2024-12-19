import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
    "/terms",
    "/cookiepolicy",
    "/not-found",
    "/auth/login",
    "/auth/register",
    "/auth/confirmation",
];

const authOnlyRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/confirmation",
];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const jwtToken = req.cookies.get("jwttoken")?.value;

    // First verify the token with your backend
    let isValidToken = false;
    if (jwtToken) {
        try {
            const response = await fetch("http://localhost:3001/user/auth/verify", {
                method: "GET",
                headers: {
                    "Cookie": `jwttoken=${jwtToken}`,
                    "credentials": "include"
                },
            });
            isValidToken = response.ok;
        } catch (error) {
            console.error("Token verification failed:", error);
            isValidToken = false;
        }
    }

    // If logged in and trying to access auth-only routes, redirect to dashboard
    if (isValidToken && authOnlyRoutes.includes(pathname)) {
        const homeUrl = new URL("/home", req.url);
        return NextResponse.redirect(homeUrl);
    }

    // Allow access to public routes regardless of auth status
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // If no valid JWT token and trying to access protected route, redirect to login
    if (!isValidToken) {
        const loginUrl = new URL("/auth/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    // If has valid JWT token, allow them to proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};