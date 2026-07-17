"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDb, schema } from "@/lib/db/client";
import { saveUploadedFile } from "@/lib/media";
import { linesToList, linesToPairs, linesToTitledPairs } from "@/lib/textformat";

export async function updateDepartmentAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  const db = getDb();
  const existing = (await db.select().from(schema.departments).where(eq(schema.departments.id, id)))[0];
  if (!existing) throw new Error("Bölüm bulunamadı.");

  const imageFile = formData.get("imageFile");
  const image = imageFile instanceof File && imageFile.size > 0 ? await saveUploadedFile(imageFile) : existing.image;

  await db
    .update(schema.departments)
    .set({
      shortTitle: String(formData.get("shortTitle") ?? existing.shortTitle),
      title: String(formData.get("title") ?? existing.title),
      branch: String(formData.get("branch") ?? existing.branch),
      accent: String(formData.get("accent") ?? existing.accent),
      lead: String(formData.get("lead") ?? existing.lead),
      purpose: String(formData.get("purpose") ?? existing.purpose),
      image,
      facts: linesToPairs(String(formData.get("facts") ?? "")),
      skills: linesToList(String(formData.get("skills") ?? "")),
      learningAreas: linesToTitledPairs(String(formData.get("learningAreas") ?? "")),
      careerAreas: linesToList(String(formData.get("careerAreas") ?? "")),
    })
    .where(eq(schema.departments.id, id));

  revalidatePath("/", "layout");
  redirect("/admin/bolumler?saved=1");
}
