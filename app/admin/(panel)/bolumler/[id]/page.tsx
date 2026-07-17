import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { getDb, schema } from "@/lib/db/client";
import { updateDepartmentAction } from "@/lib/actions/departments";
import { listToLines, pairsToLines, titledPairsToLines } from "@/lib/textformat";
import { AdminPageHeader } from "../../../AdminPageHeader";

export default async function AdminDepartmentEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDb();
  const row = (await db.select().from(schema.departments).where(eq(schema.departments.id, Number(id))))[0];
  if (!row) notFound();

  return (
    <>
      <AdminPageHeader
        eyebrow="Bölüm düzenleme"
        title={row.title}
        description="Bölüm bilgilerini düzenleyin. Liste alanlarında her satır bir madde olarak kabul edilir."
        actions={<Link className="admin-btn admin-btn-secondary" href="/admin/bolumler"><ArrowLeft aria-hidden="true" size={16} /> Bölümlere dön</Link>}
      />
      <div className="admin-card">
        <form className="admin-form" action={updateDepartmentAction} encType="multipart/form-data">
          <input type="hidden" name="id" value={row.id} />
          <div className="admin-form-row">
            <label>
              Kısa başlık
              <input type="text" name="shortTitle" defaultValue={row.shortTitle} required />
            </label>
            <label>
              Renk teması
              <select name="accent" defaultValue={row.accent}>
                <option value="red">Kırmızı</option>
                <option value="indigo">Lacivert</option>
                <option value="cyan">Camgöbeği</option>
              </select>
            </label>
          </div>
          <label>
            Bölüm adı
            <input type="text" name="title" defaultValue={row.title} required />
          </label>
          <label>
            Dal adı
            <input type="text" name="branch" defaultValue={row.branch} required />
          </label>
          <label>
            Tanıtım cümlesi (hero)
            <textarea name="lead" defaultValue={row.lead} required />
          </label>
          <label>
            Amaç metni
            <textarea name="purpose" defaultValue={row.purpose} required />
          </label>
          <label>
            Görsel
            <input type="file" name="imageFile" accept="image/*" />
            <span className="admin-hint">Mevcut: {row.image} — boş bırakılırsa değişmez.</span>
          </label>
          <label>
            Öne çıkan bilgiler <span className="admin-hint">(her satır: Etiket | Değer — örn. &quot;Eğitim süresi | 4 öğretim yılı&quot;)</span>
            <textarea name="facts" defaultValue={pairsToLines(row.facts)} />
          </label>
          <label>
            Kazanılan beceriler <span className="admin-hint">(her satır bir madde)</span>
            <textarea name="skills" defaultValue={listToLines(row.skills)} />
          </label>
          <label>
            Ne öğreneceksin kartları <span className="admin-hint">(her satır: Başlık | Açıklama)</span>
            <textarea name="learningAreas" defaultValue={titledPairsToLines(row.learningAreas)} />
          </label>
          <label>
            Kariyer alanları <span className="admin-hint">(her satır bir madde)</span>
            <textarea name="careerAreas" defaultValue={listToLines(row.careerAreas)} />
          </label>
          <div className="admin-actions">
            <button className="admin-btn" type="submit"><Save aria-hidden="true" size={16} /> Değişiklikleri kaydet</button>
            <Link className="admin-btn admin-btn-secondary" href="/admin/bolumler">Vazgeç</Link>
          </div>
        </form>
      </div>
    </>
  );
}
