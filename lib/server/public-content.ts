import { and, asc, desc, eq, isNull, lte, or, type SQL } from "drizzle-orm";
import { getDb } from "../../db";
import {
  contentItems,
  mediaItems,
  staffMembers,
  type ContentItem,
  type MediaItem,
  type StaffMember,
} from "../../db/schema";

const clampLimit = (value: number | undefined, fallback: number): number =>
  Math.min(Math.max(Math.trunc(value ?? fallback), 1), 100);

export async function listPublishedContent(options: {
  type?: ContentItem["type"];
  limit?: number;
} = {}): Promise<ContentItem[]> {
  try {
    const now = new Date().toISOString();
    const conditions: SQL[] = [
      eq(contentItems.status, "published"),
      or(isNull(contentItems.publishedAt), lte(contentItems.publishedAt, now))!,
    ];
    if (options.type) conditions.push(eq(contentItems.type, options.type));

    return await getDb()
      .select()
      .from(contentItems)
      .where(and(...conditions))
      .orderBy(desc(contentItems.publishedAt), desc(contentItems.updatedAt))
      .limit(clampLimit(options.limit, 20));
  } catch {
    return [];
  }
}

export async function listActiveStaff(options: {
  limit?: number;
} = {}): Promise<StaffMember[]> {
  try {
    return await getDb()
      .select()
      .from(staffMembers)
      .where(eq(staffMembers.status, "active"))
      .orderBy(asc(staffMembers.sortOrder), asc(staffMembers.fullName))
      .limit(clampLimit(options.limit, 100));
  } catch {
    return [];
  }
}

export async function listPublicMedia(options: {
  kind?: MediaItem["kind"];
  limit?: number;
} = {}): Promise<MediaItem[]> {
  try {
    const conditions: SQL[] = [eq(mediaItems.status, "published")];
    if (options.kind) conditions.push(eq(mediaItems.kind, options.kind));

    return await getDb()
      .select()
      .from(mediaItems)
      .where(and(...conditions))
      .orderBy(desc(mediaItems.createdAt))
      .limit(clampLimit(options.limit, 50));
  } catch {
    return [];
  }
}
