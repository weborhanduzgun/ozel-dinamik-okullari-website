import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { MobileNavigation } from "./components/MobileNavigation";
import type { NavigationItem } from "./components/navigation";
import { RegistrationForm } from "./components/RegistrationForm";
import { ScrollAwareHeader } from "./components/ScrollAwareHeader";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircuitBoard,
  Clock3,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  School,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Utensils,
  Video,
  Wrench,
  Zap,
} from "lucide-react";

type LinkItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

type Department = {
  id: string;
  title: string;
  branch: string;
  description: string;
  image: string;
  icon: LucideIcon;
  accent: "teal" | "blue" | "green";
};

const navigation: NavigationItem[] = [
  { label: "Anasayfa", href: "#anasayfa" },
  {
    label: "Bölümler",
    children: [
      { label: "Kimya", href: "#program-kimya" },
      { label: "Elektrik - Elektronik", href: "#program-elektrik" },
      { label: "Biyomedikal", href: "#program-biyomedikal" },
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
  {
    label: "Galeri",
    children: [
      {
        label: "Sosyal - Kültürel - Sportif Çalışmalar",
        href: "https://samsun.dinamikokullari.com/faaliyetlerimiz",
      },
      { label: "Dinamik Okul Bölümlerimiz", href: "#bolumler" },
    ],
  },
  { label: "Başarılar", href: "https://samsun.dinamikokullari.com/basarilarimiz" },
  { label: "İletişim", href: "#iletisim" },
];

const departments: Department[] = [
  {
    id: "kimya",
    title: "Kimya Teknolojileri",
    branch: "Kimya Laboratuvarı Dalı",
    description:
      "Numune alma, klasik ve cihazlı analizler ile güvenli laboratuvar uygulamalarını bir araya getiren mesleki eğitim.",
    image: "/images/hero-lab.jpg",
    icon: FlaskConical,
    accent: "teal",
  },
  {
    id: "elektrik",
    title: "Elektrik-Elektronik Teknolojileri",
    branch: "Elektrik Tesisatları ve Dağıtımı Dalı",
    description:
      "Devre, simülasyon, tesisat projesi, kuvvet-kumanda panoları ve test uygulamalarına odaklanan program.",
    image: "/images/electronics.jpg",
    icon: CircuitBoard,
    accent: "blue",
  },
  {
    id: "biyomedikal",
    title: "Biyomedikal Cihaz Teknolojileri",
    branch: "Tıbbi Görüntüleme Sistemleri",
    description:
      "Tıbbi cihazların kurulumu, kullanımı, bakım süreçleri ve sağlık teknolojilerinin teknik altyapısına yönelik eğitim.",
    image: "/images/biomedical.jpg",
    icon: HeartPulse,
    accent: "green",
  },
];

const benefits = [
  {
    icon: GraduationCap,
    title: "4 Yıl",
    text: "Ücretsiz Eğitim",
  },
  {
    icon: Wrench,
    title: "3 Alan",
    text: "Mesleki Program",
  },
  {
    icon: Building2,
    title: "1.400",
    text: "Öğrenci Kapasitesi",
  },
  {
    icon: School,
    title: "400",
    text: "Kişilik Konferans Salonu",
  },
  {
    icon: Trophy,
    title: "1 Kampüs",
    text: "Eğitim, Spor ve Sosyal Yaşam",
  },
];

const publications = [
  {
    type: "Yayın",
    title: "Bilim, Kültür ve Sanat Dergilerimiz",
    description: "Öğrencilerin bilimsel, kültürel ve sanatsal üretimleri.",
    icon: BookOpen,
    image: "/images/gallery-7.jpg",
    href: "https://samsun.dinamikokullari.com/mayis-haziran-ayi-bilim-kultur-ve-sanat-dergimiz",
  },
  {
    type: "Proje",
    title: "Dijital Kimliğimle Varım",
    description: "eTwinning ortaklığıyla güvenli ve bilinçli dijital yaşam.",
    icon: Sparkles,
    image: "/images/gallery-8.jpg",
    href: "https://samsun.dinamikokullari.com/dijital-kimligimle-varim-projesinde-e-twinnig-proje-ortagiyiz-2",
  },
  {
    type: "Rehberlik",
    title: "Mesleki Gelişim İçerikleri",
    description: "Kariyer, sınav ve ergenlik dönemine yönelik rehberlik.",
    icon: Users,
    image: "/images/gallery-3.jpg",
    href: "https://samsun.dinamikokullari.com/rehberlik-mesleki-gelisim-dergisi",
  },
];

const gallery = [
  { src: "/images/gallery-1.jpg", alt: "Dinamik öğrencilerinin kış etkinliği" },
  { src: "/images/gallery-2.jpg", alt: "Öğrencilerin açık hava etkinliği" },
  { src: "/images/gallery-3.jpg", alt: "Okulun kültürel gezi programı" },
  { src: "/images/gallery-4.jpg", alt: "Dinamik öğrencileri sosyal etkinlikte" },
  { src: "/images/gallery-7.jpg", alt: "Okul etkinliğine katılan öğrenciler" },
  { src: "/images/gallery-8.jpg", alt: "Dinamik öğrenci topluluğu" },
];

const quickLinks: LinkItem[] = [
  { label: "e-Okul Girişi", href: "https://e-okul.meb.gov.tr/", icon: School },
  { label: "Bölümler", href: "#bolumler", icon: GraduationCap },
  { label: "Rehberlik", href: "#ogrenci", icon: Users },
  { label: "Etkinlikler", href: "#galeri", icon: CalendarDays },
  { label: "Yemekhane", href: "#kampus", icon: Utensils },
  { label: "Yayınlar", href: "#yayinlar", icon: BookOpen },
  { label: "Bize Ulaşın", href: "#iletisim", icon: MessageCircle },
];

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Brand({ variant = "header" }: { variant?: "header" | "footer" }) {
  const isFooter = variant === "footer";

  return (
    <a
      className={`brand brand--${variant}`}
      href="#anasayfa"
      aria-label="Dinamik Okulları anasayfa"
    >
      <Image
        className="brand-image"
        src={isFooter ? "/images/footer-logo-dinamik.png" : "/images/dinamik-logo-retina.png"}
        alt="Dinamik Okulları"
        width={isFooter ? 125 : 170}
        height={isFooter ? 35 : 77}
        sizes={isFooter ? "125px" : "135px"}
        priority={!isFooter}
        unoptimized
      />
    </a>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}

function DepartmentCard({ department, index }: { department: Department; index: number }) {
  const Icon = department.icon;

  return (
    <a
      className={`department-card department-card--${department.accent}`}
      href={`#program-${department.id}`}
    >
      <span className="department-number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <Image
        src={department.image}
        alt=""
        fill
        sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 800px) 50vw, 30vw"
      />
      <span className="department-overlay" aria-hidden="true" />
      <span className="department-content">
        <span className="department-icon" aria-hidden="true">
          <Icon size={21} strokeWidth={1.8} />
        </span>
        <span className="department-branch">{department.branch}</span>
        <strong>{department.title}</strong>
        <span className="department-description">{department.description}</span>
        <span className="department-link">
          Programı incele <ArrowRight size={15} aria-hidden="true" />
        </span>
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        İçeriğe geç
      </a>

      <ScrollAwareHeader>
        <div className="container header-inner">
          <Brand />

          <DesktopNavigation navigation={navigation} />

          <div className="header-actions">
            <a className="button button--header" href="#on-kayit">
              Ön Kayıt
            </a>
            <a
              className="button button--ghost-dark"
              href="https://e-okul.meb.gov.tr/"
              target="_blank"
              rel="noreferrer"
            >
              e-Okul
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>

          <MobileNavigation navigation={navigation} />
        </div>
      </ScrollAwareHeader>

      <main id="main-content">
        <section className="hero" id="anasayfa" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <Image src="/images/hero-banner.png" alt="" fill priority sizes="100vw" />
          </div>
          <div className="hero-wash" aria-hidden="true" />

          <div className="container hero-layout">
            <div className="hero-stage">
              <div className="hero-copy">
                <p className="hero-eyebrow">
                  <span aria-hidden="true" />
                  Senin mesleğin, senin geleceğin
                </p>
                <h1 id="hero-title">
                  Geleceğin <em>Teknolojisini</em> Bugünden Öğren.
                </h1>
                <p className="hero-lead">
                  Mesleki bilgiyi gerçek uygulamalarla buluşturan, dört yıl ücretsiz ve
                  güçlü bir lise deneyimi.
                </p>

                <div className="hero-actions">
                  <a className="button button--primary" href="#bolumler">
                    Bölümleri İncele
                    <ArrowRight size={17} aria-hidden="true" />
                  </a>
                  <a className="button button--secondary" href="#okulumuz">
                    <Play size={16} fill="currentColor" aria-hidden="true" />
                    Okulumuzu Tanıyın
                  </a>
                </div>
              </div>

              <aside className="hero-rail" aria-label="Okuldan öne çıkanlar">
                <a
                  className="hero-tile hero-tile--large"
                  href="https://www.youtube.com/channel/UCmwV6um8k2UhRbSzQEhyM6g"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/images/gallery-4.jpg"
                    alt="Dinamik Okulları tanıtımı"
                    fill
                    sizes="184px"
                  />
                  <span className="play-button" aria-hidden="true">
                    <Play size={17} fill="currentColor" />
                  </span>
                  <strong>Okulumuzu Tanıyın</strong>
                </a>
                <a className="hero-tile" href="#bolumler">
                  <Image
                    src="/images/electronics.jpg"
                    alt="Uygulamalı eğitim çalışması"
                    fill
                    sizes="184px"
                  />
                  <strong>Uygulamalı Eğitim</strong>
                </a>
                <a className="hero-tile" href="#galeri">
                  <Image
                    src="/images/gallery-7.jpg"
                    alt="Dinamik öğrenci etkinliği"
                    fill
                    sizes="184px"
                  />
                  <strong>Dinamik&apos;te Yaşam</strong>
                </a>
              </aside>
            </div>

            <div className="proof-grid" aria-label="Okulun öne çıkan bilgileri">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const accent = ["teal", "blue", "green", "blue", "teal"][index];

                return (
                  <div className="proof-card" key={benefit.title}>
                    <span className={`proof-icon proof-icon--${accent}`} aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    <span>
                      <strong>{benefit.title}</strong>
                      <small>{benefit.text}</small>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="benefit-strip" aria-labelledby="benefit-title">
          <div className="container benefit-grid">
            <div className="benefit-label">
              <strong id="benefit-title">Neden Dinamik?</strong>
              <span aria-hidden="true" />
            </div>
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div className="benefit-item" key={benefit.title}>
                  <Icon size={26} strokeWidth={1.7} aria-hidden="true" />
                  <span>
                    <strong>{benefit.title}</strong>
                    <small>{benefit.text}</small>
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="department-news-section" id="bolumler" aria-labelledby="departments-title">
          <div className="container department-news-grid">
            <div className="departments-block">
              <SectionHeading
                id="departments-title"
                eyebrow="Bölümlerimiz"
                title="Teknolojiyi mesleğe dönüştüren üç alan"
                description="Her program, güvenli çalışma kültürü ile teorik bilgiyi uygulamalı eğitimde buluşturur."
              />
              <div className="department-grid">
                {departments.map((department, index) => (
                  <DepartmentCard key={department.id} department={department} index={index} />
                ))}
              </div>
              <a className="departments-footer-link" href="#ogrenci">
                Tüm bölümleri incele
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="gallery-section" id="galeri" aria-labelledby="gallery-title">
          <div className="container gallery-layout">
            <div className="gallery-intro">
              <p className="eyebrow">Kampüs &amp; Yaşam</p>
              <h2 id="gallery-title">Dinamik&apos;te Yaşam</h2>
              <p className="gallery-description">Eğitim sadece sınıfta değil, hayatın her anında.</p>
              <a
                className="button button--secondary button--small"
                href="https://www.instagram.com/dinamikokullarisamsun"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon />
                Instagram&apos;da Gör
              </a>
            </div>
            <div className="gallery-grid">
              {gallery.map((item, index) => (
                <figure key={item.src} className={`gallery-item gallery-item--${index + 1}`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 600px) 78vw, (max-width: 1024px) 170px, 15vw"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="news-section" id="yayinlar" aria-labelledby="news-title">
          <div className="container">
            <div className="news-heading">
              <div>
                <p className="eyebrow eyebrow--light">Dinamik&apos;ten</p>
                <h2 id="news-title">Haberler &amp; Duyurular</h2>
              </div>
              <a
                className="button button--outline-light button--small"
                href="https://samsun.dinamikokullari.com/yayinlarimiz"
                target="_blank"
                rel="noreferrer"
              >
                Tüm Haberler
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="news-grid">
              {publications.map((publication) => {
                const Icon = publication.icon;

                return (
                  <a
                    className="news-card"
                    href={publication.href}
                    target="_blank"
                    rel="noreferrer"
                    key={publication.title}
                  >
                    <span className="news-media">
                      <Image
                        src={publication.image}
                        alt=""
                        fill
                        sizes="(max-width: 700px) calc(100vw - 32px), 30vw"
                      />
                    </span>
                    <span className="news-content">
                      <span className="news-meta">
                        <Icon size={15} aria-hidden="true" />
                        {publication.type}
                      </span>
                      <strong>{publication.title}</strong>
                      <small>{publication.description}</small>
                      <span className="news-link">
                        Haberi incele
                        <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="campus-section" id="okulumuz" aria-labelledby="campus-title">
          <div className="container campus-grid">
            <div className="campus-media">
              <Image
                src="/images/gallery-8.jpg"
                alt="Dinamik öğrencileri okul etkinliğinde"
                fill
                sizes="(max-width: 800px) calc(100vw - 32px), 50vw"
              />
              <div className="campus-stat campus-stat--top">
                <strong>400</strong>
                <span>Kişilik konferans salonu</span>
              </div>
              <div className="campus-stat campus-stat--bottom">
                <strong>1.400</strong>
                <span>Öğrenci kapasitesi</span>
              </div>
            </div>
            <div className="campus-copy">
              <p className="eyebrow">Neden Dinamik?</p>
              <h2 id="campus-title">Geleceği yalnızca anlatmıyor, öğrencilerimizle birlikte inşa ediyoruz.</h2>
              <p>
                Modern teknik altyapıyı, uygulamalı eğitimi ve iş dünyasıyla kurulan güçlü
                bağları öğrencilerimizin geleceğine dönüştürüyoruz.
              </p>
              <div className="campus-features" id="kampus">
                <div>
                  <FlaskConical size={21} aria-hidden="true" />
                  <span>
                    <strong>Modern ve Yüksek Teknolojili Atölyeler</strong>
                    <small>Her alan için güncel teknik altyapı ve uygulama ortamları</small>
                  </span>
                </div>
                <div>
                  <Building2 size={21} aria-hidden="true" />
                  <span>
                    <strong>Sanayi ile Güçlü İş Birlikleri</strong>
                    <small>Gerçek projeler, staj olanakları ve istihdam fırsatları</small>
                  </span>
                </div>
                <div>
                  <Wrench size={21} aria-hidden="true" />
                  <span>
                    <strong>Uygulamalı Eğitim Ağırlıklı Müfredat</strong>
                    <small>Teori ve pratiği birleştiren çağdaş eğitim modeli</small>
                  </span>
                </div>
                <div>
                  <GraduationCap size={21} aria-hidden="true" />
                  <span>
                    <strong>Üniversite ve Doğrudan İşe Geçiş</strong>
                    <small>İstediğin yolda güçlü bir gelecek için rehberlik</small>
                  </span>
                </div>
                <div>
                  <ShieldCheck size={21} aria-hidden="true" />
                  <span>
                    <strong>Güvenli ve Sosyal Kampüs</strong>
                    <small>Spor, kültür, sanat ve birlikte üretme kültürü</small>
                  </span>
                </div>
              </div>
              <a className="button button--light" href="#iletisim">
                Okulumuzu Keşfedin
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="program-section" id="ogrenci" aria-labelledby="programs-title">
          <div className="container">
            <SectionHeading
              id="programs-title"
              eyebrow="Programlar"
              title="Mesleki yetkinliğe giden yol"
              description="Dört yıllık programlar; meslek etiği, iş sağlığı ve güvenliği, çevre bilinci, teknoloji ve uygulamayı birlikte ele alır."
            />

            <div className="program-grid">
              <article className="program-card" id="program-kimya">
                <div className="program-card-heading">
                  <span className="program-number">01</span>
                  <span className="program-icon program-icon--teal" aria-hidden="true">
                    <FlaskConical size={24} />
                  </span>
                  <div>
                    <small>Kimya Laboratuvarı Dalı</small>
                    <h3>Kimya Teknolojileri</h3>
                  </div>
                </div>
                <p>
                  Temel kimyasal işlemlerden numune analizlerine, klasik analiz
                  yöntemlerinden laboratuvar cihazları ve kromatografik yöntemlere uzanan
                  uygulamalı eğitim.
                </p>
                <ul>
                  <li><CheckCircle2 size={17} /> Nitel ve nicel analiz uygulamaları</li>
                  <li><CheckCircle2 size={17} /> Numune alma ve atık yönetimi</li>
                  <li><CheckCircle2 size={17} /> GLP ve iş güvenliği yaklaşımı</li>
                  <li><CheckCircle2 size={17} /> Cihazlı analiz yöntemleri</li>
                </ul>
              </article>

              <article className="program-card" id="program-elektrik">
                <div className="program-card-heading">
                  <span className="program-number">02</span>
                  <span className="program-icon program-icon--blue" aria-hidden="true">
                    <Zap size={24} />
                  </span>
                  <div>
                    <small>Elektrik Tesisatları ve Dağıtımı Dalı</small>
                    <h3>Elektrik-Elektronik Teknolojileri</h3>
                  </div>
                </div>
                <p>
                  Temel elektrik-elektronik bilgisini ölçme, devre, proje, pano ve test
                  uygulamalarıyla birleştiren kapsamlı mesleki eğitim.
                </p>
                <ul>
                  <li><CheckCircle2 size={17} /> Devre hesaplama ve ölçme</li>
                  <li><CheckCircle2 size={17} /> Simülasyon ve baskı devre</li>
                  <li><CheckCircle2 size={17} /> Kuvvet ve kumanda panoları</li>
                  <li><CheckCircle2 size={17} /> Tesisat projesi ve test</li>
                </ul>
              </article>

              <article className="program-card" id="program-biyomedikal">
                <div className="program-card-heading">
                  <span className="program-number">03</span>
                  <span className="program-icon program-icon--green" aria-hidden="true">
                    <HeartPulse size={24} />
                  </span>
                  <div>
                    <small>Tıbbi Görüntüleme Sistemleri</small>
                    <h3>Biyomedikal Cihaz Teknolojileri</h3>
                  </div>
                </div>
                <p>
                  Sağlık teknolojileri alanında kullanılan cihazların teknik altyapısını,
                  güvenli kullanımını ve bakım süreçlerini tanıtan uygulama odaklı eğitim.
                </p>
                <ul>
                  <li><CheckCircle2 size={17} /> Tıbbi cihaz sistemleri</li>
                  <li><CheckCircle2 size={17} /> Kurulum ve güvenli kullanım</li>
                  <li><CheckCircle2 size={17} /> Ölçme, kontrol ve bakım</li>
                  <li><CheckCircle2 size={17} /> Teknik dokümantasyon</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="guidance-section" aria-labelledby="guidance-title">
          <div className="container guidance-grid">
            <div className="guidance-copy">
              <p className="eyebrow">Öğrenci &amp; Rehberlik</p>
              <h2 id="guidance-title">Sadece bir bölüm değil, güçlü bir gelecek seçimi.</h2>
              <p>
                Öğrencilerimizin akademik, mesleki ve kişisel gelişimini; kariyer
                farkındalığı, rehberlik çalışmaları ve sosyal etkinliklerle destekliyoruz.
              </p>
            </div>
            <div className="guidance-cards">
              <a href="https://samsun.dinamikokullari.com/rehberlik" target="_blank" rel="noreferrer">
                <ShieldCheck size={24} aria-hidden="true" />
                <span><strong>Rehberlik</strong><small>Öğrencinin yanında, aileyle birlikte</small></span>
                <ChevronRight size={17} aria-hidden="true" />
              </a>
              <a href="#bolumler">
                <Trophy size={24} aria-hidden="true" />
                <span><strong>Kariyer Planlama</strong><small>İlgi ve yeteneğe uygun alan seçimi</small></span>
                <ChevronRight size={17} aria-hidden="true" />
              </a>
              <a href="#galeri">
                <Users size={24} aria-hidden="true" />
                <span><strong>Sosyal Yaşam</strong><small>Kültür, sanat, spor ve ekip ruhu</small></span>
                <ChevronRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="registration-section" id="on-kayit" aria-labelledby="registration-title">
          <div className="container registration-grid">
            <div className="registration-copy">
              <p className="eyebrow">Ön Kayıt Talebi</p>
              <h2 id="registration-title">Sizi tanıyalım, doğru programı birlikte seçelim.</h2>
              <p>
                Kısa formu doldurun; talebiniz okulun resmî WhatsApp hattına hazır mesaj
                olarak aktarılsın. Kayıt ekibimiz uygun olduğunda sizinle iletişime geçsin.
              </p>
              <ul>
                <li><CheckCircle2 size={18} aria-hidden="true" /> Üç mesleki alan hakkında bilgi</li>
                <li><CheckCircle2 size={18} aria-hidden="true" /> Kampüs ziyareti planlama</li>
                <li><CheckCircle2 size={18} aria-hidden="true" /> Kayıt süreci ve koşulları</li>
              </ul>
            </div>
            <RegistrationForm />
          </div>
        </section>

        <section className="contact-section" id="iletisim" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow eyebrow--light">Bize Ulaşın</p>
              <h2 id="contact-title">Geleceğin için ilk adımı bugün at.</h2>
              <p>
                Bölümler, kayıt koşulları ve kampüs ziyareti hakkında bilgi almak için
                okulumuza ulaşın.
              </p>
              <div className="contact-actions">
                <a className="button button--light" href="tel:+908502182806">
                  <Phone size={17} aria-hidden="true" />
                  0850 218 28 06
                </a>
                <a
                  className="button button--whatsapp"
                  href="https://wa.me/905467765060"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>

            <address className="contact-card">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Toybelen+Mahallesi+Anadolu+Bulvar%C4%B1+No%3A225+%C4%B0lkad%C4%B1m+Samsun"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-card-icon"><MapPin size={21} aria-hidden="true" /></span>
                <span><small>Adres</small><strong>Toybelen Mah. Anadolu Bulvarı No:225<br />İlkadım / Samsun</strong></span>
                <ExternalLink size={15} aria-hidden="true" />
              </a>
              <a href="tel:+903624655353">
                <span className="contact-card-icon"><Phone size={21} aria-hidden="true" /></span>
                <span><small>Sabit Hat</small><strong>0362 465 53 53</strong></span>
                <ChevronRight size={15} aria-hidden="true" />
              </a>
              <div>
                <span className="contact-card-icon"><Clock3 size={21} aria-hidden="true" /></span>
                <span><small>Çalışma Saatleri</small><strong>Pazartesi – Cumartesi<br />08:30 – 18:00</strong></span>
              </div>
            </address>
          </div>
        </section>
      </main>

      <nav className="quick-links" aria-label="Hızlı erişim">
        <div className="container quick-links-grid">
          {quickLinks.map((item) => {
            const Icon = item.icon ?? ChevronRight;
            const external = item.href.startsWith("http");
            return (
              <a
                href={item.href}
                key={item.label}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <Brand variant="footer" />
            <p>Meslek sahibi, gelecek sahibi.</p>
          </div>
          <div className="footer-links">
            <strong>Keşfet</strong>
            <a href="#okulumuz">Okulumuz</a>
            <a href="#bolumler">Bölümler</a>
            <a href="#ogrenci">Öğrenci</a>
            <a href="#galeri">Galeri</a>
          </div>
          <div className="footer-links">
            <strong>İletişim</strong>
            <a href="tel:+903624655353">0362 465 53 53</a>
            <a href="tel:+905467765060">0546 776 50 60</a>
            <a href="#iletisim">İletişim Bilgileri</a>
          </div>
          <div className="footer-social">
            <strong>Bizi Takip Edin</strong>
            <div>
              <a
                href="https://www.instagram.com/dinamikokullarisamsun"
                target="_blank"
                rel="noreferrer"
                aria-label="Dinamik Okulları Samsun Instagram"
              >
                <InstagramIcon size={19} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCmwV6um8k2UhRbSzQEhyM6g"
                target="_blank"
                rel="noreferrer"
                aria-label="Dinamik Okulları Samsun YouTube"
              >
                <Video size={19} />
              </a>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Dinamik Mesleki ve Teknik Anadolu Lisesi</span>
          <span>Samsun / Türkiye</span>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href="https://wa.me/905467765060"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp üzerinden iletişime geçin"
      >
        <MessageCircle size={25} aria-hidden="true" />
      </a>
    </div>
  );
}
