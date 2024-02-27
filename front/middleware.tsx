import { NextRequest, NextResponse } from "next/server";


export const middleware = async (request: NextRequest) => {
    const cookie = request.cookies.get("JWT_TOKEN");
    
    if (!cookie) return  NextResponse.redirect("http://localhost:3000");
    
    const res = await fetch('http://localhost:4000/user/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie.value}`,
      },
    });

    if (!res.ok) return  NextResponse.redirect("http://localhost:3000");
    
    return NextResponse.next();
}


// export async function middleware(request: NextRequest) {
//   const cookie = request.cookies.get("JWT_TOKEN");

//   if (!cookie) return  NextResponse.redirect("http://localhost:3000/Signin");

//   const res = await fetch('http://localhost:4000/user/me', {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${cookie.value}`,
//     },
//   });

//   if (!res.ok) return  NextResponse.redirect("http://localhost:3000/Signin");

//   return NextResponse.next();
// }

export const config = {
  matcher: ["/Chat/:path*", "/Profile/:path*", "/Settings/:path*"],
};