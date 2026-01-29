// importing libraries and all
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";


export function middleware(req:NextRequest){
    const token  = req.cookies.get("token");


    // Protect /feed route
    if(req.nextUrl.pathname.startsWith("/feed") && !token){
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}


// apply middlware only to certain routes
export const config = {
    matcher: ["/feed/:path*"]
}