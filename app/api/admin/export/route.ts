import { desc } from "drizzle-orm";
import { getDb } from "../../../../db";
import {
  contentItems,
  formSubmissions,
  mediaItems,
  staffMembers,
} from "../../../../db/schema";
import { ApiError, withAdmin } from "../../../../lib/server/api";
import { auditEvents, createAuditEvent } from "../../../../lib/server/audit";

const EXPORT_RESOURCES = [
  "all",
  "content",
  "staff",
  "media",
  "submissions",
] as const;
type ExportResource = (typeof EXPORT_RESOURCES)[number];
const MAX_ROWS_PER_RESOURCE = 5_000;

function readResource(url: URL): ExportResource {
  const value = url.searchParams.get("resource") ?? "all";
  if (!(EXPORT_RESOURCES as readonly string[]).includes(value)) {
    throw new ApiError(`resource must be one of: ${EXPORT_RESOURCES.join(", ")}.`);
  }
  return value as ExportResource;
}

export async function GET(request: Request): Promise<Response> {
  return withAdmin(request, async (admin) => {
    const resource = readResource(new URL(request.url));
    const db = getDb();
    const data: Record<string, unknown[]> = {};

    if (resource === "all" || resource === "content") {
      data.content = await db
        .select()
        .from(contentItems)
        .orderBy(desc(contentItems.updatedAt))
        .limit(MAX_ROWS_PER_RESOURCE);
    }
    if (resource === "all" || resource === "staff") {
      data.staff = await db
        .select()
        .from(staffMembers)
        .orderBy(desc(staffMembers.updatedAt))
        .limit(MAX_ROWS_PER_RESOURCE);
    }
    if (resource === "all" || resource === "media") {
      data.media = await db
        .select()
        .from(mediaItems)
        .orderBy(desc(mediaItems.updatedAt))
        .limit(MAX_ROWS_PER_RESOURCE);
    }
    if (resource === "all" || resource === "submissions") {
      data.submissions = await db
        .select()
        .from(formSubmissions)
        .orderBy(desc(formSubmissions.submittedAt))
        .limit(MAX_ROWS_PER_RESOURCE);
    }

    const counts = Object.fromEntries(
      Object.entries(data).map(([key, rows]) => [key, rows.length]),
    );
    await db.insert(auditEvents).values(
      createAuditEvent({
        actorEmail: admin.email,
        action: "data.export",
        entityType: "export",
        metadata: { resource, counts },
      }),
    );

    const date = new Date();
    const body = JSON.stringify({
      schemaVersion: 1,
      exportedAt: date.toISOString(),
      resource,
      data,
    });
    return new Response(body, {
      headers: {
        "Cache-Control": "no-store",
        "Content-Disposition": `attachment; filename="dinamik-export-${date.toISOString().slice(0, 10)}.json"`,
        "Content-Type": "application/json; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    });
  });
}
