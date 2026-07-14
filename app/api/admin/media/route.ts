import { and, desc, eq, type SQL } from "drizzle-orm";
import { getDb } from "../../../../db";
import { mediaItems } from "../../../../db/schema";
import {
  jsonResponse,
  parsePagination,
  withAdmin,
} from "../../../../lib/server/api";
import {
  MEDIA_KINDS,
  MEDIA_STATUSES,
  readOptionalFilter,
} from "../../../../lib/server/validation";

export async function GET(request: Request): Promise<Response> {
  return withAdmin(request, async () => {
    const url = new URL(request.url);
    const { limit, offset } = parsePagination(url);
    const kind = readOptionalFilter(url.searchParams.get("kind"), MEDIA_KINDS, "kind");
    const status = readOptionalFilter(
      url.searchParams.get("status"),
      MEDIA_STATUSES,
      "status",
    );
    const conditions: SQL[] = [];
    if (kind) conditions.push(eq(mediaItems.kind, kind));
    if (status) conditions.push(eq(mediaItems.status, status));

    const items = await getDb()
      .select()
      .from(mediaItems)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(mediaItems.createdAt))
      .limit(limit)
      .offset(offset);

    return jsonResponse({ items, pagination: { limit, offset } });
  });
}
