export default function AdminHomePage() {
  return (
    <div>
      <h1>Yönetim Paneli</h1>
      <p className="admin-page-desc">Sitedeki içeriği buradan düzenleyin. Kaydettiğiniz değişiklikler anında canlı sitede görünür.</p>
      <div className="admin-card">
        <strong>Bölümler</strong>
        <p className="admin-page-desc" style={{ margin: "6px 0 0" }}>Kimya, Elektrik-Elektronik ve Biyomedikal bölümlerinin metinlerini düzenleyin.</p>
      </div>
      <div className="admin-card">
        <strong>Kadromuz</strong>
        <p className="admin-page-desc" style={{ margin: "6px 0 0" }}>Öğretmen ekleyin, düzenleyin veya kaldırın.</p>
      </div>
      <div className="admin-card">
        <strong>Galeri</strong>
        <p className="admin-page-desc" style={{ margin: "6px 0 0" }}>Fotoğraf yükleyin veya kaldırın.</p>
      </div>
      <div className="admin-card">
        <strong>Site Ayarları</strong>
        <p className="admin-page-desc" style={{ margin: "6px 0 0" }}>Telefon, adres, e-posta ve sosyal medya bağlantılarını güncelleyin.</p>
      </div>
    </div>
  );
}
