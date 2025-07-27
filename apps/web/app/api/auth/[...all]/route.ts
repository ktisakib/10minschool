import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth.handler);

// Helper function to add CORS headers
function addCorsHeaders(response: Response, origin?: string) {
    const allowedOrigins = [
        "http://localhost:8081", // Mobile app
        "exp://192.168.1.100:8081", // Expo dev server
        "http://192.168.1.100:8081", // Local network
        "enterprise://", // Expo deep link scheme
    ];

    const headers = new Headers(response.headers);

    if (origin && allowedOrigins.includes(origin)) {
        headers.set("Access-Control-Allow-Origin", origin);
    }

    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie");

    return new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
}

export async function GET(request: NextRequest) {
    const origin = request.headers.get("origin");
    const response = await handler.GET(request);
    return addCorsHeaders(response, origin || undefined);
}

export async function POST(request: NextRequest) {
    const origin = request.headers.get("origin");
    const response = await handler.POST(request);
    return addCorsHeaders(response, origin || undefined);
}

export async function OPTIONS(request: NextRequest) {
    const origin = request.headers.get("origin");
    const allowedOrigins = [
        "http://localhost:8081",
        "exp://192.168.1.100:8081",
        "http://192.168.1.100:8081",
        "enterprise://", // Expo deep link scheme
    ];

    const headers = new Headers();

    if (origin && allowedOrigins.includes(origin)) {
        headers.set("Access-Control-Allow-Origin", origin);
    }

    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie");

    return new NextResponse(null, {
        status: 200,
        headers
    });
}
