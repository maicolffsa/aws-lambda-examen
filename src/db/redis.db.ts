import Redis from "ioredis";

export const redis =
  process.env.NODE_ENV === "test"
    ? new Redis({
        host: "localhost",
        port: 6379,
      })
    : new Redis(process.env.REDIS_DB_PATH!);

