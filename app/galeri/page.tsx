import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InnerPageShell } from "../components/SiteChrome";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = {
  title: "Fotoğraf Galerisi",
  description: "Dinamik Samsun kampüs, eğitim ve öğrenci yaşamından fotoğraflar.",
  alternates: { canonical: "/galeri" },
};

const gallery = [
  { src: "/images/gallery-1.jpg", caption: "Kış etkinlikleri ve kampüs yaşamı" },
  { src: "/images/gallery-2.jpg", caption: "Açık hava buluşmaları" },
  { src: "/images/gallery-3.jpg", caption: "Kültürel gezi programları" },
  { src: "/images/gallery-4.jpg", caption: "Sosyal etkinlikler" },
  { src: "/images/gallery-7.jpg", caption: "Öğrenci topluluğu" },
  { src: "/images/gallery-8.jpg", caption: "Birlikte öğrenme ve üretme" },
  { src: "/images/hero-lab.jpg", caption: "Kimya laboratuvarı" },
  { src: "/images/electronics.jpg", caption: "Elektrik-elektronik uygulamaları" },
  { src: "/images/biomedical.jpg", caption: "Biyomedikal cihaz eğitimi" },
];

export default function GalleryPage() {
  return (
    <InnerPageShell>
      <PageHero eyebrow="Kampüsten kareler" title="Dinamik'te öğrenmenin ve birlikte büyümenin renkli hâli." description="Atölyeden sahneye, laboratuvardan sosyal yaşama uzanan okul deneyiminden seçkiler." image="/images/gallery-1.jpg" current="Galeri" />
      <section className="inner-section inner-section--soft" aria-labelledby="gallery-title">
        <div className="container">
          <div className="inner-section-header"><div><p className="inner-eyebrow">Fotoğraf seçkisi</p><h2 id="gallery-title">Kampüsün enerjisi, öğrencilerin gözlerindeki merak.</h2></div><p>Her kare; öğrenmenin, arkadaşlığın, cesaretin ve birlikte üretmenin farklı bir anını anlatır.</p></div>
          <div className="gallery-masonry">{gallery.map((item) => <figure className="gallery-card" key={item.src}><Image src={item.src} alt={item.caption} fill sizes="(max-width: 700px) calc(100vw - 48px), 45vw" /><figcaption>{item.caption}</figcaption></figure>)}</div>
        </div>
      </section>
      <section className="inner-section"><div className="container cta-panel"><div><h2>Bu kampüsün bir sonraki hikâyesinde sen de ol.</h2><p>Dinamik eğitim ortamını yakından görmek için kampüs ziyareti planla.</p></div><div className="cta-panel-actions"><Link className="button button--primary" href="/on-kayit">Ziyaret planla <ArrowRight size={16} /></Link></div></div></section>
    </InnerPageShell>
  );
}
