import { asc } from "drizzle-orm";
import { getDb, schema } from "@/lib/db/client";
import { deleteGalleryImageAction, uploadGalleryImageAction } from "@/lib/actions/gallery";
import { ConfirmSubmitButton } from "../../ConfirmSubmitButton";

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const db = getDb();
  const rows = await db.select().from(schema.galleryImages).orderBy(asc(schema.galleryImages.sortOrder));

  return (
    <div>
      <h1>Galeri</h1>
      <p className="admin-page-desc">{rows.length} görsel. Yeni fotoğraf yükleyin veya mevcutları kaldırın.</p>
      {saved ? <div className="admin-flash">Kaydedildi.</div> : null}
      <div className="admin-card">
        <form className="admin-form" action={uploadGalleryImageAction} encType="multipart/form-data">
          <label>
            Fotoğraf
            <input type="file" name="imageFile" accept="image/*" required />
          </label>
          <label>
            Açıklama (alt metin)
            <input type="text" name="alt" required placeholder="Örn. Dinamik öğrencileri laboratuvar uygulamasında" />
          </label>
          <label>
            Galeri başlığı
            <input type="text" name="caption" placeholder="Örn. Kimya laboratuvarı" />
          </label>
          <div className="admin-actions">
            <button className="admin-btn" type="submit">Yükle</button>
          </div>
        </form>
      </div>
      <div className="admin-gallery-grid">
        {rows.map((row) => (
          <div className="admin-gallery-item" key={row.id}>
            {/* eslint-disable-next-line @next/next/no-img-element -- admin-only thumbnail, arbitrary uploaded image dimensions */}
            <img src={row.src} alt={row.alt} />
            <div className="admin-gallery-meta">
              <div>{row.caption ?? row.alt}</div>
              <form action={deleteGalleryImageAction}>
                <input type="hidden" name="id" value={row.id} />
                <ConfirmSubmitButton className="admin-btn admin-btn-danger" confirmMessage="Bu görsel kaldırılsın mı?">
                  Sil
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
        {rows.length === 0 ? <p className="admin-empty">Henüz görsel eklenmedi.</p> : null}
      </div>
    </div>
  );
}
