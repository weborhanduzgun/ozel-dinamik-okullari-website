import { eq } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { mediaItems } from "../../../../../db/schema";
import {
  ApiError,
  jsonResponse,
  readJsonObject,
  requireEntityId,
  withAdmin,
} from "../../../../../lib/server/api";
import { auditEvents, createAuditEvent } from "../../../../../lib/server/audit";
import { parseMediaInput } from "../../../../../lib/server/validation";

type RouteContext = { params: Promise<{ id: string }> };

async function mediaId(context: RouteContext): Promise<string> {
  return requireEntityId((await context.params).id);
}

export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  return withAdmin(request, async () => {
    const id = await mediaId(context);
    const item = await getDb().query.mediaItems.findFirst({
      where: eq(mediaItems.id, id),
    });
    if (!item) throw new ApiError("Media item was not found.", 404, "not_found");
    return jsonResponse({ item });
  });
}

export async function PATCH(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  return withAdmin(request, async (admin) => {
    const id = await mediaId(context);
    const input = parseMediaInput(await readJsonObject(request));
    const db = getDb();
    const existing = await db.query.mediaItems.findFirst({
      where: eq(mediaItems.id, id),
    });
    if (!existing) throw new ApiError("Media item was not found.", 404, "not_found");

    const nextAltText = input.altText ?? existing.altText;
    const nextIsDecorative = input.isDecorative ?? existing.isDecorative;
    if (existing.kind === "image" && !nextIsDecorative && !nextAltText) {
      throw new ApiError("Non-decorative images require altText.");
    }

    const [updatedRows] = await db.batch([
      db
        .update(mediaItems)
        .set({
          ...input,
          updatedBy: admin.email,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(mediaItems.id, id))
        .returning(),
      db.insert(auditEvents).values(
        createAuditEvent({
          actorEmail: admin.email,
          action: "media.update",
          entityType: "media",
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
    const id = await mediaId(context);
    const db = getDb();
    const existing = await db.query.mediaItems.findFirst({
      columns: { id: true },
      where: eq(mediaItems.id, id),
    });
    if (!existing) throw new ApiError("Media item was not found.", 404, "not_found");

    const [archivedRows] = await db.batch([
      db
        .update(mediaItems)
        .set({
          status: "archived",
          updatedBy: admin.email,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(mediaItems.id, id))
        .returning(),
      db.insert(auditEvents).values(
        createAuditEvent({
          actorEmail: admin.email,
          action: "media.archive",
          entityType: "media",
          entityId: id,
        }),
      ),
    ]);

    return jsonResponse({ item: archivedRows[0] });
  });
}
