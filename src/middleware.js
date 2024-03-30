export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/01/explore/lost/edit/:path*",
    "/02/explore/lost/edit/:path*",
    "/03/explore/lost/edit/:path*",
    "/04/explore/lost/edit/:path*",
    "/05/explore/lost/edit/:path*",
    "/admin/:path*",
  ],
};
