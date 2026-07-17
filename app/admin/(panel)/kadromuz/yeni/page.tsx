import Link from "next/link";
import { getDb, schema } from "@/lib/db/client";
import { createStaffAction } from "@/lib/actions/staff";

export default async function AdminNewStaffPage() {
  const db = getDb();
  const rows = await db.select({ category: schema.staff.category }).from(schema.staff);
  const categories = [...new Set(rows.map((row) => row.category))];

  return (
    <div>
      <h1>Yeni öğretmen ekle</h1>
      <div className="admin-card">
        <form className="admin-form" action={createStaffAction}>
          <label>
            Ad Soyad
            <input type="text" name="name" required autoFocus />
          </label>
          <label>
            Branş / Kategori
            <input type="text" name="category" list="kategori-listesi" required />
          </label>
          <label>
            Unvan
            <input type="text" name="role" required placeholder="Örn. Matematik Öğretmeni" />
          </label>
          <datalist id="kategori-listesi">
            {categories.map((category) => (
              <option value={category} key={category} />
            ))}
          </datalist>
          <div className="admin-actions">
            <button className="admin-btn" type="submit">Ekle</button>
            <Link className="admin-btn admin-btn-secondary" href="/admin/kadromuz">Vazgeç</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
