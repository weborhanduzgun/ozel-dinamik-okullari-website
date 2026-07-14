import { and, desc, eq, like, or, type SQL } from "drizzle-orm";
import { getDb } from "../../../../db";
import { contentItems } from "../../../../db/schema";
import {
  jsonResponse,
  parsePagination,
  readJsonObject,
  withAdmin,
} from "../../../../lib/server/api";
import { auditEvents, createAuditEvent } from "../../../../lib/server/audit";
import {
  CONTENT_STATUSES,
  CONTENT_TYPES,
  parseContentInput,
  readOptionalFilter,
} from "../../../../lib/server/validation";

export async function GET(request: Request): Promise<Response> {
  return withAdmin(request, async () => {
    const url = new URL(request.url);
    const { limit, offset } = parsePagination(url);
    const type = readOptionalFilter(url.searchParams.get("type"), CONTENT_TYPES, "type");
    const status = readOptionalFilter(
      url.searchParams.get("status"),
      CONTENT_STATUSES,
      "status",
    );
    const search = (url.searchParams.get("search") ?? "").trim().slice(0, 100);
    const conditions: SQL[] = [];

    if (type) conditions.push(eq(contentItems.type, type));
    if (status) conditions.push(eq(contentItems.status, status));
    if (search) {
      const pattern = `%${search}%`;
      conditions.push(
        or(like(contentItems.title, pattern), like(contentItems.slug, pattern))!,
      );
    }

    const items = await getDb()
      .select()
      .from(contentItems)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(contentItems.updatedAt))
      .limit(limit)
      .offset(offset);

    return jsonResponse({ items, pagination: { limit, offset } });
  });
}

export async function POST(request: Request): Promise<Response> {
  return withAdmin(request, async (admin) => {
    const input = parseContentInput(await readJsonObject(request), "create");
    const id = crypto.randomUUID();
    const db = getDb();
    const [createdRows] = await db.batch([
      db
        .insert(contentItems)
        .values({
          id,
          type: input.type!,
          slug: input.slug!,
          title: input.title!,
          summary: input.summary ?? "",
          bodyMarkdown: input.bodyMarkdown ?? "",
          status: input.status ?? "draft",
          featuredMediaId: input.featuredMediaId ?? null,
          seoTitle: input.seoTitle ?? null,
          seoDescription: input.seoDescription ?? null,
          publishedAt: input.publishedAt ?? null,
          createdBy: admin.email,
          updatedBy: admin.email,
        })
        .returning(),
      db.insert(auditEvents).values(
        createAuditEvent({
          actorEmail: admin.email,
          action: "content.create",
          entityType: "content",
          entityId: id,
          metadata: { type: input.type, slug: input.slug },
        }),
      ),
    ]);

    return jsonResponse({ item: createdRows[0] }, { status: 201 });
  });
}
