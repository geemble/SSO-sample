import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";

  // Handle preflighted requests
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      "Access-Control-Allow-Origin": origin,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", origin);

  return response;
}

export const config = {
    matcher: '/api/connect',
  }