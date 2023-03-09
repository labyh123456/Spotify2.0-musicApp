import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export async function middleware(req) {
    // const url = req.nextUrl.clone();
    // Token will exist if a user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SEC });

    const { pathname } = req.nextUrl;

    // if (pathname.startsWith("/_next")) return NextResponse.next();

    // if (pathname.includes('/api/auth') || token) {
    // 	return NextResponse.next()
    // }

    // if (!token && pathname !== '/login') {
    // 	// const loginUrl = new URL('/login', req.url)
    //     // return NextResponse.redirect(loginUrl)
        
    //     return NextResponse.redirect(new URL('/login', req.url))

    // }
    }






    // ---

    //     if (pathname.startsWith('/_next/') ||   pathname.includes('.'))  { // static files
    //     return
    // }
    // Allow the request if the following are true...
    // 1) it's Has a request for next-auth session & provider fetching
    // 2) the token exits

    // if (pathname.includes('/api/auth') || token) {
    //     if (pathname.startsWith('/login')) {
    //         // this one works!
    //         return NextResponse.redirect(new URL('/', req.url));
    //     }
    //     return NextResponse.next();
    // }
// }

    // // Redirect them to login if they dont have token and are requesting a protected route
    // if (!token && pathname !== '/login') {
       
        // const loginUrl = new URL('/login', req.url)
        // loginUrl.searchParams.set('from', req.nextUrl.pathname)
        // console.log(loginUrl)
        // return NextResponse.redirect(loginUrl)

        // req.nextUrl.pathname = "/login";
        // return NextResponse.redirect(req.nextUrl);

        // console.log(req.url);
        // return NextResponse.redirect(new URL('/login', req.url));

        // lastone
        // if (pathname.includes("/api/auth") || token) {
        //     return NextResponse.next();
        //   }
    
        // if (!token && pathname !== "/login") {
        //     url.pathname = "/login";
        //     return NextResponse.redirect(url);
        // }
    
    // export const config = {
    //     matcher: '/:path*',
    //   };