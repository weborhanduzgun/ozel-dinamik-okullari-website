import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const departments = sqliteTable("departments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  shortTitle: text("short_title").notNull(),
  title: text("title").notNull(),
  branch: text("branch").notNull(),
  image: text("image").notNull(),
  accent: text("accent").notNull(),
  lead: text("lead").notNull(),
  purpose: text("purpose").notNull(),
  facts: text("facts", { mode: "json" }).notNull().$type<Array<{ label: string; value: string }>>(),
  skills: text("skills", { mode: "json" }).notNull().$type<string[]>(),
  learningAreas: text("learning_areas", { mode: "json" })
    .notNull()
    .$type<Array<{ title: string; text: string }>>(),
  careerAreas: text("career_areas", { mode: "json" }).notNull().$type<string[]>(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const staff = sqliteTable("staff", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  role: text("role").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const galleryImages = sqliteTable("gallery_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  src: text("src").notNull(),
  alt: text("alt").notNull(),
  caption: text("caption"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const siteSettings = sqliteTable("site_settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  generalPhone: text("general_phone").notNull(),
  landlinePhone: text("landline_phone").notNull(),
  whatsapp: text("whatsapp").notNull(),
  email: text("email").notNull(),
  addressLine: text("address_line").notNull(),
  mapUrl: text("map_url").notNull(),
  hours: text("hours").notNull(),
  instagramUrl: text("instagram_url").notNull(),
  youtubeUrl: text("youtube_url").notNull(),
});
