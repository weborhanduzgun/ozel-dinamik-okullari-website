import type { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export const CREATE_TABLES_SQL = `
CREATE TABLE IF NOT EXISTS departments (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_title TEXT NOT NULL,
  title TEXT NOT NULL,
  branch TEXT NOT NULL,
  image TEXT NOT NULL,
  accent TEXT NOT NULL,
  lead TEXT NOT NULL,
  purpose TEXT NOT NULL,
  facts TEXT NOT NULL,
  skills TEXT NOT NULL,
  learning_areas TEXT NOT NULL,
  career_areas TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS staff (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  role TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS gallery_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  general_phone TEXT NOT NULL,
  landline_phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  address_line TEXT NOT NULL,
  map_url TEXT NOT NULL,
  hours TEXT NOT NULL,
  instagram_url TEXT NOT NULL,
  youtube_url TEXT NOT NULL
);
`;

const CONTENT_DIR = resolve(process.cwd(), "content");

type DepartmentSeed = {
  slug: string;
  shortTitle: string;
  title: string;
  branch: string;
  image: string;
  accent: string;
  lead: string;
  purpose: string;
  facts: unknown;
  skills: unknown;
  learningAreas: unknown;
  careerAreas: unknown;
};
type StaffGroupSeed = { category: string; role: string; names: string[] };
type GalleryImageSeed = { src: string; alt: string; caption?: string };
type SiteSettingsSeed = {
  generalPhone: string;
  landlinePhone: string;
  whatsapp: string;
  email: string;
  addressLine: string;
  mapUrl: string;
  hours: string;
  instagramUrl: string;
  youtubeUrl: string;
};

function readJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(CONTENT_DIR, fileName), "utf8")) as T;
}

export function seedInitialContent(db: DatabaseSync): void {
  const departments = readJson<DepartmentSeed[]>("departments.json");
  const insertDepartment = db.prepare(
    `INSERT INTO departments (slug, short_title, title, branch, image, accent, lead, purpose, facts, skills, learning_areas, career_areas, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  departments.forEach((department, index) => {
    insertDepartment.run(
      department.slug,
      department.shortTitle,
      department.title,
      department.branch,
      department.image,
      department.accent,
      department.lead,
      department.purpose,
      JSON.stringify(department.facts),
      JSON.stringify(department.skills),
      JSON.stringify(department.learningAreas),
      JSON.stringify(department.careerAreas),
      index,
    );
  });

  const staffGroups = readJson<StaffGroupSeed[]>("staff.json");
  const insertStaff = db.prepare("INSERT INTO staff (name, category, role, sort_order) VALUES (?, ?, ?, ?)");
  let staffSortOrder = 0;
  for (const group of staffGroups) {
    for (const name of group.names) {
      insertStaff.run(name, group.category, group.role, staffSortOrder);
      staffSortOrder += 1;
    }
  }

  const gallery = readJson<GalleryImageSeed[]>("gallery.json");
  const insertGalleryImage = db.prepare("INSERT INTO gallery_images (src, alt, caption, sort_order) VALUES (?, ?, ?, ?)");
  gallery.forEach((image, index) => {
    insertGalleryImage.run(image.src, image.alt, image.caption ?? null, index);
  });

  const settings = readJson<SiteSettingsSeed>("site-settings.json");
  db.prepare(
    `INSERT INTO site_settings (general_phone, landline_phone, whatsapp, email, address_line, map_url, hours, instagram_url, youtube_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    settings.generalPhone,
    settings.landlinePhone,
    settings.whatsapp,
    settings.email,
    settings.addressLine,
    settings.mapUrl,
    settings.hours,
    settings.instagramUrl,
    settings.youtubeUrl,
  );
}
