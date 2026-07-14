import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  breadcrumbs?: readonly BreadcrumbItem[];
  imageSrc?: string;
  imagePriority?: boolean;
  headingId?: string;
  className?: string;
};

export function PageHeader({
  title,
  eyebrow,
  description,
  breadcrumbs,
  imageSrc,
  imagePriority = false,
  headingId = "page-title",
  className,
}: PageHeaderProps) {
  const resolvedBreadcrumbs = breadcrumbs ?? [
    { label: "Anasayfa", href: "/" },
    { label: title },
  ];

  return (
    <section
      className={[
        "page-header",
        imageSrc ? "page-header--with-media" : null,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={headingId}
    >
      {imageSrc ? (
        <div className="page-header__media" aria-hidden="true">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority={imagePriority}
            sizes="100vw"
          />
        </div>
      ) : null}
      <div className="page-header__overlay" aria-hidden="true" />

      <div className="container page-header__inner">
        <nav className="page-header__breadcrumbs" aria-label="Sayfa yolu">
          <ol>
            {resolvedBreadcrumbs.map((item, index) => {
              const isLast = index === resolvedBreadcrumbs.length - 1;

              return (
                <li key={`${item.label}-${item.href ?? "current"}`}>
                  {item.href && !isLast ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
                  )}
                  {!isLast ? <ChevronRight size={14} aria-hidden="true" /> : null}
                </li>
              );
            })}
          </ol>
        </nav>

        {eyebrow ? <p className="page-header__eyebrow">{eyebrow}</p> : null}
        <h1 className="page-header__title" id={headingId}>
          {title}
        </h1>
        {description ? <p className="page-header__description">{description}</p> : null}
      </div>
    </section>
  );
}
