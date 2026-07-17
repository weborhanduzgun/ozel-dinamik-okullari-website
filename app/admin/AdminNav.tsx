"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/bolumler", label: "Bölümler" },
  { href: "/admin/kadromuz", label: "Kadromuz" },
  { href: "/admin/galeri", label: "Galeri" },
  { href: "/admin/ayarlar", label: "Site Ayarları" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav">
      {NAV_ITEMS.map((item) => {
        const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={`admin-nav-link${isActive ? " is-active" : ""}`}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
