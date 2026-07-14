import { eq } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { formSubmissions } from "../../../../../db/schema";
import {
  ApiError,
  jsonResponse,
  readJsonObject,
  requireEntityId,
  withAdmin,
} from "../../../../../lib/server/api";
import { auditEvents, createAuditEvent } from "../../../../../lib/server/audit";
import { parseSubmissionPatch } from "../../../../../lib/server/validation";

type RouteContext = { params: Promise<{ id: string }> };

async function submissionId(context: RouteContext): Promise<string> {
  return requireEntityId((await context.params).id);
}

export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  return withAdmin(request, async () => {
    const id = await submissionId(context);
    const item = await getDb().query.formSubmissions.findFirst({
      where: eq(formSubmissions.id, id),
    });
    if (!item) throw new ApiError("Submission was not found.", 404, "not_found");
    return jsonResponse({ item });
  });
}

export async function PATCH(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  return withAdmin(request, async (admin) => {
    const id = await submissionId(context);
    const input = parseSubmissionPatch(await readJsonObject(request));
    const db = getDb();
    const existing = await db.query.formSubmissions.findFirst({
      columns: { id: true },
      where: eq(formSubmissions.id, id),
    });
    if (!existing) throw new ApiError("Submission was not found.", 404, "not_found");

    const [updatedRows] = await db.batch([
      db
        .update(formSubmissions)
        .set({ ...input, updatedAt: new Date().toISOString() })
        .where(eq(formSubmissions.id, id))
        .returning(),
      db.insert(auditEvents).values(
        createAuditEvent({
          actorEmail: admin.email,
          action: "submission.update",
          entityType: "submission",
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
    const id = await submissionId(context);
    const db = getDb();
    const existing = await db.query.formSubmissions.findFirst({
      columns: { id: true },
      where: eq(formSubmissions.id, id),
    });
    if (!existing) throw new ApiError("Submission was not found.", 404, "not_found");

    const [archivedRows] = await db.batch([
      db
        .update(formSubmissions)
        .set({ status: "archived", updatedAt: new Date().toISOString() })
        .where(eq(formSubmissions.id, id))
        .returning(),
      db.insert(auditEvents).values(
        createAuditEvent({
          actorEmail: admin.email,
          action: "submission.archive",
          entityType: "submission",
          entityId: id,
        }),
      ),
    ]);

    return jsonResponse({ item: archivedRows[0] });
  });
}
