import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const timestamp = (name: string) =>
  text(name).notNull().default(sql`CURRENT_TIMESTAMP`);

export const mediaItems = sqliteTable(
  "media_items",
  {
    id: text("id").primaryKey(),
    kind: text("kind", { enum: ["image", "document"] }).notNull(),
    storageKey: text("storage_key").notNull(),
    originalName: text("original_name").notNull(),
    contentType: text("content_type").notNull(),
    byteSize: integer("byte_size").notNull(),
    width: integer("width"),
    height: integer("height"),
    altText: text("alt_text").notNull().default(""),
    isDecorative: integer("is_decorative", { mode: "boolean" })
      .notNull()
      .default(false),
    status: text("status", {
      enum: ["draft", "published", "archived"],
    })
      .notNull()
      .default("draft"),
    createdBy: text("created_by").notNull(),
    updatedBy: text("updated_by").notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
  },
  (table) => [
    uniqueIndex("media_items_storage_key_unique").on(table.storageKey),
    index("media_items_public_idx").on(table.status, table.kind, table.createdAt),
    check("media_items_byte_size_positive", sql`${table.byteSize} > 0`),
    check("media_items_kind_valid", sql`${table.kind} in ('image', 'document')`),
    check(
      "media_items_status_valid",
      sql`${table.status} in ('draft', 'published', 'archived')`,
    ),
  ],
);

export const contentItems = sqliteTable(
  "content_items",
  {
    id: text("id").primaryKey(),
    type: text("type", {
      enum: ["page", "news", "announcement", "project"],
    }).notNull(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull().default(""),
    bodyMarkdown: text("body_markdown").notNull().default(""),
    status: text("status", {
      enum: ["draft", "published", "archived"],
    })
      .notNull()
      .default("draft"),
    featuredMediaId: text("featured_media_id").references(() => mediaItems.id, {
      onDelete: "set null",
    }),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    publishedAt: text("published_at"),
    createdBy: text("created_by").notNull(),
    updatedBy: text("updated_by").notNull(),
    version: integer("version").notNull().default(1),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
  },
  (table) => [
    uniqueIndex("content_items_type_slug_unique").on(table.type, table.slug),
    index("content_items_public_idx").on(
      table.type,
      table.status,
      table.publishedAt,
    ),
    index("content_items_updated_idx").on(table.updatedAt),
    check("content_items_version_positive", sql`${table.version} > 0`),
    check(
      "content_items_type_valid",
      sql`${table.type} in ('page', 'news', 'announcement', 'project')`,
    ),
    check(
      "content_items_status_valid",
      sql`${table.status} in ('draft', 'published', 'archived')`,
    ),
  ],
);

export const staffMembers = sqliteTable(
  "staff_members",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    fullName: text("full_name").notNull(),
    roleTitle: text("role_title").notNull(),
    departmentSlug: text("department_slug"),
    biographyMarkdown: text("biography_markdown").notNull().default(""),
    photoMediaId: text("photo_media_id").references(() => mediaItems.id, {
      onDelete: "set null",
    }),
    sortOrder: integer("sort_order").notNull().default(0),
    status: text("status", {
      enum: ["active", "inactive", "archived"],
    })
      .notNull()
      .default("active"),
    createdBy: text("created_by").notNull(),
    updatedBy: text("updated_by").notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
  },
  (table) => [
    uniqueIndex("staff_members_slug_unique").on(table.slug),
    index("staff_members_public_idx").on(
      table.status,
      table.sortOrder,
      table.fullName,
    ),
    check("staff_members_sort_order_valid", sql`${table.sortOrder} >= 0`),
    check(
      "staff_members_status_valid",
      sql`${table.status} in ('active', 'inactive', 'archived')`,
    ),
  ],
);

export const formSubmissions = sqliteTable(
  "form_submissions",
  {
    id: text("id").primaryKey(),
    formType: text("form_type", { enum: ["registration", "contact"] }).notNull(),
    status: text("status", {
      enum: ["new", "in_progress", "resolved", "spam", "archived"],
    })
      .notNull()
      .default("new"),
    applicantName: text("applicant_name").notNull(),
    parentName: text("parent_name"),
    grade: text("grade"),
    departmentInterest: text("department_interest"),
    email: text("email"),
    phone: text("phone"),
    subject: text("subject"),
    message: text("message"),
    sourcePath: text("source_path").notNull().default("/"),
    consentVersion: text("consent_version").notNull(),
    consentAt: text("consent_at").notNull(),
    assignedTo: text("assigned_to"),
    internalNotes: text("internal_notes").notNull().default(""),
    submittedAt: timestamp("submitted_at"),
    updatedAt: timestamp("updated_at"),
  },
  (table) => [
    index("form_submissions_queue_idx").on(
      table.status,
      table.formType,
      table.submittedAt,
    ),
    index("form_submissions_assignee_idx").on(table.assignedTo, table.status),
    check(
      "form_submissions_type_valid",
      sql`${table.formType} in ('registration', 'contact')`,
    ),
    check(
      "form_submissions_status_valid",
      sql`${table.status} in ('new', 'in_progress', 'resolved', 'spam', 'archived')`,
    ),
  ],
);

export const auditEvents = sqliteTable(
  "audit_events",
  {
    id: text("id").primaryKey(),
    actorEmail: text("actor_email").notNull(),
    action: text("action").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id"),
    metadataJson: text("metadata_json").notNull().default("{}"),
    createdAt: timestamp("created_at"),
  },
  (table) => [
    index("audit_events_entity_idx").on(
      table.entityType,
      table.entityId,
      table.createdAt,
    ),
    index("audit_events_actor_idx").on(table.actorEmail, table.createdAt),
  ],
);

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  valueJson: text("value_json").notNull(),
  description: text("description").notNull().default(""),
  updatedBy: text("updated_by").notNull(),
  updatedAt: timestamp("updated_at"),
});

export type ContentItem = typeof contentItems.$inferSelect;
export type NewContentItem = typeof contentItems.$inferInsert;
export type StaffMember = typeof staffMembers.$inferSelect;
export type NewStaffMember = typeof staffMembers.$inferInsert;
export type MediaItem = typeof mediaItems.$inferSelect;
export type NewMediaItem = typeof mediaItems.$inferInsert;
export type FormSubmission = typeof formSubmissions.$inferSelect;
export type NewFormSubmission = typeof formSubmissions.$inferInsert;
export type AuditEvent = typeof auditEvents.$inferSelect;
export type NewAuditEvent = typeof auditEvents.$inferInsert;
