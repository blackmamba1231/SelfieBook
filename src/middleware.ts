import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPublicPath = path === '/signin' || path === '/signup';
    const token = req.cookies.get('token')?.value || '';
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/home', req.nextUrl));
    }
    const profilepath = path ==='/profile';
    if(profilepath && !token) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    }
  
    const homepath = path === '/home';
    if(homepath && !token) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl));
    }
}

export const config = {
    matcher: ['/home',
        '/profile',
        '/signin',
        '/signup'

    ],
};