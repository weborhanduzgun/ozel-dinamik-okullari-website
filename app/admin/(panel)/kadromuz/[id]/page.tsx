import Link from "next/link";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getDb, schema } from "@/lib/db/client";
import { updateStaffAction } from "@/lib/actions/staff";

export default async function AdminEditStaffPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDb();
  const row = (await db.select().from(schema.staff).where(eq(schema.staff.id, Number(id))))[0];
  if (!row) notFound();

  const categoryRows = await db.select({ category: schema.staff.category }).from(schema.staff);
  const categories = [...new Set(categoryRows.map((item) => item.category))];

  return (
    <div>
      <h1>{row.name}</h1>
      <div className="admin-card">
        <form className="admin-form" action={updateStaffAction}>
          <input type="hidden" name="id" value={row.id} />
          <label>
            Ad Soyad
            <input type="text" name="name" defaultValue={row.name} required autoFocus />
          </label>
          <label>
            Branş / Kategori
            <input type="text" name="category" list="kategori-listesi" defaultValue={row.category} required />
          </label>
          <label>
            Unvan
            <input type="text" name="role" defaultValue={row.role} required />
          </label>
          <datalist id="kategori-listesi">
            {categories.map((category) => (
              <option value={category} key={category} />
            ))}
          </datalist>
          <div className="admin-actions">
            <button className="admin-btn" type="submit">Kaydet</button>
            <Link className="admin-btn admin-btn-secondary" href="/admin/kadromuz">Vazgeç</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
