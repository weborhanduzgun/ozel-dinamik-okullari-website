import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, ExternalLink, Mail, MessageCircle, Phone } from "lucide-react";
import { InnerPageShell } from "../components/SiteChrome";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Dinamik Mesleki ve Teknik Anadolu Lisesi Samsun adres, telefon, e-posta ve çalışma saatleri.",
  alternates: { canonical: "/iletisim" },
};

const mapUrl = "https://www.google.com/maps/search/?api=1&query=Toybelen+Mahallesi+Anadolu+Bulvar%C4%B1+No%3A225+%C4%B0lkad%C4%B1m+Samsun";

export default function ContactPage() {
  return (
    <InnerPageShell>
      <PageHero eyebrow="Bize ulaşın" title="Sorularınızı dinleyelim, geleceğiniz için doğru adımı birlikte atalım." description="Bölümler, kayıt süreci ve kampüs ziyareti hakkında bilgi almak için okulumuza ulaşabilirsiniz." image="/images/about-school-campus.png" current="İletişim" />
      <section className="inner-section inner-section--soft">
        <div className="container contact-detail-grid">
          <div className="contact-detail-list">
            <a className="contact-detail-card" href="tel:+908502182806"><span><Phone size={22} /></span><div><small>Genel iletişim</small><strong>0850 218 28 06</strong></div></a>
            <a className="contact-detail-card" href="tel:+903624655353"><span><Phone size={22} /></span><div><small>Sabit hat</small><strong>0362 465 53 53</strong></div></a>
            <a className="contact-detail-card" href="https://wa.me/905467765060" target="_blank" rel="noreferrer"><span><MessageCircle size={22} /></span><div><small>WhatsApp</small><strong>0546 776 50 60</strong></div></a>
            <a className="contact-detail-card" href="mailto:samsun@dinamikokullari.com"><span><Mail size={22} /></span><div><small>E-posta</small><strong>samsun@dinamikokullari.com</strong></div></a>
            <div className="contact-detail-card"><span><Clock3 size={22} /></span><div><small>Çalışma saatleri</small><strong>Pazartesi - Cumartesi<br />08:30 - 18:00</strong></div></div>
          </div>
          <a className="map-panel" href={mapUrl} target="_blank" rel="noreferrer">
            <Image src="/images/about-school-campus.png" alt="Dinamik Okulları Samsun kampüsü" fill sizes="(max-width: 900px) calc(100vw - 48px), 55vw" />
            <span className="map-panel-content"><h2>Kampüsü yerinde keşfedin.</h2><p>Toybelen Mahallesi Anadolu Bulvarı No:225<br />İlkadım / Samsun</p><span className="button button--primary">Haritada aç <ExternalLink size={15} /></span></span>
          </a>
        </div>
      </section>
      <section className="inner-section"><div className="container cta-panel"><div><h2>Kampüs ziyareti planlayın.</h2><p>Atölyeleri, laboratuvarları ve eğitim ortamını yakından görmek için ön kayıt talebinizi iletin.</p></div><div className="cta-panel-actions"><Link className="button button--primary" href="/on-kayit">Ön kayıt talebi <ArrowRight size={16} /></Link></div></div></section>
    </InnerPageShell>
  );
}
