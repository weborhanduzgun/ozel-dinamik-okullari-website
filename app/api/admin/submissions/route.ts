import { and, desc, eq, type SQL } from "drizzle-orm";
import { getDb } from "../../../../db";
import { formSubmissions } from "../../../../db/schema";
import {
  jsonResponse,
  parsePagination,
  readJsonObject,
  withAdmin,
} from "../../../../lib/server/api";
import { auditEvents, createAuditEvent } from "../../../../lib/server/audit";
import {
  FORM_TYPES,
  parseSubmissionCreate,
  readOptionalFilter,
  SUBMISSION_STATUSES,
} from "../../../../lib/server/validation";

export async function GET(request: Request): Promise<Response> {
  return withAdmin(request, async () => {
    const url = new URL(request.url);
    const { limit, offset } = parsePagination(url);
    const formType = readOptionalFilter(
      url.searchParams.get("formType"),
      FORM_TYPES,
      "formType",
    );
    const status = readOptionalFilter(
      url.searchParams.get("status"),
      SUBMISSION_STATUSES,
      "status",
    );
    const conditions: SQL[] = [];
    if (formType) conditions.push(eq(formSubmissions.formType, formType));
    if (status) conditions.push(eq(formSubmissions.status, status));

    const items = await getDb()
      .select()
      .from(formSubmissions)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(formSubmissions.submittedAt))
      .limit(limit)
      .offset(offset);

    return jsonResponse({ items, pagination: { limit, offset } });
  });
}

export async function POST(request: Request): Promise<Response> {
  return withAdmin(request, async (admin) => {
    const input = parseSubmissionCreate(await readJsonObject(request), {
      sourcePath: "/admin/manual",
    });
    const id = crypto.randomUUID();
    const db = getDb();
    const [createdRows] = await db.batch([
      db.insert(formSubmissions).values({ id, ...input }).returning(),
      db.insert(auditEvents).values(
        createAuditEvent({
          actorEmail: admin.email,
          action: "submission.create",
          entityType: "submission",
          entityId: id,
          metadata: { formType: input.formType, source: "admin" },
        }),
      ),
    ]);

    return jsonResponse({ item: createdRows[0] }, { status: 201 });
  });
}
