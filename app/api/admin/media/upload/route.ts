import { getDb, getMediaBucket } from "../../../../../db";
import { mediaItems } from "../../../../../db/schema";
import {
  ApiError,
  jsonResponse,
  withAdmin,
} from "../../../../../lib/server/api";
import { auditEvents, createAuditEvent } from "../../../../../lib/server/audit";
import { validateUpload } from "../../../../../lib/server/uploads";
import { readUploadStatus } from "../../../../../lib/server/validation";

const isTrue = (value: FormDataEntryValue | null): boolean =>
  typeof value === "string" && ["1", "true", "on", "yes"].includes(value.toLowerCase());

function readAltText(value: FormDataEntryValue | null): string {
  if (value === null) return "";
  if (typeof value !== "string") throw new ApiError("altText must be a string.");
  const altText = value.trim();
  if (altText.length > 500) throw new ApiError("altText cannot exceed 500 characters.");
  return altText;
}

export async function POST(request: Request): Promise<Response> {
  return withAdmin(request, async (admin) => {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      throw new ApiError("Request body must be multipart form data.");
    }

    const fileValue = formData.get("file");
    if (!(fileValue instanceof File)) throw new ApiError("file is required.");

    const upload = await validateUpload(fileValue);
    const altText = readAltText(formData.get("altText"));
    const isDecorative = isTrue(formData.get("isDecorative"));
    const status = readUploadStatus(formData.get("status"));
    if (upload.kind === "image" && !isDecorative && !altText) {
      throw new ApiError("Non-decorative images require altText.");
    }

    const id = crypto.randomUUID();
    const storageKey = `${upload.kind}/${id}.${upload.extension}`;
    const bucket = getMediaBucket();
    await bucket.put(storageKey, upload.bytes, {
      httpMetadata: { contentType: upload.contentType },
      customMetadata: { uploadedBy: admin.email },
    });

    try {
      const db = getDb();
      const [createdRows] = await db.batch([
        db
          .insert(mediaItems)
          .values({
            id,
            kind: upload.kind,
            storageKey,
            originalName: upload.originalName,
            contentType: upload.contentType,
            byteSize: upload.bytes.byteLength,
            altText,
            isDecorative,
            status,
            createdBy: admin.email,
            updatedBy: admin.email,
          })
          .returning(),
        db.insert(auditEvents).values(
          createAuditEvent({
            actorEmail: admin.email,
            action: "media.upload",
            entityType: "media",
            entityId: id,
            metadata: {
              contentType: upload.contentType,
              byteSize: upload.bytes.byteLength,
            },
          }),
        ),
      ]);

      return jsonResponse(
        { item: createdRows[0], deliveryUrl: `/api/media/${id}` },
        { status: 201 },
      );
    } catch (error) {
      try {
        await bucket.delete(storageKey);
      } catch (cleanupError) {
        console.error("Failed to clean up orphaned R2 object", cleanupError);
      }
      throw error;
    }
  });
}
