"use client";

import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import type { NavigationItem } from "./navigation";

export function MobileNavigation({ navigation }: { navigation: NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const menuId = useId();

  const closeMenu = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
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
        {navigation.map((item, index) => {
          if (!item.children?.length) {
            return (
              <a key={item.label} href={item.href} onClick={closeMenu}>
                {item.label}
                <ChevronRight size={16} aria-hidden="true" />
              </a>
            );
          }

          const submenuId = `${menuId}-submenu-${index}`;
          const isSubmenuOpen = openSubmenu === item.label;

          return (
            <div className="mobile-navigation-group" key={item.label}>
              <button
                className="mobile-submenu-trigger"
                type="button"
                aria-expanded={isSubmenuOpen}
                aria-controls={submenuId}
                onClick={() => setOpenSubmenu(isSubmenuOpen ? null : item.label)}
              >
                {item.label}
                <ChevronDown size={16} aria-hidden="true" />
              </button>
              <div className="mobile-submenu" id={submenuId} hidden={!isSubmenuOpen}>
                {item.children.map((child) => (
                  <a key={child.href} href={child.href} onClick={closeMenu}>
                    {child.label}
                    <ChevronRight size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
        <a className="mobile-menu-cta" href="#on-kayit" onClick={closeMenu}>
          Ön Kayıt Talebi
        </a>
      </nav>
    </div>
  );
}
