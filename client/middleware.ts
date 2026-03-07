import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {

    const isAdmin = true // replace later with real auth

    if (request.nextUrl.pathname.startsWith("/(admin)/admin") && !isAdmin) {

        return NextResponse.redirect(new URL("/", request.url))

    }

    return NextResponse.next()

}