import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Building2,
  Check,
  CircuitBoard,
  Factory,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
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
      {
        label: "Okul Kıyafetlerimiz",
        href: "https://samsun.dinamikokullari.com/okul-kiyafetlerimiz",
      },
    ],
  },
  { label: "Kadromuz", href: "https://samsun.dinamikokullari.com/kadromuz" },
  { label: "Galeri", href: "/#galeri" },
  { label: "Başarılar", href: "https://samsun.dinamikokullari.com/basarilarimiz" },
  { label: "İletişim", href: "/#iletisim" },
];

const facts = [
  { value: "4 Yıl", label: "Ücretsiz eğitim", icon: GraduationCap },
  { value: "3 Alan", label: "Teknoloji programı", icon: CircuitBoard },
  { value: "1.400", label: "Öğrenci kapasitesi", icon: Users },
  { value: "400", label: "Kişilik konferans salonu", icon: Building2 },
];

const activeFields = [
  {
    title: "Kimya Teknolojileri",
    branch: "Kimya Laboratuvarı Dalı",
    icon: FlaskConical,
    href: "/#program-kimya",
  },
  {
    title: "Elektrik-Elektronik",
    branch: "Elektrik Tesisatları ve Dağıtımı Dalı",
    icon: CircuitBoard,
    href: "/#program-elektrik",
  },
  {
    title: "Biyomedikal Cihaz",
    branch: "Tıbbi Görüntüleme Sistemleri Dalı",
    icon: HeartPulse,
    href: "/#program-biyomedikal",
  },
];

const educationModel = [
  {
    number: "01",
    tag: "Akademik temel",
    title: "Bilgiyi temellendir",
    text: "Mesleki teoriyi güçlü akademik altyapı ve güvenli çalışma kültürüyle öğren.",
    icon: BookOpenCheck,
  },
  {
    number: "02",
    tag: "Uygulamalı deneyim",
    title: "Uygulayarak geliştir",
    text: "Atölye ve laboratuvarlarda gerçek ekipmanlarla üret, ölç, analiz et ve çözüm geliştir.",
    icon: Sparkles,
  },
  {
    number: "03",
    tag: "Kariyer bağlantısı",
    title: "Sektörle buluş",
    text: "Sanayi iş birlikleriyle mesleğin gerçek çalışma ortamını deneyimle ve geleceğe hazırlan.",
    icon: Factory,
  },
];

const qualityPrinciples = [
  "Sürekli iyileşme ve gelişme anlayışını benimsemek.",
  "Öğrenci başarısını, veli ve çalışan mutluluğunu birlikte güçlendirmek.",
  "Velilerimizle bütünleşen, öğretmen gelişimini destekleyen sıcak bir okul kültürü oluşturmak.",
  "Bölgenin ücretsiz özel okul modelini nitelikli eğitimle sürdürülebilir kılmak.",
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

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
          <MobileNavigation navigation={navigation} ctaHref="/#on-kayit" />
        </div>
      </ScrollAwareHeader>

      <main id="about-content">
        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-hero-media">
            <Image
              src="/images/about-school-campus.png"
              alt="Dinamik Mesleki ve Teknik Anadolu Lisesi binası önündeki öğrenciler"
              fill
              priority
              loading="eager"
              sizes="100vw"
            />
          </div>
          <div className="about-hero-wash" aria-hidden="true" />
          <div className="container about-hero-layout">
            <div className="about-hero-copy">
              <nav aria-label="Sayfa yolu" className="about-breadcrumbs">
                <Link href="/">Anasayfa</Link><span aria-hidden="true">/</span><span>Hakkımızda</span>
              </nav>
              <p className="about-kicker"><span aria-hidden="true" /> Dinamik bir eğitim kültürü</p>
              <h1 id="about-title">
                Geleceği <em>meslekle</em>, bilgiyi uygulamayla buluşturuyoruz.
              </h1>
              <p className="about-hero-lead">
                Öğrencilerimizi yalnızca bir diplomaya değil; yetkinliğe, özgüvene ve değişen
                dünyanın ihtiyaçlarına hazırlayan ücretsiz bir eğitim modeli sunuyoruz.
              </p>
              <div className="about-hero-actions">
                <Link className="button button--primary" href="#egitim-yaklasimimiz">
                  Eğitim yaklaşımımız <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link className="button about-button-outline" href="/#bolumler">
                  Bölümlerimizi keşfedin
                </Link>
              </div>
            </div>

            <div className="about-hero-note">
              <span className="about-hero-note-icon"><ShieldCheck size={22} aria-hidden="true" /></span>
              <div><strong>Özel okul standartları</strong><small>Dört yıl boyunca ücretsiz eğitim</small></div>
            </div>
          </div>
        </section>

        <section className="about-facts" aria-label="Okulumuzun öne çıkan bilgileri">
          <div className="container about-facts-grid">
            {facts.map(({ value, label, icon: Icon }) => (
              <div className="about-fact" key={label}>
                <span><Icon size={21} strokeWidth={1.8} aria-hidden="true" /></span>
                <div><strong>{value}</strong><small>{label}</small></div>
              </div>
            ))}
          </div>
        </section>

        <section className="about-story" id="egitim-yaklasimimiz">
          <div className="container about-story-grid">
            <div className="about-story-visual">
              <div className="about-story-image about-story-image--main">
                <Image
                  src="/images/electronics.jpg"
                  alt="Elektrik-elektronik alanında uygulamalı eğitim"
                  fill
                  sizes="(max-width: 800px) calc(100vw - 40px), 42vw"
                />
              </div>
              <div className="about-story-image about-story-image--secondary">
                <Image
                  src="/images/biomedical.jpg"
                  alt="Biyomedikal laboratuvarında uygulama"
                  fill
                  sizes="(max-width: 600px) 42vw, 230px"
                />
              </div>
              <div className="about-story-badge">
                <span>3</span>
                <p>teknoloji alanında<br />uygulamalı eğitim</p>
              </div>
            </div>

            <div className="about-story-copy">
              <p className="about-eyebrow">Okulumuz</p>
              <h2>Teori sınıfta başlar, deneyim gerçek hayatta tamamlanır.</h2>
              <p className="about-story-intro">
                Dinamik Mesleki ve Teknik Anadolu Lisesi, akademik gelişim ile mesleki
                yetkinliği aynı eğitim yolculuğunda bir araya getirir.
              </p>
              <p>
                Eğitim; donanımlı atölye ve laboratuvarların yanı sıra protokol anlaşmalı
                sanayi kuruluşlarında desteklenir. Öğrencilerimiz teorik bilgiyi üretim
                ortamında uygulama fırsatı bulur; iş dünyasına ve yüksek öğrenime güçlü bir
                başlangıç yapabilecek donanımla mezun olur.
              </p>

              <div className="about-field-list" aria-label="Eğitim verilen alan ve dallar">
                {activeFields.map(({ title, branch, icon: Icon, href }) => (
                  <Link href={href} className="about-field" key={title}>
                    <span><Icon size={19} aria-hidden="true" /></span>
                    <div><strong>{title}</strong><small>{branch}</small></div>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-model" aria-labelledby="model-title">
          <div className="container">
            <div className="about-model-heading">
              <div>
                <p className="about-eyebrow about-eyebrow--light">Dinamik eğitim modeli</p>
                <h2 id="model-title">Bilgiden beceriye uzanan güçlü bir yolculuk.</h2>
              </div>
              <p>
                Öğrenme sürecini sınıfın dışına taşıyor, öğrencinin kendi potansiyelini gerçek
                uygulamalarla keşfetmesini sağlıyoruz.
              </p>
            </div>
            <div className="about-model-grid">
              {educationModel.map(({ number, tag, title, text, icon: Icon }) => (
                <article className="about-model-card" key={number}>
                  <span className="about-model-card-accent" aria-hidden="true" />
                  <div className="about-model-card-top">
                    <span><Icon size={23} aria-hidden="true" /></span><small>{number}</small>
                  </div>
                  <div className="about-model-card-body">
                    <span className="about-model-card-tag">{tag}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <div className="about-model-card-route" aria-hidden="true">
                    <span />
                    <ArrowRight size={15} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-purpose" aria-labelledby="purpose-title">
          <div className="container">
            <div className="about-purpose-heading">
              <div>
                <p className="about-eyebrow">Yönümüz</p>
                <h2 id="purpose-title">Aynı hedefe bakan güçlü bir eğitim kültürü.</h2>
              </div>
              <div className="about-purpose-intro">
                <p>
                  Evrensel değerleri, mesleki yeterliliği ve toplumsal sorumluluğu aynı çatı
                  altında buluşturuyoruz.
                </p>
                <span><ShieldCheck size={18} aria-hidden="true" /> Değerlerle güçlenen eğitim</span>
              </div>
            </div>
            <div className="about-purpose-cards">
              <article className="about-purpose-card about-purpose-card--vision">
                <div className="about-purpose-card-top">
                  <span className="about-purpose-icon"><Target size={25} aria-hidden="true" /></span>
                  <span className="about-purpose-number" aria-hidden="true">01</span>
                </div>
                <p className="about-value-label">Vizyonumuz</p>
                <h3>Örnek gösterilen lider bir eğitim kurumu olmak.</h3>
                <p>
                  Katılımcılığı, takım çalışmasını, araştırmayı ve etkili iş birliğini merkeze
                  alan bir kurum olarak ülkemizin bilimsel, sosyal ve kültürel gelişimine
                  katkı sağlamak.
                </p>
                <div className="about-purpose-card-footer">
                  <span>Geleceğe yön veren okul</span><ArrowUpRight size={17} aria-hidden="true" />
                </div>
              </article>
              <article className="about-purpose-card about-purpose-card--mission">
                <div className="about-purpose-card-top">
                  <span className="about-purpose-icon"><GraduationCap size={25} aria-hidden="true" /></span>
                  <span className="about-purpose-number" aria-hidden="true">02</span>
                </div>
                <p className="about-value-label">Misyonumuz</p>
                <h3>Bilgiyi beceriye, beceriyi toplumsal değere dönüştürmek.</h3>
                <p>
                  Milli ve manevi değerlere bağlı; akılcı, sorgulayan, hoşgörülü, yenilikçi
                  ve sorumluluk sahibi bireyler yetiştirmek.
                </p>
                <div className="about-purpose-card-footer">
                  <span>Yetkin ve sorumlu bireyler</span><ArrowUpRight size={17} aria-hidden="true" />
                </div>
              </article>
            </div>
            <div className="about-purpose-values" aria-label="Eğitim kültürümüzün temel değerleri">
              {[
                "Katılımcılık",
                "Takım çalışması",
                "Araştırma kültürü",
                "Toplumsal sorumluluk",
              ].map((value) => (
                <span key={value}><Check size={14} aria-hidden="true" /> {value}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="about-quality" aria-labelledby="quality-title">
          <div className="container about-quality-grid">
            <div className="about-quality-copy">
              <p className="about-eyebrow">Kalite politikamız</p>
              <h2 id="quality-title">Her gün daha iyi bir okul deneyimi.</h2>
              <p>
                Başarıyı yalnızca sonuçlarla değil, gelişimi sürekli kılan güvenli ve
                katılımcı bir okul kültürüyle ölçüyoruz.
              </p>
              <div className="about-quality-signature">
                <ShieldCheck size={21} aria-hidden="true" />
                <span><strong>Öğrenci odaklı gelişim</strong><small>Kalıcı kalite, ortak sorumluluk</small></span>
              </div>
            </div>
            <ol className="about-quality-list">
              {qualityPrinciples.map((principle, index) => (
                <li key={principle}>
                  <span className="about-quality-number">{String(index + 1).padStart(2, "0")}</span>
                  <p>{principle}</p>
                  <span className="about-quality-check"><Check size={15} aria-hidden="true" /></span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="about-cta" aria-labelledby="about-cta-title">
          <div className="container about-cta-inner">
            <div className="about-cta-copy">
              <p className="about-eyebrow about-eyebrow--light">Dinamik bir gelecek</p>
              <h2 id="about-cta-title">Geleceğini birlikte şekillendirelim.</h2>
              <p>
                Eğitim alanlarımızı keşfedin, merak ettiklerinizi sorun ve Dinamik&apos;teki
                yerinizi bugünden planlayın.
              </p>
              <div className="about-cta-actions">
                <Link className="button button--primary" href="/#on-kayit">
                  Ön kayıt başvurusu <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link className="button about-button-light" href="/#iletisim">Bize ulaşın</Link>
              </div>
            </div>
            <div className="about-cta-visual">
              <Image
                src="/images/hero-banner.png"
                alt="Dinamik öğrencileri uygulamalı laboratuvar eğitiminde"
                fill
                sizes="(max-width: 900px) calc(100vw - 40px), 48vw"
              />
              <div className="about-cta-badge">
                <span><ShieldCheck size={21} aria-hidden="true" /></span>
                <div>
                  <small>Dinamik eğitim modeli</small>
                  <strong>4 yıl ücretsiz eğitim</strong>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="about-footer">
        <div className="container about-footer-grid">
          <div className="about-footer-brand">
            <Link href="/" aria-label="Dinamik Okulları anasayfa">
              <Image src="/images/footer-logo-dinamik.png" alt="Dinamik Okulları" width={125} height={35} unoptimized />
            </Link>
            <p>Meslek sahibi, gelecek sahibi.</p>
            <div className="about-footer-social">
              <a href="https://www.instagram.com/dinamikokullarisamsun" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
              <a href="https://www.youtube.com/channel/UCmwV6um8k2UhRbSzQEhyM6g" target="_blank" rel="noreferrer" aria-label="YouTube"><span aria-hidden="true">▶</span></a>
            </div>
          </div>
          <div className="about-footer-links">
            <strong>Okulumuz</strong>
            <Link href="/hakkimizda">Hakkımızda</Link>
            <Link href="/#bolumler">Bölümlerimiz</Link>
            <Link href="/#galeri">Galeri</Link>
            <Link href="/#on-kayit">Ön Kayıt</Link>
          </div>
          <div className="about-footer-links">
            <strong>Öğrenci</strong>
            <a href="https://e-okul.meb.gov.tr/" target="_blank" rel="noreferrer">e-Okul</a>
            <Link href="/#ogrenci">Rehberlik</Link>
            <Link href="/#yayinlar">Yayınlar</Link>
            <Link href="/#kampus">Kampüs</Link>
          </div>
          <div className="about-footer-contact">
            <strong>İletişim</strong>
            <a href="tel:+905467765060"><Phone size={15} aria-hidden="true" /> 0546 776 50 60</a>
            <a href="mailto:samsun@dinamikokullari.com"><Mail size={15} aria-hidden="true" /> samsun@dinamikokullari.com</a>
            <a href="https://www.google.com/maps/search/?api=1&query=Toybelen+Mahallesi+Anadolu+Bulvar%C4%B1+No%3A225+%C4%B0lkad%C4%B1m+Samsun" target="_blank" rel="noreferrer">
              <MapPin size={15} aria-hidden="true" /> Toybelen Mah. Anadolu Bulvarı No:225, İlkadım / Samsun
            </a>
          </div>
        </div>
        <div className="container about-footer-bottom">
          <p>© {new Date().getFullYear()} Dinamik Mesleki ve Teknik Anadolu Lisesi</p>
          <span>Ücretsiz, uygulamalı ve geleceğe dönük eğitim.</span>
        </div>
      </footer>
    </div>
  );
}
