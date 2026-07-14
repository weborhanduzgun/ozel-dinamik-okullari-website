import { ArrowRight } from "lucide-react";
import Link from "next/link";

export type InfoCardItem = {
  title: string;
  description: string;
  href?: string;
  eyebrow?: string;
};

export function InfoGrid({ items, className = "" }: { items: InfoCardItem[]; className?: string }) {
  return (
    <div className={`info-grid ${className}`.trim()}>
      {items.map((item, index) => {
        const body = (
          <>
            <span className="info-card__number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item.eyebrow ? <small>{item.eyebrow}</small> : null}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.href ? (
              <span className="info-card__link">
                İncele <ArrowRight size={16} aria-hidden="true" />
              </span>
            ) : null}
          </>
        );

        return item.href ? (
          <Link className="info-card info-card--link" href={item.href} key={item.title}>
            {body}
          </Link>
        ) : (
          <article className="info-card" key={item.title}>
            {body}
          </article>
        );
      })}
    </div>
  );
}

