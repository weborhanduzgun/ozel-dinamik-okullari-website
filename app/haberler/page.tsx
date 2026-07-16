import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { InnerPageShell } from "../components/SiteChrome";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = {
  title: "Haberler ve Yayınlar",
  description: "Dinamik Samsun okul yayınları, projeleri, rehberlik içerikleri ve öğrenci çalışmaları.",
  alternates: { canonical: "/haberler" },
};

const news = [
  { category: "Yayın", title: "Mayıs - Haziran Bilim, Kültür ve Sanat Dergimiz", text: "Öğrencilerin bilimsel, kültürel ve sanatsal üretimlerini bir araya getiren dönem yayını.", image: "/images/gallery-7.jpg", href: "https://samsun.dinamikokullari.com/mayis-haziran-ayi-bilim-kultur-ve-sanat-dergimiz" },
  { category: "Proje", title: "Dijital Kimliğimle Varım", text: "eTwinning ortaklığıyla güvenli, bilinçli ve sorumlu dijital yaşam üzerine öğrenci projesi.", image: "/images/gallery-8.jpg", href: "https://samsun.dinamikokullari.com/dijital-kimligimle-varim-projesinde-e-twinnig-proje-ortagiyiz-2" },
  { category: "Rehberlik", title: "Mesleki Gelişim Dergisi", text: "Kariyer, sınav, ergenlik ve öğrenci gelişimine yönelik rehberlik içerikleri.", image: "/images/gallery-3.jpg", href: "https://samsun.dinamikokullari.com/rehberlik-mesleki-gelisim-dergisi" },
  { category: "Bilim", title: "Fizikopat - Fizik Gazetesi", text: "Fizik dünyasını öğrenci merakı, araştırma ve yaratıcı anlatımla buluşturan okul yayını.", image: "/images/electronics.jpg", href: "https://samsun.dinamikokullari.com/fizik-gazetemiz-fizikopat" },
  { category: "Arşiv", title: "Bilim, Kültür ve Sanat E-Dergileri", text: "Yıl boyunca hazırlanan öğrenci içeriklerinin dönemsel yayın arşivi.", image: "/images/gallery-4.jpg", href: "https://samsun.dinamikokullari.com/yayinlarimiz" },
  { category: "Kampüs", title: "Sosyal, Kültürel ve Sportif Çalışmalar", text: "Kampüste birlikte öğrenmenin, üretmenin ve paylaşmanın güncel izleri.", image: "/images/gallery-1.jpg", href: "https://samsun.dinamikokullari.com/faaliyetlerimiz" },
];

export default function NewsPage() {
  return (
    <InnerPageShell>
      <PageHero eyebrow="Dinamik'ten" title="Merak eden, üreten ve paylaşan bir okulun güncel izleri." description="Öğrenci yayınlarından rehberlik içeriklerine, projelerden kampüs çalışmalarına uzanan seçki." image="/images/gallery-4.jpg" current="Haberler ve Yayınlar" />
      <section className="inner-section inner-section--soft" aria-labelledby="news-archive-title">
        <div className="container">
          <div className="inner-section-header"><div><p className="inner-eyebrow">Güncel seçki</p><h2 id="news-archive-title">Okulun üretim kültürünü görünür kılan çalışmalar.</h2></div><p>İçerikler okulun kurumsal yayın arşivine bağlanır; böylece dergi ve proje ayrıntılarına doğrudan ulaşabilirsiniz.</p></div>
          <div className="news-archive-grid">
            {news.map((item) => (
              <a className="news-archive-card" href={item.href} target="_blank" rel="noreferrer" key={item.title}>
                <span className="news-archive-media"><Image src={item.image} alt="" fill sizes="(max-width: 700px) calc(100vw - 48px), 31vw" /></span>
                <span className="news-archive-content"><small>{item.category}</small><h2>{item.title}</h2><p>{item.text}</p><span className="card-link">İçeriği aç <span><ExternalLink size={14} /></span></span></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </InnerPageShell>
  );
}
