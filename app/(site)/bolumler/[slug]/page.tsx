import type { Metadata } from "next";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, GraduationCap, Microscope, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "../../../components/PageHeader";
import { SectionHeading } from "../../../components/SectionHeading";
import { departments } from "../../../data/site-content";

type DepartmentPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return departments.map((department) => ({ slug: department.slug }));
}

export async function generateMetadata({ params }: DepartmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const department = departments.find((item) => item.slug === slug);
  if (!department) return {};

  return {
    title: department.title,
    description: department.shortDescription,
    alternates: { canonical: `/bolumler/${department.slug}` },
  };
}

export default async function DepartmentDetailPage({ params }: DepartmentPageProps) {
  const { slug } = await params;
  const department = departments.find((item) => item.slug === slug);
  if (!department) notFound();

  return (
    <>
      <PageHeader
        eyebrow={department.branch}
        title={department.title}
        description={department.shortDescription}
        imageSrc={department.image}
        imagePriority
        breadcrumbs={[
          { label: "Anasayfa", href: "/" },
          { label: "Bölümler", href: "/bolumler" },
          { label: department.title },
        ]}
      />
      <section className="section">
        <div className="container department-overview">
          <div>
            <p className="eyebrow">Alan Tanıtımı</p>
            <h2>Bilgiyi uygulamaya, uygulamayı yetkinliğe dönüştüren eğitim.</h2>
            <p>{department.overview}</p>
            <Link className="button button--primary" href="/on-kayit">
              Bölüm hakkında bilgi al <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="department-overview__image">
            <Image
              src={department.image}
              alt={`${department.title} laboratuvar ve uygulama çalışması`}
              fill
              sizes="(max-width: 800px) calc(100vw - 32px), 45vw"
            />
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Eğitim Süreci"
            title="Öğrenciler hangi yeterlikleri kazanır?"
            description="Program; temel akademik dersleri, alan derslerini ve uygulama çalışmalarını dengeli biçimde bir araya getirir."
          />
          <div className="detail-feature-grid">
            <article>
              <span><Microscope size={25} /></span>
              <h3>Öğrenme Alanları</h3>
              <ul>{department.learningAreas.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul>
            </article>
            <article>
              <span><Wrench size={25} /></span>
              <h3>Laboratuvar ve Atölyeler</h3>
              <ul>{department.facilities.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul>
            </article>
            <article>
              <span><BriefcaseBusiness size={25} /></span>
              <h3>Kariyer Alanları</h3>
              <ul>{department.careerAreas.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul>
            </article>
            <article>
              <span><GraduationCap size={25} /></span>
              <h3>Yükseköğretim Seçenekleri</h3>
              <ul>{department.higherEducation.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul>
            </article>
          </div>
        </div>
      </section>
      <section className="section section--compact">
        <div className="container inline-cta">
          <div>
            <p className="eyebrow eyebrow--on-dark">Bölüme Özel Görüşme</p>
            <h2>{department.title} alanını yakından tanıyın.</h2>
          </div>
          <Link className="button button--red" href={`/on-kayit?bolum=${department.slug}`}>
            Ön kayıt talebi <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

