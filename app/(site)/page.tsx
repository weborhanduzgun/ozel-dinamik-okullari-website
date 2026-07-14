import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Microscope,
  Newspaper,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DepartmentGrid } from "../components/DepartmentGrid";
import { SectionHeading } from "../components/SectionHeading";
import {
  academicWork,
  departments,
  managedContentFallback,
  school,
  studentLife,
} from "../data/site-content";

const reasons = [
  {
    icon: GraduationCap,
    title: "Dört Yıl Ücretsiz Eğitim",
    description: "Akademik ve mesleki gelişimi aynı programda buluşturan lise deneyimi.",
  },
  {
    icon: Wrench,
    title: "Uygulamalı Öğrenme",
    description: "Teoriyi laboratuvar, atölye, proje ve saha deneyimiyle pekiştiren yapı.",
  },
  {
    icon: Building2,
    title: "Sektör Odaklı Eğitim",
    description: "İş yaşamının beklentilerini tanıyan, mesleki disiplin ve üretim kültürü.",
  },
  {
    icon: HeartHandshake,
    title: "Öğrenciye Yakın Rehberlik",
    description: "Alan seçimi, kariyer ve kişisel gelişimde öğrenci-veli-okul iş birliği.",
  },
];

const gallery = [
  { src: "/images/gallery-1.jpg", alt: "Dinamik öğrencileri okul etkinliğinde" },
  { src: "/images/gallery-2.jpg", alt: "Öğrencilerin açık hava etkinliği" },
  { src: "/images/gallery-3.jpg", alt: "Kültürel gezi programına katılan öğrenciler" },
  { src: "/images/gallery-7.jpg", alt: "Dinamik öğrenci topluluğu" },
  { src: "/images/gallery-8.jpg", alt: "Öğrencilerin sosyal etkinlik çalışması" },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="container home-hero__grid">
          <div className="home-hero__content">
            <p className="hero-kicker">
              <span aria-hidden="true" />
              Senin mesleğin, senin geleceğin
            </p>
            <h1 id="home-hero-title">
              Geleceğin teknolojisini <em>bugünden öğren.</em>
            </h1>
            <p className="home-hero__lead">
              Akademik eğitimi gerçek uygulamalarla buluşturan; öğrenciyi mesleğe,
              yükseköğretime ve hayata birlikte hazırlayan güçlü bir lise deneyimi.
            </p>
            <div className="button-row">
              <Link className="button button--primary" href="/bolumler">
                Bölümleri keşfet <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button button--outline" href="/on-kayit">
                Ön kayıt talebi
              </Link>
            </div>
            <dl className="hero-facts" aria-label="Okulun öne çıkan bilgileri">
              <div>
                <dt>4 yıl</dt>
                <dd>Ücretsiz eğitim</dd>
              </div>
              <div>
                <dt>3 alan</dt>
                <dd>Teknoloji programı</dd>
              </div>
              <div>
                <dt>1.400</dt>
                <dd>Öğrenci kapasitesi</dd>
              </div>
            </dl>
          </div>

          <div className="home-hero__visual">
            <div className="home-hero__image">
              <Image
                src="/images/biomedical.jpg"
                alt="Laboratuvar ortamında uygulamalı eğitim alan öğrenciler"
                fill
                priority
                sizes="(max-width: 900px) calc(100vw - 32px), 52vw"
              />
            </div>
            <div className="hero-visual-card hero-visual-card--top">
              <span aria-hidden="true"><Microscope size={23} /></span>
              <strong>Modern laboratuvarlar</strong>
              <small>Uygulama odaklı öğrenme</small>
            </div>
            <div className="hero-visual-card hero-visual-card--bottom">
              <span aria-hidden="true"><ShieldCheck size={23} /></span>
              <strong>Güvenli eğitim kültürü</strong>
              <small>Mesleki disiplin ve sorumluluk</small>
            </div>
          </div>
        </div>
      </section>

      <section className="reason-strip" aria-label="Neden Dinamik?">
        <div className="container reason-strip__grid">
          {reasons.map(({ icon: Icon, title, description }, index) => (
            <article key={title}>
              <span className={index % 2 === 0 ? "icon-box" : "icon-box icon-box--red"}>
                <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--departments">
        <div className="container">
          <SectionHeading
            eyebrow="Bölümlerimiz"
            title="Teknolojiyi mesleğe dönüştüren üç güçlü alan"
            description="Her bölüm; alanına özel laboratuvar, atölye, eğitim süreci ve kariyer yolculuğuyla ayrı bir sayfada sunulur."
            action={
              <Link className="text-link" href="/bolumler">
                Tüm bölümleri incele <ArrowRight size={17} aria-hidden="true" />
              </Link>
            }
          />
          <DepartmentGrid departments={departments} />
        </div>
      </section>

      <section className="section section--identity">
        <div className="container identity-grid">
          <div className="identity-panel">
            <p className="eyebrow eyebrow--on-dark">Okulumuz Hakkında</p>
            <h2>Öğrenmek, üretmek ve birlikte gelişmek için tasarlanmış bir okul.</h2>
            <p>
              Dinamik Mesleki ve Teknik Anadolu Lisesi; akademik gelişimi, mesleki
              uygulamayı ve öğrenci yaşamını tek bir eğitim kültüründe buluşturur.
            </p>
            <ul>
              <li><CheckCircle2 size={18} aria-hidden="true" /> Laboratuvar ve atölyeler</li>
              <li><CheckCircle2 size={18} aria-hidden="true" /> Kütüphane ve okuma alanları</li>
              <li><CheckCircle2 size={18} aria-hidden="true" /> 400 kişilik konferans salonu</li>
              <li><CheckCircle2 size={18} aria-hidden="true" /> Spor, kafeterya ve sosyal alanlar</li>
            </ul>
            <Link className="button button--light" href="/okulumuz-hakkinda">
              Okulumuzu tanıyın <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="identity-media">
            <Image
              src="/images/gallery-4.jpg"
              alt="Dinamik öğrencilerinin sosyal etkinlik programı"
              fill
              sizes="(max-width: 900px) calc(100vw - 32px), 47vw"
            />
            <span className="identity-media__badge">
              <Users size={22} aria-hidden="true" />
              <strong>Öğrenci merkezli</strong>
              <small>Akademik, mesleki ve sosyal gelişim</small>
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container dual-feature-grid">
          <article className="feature-panel">
            <span className="feature-panel__icon"><BookOpenCheck size={28} aria-hidden="true" /></span>
            <p className="eyebrow">Akademik Çalışmalar</p>
            <h2>Güçlü temel, düzenli takip ve proje kültürü.</h2>
            <p>{academicWork[0].description}</p>
            <ul>
              {academicWork.slice(1).map((item) => <li key={item.title}>{item.title}</li>)}
            </ul>
            <Link className="text-link" href="/akademik-calismalar">
              Akademik yaklaşımı incele <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </article>
          <article className="feature-panel feature-panel--red">
            <span className="feature-panel__icon"><Sparkles size={28} aria-hidden="true" /></span>
            <p className="eyebrow">Öğrenci Yaşamı</p>
            <h2>Sınıfın ötesinde gelişen yetenekler ve güçlü ekip ruhu.</h2>
            <p>{studentLife[0].description}</p>
            <ul>
              {studentLife.slice(1).map((item) => <li key={item.title}>{item.title}</li>)}
            </ul>
            <Link className="text-link" href="/sosyal-kulturel-sportif-calismalar">
              Çalışmaları incele <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      <section className="section section--news">
        <div className="container">
          <SectionHeading
            eyebrow="Güncel"
            title="Haberler, projeler ve yayınlar"
            description="Yönetim panelinden yayınlanan içerikler ana sayfa ve ilgili arşivlerde otomatik olarak görünür."
            action={
              <Link className="text-link" href="/haberler">
                Haber arşivi <ArrowRight size={17} aria-hidden="true" />
              </Link>
            }
          />
          <div className="news-grid">
            {managedContentFallback.map((item, index) => (
              <article className={index === 0 ? "news-card news-card--featured" : "news-card"} key={item.slug}>
                <span className="news-card__icon" aria-hidden="true">
                  {item.type === "project" ? <Trophy size={22} /> : item.type === "academic" ? <BookOpenCheck size={22} /> : <Newspaper size={22} />}
                </span>
                <small>{item.type === "project" ? "Proje" : item.type === "academic" ? "Akademik" : "Yayın"}</small>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <a href={item.href} target="_blank" rel="noreferrer">
                  İçeriği görüntüle <ArrowRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--gallery">
        <div className="container">
          <SectionHeading
            eyebrow="Dinamik'te Yaşam"
            title="Okul, birlikte üretilen bir deneyimdir."
            description="Sosyal, kültürel, sportif ve teknik çalışmalarımızdan kareler."
            action={
              <a className="text-link" href={school.instagram} target="_blank" rel="noreferrer">
                Instagram'da takip et <ArrowRight size={17} aria-hidden="true" />
              </a>
            }
          />
          <div className="home-gallery">
            {gallery.map((item, index) => (
              <figure className={`home-gallery__item home-gallery__item--${index + 1}`} key={item.src}>
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 90vw, 30vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cta">
        <div className="container conversion-panel">
          <div>
            <p className="eyebrow eyebrow--on-dark">Ön Kayıt ve İletişim</p>
            <h2>Doğru bölümü birlikte seçelim.</h2>
            <p>
              Ön kayıt talebinizi çevrim içi iletin; kayıt ekibimiz bölüm, kampüs ve
              başvuru süreci hakkında sizinle iletişime geçsin.
            </p>
          </div>
          <div className="conversion-panel__actions">
            <Link className="button button--red" href="/on-kayit">
              Ön kayıt formu <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a className="button button--ghost-light" href="https://wa.me/905467765060" target="_blank" rel="noreferrer">
              <MessageCircle size={17} aria-hidden="true" /> WhatsApp
            </a>
          </div>
          <div className="conversion-panel__contact">
            <MapPin size={20} aria-hidden="true" />
            <span>{school.address}</span>
          </div>
        </div>
      </section>

      <nav className="home-quick-links" aria-label="Hızlı erişim">
        <div className="container">
          <Link href="/kadromuz"><Users size={20} /><span>Kadromuz</span></Link>
          <Link href="/akademik-calismalar"><BookOpenCheck size={20} /><span>Akademik</span></Link>
          <Link href="/basarilar"><Award size={20} /><span>Başarılar</span></Link>
          <Link href="/duyurular"><CalendarDays size={20} /><span>Duyurular</span></Link>
          <Link href="/iletisim"><MapPin size={20} /><span>İletişim</span></Link>
          <a href="https://e-okul.meb.gov.tr/" target="_blank" rel="noreferrer"><FlaskConical size={20} /><span>e-Okul</span></a>
        </div>
      </nav>
    </>
  );
}

