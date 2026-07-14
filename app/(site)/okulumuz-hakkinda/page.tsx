import type { Metadata } from "next";
import { BookOpen, Building2, CheckCircle2, GraduationCap, HeartHandshake, Library, ShieldCheck, Trophy, Users, Volleyball } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InfoGrid } from "../../components/InfoGrid";
import { PageHeader } from "../../components/PageHeader";
import { SectionHeading } from "../../components/SectionHeading";

export const metadata: Metadata = {
  title: "Okulumuz Hakkında",
  description: "Dinamik Mesleki ve Teknik Anadolu Lisesinin eğitim yaklaşımı, kampüsü ve kurumsal değerleri.",
  alternates: { canonical: "/okulumuz-hakkinda" },
};

const values = [
  { title: "Öğrenci Odaklılık", description: "Her öğrencinin ilgisini, yeteneğini ve gelişim hızını tanıyan eğitim yaklaşımı." },
  { title: "Bilim ve Üretim", description: "Merakı araştırmaya, bilgiyi uygulamaya ve uygulamayı üretime dönüştüren kültür." },
  { title: "Etik ve Sorumluluk", description: "Meslek etiği, güvenli çalışma, çevre bilinci ve toplumsal sorumluluk." },
  { title: "İş Birliği", description: "Öğrenci, öğretmen, veli, yükseköğretim ve sektör paydaşlarını buluşturan yapı." },
];

const campusFeatures = [
  { icon: Building2, title: "Laboratuvar ve Atölyeler", text: "Üç mesleki alanın uygulama kazanımlarını destekleyen çalışma ortamları." },
  { icon: Library, title: "Kütüphane ve Okuma Salonu", text: "Araştırma, odaklanma ve bireysel çalışma için sakin alanlar." },
  { icon: Users, title: "Konferans Salonu", text: "Söyleşi, sunum, gösteri ve okul etkinlikleri için 400 kişilik salon." },
  { icon: Volleyball, title: "Spor ve Yaşam Alanları", text: "Spor salonu, açık sahalar, kafeterya, yemekhane ve sosyal alanlar." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kurumsal"
        title="Okulumuz Hakkında"
        description="Öğrenciyi yalnızca bugünün derslerine değil, geleceğin mesleklerine ve değişen dünyaya hazırlayan bir eğitim kültürü."
        imageSrc="/images/gallery-4.jpg"
        imagePriority
      />
      <section className="section">
        <div className="container story-grid">
          <div>
            <p className="eyebrow">Eğitim Anlayışımız</p>
            <h2>Akademik gelişim, mesleki yetkinlik ve güçlü karakter bir arada.</h2>
            <p>
              Dinamik Mesleki ve Teknik Anadolu Lisesi, dört yıllık ücretsiz eğitim
              programında akademik dersleri uygulamalı mesleki eğitimle birleştirir.
              Öğrencilerimiz; laboratuvar, atölye, proje ve sosyal çalışmalarla üretmeyi,
              sorumluluk almayı ve ekip içinde çalışmayı öğrenir.
            </p>
            <p>
              Rehberlik yaklaşımımız, alan seçimini ve kariyer planlamasını öğrencinin
              ilgi ve yetenekleriyle birlikte ele alır. Hedefimiz; öğrenmeye açık,
              mesleki disiplini güçlü ve yükseköğretim seçeneklerinin farkında bireyler yetiştirmektir.
            </p>
            <ul className="check-list">
              <li><CheckCircle2 size={18} /> Dört yıl ücretsiz eğitim</li>
              <li><CheckCircle2 size={18} /> Üç teknoloji alanında uygulamalı program</li>
              <li><CheckCircle2 size={18} /> Akademik, mesleki ve sosyal gelişim takibi</li>
            </ul>
          </div>
          <div className="story-image">
            <Image src="/images/gallery-2.jpg" alt="Dinamik öğrencileri okul etkinliğinde" fill sizes="(max-width: 800px) calc(100vw - 32px), 44vw" />
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <SectionHeading eyebrow="Kurumsal Değerler" title="Bizi bir arada tutan ilkeler" />
          <InfoGrid items={values} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Kampüs"
            title="Öğrenme ve yaşam için tasarlanan alanlar"
            description="Kampüs, ders saatlerinin ötesinde araştırma, paylaşım, spor ve sosyalleşme için zengin olanaklar sunar."
          />
          <div className="campus-feature-grid">
            {campusFeatures.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <span><Icon size={25} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--metrics">
        <div className="container metric-grid">
          <div><GraduationCap size={25} /><strong>4 yıl</strong><span>Ücretsiz lise eğitimi</span></div>
          <div><BookOpen size={25} /><strong>3 alan</strong><span>Mesleki teknoloji programı</span></div>
          <div><Users size={25} /><strong>1.400</strong><span>Öğrenci kapasitesi</span></div>
          <div><Trophy size={25} /><strong>400</strong><span>Kişilik konferans salonu</span></div>
        </div>
      </section>
      <section className="section section--compact">
        <div className="container inline-cta">
          <div><p className="eyebrow eyebrow--on-dark">Kampüs Ziyareti</p><h2>Okulumuzu yerinde deneyimleyin.</h2></div>
          <Link className="button button--red" href="/iletisim">Ziyaret planla</Link>
        </div>
      </section>
    </>
  );
}

