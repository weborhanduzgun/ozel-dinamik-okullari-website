import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DesktopNavigation,
  MobileNavigation,
  type NavigationItem,
} from "./MobileNavigation";

export const SITE_NAVIGATION = [
  { label: "Anasayfa", href: "/" },
  { label: "Bölümler", href: "/bolumler" },
  { label: "Okulumuz Hakkında", href: "/okulumuz-hakkinda" },
  { label: "Kadromuz", href: "/kadromuz" },
  { label: "Akademik Çalışmalar", href: "/akademik-calismalar" },
  {
    label: "Sosyal-Kültürel-Sportif Çalışmalar",
    href: "/sosyal-kulturel-sportif-calismalar",
  },
  { label: "Başarılar", href: "/basarilar" },
  { label: "İletişim", href: "/iletisim" },
] as const satisfies readonly NavigationItem[];

type SiteBrandProps = {
  className?: string;
};

type SiteHeaderProps = {
  className?: string;
};

export function SiteBrand({ className }: SiteBrandProps) {
  return (
    <Link
      className={["brand", className].filter(Boolean).join(" ")}
      href="/"
      aria-label="Dinamik Okulları anasayfa"
    >
      <span className="brand-mark" aria-hidden="true">
        <Image src="/images/logo.png" alt="" width={170} height={77} sizes="88px" />
      </span>
      <span className="brand-copy" aria-hidden="true">
        <strong>DİNAMİK</strong>
        <small>MESLEKİ VE TEKNİK ANADOLU LİSESİ</small>
      </span>
    </Link>
  );
}

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        İçeriğe geç
      </a>

      <header className={["site-header", className].filter(Boolean).join(" ")}>
        <div className="container header-inner">
          <SiteBrand />

          <DesktopNavigation navigation={SITE_NAVIGATION} />

          <div className="header-actions">
            <Link className="button button--header" href="/on-kayit">
              Ön Kayıt
            </Link>
            <a
              className="button button--ghost-dark"
              href="https://e-okul.meb.gov.tr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              e-Okul
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>

          <MobileNavigation navigation={SITE_NAVIGATION} />
        </div>
      </header>
    </>
  );
}
