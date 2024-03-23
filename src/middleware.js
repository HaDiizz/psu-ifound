import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { nextUrl } = req;
  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (
    session &&
    session.role !== "admin" &&
    nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
  }
  if (
    (!session && nextUrl.pathname.startsWith("/01/explore/lost/edit")) ||
    nextUrl.pathname.startsWith("/02/explore/lost/edit") ||
    nextUrl.pathname.startsWith("/03/explore/lost/edit") ||
    nextUrl.pathname.startsWith("/04/explore/lost/edit") ||
    nextUrl.pathname.startsWith("/05/explore/lost/edit") ||
    nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
  }
  return NextResponse.next();
}

// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: [
//     "/01/explore/lost/edit/:path*",
//     "/02/explore/lost/edit/:path*",
//     "/03/explore/lost/edit/:path*",
//     "/04/explore/lost/edit/:path*",
//     "/05/explore/lost/edit/:path*",
//     "/admin/:path*",
//   ],
// };
