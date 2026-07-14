import { ArrowUpRight, CircuitBoard, FlaskConical, HeartPulse } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Department } from "../data/site-content";

const departmentIcons = {
  "kimya-teknolojileri": FlaskConical,
  "elektrik-elektronik-teknolojileri": CircuitBoard,
  "biyomedikal-cihaz-teknolojileri": HeartPulse,
};

export function DepartmentGrid({ departments }: { departments: Department[] }) {
  return (
    <div className="department-grid">
      {departments.map((department) => {
        const Icon = departmentIcons[department.slug as keyof typeof departmentIcons] ?? FlaskConical;

        return (
          <article className="department-card" key={department.slug}>
            <Link href={`/bolumler/${department.slug}`} aria-label={`${department.title} bölümünü incele`}>
              <span className="department-card__media">
                <Image
                  src={department.image}
                  alt={`${department.title} uygulama ortamı`}
                  fill
                  sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1100px) 48vw, 31vw"
                />
              </span>
              <span className="department-card__body">
                <span className="department-card__icon" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.8} />
                </span>
                <small>{department.branch}</small>
                <strong>{department.title}</strong>
                <span>{department.shortDescription}</span>
                <em>
                  Bölümü incele <ArrowUpRight size={17} aria-hidden="true" />
                </em>
              </span>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

