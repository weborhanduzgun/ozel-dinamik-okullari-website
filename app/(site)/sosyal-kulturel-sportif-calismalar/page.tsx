import type { Metadata } from "next";
import { ArrowRight, Camera, HeartHandshake, Medal, Music, Palette, Rocket, Users, Volleyball } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InfoGrid } from "../../components/InfoGrid";
import { PageHeader } from "../../components/PageHeader";
import { SectionHeading } from "../../components/SectionHeading";
import { school, studentLife } from "../../data/site-content";

export const metadata: Metadata = {
  title: "Sosyal-Kültürel-Sportif Çalışmalar",
  description: "Dinamik Samsun MTAL sosyal etkinlikleri, kulüpleri, projeleri, yarışmaları ve spor faaliyetleri.",
  alternates: { canonical: "/sosyal-kulturel-sportif-calismalar" },
};

const gallery = [
  ["/images/gallery-1.jpg", "Öğrencilerin okul etkinliği"],
  ["/images/gallery-2.jpg", "Açık hava öğrenci etkinliği"],
  ["/images/gallery-3.jpg", "Kültürel gezi programı"],
  ["/images/gallery-7.jpg", "Öğrenci topluluğu"],
  ["/images/gallery-8.jpg", "Sosyal çalışma etkinliği"],
] as const;

const focusAreas = [
  { icon: Rocket, title: "Teknoloji ve Yarışmalar", text: "TEKNOFEST, araştırma ve proje yarışmalarına hazırlık kültürü." },
  { icon: Volleyball, title: "Spor", text: "Takım sporları, bireysel gelişim ve okul içi turnuvalar." },
  { icon: Music, title: "Kültür ve Sanat", text: "Müzik, görsel sanatlar, gösteriler ve kültürel paylaşımlar." },
  { icon: HeartHandshake, title: "Sosyal Sorumluluk", text: "Gönüllülük, dayanışma ve toplumsal farkındalık çalışmaları." },
];

export default function StudentLifePage() {
  return (
    <>
      <PageHeader
        eyebrow="Öğrenci Yaşamı"
        title="Sosyal, kültürel ve sportif çalışmalar"
        description="Öğrencilerin yeteneklerini keşfettiği, birlikte ürettiği, sorumluluk aldığı ve güçlü arkadaşlıklar kurduğu canlı bir okul deneyimi."
        imageSrc="/images/gallery-3.jpg"
        imagePriority
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Dinamik'te Yaşam"
            title="Sınıfın dışında da öğrenmeye devam"
            description="Kulüplerden teknik yarışmalara, spordan kültür-sanata kadar her çalışma öğrencinin kendini ifade etmesini ve ekip içinde gelişmesini destekler."
          />
          <InfoGrid items={studentLife} />
        </div>
      </section>
      <section className="section section--soft">
        <div className="container activity-focus-grid">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article key={title}><span><Icon size={25} /></span><h2>{title}</h2><p>{text}</p></article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Fotoğraf Galerisi"
            title="Birlikte yaşanan anlar"
            description="Galeriler ve video içerikleri yönetim panelinden kategori, bölüm ve etkinlik bazında yayınlanabilir."
            action={<a className="text-link" href={school.instagram} target="_blank" rel="noreferrer">Instagram <ArrowRight size={17} /></a>}
          />
          <div className="activity-gallery">
            {gallery.map(([src, alt], index) => (
              <figure key={src} className={`activity-gallery__item activity-gallery__item--${index + 1}`}>
                <Image src={src} alt={alt} fill sizes="(max-width: 700px) 90vw, 32vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--compact">
        <div className="container inline-cta">
          <div><p className="eyebrow eyebrow--on-dark">Kulüpler ve Projeler</p><h2>İlgi alanını keşfet, ekibinle üret.</h2></div>
          <Link className="button button--red" href="/iletisim"><Users size={17} /> Bilgi al</Link>
        </div>
      </section>
    </>
  );
}

