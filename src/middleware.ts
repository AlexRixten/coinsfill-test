export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/home", "/card", "/next", "/wallet", "/profile", "/settings"],
};
