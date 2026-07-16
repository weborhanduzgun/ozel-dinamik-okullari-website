import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  Check,
  GraduationCap,
  Microscope,
  Target,
  Users,
} from "lucide-react";
import { DesktopNavigation } from "../components/DesktopNavigation";
import { MobileNavigation } from "../components/MobileNavigation";
import type { NavigationItem } from "../components/navigation";
import { ScrollAwareHeader } from "../components/ScrollAwareHeader";
import "./hakkimizda.css";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Dinamik Mesleki ve Teknik Anadolu Lisesi'nin eğitim yaklaşımı, vizyonu, misyonu ve kalite politikası.",
  alternates: { canonical: "/hakkimizda" },
};

const navigation: NavigationItem[] = [
  { label: "Anasayfa", href: "/" },
  {
    label: "Bölümler",
    children: [
      { label: "Kimya", href: "/#program-kimya" },
      { label: "Elektrik - Elektronik", href: "/#program-elektrik" },
      { label: "Biyomedikal", href: "/#program-biyomedikal" },
    ],
  },
  {
    label: "Okulumuz",
    children: [
      { label: "Okulumuz Hakkında", href: "/hakkimizda" },
      { label: "Okul Kıyafetlerimiz", href: "https://samsun.dinamikokullari.com/okul-kiyafetlerimiz" },
    ],
  },
  { label: "Kadromuz", href: "https://samsun.dinamikokullari.com/kadromuz" },
  { label: "Galeri", href: "/#galeri" },
  { label: "Başarılar", href: "https://samsun.dinamikokullari.com/basarilarimiz" },
  { label: "İletişim", href: "/#iletisim" },
];

const facts = [
  { value: "4 Yıl", label: "Ücretsiz eğitim", icon: GraduationCap },
  { value: "3 Alan", label: "Teknoloji programı", icon: Microscope },
  { value: "1.400", label: "Öğrenci kapasitesi", icon: Users },
  { value: "400", label: "Kişilik konferans salonu", icon: Building2 },
];

const qualityPrinciples = [
  "Sürekli iyileşme ve gelişme anlayışını benimsemek.",
  "Öğrenci başarısını, veli ve çalışan mutluluğunu birlikte güçlendirmek.",
  "Velilerimizle bütünleşen, öğretmen gelişimini destekleyen sıcak bir okul kültürü oluşturmak.",
  "Bölgenin ücretsiz özel okul modelini nitelikli eğitimle sürdürülebilir kılmak.",
];

export default function AboutPage() {
  return (
    <div className="about-shell">
      <a className="skip-link" href="#about-content">İçeriğe geç</a>

      <ScrollAwareHeader>
        <div className="container header-inner">
          <Link className="brand brand--header" href="/" aria-label="Dinamik Okulları anasayfa">
            <Image
              className="brand-image"
              src="/images/dinamik-logo-retina.png"
              alt="Dinamik Okulları"
              width={170}
              height={77}
              sizes="142px"
              priority
              unoptimized
            />
          </Link>
          <DesktopNavigation navigation={navigation} />
          <div className="header-actions">
            <Link className="button button--header" href="/#on-kayit">Ön Kayıt</Link>
          </div>
          <MobileNavigation navigation={navigation} />
        </div>
      </ScrollAwareHeader>

      <main id="about-content">
        <section className="about-hero" aria-labelledby="about-title">
          <Image src="/images/hero-lab.jpg" alt="" fill priority sizes="100vw" />
          <div className="about-hero-overlay" aria-hidden="true" />
          <div className="container about-hero-content">
            <nav aria-label="Sayfa yolu" className="breadcrumbs">
              <Link href="/">Anasayfa</Link><span aria-hidden="true">/</span><span>Hakkımızda</span>
            </nav>
            <p className="about-kicker">Dinamik Okulları</p>
            <h1 id="about-title">Geleceği meslekle, bilgiyi uygulamayla buluşturuyoruz.</h1>
            <p>
              Öğrencilerimizi yalnızca bir diplomaya değil; yetkinliğe, özgüvene ve değişen
              dünyanın ihtiyaçlarına hazırlayan ücretsiz bir eğitim modeli sunuyoruz.
            </p>
          </div>
        </section>

        <section className="about-facts" aria-label="Okulumuzun öne çıkan bilgileri">
          <div className="container about-facts-grid">
            {facts.map(({ value, label, icon: Icon }) => (
              <div className="about-fact" key={label}>
                <span><Icon size={22} aria-hidden="true" /></span>
                <div><strong>{value}</strong><small>{label}</small></div>
              </div>
            ))}
          </div>
        </section>

        <section className="about-story">
          <div className="container about-story-grid">
            <div className="about-story-copy">
              <p className="about-eyebrow">Okulumuz</p>
              <h2>Teori sınıfta başlar, deneyim gerçek hayatta tamamlanır.</h2>
              <p>
                Dinamik Mesleki ve Teknik Anadolu Lisesi’nde Elektrik-Elektronik
                Teknolojileri, Biyomedikal Cihaz Teknolojileri ve Kimya Teknolojileri
                olmak üzere üç alan bulunur.
              </p>
              <p>
                Eğitim; donanımlı atölye ve laboratuvarların yanı sıra protokol anlaşmalı
                sanayi kuruluşlarında desteklenir. Böylece öğrencilerimiz teorik bilgiyi
                üretim ortamında uygulama fırsatı bulur.
              </p>
              <p>
                Özel okul standartlarında dört yıl eğitim veren okulumuz, öğrencilerinden
                eğitim ücreti talep etmez. Mezunlarımızı hem iş dünyasına hem de yüksek
                öğrenime güçlü bir başlangıç yapabilecek donanımla yetiştirir.
              </p>
              <Link className="button button--primary" href="/#bolumler">
                Bölümlerimizi keşfedin <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="about-story-media">
              <Image
                src="/images/electronics.jpg"
                alt="Elektrik-elektronik alanında uygulamalı eğitim"
                fill
                sizes="(max-width: 800px) calc(100vw - 40px), 45vw"
              />
              <div className="about-media-note">
                <BookOpenCheck size={22} aria-hidden="true" />
                <span><strong>Uygulamalı eğitim</strong><small>Okul, atölye ve sanayi iş birliği</small></span>
              </div>
            </div>
          </div>
        </section>

        <section className="about-values" aria-labelledby="values-title">
          <div className="container">
            <div className="about-values-heading">
              <p className="about-eyebrow">Yönümüz</p>
              <h2 id="values-title">Aynı hedefe bakan güçlü bir eğitim kültürü</h2>
            </div>
            <div className="about-values-grid">
              <article className="about-value-card about-value-card--featured">
                <span className="about-value-icon"><Target size={25} aria-hidden="true" /></span>
                <p className="about-value-label">Vizyonumuz</p>
                <h3>Örnek gösterilen lider bir eğitim kurumu olmak.</h3>
                <p>
                  Katılımcılığı ve takım çalışmasını benimseyen; öğrenmeye, araştırmaya ve
                  etkili iş birliğine öncelik veren bir kurum olarak ülkemizin bilimsel,
                  sosyal ve kültürel gelişimine katkı sağlamak.
                </p>
              </article>
              <article className="about-value-card">
                <span className="about-value-icon"><GraduationCap size={25} aria-hidden="true" /></span>
                <p className="about-value-label">Misyonumuz</p>
                <h3>Bilgiyi beceriye, beceriyi toplumsal değere dönüştürmek.</h3>
                <p>
                  Milli ve manevi değerlere bağlı; akılcı, sorgulayan, hoşgörülü, yenilikçi
                  ve sorumluluk sahibi bireyler yetiştirmek.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="about-quality" aria-labelledby="quality-title">
          <div className="container about-quality-grid">
            <div>
              <p className="about-eyebrow">Kalite politikamız</p>
              <h2 id="quality-title">Her gün daha iyi bir okul deneyimi.</h2>
              <p>Başarıyı yalnızca sonuçlarla değil, gelişimi sürdüren bir kültürle ölçüyoruz.</p>
            </div>
            <ul>
              {qualityPrinciples.map((principle) => (
                <li key={principle}><span><Check size={16} aria-hidden="true" /></span>{principle}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="about-cta">
          <div className="container about-cta-inner">
            <div><p className="about-eyebrow">Dinamik bir gelecek</p><h2>Okulumuzu yakından tanımaya hazır mısınız?</h2></div>
            <div className="about-cta-actions">
              <Link className="button button--primary" href="/#on-kayit">Ön kayıt talebi</Link>
              <Link className="button about-button-light" href="/#iletisim">Bize ulaşın</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="about-footer">
        <div className="container about-footer-inner">
          <Link href="/" aria-label="Dinamik Okulları anasayfa">
            <Image src="/images/footer-logo-dinamik.png" alt="Dinamik Okulları" width={125} height={35} unoptimized />
          </Link>
          <p>© {new Date().getFullYear()} Dinamik Mesleki ve Teknik Anadolu Lisesi</p>
          <Link href="/#iletisim">İletişim</Link>
        </div>
      </footer>
    </div>
  );
}
