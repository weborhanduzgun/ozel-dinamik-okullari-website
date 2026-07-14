import { and, asc, eq, like, or, type SQL } from "drizzle-orm";
import { getDb } from "../../../../db";
import { staffMembers } from "../../../../db/schema";
import {
  jsonResponse,
  parsePagination,
  readJsonObject,
  withAdmin,
} from "../../../../lib/server/api";
import { auditEvents, createAuditEvent } from "../../../../lib/server/audit";
import {
  parseStaffInput,
  readOptionalFilter,
  STAFF_STATUSES,
} from "../../../../lib/server/validation";

export async function GET(request: Request): Promise<Response> {
  return withAdmin(request, async () => {
    const url = new URL(request.url);
    const { limit, offset } = parsePagination(url);
    const status = readOptionalFilter(
      url.searchParams.get("status"),
      STAFF_STATUSES,
      "status",
    );
    const search = (url.searchParams.get("search") ?? "").trim().slice(0, 100);
    const conditions: SQL[] = [];

    if (status) conditions.push(eq(staffMembers.status, status));
    if (search) {
      const pattern = `%${search}%`;
      conditions.push(
        or(
          like(staffMembers.fullName, pattern),
          like(staffMembers.roleTitle, pattern),
          like(staffMembers.slug, pattern),
        )!,
      );
    }

    const items = await getDb()
      .select()
      .from(staffMembers)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(asc(staffMembers.sortOrder), asc(staffMembers.fullName))
      .limit(limit)
      .offset(offset);

    return jsonResponse({ items, pagination: { limit, offset } });
  });
}

export async function POST(request: Request): Promise<Response> {
  return withAdmin(request, async (admin) => {
    const input = parseStaffInput(await readJsonObject(request), "create");
    const id = crypto.randomUUID();
    const db = getDb();
    const [createdRows] = await db.batch([
      db
        .insert(staffMembers)
        .values({
          id,
          slug: input.slug!,
          fullName: input.fullName!,
          roleTitle: input.roleTitle!,
          departmentSlug: input.departmentSlug ?? null,
          biographyMarkdown: input.biographyMarkdown ?? "",
          photoMediaId: input.photoMediaId ?? null,
          sortOrder: input.sortOrder ?? 0,
          status: input.status ?? "active",
          createdBy: admin.email,
          updatedBy: admin.email,
        })
        .returning(),
      db.insert(auditEvents).values(
        createAuditEvent({
          actorEmail: admin.email,
          action: "staff.create",
          entityType: "staff",
          entityId: id,
          metadata: { slug: input.slug },
        }),
      ),
    ]);

    return jsonResponse({ item: createdRows[0] }, { status: 201 });
  });
}
