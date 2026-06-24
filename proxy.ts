import { NextResponse, type NextRequest } from "next/server";

const TOKEN_COOKIE = "doxie_token";

export function proxy(req: NextRequest) {
  if (req.cookies.get(TOKEN_COOKIE)?.value) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.searchParams.set("notice", "already-authed");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/login"] };
