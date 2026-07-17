import Link from "next/link";
import { asc } from "drizzle-orm";
import { getDb, schema } from "@/lib/db/client";

export default async function AdminDepartmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const db = getDb();
  const rows = await db.select().from(schema.departments).orderBy(asc(schema.departments.sortOrder));

  return (
    <div>
      <h1>Bölümler</h1>
      <p className="admin-page-desc">Okulda eğitim verilen 3 mesleki alanın içeriğini düzenleyin.</p>
      {saved ? <div className="admin-flash">Kaydedildi.</div> : null}
      <div className="admin-card">
        <table>
          <thead>
            <tr>
              <th>Bölüm</th>
              <th>Dal</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.title}</td>
                <td>{row.branch}</td>
                <td className="admin-actions">
                  <Link className="admin-btn admin-btn-secondary" href={`/admin/bolumler/${row.id}`}>
                    Düzenle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
