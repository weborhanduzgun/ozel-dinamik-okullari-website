import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, Gauge, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { InnerPageShell } from "../../components/SiteChrome";
import { PageHero } from "../../components/PageHero";
import { getDepartment, getDepartments } from "../../data/departments";

type DepartmentPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const departments = await getDepartments();
  return departments.map((department) => ({ slug: department.slug }));
}

export async function generateMetadata({ params }: DepartmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const department = await getDepartment(slug);
  if (!department) return {};
  return {
    title: department.title,
    description: `${department.title} - ${department.branch}. Programın uygulama alanlarını ve kazandırdığı yetkinlikleri keşfedin.`,
    alternates: { canonical: `/bolumler/${department.slug}` },
  };
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { slug } = await params;
  const department = await getDepartment(slug);
  if (!department) notFound();

  return (
    <InnerPageShell>
      <PageHero eyebrow={department.branch} title={department.title} description={department.lead} image={department.image} current={department.shortTitle} />

      <div className="metric-band">
        <div className="container metric-band-grid">
          {department.facts.map((fact, index) => {
            const icons = [Compass, Gauge, ShieldCheck];
            const Icon = icons[index];
            return <div className="metric-band-item" key={fact.label}><span className="metric-band-icon"><Icon size={21} /></span><span><small>{fact.label}</small><strong>{fact.value}</strong></span></div>;
          })}
        </div>
      </div>

      <section className="inner-section">
        <div className="container editorial-grid">
          <div className="editorial-visual">
            <div className="image-frame"><Image src={department.image} alt={`${department.title} uygulamalı eğitim ortamı`} fill sizes="(max-width: 900px) calc(100vw - 48px), 46vw" /></div>
            <span className="image-frame-accent" aria-hidden="true" />
          </div>
          <div className="editorial-copy">
            <p className="inner-eyebrow">Programın amacı</p>
            <h2>Teknik bilgiyi güvenli, dikkatli ve üretken bir çalışma kültürüne dönüştür.</h2>
            <p>{department.purpose}</p>
            <ul className="check-list-grid">
              {department.skills.map((skill) => <li key={skill}><CheckCircle2 size={17} aria-hidden="true" />{skill}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="inner-section inner-section--soft" aria-labelledby="learning-title">
        <div className="container">
          <div className="inner-section-header"><div><p className="inner-eyebrow">Ne öğreneceksin?</p><h2 id="learning-title">Uygulama içinde gelişen teknik yetkinlikler.</h2></div><p>Program yalnızca ekipman kullanımını değil; planlama, güvenlik, ölçüm, yorumlama ve ekip çalışmasını da geliştirir.</p></div>
          <div className="detail-skill-grid">
            {department.learningAreas.map((area, index) => {
              const icons = [Gauge, ShieldCheck, Compass]; const Icon = icons[index];
              return <article className="detail-skill-card" key={area.title}><span><Icon size={23} /></span><h3>{area.title}</h3><p>{area.text}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="inner-section inner-section--navy">
        <div className="container editorial-grid editorial-grid--reverse">
          <div className="editorial-visual"><div className="image-frame image-frame--landscape"><Image src="/images/about-school-campus.png" alt="Dinamik Okulları kampüsü" fill sizes="(max-width: 900px) calc(100vw - 48px), 46vw" /></div></div>
          <div className="editorial-copy editorial-copy--light">
            <p className="inner-eyebrow inner-eyebrow--light">Kariyer rotası</p>
            <h2>Meslek, yükseköğretim ve teknoloji dünyasına açık bir başlangıç.</h2>
            <p>Kazandığın teknik altyapıyı ilgili sektörlerde, teknik hizmet birimlerinde veya yükseköğretimin ilgili programlarında geliştirebilirsin.</p>
            <div className="career-cloud">{department.careerAreas.map((area) => <span key={area}>{area}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="inner-section">
        <div className="container cta-panel">
          <div><h2>{department.shortTitle} programını yerinde keşfet.</h2><p>Atölyeleri görmek, programla ilgili sorularını sormak ve kayıt sürecini öğrenmek için okulumuza ulaş.</p></div>
          <div className="cta-panel-actions"><Link className="button button--primary" href="/on-kayit">Ön kayıt <ArrowRight size={16} /></Link><Link className="button button--outline-light" href="/bolumler">Diğer bölümler</Link></div>
        </div>
      </section>
    </InnerPageShell>
  );
}
