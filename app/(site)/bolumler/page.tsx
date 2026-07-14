import type { Metadata } from "next";
import { ArrowRight, BriefcaseBusiness, GraduationCap, Microscope, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { DepartmentGrid } from "../../components/DepartmentGrid";
import { InfoGrid } from "../../components/InfoGrid";
import { PageHeader } from "../../components/PageHeader";
import { SectionHeading } from "../../components/SectionHeading";
import { departments } from "../../data/site-content";

export const metadata: Metadata = {
  title: "Bölümler",
  description: "Kimya, Elektrik-Elektronik ve Biyomedikal Cihaz Teknolojileri alanlarını keşfedin.",
  alternates: { canonical: "/bolumler" },
};

const educationPrinciples = [
  {
    title: "Uygulama Odaklı Eğitim",
    description: "Ders kazanımları, alanına özel laboratuvar ve atölye uygulamalarıyla pekişir.",
  },
  {
    title: "Güvenli Çalışma Kültürü",
    description: "İş sağlığı, güvenlik, meslek etiği ve çevre bilinci her programın temelidir.",
  },
  {
    title: "Kariyer ve Yükseköğretim",
    description: "Öğrenciler hem sektör olanaklarını hem de ilgili ön lisans ve lisans yollarını tanır.",
  },
  {
    title: "Proje ve Ekip Çalışması",
    description: "Problem çözme, dokümantasyon, sunum ve iş birliği gerçek projelerle gelişir.",
  },
];

export default function DepartmentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bölümlerimiz"
        title="Yeteneğini teknolojiyle buluştur."
        description="Üç mesleki alan, üç farklı gelecek rotası. Her bölümün eğitim sürecini, laboratuvarlarını, kariyer ve yükseköğretim olanaklarını ayrıntılı inceleyin."
        imageSrc="/images/electronics.jpg"
        imagePriority
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Alan Seçimi"
            title="İlgi ve hedeflerinize uygun bölümü keşfedin"
            description="Bölüm seçimi yalnızca bir ders programı değil; öğrencinin yetenekleri, çalışma biçimi ve gelecek hedefleriyle birlikte değerlendirilmesi gereken bir yolculuktur."
          />
          <DepartmentGrid departments={departments} />
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Ortak Eğitim Yaklaşımı"
            title="Her bölümde aynı güçlü standart"
            description="Programlar farklılaşsa da öğrenci gelişimini taşıyan temel yaklaşım ortaktır."
          />
          <InfoGrid items={educationPrinciples} />
          <div className="icon-summary-row">
            <span><Microscope size={22} /> Laboratuvar ve atölye</span>
            <span><ShieldCheck size={22} /> Güvenli çalışma</span>
            <span><BriefcaseBusiness size={22} /> Kariyer farkındalığı</span>
            <span><GraduationCap size={22} /> Yükseköğretim planı</span>
          </div>
        </div>
      </section>
      <section className="section section--compact">
        <div className="container inline-cta">
          <div>
            <p className="eyebrow eyebrow--on-dark">Karar Verirken Yanınızdayız</p>
            <h2>Bölümleri kampüste yakından tanıyın.</h2>
          </div>
          <Link className="button button--red" href="/on-kayit">
            Görüşme talebi oluştur <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

