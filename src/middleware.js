import { NextResponse } from "next/server";

export async function middleware(request) {
    const token = request.cookies.get("token");
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    // Gọi API để xác thực token
    const res = await fetch("http://localhost:3000/users/checktoken", {
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
    });

    if (!res.ok) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const data = await res.json();
    // console.log(data);
    const userRole = data.data.role;
    // console.log(userRole);
    // Kiểm tra nếu request đến các route trong admin
    const url = request.nextUrl.clone();
    if (url.pathname.startsWith("/admin")) {
        if (userRole !== "1") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/editUser", "/admin/:path*"],
};
