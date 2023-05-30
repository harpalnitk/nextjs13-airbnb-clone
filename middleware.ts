export { default } from "next-auth/middleware"


//to protect routes using next-auth
export const config = { 
  matcher: [
    "/trips",
    "/reservations",
    "/properties",
    "/favorites"
  ]
};