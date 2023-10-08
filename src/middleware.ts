export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/card", "/next", "/wallet", "/profile", "/settings"],
};
