import { asc } from "drizzle-orm";
import { getDb, schema } from "./db/client";

export type GalleryImage = { src: string; alt: string; caption?: string };

export type SiteSettings = {
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

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const db = getDb();
  const rows = await db.select().from(schema.galleryImages).orderBy(asc(schema.galleryImages.sortOrder));
  return rows.map((row) => ({ src: row.src, alt: row.alt, caption: row.caption ?? undefined }));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const db = getDb();
  const rows = await db.select().from(schema.siteSettings);
  const row = rows[0];
  if (!row) throw new Error("Site ayarları bulunamadı. `npm run db:seed` çalıştırın.");
  return {
    generalPhone: row.generalPhone,
    landlinePhone: row.landlinePhone,
    whatsapp: row.whatsapp,
    email: row.email,
    addressLine: row.addressLine,
    mapUrl: row.mapUrl,
    hours: row.hours,
    instagramUrl: row.instagramUrl,
    youtubeUrl: row.youtubeUrl,
  };
}
