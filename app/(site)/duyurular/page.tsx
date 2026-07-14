import type { Metadata } from "next";
import { BellRing } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "../../components/PageHeader";

export const metadata: Metadata = {
  title: "Duyurular",
  description: "Dinamik Samsun MTAL güncel okul duyuruları.",
  alternates: { canonical: "/duyurular" },
};

export default function AnnouncementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Duyurular"
        title="Okuldan güncel bilgilendirmeler"
        description="Kayıt, sınav, etkinlik ve öğrenci yaşamına ilişkin duyurular bu sayfada yayınlanır."
      />
      <section className="section">
        <div className="container managed-empty-state managed-empty-state--large">
          <BellRing size={34} aria-hidden="true" />
          <h2>Güncel duyuru bulunmuyor.</h2>
          <p>Yeni duyurular yönetim panelinden yayınlandığında burada tarih sırasıyla listelenecek.</p>
          <Link className="button button--primary" href="/iletisim">Bilgi almak için ulaşın</Link>
        </div>
      </section>
    </>
  );
}

