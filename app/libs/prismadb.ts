import { PrismaClient } from "@prisma/client"

//we give a global declaration of prisma so that it can
//work throughout our code
declare global {
  var prisma: PrismaClient | undefined
}

//client either searches for globalThis.prisma or creates a new client

const client = globalThis.prisma || new PrismaClient()

//if we are in development we set globalThis.prisma to client
//so that in hot reloading only one PrismaClient() is created
//globalThis variable is not affected by hot reloading
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client;