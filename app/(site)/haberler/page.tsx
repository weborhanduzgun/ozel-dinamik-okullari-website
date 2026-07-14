import type { Metadata } from "next";
import { ArrowRight, BookOpenCheck, Newspaper, Trophy } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { managedContentFallback } from "../../data/site-content";

export const metadata: Metadata = {
  title: "Haberler ve Yayınlar",
  description: "Dinamik Samsun MTAL haber, proje, yayın ve akademik içerik arşivi.",
  alternates: { canonical: "/haberler" },
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Güncel"
        title="Haberler, projeler ve yayınlar"
        description="Okul yaşamından güncel içerikler, öğrenci projeleri, dergiler ve rehberlik yayınları."
      />
      <section className="section">
        <div className="container content-archive-grid">
          {managedContentFallback.map((item) => (
            <article className="archive-card" key={item.slug}>
              <span className="archive-card__icon">
                {item.type === "project" ? <Trophy size={23} /> : item.type === "academic" ? <BookOpenCheck size={23} /> : <Newspaper size={23} />}
              </span>
              <small>{item.type === "project" ? "Proje" : item.type === "academic" ? "Akademik" : "Yayın"}</small>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
              <a href={item.href} target="_blank" rel="noreferrer">İçeriği görüntüle <ArrowRight size={16} /></a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

