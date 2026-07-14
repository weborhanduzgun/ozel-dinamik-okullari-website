"use client";

import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

type NavigationItem = {
  label: string;
  href: string;
};

export function MobileNavigation({ navigation }: { navigation: NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className={`mobile-menu${isOpen ? " is-open" : ""}`}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
      </button>
      <nav id={menuId} aria-label="Mobil navigasyon" hidden={!isOpen}>
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
            {item.label}
            <ChevronRight size={16} aria-hidden="true" />
          </a>
        ))}
        <a className="mobile-menu-cta" href="#on-kayit" onClick={() => setIsOpen(false)}>
          Ön Kayıt Talebi
        </a>
      </nav>
    </div>
  );
}
