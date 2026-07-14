import type { Metadata } from "next";
import { BookOpenCheck, GraduationCap, Users } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { SectionHeading } from "../../components/SectionHeading";
import { staffPreview } from "../../data/site-content";

export const metadata: Metadata = {
  title: "Kadromuz",
  description: "Dinamik Samsun MTAL rehberlik, meslek ve akademik dersler öğretmen kadrosu.",
  alternates: { canonical: "/kadromuz" },
};

const groups = Array.from(new Set(staffPreview.map((member) => member.department)));

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("");
}

export default function StaffPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kadromuz"
        title="Öğrencinin gelişimine birlikte yön veren ekip."
        description="Alanında deneyimli öğretmenler, rehberlik ekibi ve güçlü bir okul kültürü. Kadro kayıtları yönetim panelinden güncel tutulur."
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Eğitim Ekibimiz"
            title="Akademik, mesleki ve kişisel gelişimde öğrenciyle yan yana"
            description="Aşağıdaki kadro bilgileri okulun mevcut resmî yayını esas alınarak hazırlanmıştır ve yönetim paneli üzerinden güncellenebilir."
          />
          <div className="staff-summary">
            <span><Users size={23} /><strong>Rehberlik</strong><small>Öğrenci ve veli iş birliği</small></span>
            <span><GraduationCap size={23} /><strong>Meslek Dersleri</strong><small>Alan ve atölye yetkinliği</small></span>
            <span><BookOpenCheck size={23} /><strong>Akademik Dersler</strong><small>Güçlü yükseköğretim temeli</small></span>
          </div>
          {groups.map((group) => (
            <section className="staff-group" key={group} aria-labelledby={`staff-${group.toLocaleLowerCase("tr-TR").replaceAll(" ", "-")}`}>
              <h2 id={`staff-${group.toLocaleLowerCase("tr-TR").replaceAll(" ", "-")}`}>{group}</h2>
              <div className="staff-grid">
                {staffPreview.filter((member) => member.department === group).map((member) => (
                  <article className="staff-card" key={member.name}>
                    <span className="staff-card__avatar" aria-hidden="true">{initials(member.name)}</span>
                    <div><h3>{member.name}</h3><p>{member.title}</p></div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

