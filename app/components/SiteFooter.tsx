import { Camera, Video } from "lucide-react";
import { RouteAwareLink } from "./MobileNavigation";
import { SITE_NAVIGATION, SiteBrand } from "./SiteHeader";

const INSTAGRAM_URL = "https://www.instagram.com/dinamikokullarisamsun";
const YOUTUBE_URL = "https://www.youtube.com/channel/UCmwV6um8k2UhRbSzQEhyM6g";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Toybelen+Mahallesi+Anadolu+Bulvar%C4%B1+No%3A225+%C4%B0lkad%C4%B1m+Samsun";

const exploreNavigation = [
  SITE_NAVIGATION[0],
  SITE_NAVIGATION[2],
  SITE_NAVIGATION[3],
  SITE_NAVIGATION[7],
] as const;

const academicNavigation = [
  SITE_NAVIGATION[1],
  SITE_NAVIGATION[4],
  SITE_NAVIGATION[5],
  SITE_NAVIGATION[6],
] as const;

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <SiteBrand />
          <p>Meslek sahibi, gelecek sahibi.</p>
          <address className="footer-contact">
            <a href="tel:+903624655353">0362 465 53 53</a>
            <a href="tel:+905467765060">0546 776 50 60</a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              Toybelen Mah. Anadolu Bulvarı No:225, İlkadım / Samsun
            </a>
          </address>
        </div>

        <nav className="footer-links" aria-label="Kurumsal bağlantılar">
          <strong>Kurumsal</strong>
          {exploreNavigation.map((item) => (
            <RouteAwareLink key={item.href} item={item} />
          ))}
        </nav>

        <nav className="footer-links" aria-label="Eğitim ve çalışmalar bağlantıları">
          <strong>Eğitim ve Çalışmalar</strong>
          {academicNavigation.map((item) => (
            <RouteAwareLink key={item.href} item={item} />
          ))}
        </nav>

        <div className="footer-social">
          <strong>Bizi Takip Edin</strong>
          <div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dinamik Okulları Samsun Instagram"
            >
              <Camera size={19} aria-hidden="true" />
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dinamik Okulları Samsun YouTube"
            >
              <Video size={19} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {currentYear} Dinamik Mesleki ve Teknik Anadolu Lisesi</span>
        <span>Samsun / Türkiye</span>
      </div>
    </footer>
  );
}
