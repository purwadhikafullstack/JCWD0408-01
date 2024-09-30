
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./libs/action/server";

const protectedRoutesSuperAdmin = [/^\/admin-stock-management(\/.*)?$/, /^\/admin-stock-management\/admin-dashboard-by-super(\/.*)?$/ ]
const loginStatus = ["/login-as-super"]
const protectedRoutesStoreSuper = [ /^\/details-discount-management(\/.*)?$/]

export async function middleware(request: NextRequest) {
    const cookie = await getCookie("token");

    const url  = request.nextUrl.pathname

    console.log("cookie", cookie)
    let payload

    if(protectedRoutesSuperAdmin.some((route) => route.test(url))) {
        if (!cookie) {
            return NextResponse.redirect(new URL("/login-as-super", request.url))
        }
    }

    if (cookie) {
        try {
            payload = JSON.parse(atob(cookie.split('.')[1]));
            if (protectedRoutesSuperAdmin.some((route) => route.test(url)) && payload.role !== 'super_admin') {
                return NextResponse.redirect(new URL("/login-as-super", request.url))
            }
            if (loginStatus.includes(url)) {
                if (cookie) {
                    return NextResponse.redirect(new URL("/admin-stock-management", request.url))
                }
            }
        } catch (error) {
            console.error("Failed to parse cookie payload", error);
        }
    }

    if (cookie) {
        try {
            payload = JSON.parse(atob(cookie.split('.')[1]));
            if (protectedRoutesStoreSuper.some((route) => route.test(url)) && payload.role == 'buyer') {
                return NextResponse.redirect(new URL("/login-as-store", request.url))
            }
        } catch (error) {
            console.error("Failed to parse cookie payload", error);
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

    // if (payload.role == undefined) {
    //     NextResponse.redirect(new URL("/login-as-super", request.nextUrl).toString())
    // }

    // if(loginStatus.includes(request.nextUrl.pathname) && payload.role == 'store_admin') {
    //     return NextResponse.redirect(protectedRoutesSuperAdmin[0])
    // }

    // if (protectedRoutes.includes(request.nextUrl.pathname) && payload.role !== 'store_admin') {
    //     return NextResponse.redirect(new URL("/login-as-store", request.nextUrl).toString())
    // }

    return NextResponse.next()
}