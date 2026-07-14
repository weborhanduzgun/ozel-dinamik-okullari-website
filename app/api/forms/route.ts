import { getDb } from "../../../db";
import { formSubmissions } from "../../../db/schema";
import {
  ApiError,
  assertSameOrigin,
  errorResponse,
  jsonResponse,
  readJsonObject,
} from "../../../lib/server/api";
import { auditEvents, createAuditEvent } from "../../../lib/server/audit";
import { parseSubmissionCreate } from "../../../lib/server/validation";

function normalizeFormData(formData: FormData): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") payload[key] = value;
  }

  if (typeof payload.consent === "string") {
    payload.consent = ["1", "true", "on", "yes"].includes(
      payload.consent.toLowerCase(),
    );
  }
  return payload;
}

async function readPayload(request: Request): Promise<Record<string, unknown>> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) return readJsonObject(request);
  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    try {
      return normalizeFormData(await request.formData());
    } catch {
      throw new ApiError("Request body contains invalid form data.");
    }
  }
  throw new ApiError(
    "Content-Type must be application/json or form data.",
    415,
    "unsupported_media_type",
  );
}

function sourcePathFromReferer(request: Request): string | undefined {
  const value = request.headers.get("referer");
  if (!value) return undefined;

  try {
    const referer = new URL(value);
    if (referer.origin !== new URL(request.url).origin) return undefined;
    return referer.pathname;
  } catch {
    return undefined;
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    assertSameOrigin(request);
    const contentLength = Number(request.headers.get("content-length") ?? "0");
    if (Number.isFinite(contentLength) && contentLength > 64 * 1024) {
      throw new ApiError("Form payload is too large.", 413, "payload_too_large");
    }
    const payload = await readPayload(request);

    // A filled honeypot receives a generic success response without persistence.
    if (typeof payload.website === "string" && payload.website.trim()) {
      return jsonResponse({ accepted: true }, { status: 202 });
    }

    const input = parseSubmissionCreate(payload, {
      sourcePath: sourcePathFromReferer(request),
    });
    const id = crypto.randomUUID();
    const db = getDb();
    await db.batch([
      db.insert(formSubmissions).values({ id, ...input }),
      db.insert(auditEvents).values(
        createAuditEvent({
          actorEmail: "public-form",
          action: "submission.create",
          entityType: "submission",
          entityId: id,
          metadata: { formType: input.formType, sourcePath: input.sourcePath },
        }),
      ),
    ]);

    return jsonResponse({ accepted: true, id }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
