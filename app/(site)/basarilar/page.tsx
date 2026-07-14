import type { Metadata } from "next";
import { ArrowRight, Award, FlaskConical, GraduationCap, Medal, Rocket, Trophy } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "../../components/PageHeader";
import { SectionHeading } from "../../components/SectionHeading";
import { managedContentFallback } from "../../data/site-content";

export const metadata: Metadata = {
  title: "Başarılar",
  description: "Dinamik Samsun MTAL öğrenci projeleri, akademik, mesleki, kültürel ve sportif başarı arşivi.",
  alternates: { canonical: "/basarilar" },
};

const achievementAreas = [
  { icon: Rocket, title: "Proje ve Yarışmalar", text: "Teknoloji, bilim ve mesleki beceri yarışmalarına hazırlanan öğrenci ekipleri." },
  { icon: GraduationCap, title: "Akademik Gelişim", text: "Düzenli çalışma, rehberlik ve hedef takibiyle ortaya çıkan öğrenci ilerlemesi." },
  { icon: FlaskConical, title: "Mesleki Üretim", text: "Laboratuvar, atölye ve bölüm projelerinde geliştirilen uygulama çıktıları." },
  { icon: Medal, title: "Kültür ve Spor", text: "Takım ruhu, disiplin ve öğrencinin çok yönlü gelişimini görünür kılan çalışmalar." },
];

export default function AchievementsPage() {
  const project = managedContentFallback.find((item) => item.type === "project");
  return (
    <>
      <PageHeader
        eyebrow="Başarılar"
        title="Süreci önemseyen, üretimi görünür kılan okul kültürü."
        description="Akademik, mesleki, kültürel ve sportif başarılar; doğrulanmış bilgi, tarih ve görsellerle yönetim panelinden yayınlanır."
        imageSrc="/images/gallery-1.jpg"
        imagePriority
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Başarı Kültürü"
            title="Her öğrenci için farklı, her emek için görünür"
            description="Başarıyı yalnızca sonuçla değil; hedef koyma, düzenli çalışma, ekip olma ve ortaya değerli bir ürün çıkarma süreciyle birlikte ele alıyoruz."
          />
          <div className="achievement-area-grid">
            {achievementAreas.map(({ icon: Icon, title, text }) => (
              <article key={title}><span><Icon size={26} /></span><h2>{title}</h2><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container achievement-archive">
          <div>
            <p className="eyebrow">Başarı Arşivi</p>
            <h2>Doğrulanmış projeler ve başarı hikâyeleri</h2>
            <p>
              Bu alan; başarı türü, eğitim yılı, bölüm, öğrenci ekibi ve sonuç bilgileriyle
              yönetilebilir. Yeni kayıtlar yayınlandığında bu arşiv otomatik olarak güncellenir.
            </p>
          </div>
          {project ? (
            <article className="achievement-feature">
              <span><Trophy size={25} /></span>
              <small>Öğrenci Projesi</small>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <a href={project.href} target="_blank" rel="noreferrer">Projeyi incele <ArrowRight size={16} /></a>
            </article>
          ) : null}
          <div className="managed-empty-state">
            <Award size={28} aria-hidden="true" />
            <strong>Yeni başarı kayıtları için hazır</strong>
            <p>Yönetim panelinden eklenen doğrulanmış içerikler burada listelenecek.</p>
          </div>
        </div>
      </section>
      <section className="section section--compact">
        <div className="container inline-cta">
          <div><p className="eyebrow eyebrow--on-dark">Bir Başarıyı Paylaşın</p><h2>Projeler ve öğrenci üretimleri için bize ulaşın.</h2></div>
          <Link className="button button--red" href="/iletisim">İletişime geç</Link>
        </div>
      </section>
    </>
  );
}

