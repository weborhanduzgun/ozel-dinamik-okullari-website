import { asc } from "drizzle-orm";
import { getDb, schema } from "../../lib/db/client";

export type DepartmentAccent = "red" | "indigo" | "cyan";

export type Department = {
  slug: string;
  shortTitle: string;
  title: string;
  branch: string;
  image: string;
  accent: DepartmentAccent;
  lead: string;
  purpose: string;
  facts: Array<{ label: string; value: string }>;
  skills: string[];
  learningAreas: Array<{ title: string; text: string }>;
  careerAreas: string[];
};

export async function getDepartments(): Promise<Department[]> {
  const db = getDb();
  const rows = await db.select().from(schema.departments).orderBy(asc(schema.departments.sortOrder));
  return rows.map((row) => ({
    slug: row.slug,
    shortTitle: row.shortTitle,
    title: row.title,
    branch: row.branch,
    image: row.image,
    accent: row.accent as DepartmentAccent,
    lead: row.lead,
    purpose: row.purpose,
    facts: row.facts,
    skills: row.skills,
    learningAreas: row.learningAreas,
    careerAreas: row.careerAreas,
  }));
}

export async function getDepartment(slug: string): Promise<Department | undefined> {
  const departments = await getDepartments();
  return departments.find((department) => department.slug === slug);
}
