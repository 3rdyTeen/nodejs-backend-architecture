import { PrismaClient } from "@prisma/client"; 
import { NODE_ENV } from "./environment.js";

declare global {
  var __db: PrismaClient | undefined;
}

class PrismaClientExtends extends PrismaClient {
  constructor() {
    super({
      log: ["query", "info", "warn", "error"], // optional logging
    });
  }
}

const db = global.__db || new PrismaClientExtends();

if (NODE_ENV !== "production") {
  global.__db = db;
}

export { db };

