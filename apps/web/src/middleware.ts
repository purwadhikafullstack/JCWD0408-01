
import { get } from "cypress/types/lodash";
import Cookies from "js-cookie";
import { NextRequest, NextResponse } from "next/server";
import { deleteCookie, getCookie } from "./libs/action/server";

const protectedRoutesSuperAdmin = ["/admin-stock-management"]
const loginStatus = ["/login-as-super"]


export async function middleware(request: NextRequest) {
    const cookie = await getCookie("token");
    const url  = request.nextUrl.pathname

    console.log("cookie", cookie)
    let payload



    if(protectedRoutesSuperAdmin.includes(url) ) {
        if (!cookie) {
            return NextResponse.redirect(new URL("/login-as-super", request.url))
        }
    }

    if (cookie) {
        try {
            payload = JSON.parse(atob(cookie.split('.')[1]));
            if (protectedRoutesSuperAdmin.includes(url) && payload.role !== 'super_admin') {
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