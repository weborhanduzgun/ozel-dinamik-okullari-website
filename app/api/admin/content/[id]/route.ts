import { eq, sql } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { contentItems } from "../../../../../db/schema";
import {
  ApiError,
  jsonResponse,
  readJsonObject,
  requireEntityId,
  withAdmin,
} from "../../../../../lib/server/api";
import { auditEvents, createAuditEvent } from "../../../../../lib/server/audit";
import { parseContentInput } from "../../../../../lib/server/validation";

type RouteContext = { params: Promise<{ id: string }> };

async function contentId(context: RouteContext): Promise<string> {
  return requireEntityId((await context.params).id);
}

export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  return withAdmin(request, async () => {
    const id = await contentId(context);
    const item = await getDb().query.contentItems.findFirst({
      where: eq(contentItems.id, id),
    });
    if (!item) throw new ApiError("Content item was not found.", 404, "not_found");
    return jsonResponse({ item });
  });
}

export async function PATCH(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  return withAdmin(request, async (admin) => {
    const id = await contentId(context);
    const input = parseContentInput(await readJsonObject(request), "patch");
    const db = getDb();
    const existing = await db.query.contentItems.findFirst({
      columns: { id: true },
      where: eq(contentItems.id, id),
    });
    if (!existing) throw new ApiError("Content item was not found.", 404, "not_found");

    const [updatedRows] = await db.batch([
      db
        .update(contentItems)
        .set({
          ...input,
          updatedBy: admin.email,
          updatedAt: new Date().toISOString(),
          version: sql`${contentItems.version} + 1`,
        })
        .where(eq(contentItems.id, id))
        .returning(),
      db.insert(auditEvents).values(
        createAuditEvent({
          actorEmail: admin.email,
          action: "content.update",
          entityType: "content",
          entityId: id,
          metadata: { fields: Object.keys(input) },
        }),
      ),
    ]);

    return jsonResponse({ item: updatedRows[0] });
  });
}

export async function DELETE(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  return withAdmin(request, async (admin) => {
    const id = await contentId(context);
    const db = getDb();
    const existing = await db.query.contentItems.findFirst({
      columns: { id: true },
      where: eq(contentItems.id, id),
    });
    if (!existing) throw new ApiError("Content item was not found.", 404, "not_found");

    const [archivedRows] = await db.batch([
      db
        .update(contentItems)
        .set({
          status: "archived",
          updatedBy: admin.email,
          updatedAt: new Date().toISOString(),
          version: sql`${contentItems.version} + 1`,
        })
        .where(eq(contentItems.id, id))
        .returning(),
      db.insert(auditEvents).values(
        createAuditEvent({
          actorEmail: admin.email,
          action: "content.archive",
          entityType: "content",
          entityId: id,
        }),
      ),
    ]);

    return jsonResponse({ item: archivedRows[0] });
  });
}
