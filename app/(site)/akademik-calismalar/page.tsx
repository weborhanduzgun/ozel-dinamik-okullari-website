import type { Metadata } from "next";
import { ArrowRight, BookOpenCheck, CalendarCheck, ChartNoAxesCombined, FileText, GraduationCap, Lightbulb, Target } from "lucide-react";
import Link from "next/link";
import { InfoGrid } from "../../components/InfoGrid";
import { PageHeader } from "../../components/PageHeader";
import { SectionHeading } from "../../components/SectionHeading";
import { academicWork, managedContentFallback } from "../../data/site-content";

export const metadata: Metadata = {
  title: "Akademik Çalışmalar",
  description: "Dinamik Samsun MTAL akademik yaklaşımı, rehberlik, ölçme-değerlendirme ve proje çalışmaları.",
  alternates: { canonical: "/akademik-calismalar" },
};

const academicFlow = [
  { icon: Target, title: "Hedef Belirleme", text: "Öğrencinin akademik, mesleki ve kişisel hedefleri birlikte netleştirilir." },
  { icon: CalendarCheck, title: "Planlı Çalışma", text: "Ders, atölye, proje ve destek çalışmaları dengeli bir takvimde yürütülür." },
  { icon: ChartNoAxesCombined, title: "Gelişim Takibi", text: "Ölçme sonuçları ve öğretmen gözlemleri düzenli geri bildirimle değerlendirilir." },
  { icon: Lightbulb, title: "Üretim ve Paylaşım", text: "Öğrenilenler proje, sunum, yayın ve disiplinler arası çalışmalarla görünür olur." },
];

export default function AcademicPage() {
  const publications = managedContentFallback.filter((item) => item.type !== "project");
  return (
    <>
      <PageHeader
        eyebrow="Akademik Çalışmalar"
        title="Merak eden, araştıran ve üreten öğrenciler."
        description="Güçlü akademik temel; düzenli takip, rehberlik, proje kültürü ve uygulamalı mesleki eğitimle birlikte gelişir."
        imageSrc="/images/gallery-8.jpg"
        imagePriority
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Eğitim Yaklaşımı"
            title="Akademik gelişimi taşıyan dört temel çalışma alanı"
            description="Her çalışma; öğrencinin kendi öğrenme sorumluluğunu kazanmasını, düşünmesini ve ürettiklerini paylaşmasını destekler."
          />
          <InfoGrid items={academicWork} />
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <SectionHeading eyebrow="Süreç" title="Hedeften çıktıya uzanan gelişim döngüsü" />
          <div className="process-grid">
            {academicFlow.map(({ icon: Icon, title, text }, index) => (
              <article key={title}>
                <span className="process-grid__number">{String(index + 1).padStart(2, "0")}</span>
                <Icon size={24} aria-hidden="true" />
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container academic-publications">
          <div>
            <p className="eyebrow">Yayın ve Dokümanlar</p>
            <h2>Öğrenci üretimlerini kalıcı içeriklere dönüştürüyoruz.</h2>
            <p>Dergiler, rehberlik içerikleri ve akademik dokümanlar yönetim panelinden arşivlenir ve yayınlanır.</p>
            <Link className="button button--primary" href="/haberler">Yayınları görüntüle <ArrowRight size={17} /></Link>
          </div>
          <div className="document-list">
            {publications.map((item) => (
              <a href={item.href} target="_blank" rel="noreferrer" key={item.slug}>
                <FileText size={22} aria-hidden="true" />
                <span><strong>{item.title}</strong><small>{item.summary}</small></span>
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--compact">
        <div className="container inline-cta">
          <div><p className="eyebrow eyebrow--on-dark">Rehberlik ve Kariyer</p><h2>Öğrencinin hedefini birlikte planlayalım.</h2></div>
          <Link className="button button--red" href="/iletisim"><GraduationCap size={17} /> Görüşme planla</Link>
        </div>
      </section>
    </>
  );
}

