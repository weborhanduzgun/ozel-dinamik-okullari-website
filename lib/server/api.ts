import { AdminAuthError, requireAdmin } from "./admin-auth";
import type { ChatGPTUser } from "../../app/chatgpt-auth";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status = 400,
    readonly code = "invalid_request",
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function jsonResponse(
  body: unknown,
  init: ResponseInit = {},
): Response {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(JSON.stringify(body), { ...init, headers });
}

export async function readJsonObject(request: Request): Promise<Record<string, unknown>> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    throw new ApiError("Request body must be valid JSON.");
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new ApiError("Request body must be a JSON object.");
  }

  return payload as Record<string, unknown>;
}

export function assertSameOrigin(request: Request): void {
  const origin = request.headers.get("origin");
  if (!origin) return;

  const requestOrigin = new URL(request.url).origin;
  if (origin !== requestOrigin) {
    throw new ApiError("Cross-origin requests are not allowed.", 403, "invalid_origin");
  }
}

export function parsePagination(url: URL): { limit: number; offset: number } {
  const limitValue = Number(url.searchParams.get("limit") ?? "50");
  const offsetValue = Number(url.searchParams.get("offset") ?? "0");

  if (!Number.isInteger(limitValue) || limitValue < 1 || limitValue > 200) {
    throw new ApiError("limit must be an integer between 1 and 200.");
  }
  if (!Number.isInteger(offsetValue) || offsetValue < 0 || offsetValue > 100_000) {
    throw new ApiError("offset must be a non-negative integer.");
  }

  return { limit: limitValue, offset: offsetValue };
}

export function requireEntityId(value: string): string {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) {
    throw new ApiError("Invalid resource identifier.");
  }
  return value;
}

export async function withAdmin(
  request: Request,
  handler: (admin: ChatGPTUser) => Promise<Response>,
): Promise<Response> {
  try {
    if (!/^(GET|HEAD|OPTIONS)$/i.test(request.method)) assertSameOrigin(request);
    const admin = await requireAdmin();
    return await handler(admin);
  } catch (error) {
    return errorResponse(error);
  }
}

export function errorResponse(error: unknown): Response {
  if (error instanceof ApiError || error instanceof AdminAuthError) {
    return jsonResponse(
      { error: { code: error instanceof ApiError ? error.code : "access_denied", message: error.message } },
      { status: error.status },
    );
  }

  const message = error instanceof Error ? error.message : "Unexpected error";
  if (/binding `(?:DB|MEDIA)` is unavailable|no such table/i.test(message)) {
    return jsonResponse(
      { error: { code: "service_unavailable", message: "The requested service is not configured." } },
      { status: 503 },
    );
  }
  if (/UNIQUE constraint failed/i.test(message)) {
    return jsonResponse(
      { error: { code: "conflict", message: "A record with the same unique value already exists." } },
      { status: 409 },
    );
  }
  if (/FOREIGN KEY constraint failed/i.test(message)) {
    return jsonResponse(
      { error: { code: "invalid_reference", message: "A referenced record does not exist or is still in use." } },
      { status: 409 },
    );
  }

  console.error("Unhandled API error", error);
  return jsonResponse(
    { error: { code: "internal_error", message: "The request could not be completed." } },
    { status: 500 },
  );
}
