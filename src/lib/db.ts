import { PrismaClient, type Prisma } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime/library";

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
