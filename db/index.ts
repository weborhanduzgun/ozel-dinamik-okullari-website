import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

type RuntimeBindings = {
  DB?: D1Database;
  MEDIA?: R2Bucket;
};

function bindings(): RuntimeBindings {
  return env as unknown as RuntimeBindings;
}

export function getD1Binding(): D1Database {
  const database = bindings().DB;
  if (!database) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Enable the logical `DB` binding before using persistence.",
    );
  }

  return database;
}

export function getDb() {
  return drizzle(getD1Binding(), { schema });
}

export function getMediaBucket(): R2Bucket {
  const bucket = bindings().MEDIA;
  if (!bucket) {
    throw new Error(
      "Cloudflare R2 binding `MEDIA` is unavailable. Enable the logical `MEDIA` binding before using uploads.",
    );
  }

  return bucket;
}

export type Database = ReturnType<typeof getDb>;

