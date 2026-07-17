import Link from "next/link";
import { asc } from "drizzle-orm";
import { getDb, schema } from "@/lib/db/client";
import { deleteStaffAction } from "@/lib/actions/staff";
import { ConfirmSubmitButton } from "../../ConfirmSubmitButton";

export default async function AdminStaffPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const db = getDb();
  const rows = await db.select().from(schema.staff).orderBy(asc(schema.staff.sortOrder));

  const grouped = new Map<string, typeof rows>();
  for (const row of rows) {
    if (!grouped.has(row.category)) grouped.set(row.category, []);
    grouped.get(row.category)!.push(row);
  }

  return (
    <div>
      <h1>Kadromuz</h1>
      <p className="admin-page-desc">{rows.length} öğretmen, {grouped.size} branş grubu.</p>
      {saved ? <div className="admin-flash">Kaydedildi.</div> : null}
      <Link className="admin-btn" href="/admin/kadromuz/yeni">+ Yeni öğretmen ekle</Link>
      <div style={{ height: 18 }} />
      {[...grouped.entries()].map(([category, members]) => (
        <div className="admin-card" key={category}>
          <strong>{category}</strong> <span className="admin-hint">{members[0]?.role ?? ""}</span>
          <table>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td className="admin-actions">
                    <Link className="admin-btn admin-btn-secondary" href={`/admin/kadromuz/${member.id}`}>
                      Düzenle
                    </Link>
                    <form action={deleteStaffAction}>
                      <input type="hidden" name="id" value={member.id} />
                      <ConfirmSubmitButton className="admin-btn admin-btn-danger" confirmMessage={`${member.name} kaldırılsın mı?`}>
                        Sil
                      </ConfirmSubmitButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {rows.length === 0 ? <p className="admin-empty">Henüz kayıtlı öğretmen yok.</p> : null}
    </div>
  );
}
