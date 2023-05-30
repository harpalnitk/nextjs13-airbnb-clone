export { default } from "next-auth/middleware"


//to protect routes using next-auth
// so that we cannot manually write the URL
//which is protected and go there
//when not signed in
export const config = { 
  matcher: [
    "/trips",
    "/reservations",
    "/properties",
    "/favorites"
  ]
};