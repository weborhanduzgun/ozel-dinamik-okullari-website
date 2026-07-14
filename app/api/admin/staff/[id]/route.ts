import { eq } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { staffMembers } from "../../../../../db/schema";
import {
  ApiError,
  jsonResponse,
  readJsonObject,
  requireEntityId,
  withAdmin,
} from "../../../../../lib/server/api";
import { auditEvents, createAuditEvent } from "../../../../../lib/server/audit";
import { parseStaffInput } from "../../../../../lib/server/validation";

type RouteContext = { params: Promise<{ id: string }> };

async function staffId(context: RouteContext): Promise<string> {
  return requireEntityId((await context.params).id);
}

export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  return withAdmin(request, async () => {
    const id = await staffId(context);
    const item = await getDb().query.staffMembers.findFirst({
      where: eq(staffMembers.id, id),
    });
    if (!item) throw new ApiError("Staff member was not found.", 404, "not_found");
    return jsonResponse({ item });
  });
}

export async function PATCH(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  return withAdmin(request, async (admin) => {
    const id = await staffId(context);
    const input = parseStaffInput(await readJsonObject(request), "patch");
    const db = getDb();
    const existing = await db.query.staffMembers.findFirst({
      columns: { id: true },
      where: eq(staffMembers.id, id),
    });
    if (!existing) throw new ApiError("Staff member was not found.", 404, "not_found");

    const [updatedRows] = await db.batch([
      db
        .update(staffMembers)
        .set({
          ...input,
          updatedBy: admin.email,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(staffMembers.id, id))
        .returning(),
      db.insert(auditEvents).values(
        createAuditEvent({
          actorEmail: admin.email,
          action: "staff.update",
          entityType: "staff",
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
    const id = await staffId(context);
    const db = getDb();
    const existing = await db.query.staffMembers.findFirst({
      columns: { id: true },
      where: eq(staffMembers.id, id),
    });
    if (!existing) throw new ApiError("Staff member was not found.", 404, "not_found");

    const [archivedRows] = await db.batch([
      db
        .update(staffMembers)
        .set({
          status: "archived",
          updatedBy: admin.email,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(staffMembers.id, id))
        .returning(),
      db.insert(auditEvents).values(
        createAuditEvent({
          actorEmail: admin.email,
          action: "staff.archive",
          entityType: "staff",
          entityId: id,
        }),
      ),
    ]);

    return jsonResponse({ item: archivedRows[0] });
  });
}
