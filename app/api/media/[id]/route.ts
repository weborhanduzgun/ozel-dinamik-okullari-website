import { eq } from "drizzle-orm";
import { getDb, getMediaBucket } from "../../../../db";
import { mediaItems } from "../../../../db/schema";
import {
  ApiError,
  errorResponse,
  requireEntityId,
} from "../../../../lib/server/api";

type RouteContext = { params: Promise<{ id: string }> };
const MEDIA_CACHE_CONTROL =
  "public, max-age=300, stale-while-revalidate=3600";

function matchesEtag(value: string | null, etag: string): boolean {
  if (!value) return false;
  return value
    .split(",")
    .map((candidate) => candidate.trim())
    .some((candidate) => candidate === "*" || candidate === etag || candidate === `W/${etag}`);
}

export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  try {
    const id = requireEntityId((await context.params).id);
    const item = await getDb().query.mediaItems.findFirst({
      where: eq(mediaItems.id, id),
    });
    if (!item || item.status !== "published") {
      throw new ApiError("Media item was not found.", 404, "not_found");
    }

    const object = await getMediaBucket().get(item.storageKey);
    if (!object) throw new ApiError("Media item was not found.", 404, "not_found");

    if (matchesEtag(request.headers.get("if-none-match"), object.httpEtag)) {
      return new Response(null, {
        status: 304,
        headers: {
          "Cache-Control": MEDIA_CACHE_CONTROL,
          ETag: object.httpEtag,
        },
      });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("Content-Type", item.contentType);
    headers.set("Content-Length", String(object.size));
    headers.set("ETag", object.httpEtag);
    headers.set("Cache-Control", MEDIA_CACHE_CONTROL);
    headers.set("X-Content-Type-Options", "nosniff");
    const disposition = item.kind === "image" ? "inline" : "attachment";
    headers.set(
      "Content-Disposition",
      `${disposition}; filename="download"; filename*=UTF-8''${encodeURIComponent(item.originalName)}`,
    );
    if (item.kind === "document") {
      headers.set("Content-Security-Policy", "sandbox; default-src 'none'");
    }

    return new Response(object.body as unknown as BodyInit, { headers });
  } catch (error) {
    return errorResponse(error);
  }
}
