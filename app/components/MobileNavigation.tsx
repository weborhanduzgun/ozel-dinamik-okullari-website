"use client";

import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export type NavigationItem = {
  label: string;
  href: string;
};

type RouteAwareLinkProps = {
  item: NavigationItem;
  className?: string;
};

type MobileNavigationProps = {
  navigation: readonly NavigationItem[];
  ctaHref?: string;
  ctaLabel?: string;
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function isCurrentRoute(pathname: string, href: string): boolean {
  if (!href.startsWith("/")) return false;

  const route = href.split(/[?#]/, 1)[0] || "/";
  if (route === "/") return pathname === "/";

  return pathname === route || pathname.startsWith(`${route}/`);
}

export function RouteAwareLink({ item, className }: RouteAwareLinkProps) {
  const pathname = usePathname();
  const isCurrent = isCurrentRoute(pathname, item.href);

  return (
    <Link
      className={[className, isCurrent ? "is-current" : null].filter(Boolean).join(" ") || undefined}
      href={item.href}
      aria-current={isCurrent ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

export function DesktopNavigation({ navigation }: { navigation: readonly NavigationItem[] }) {
  return (
    <nav className="desktop-nav" aria-label="Ana navigasyon">
      {navigation.map((item) => (
        <RouteAwareLink key={item.href} item={item} />
      ))}
    </nav>
  );
}

export function MobileNavigation({
  navigation,
  ctaHref = "/on-kayit",
  ctaLabel = "Ön Kayıt Talebi",
}: MobileNavigationProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    const closeAfterNavigationFrame = window.requestAnimationFrame(() => {
      setIsOpen(false);
    });

    return () => window.cancelAnimationFrame(closeAfterNavigationFrame);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusFirstLinkFrame = window.requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab" || !rootRef.current) return;

      const focusableElements = Array.from(
        rootRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeMenu(false);
      }
    };

    const handleViewportChange = () => {
      if (rootRef.current && window.getComputedStyle(rootRef.current).display === "none") {
        closeMenu(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleOutsidePointerDown);
    window.addEventListener("resize", handleViewportChange, { passive: true });

    return () => {
      window.cancelAnimationFrame(focusFirstLinkFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
      window.removeEventListener("resize", handleViewportChange);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [closeMenu, isOpen]);

  return (
    <div ref={rootRef} className={`mobile-menu${isOpen ? " is-open" : ""}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        onClick={() => (isOpen ? closeMenu(false) : setIsOpen(true))}
      >
        {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
      </button>

      <nav ref={panelRef} id={menuId} aria-label="Mobil navigasyon" hidden={!isOpen}>
        {navigation.map((item) => {
          const isCurrent = isCurrentRoute(pathname, item.href);

          return (
            <Link
              key={item.href}
              className={isCurrent ? "is-current" : undefined}
              href={item.href}
              aria-current={isCurrent ? "page" : undefined}
              onClick={() => closeMenu(false)}
            >
              {item.label}
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          );
        })}

        <Link className="mobile-menu-cta" href={ctaHref} onClick={() => closeMenu(false)}>
          {ctaLabel}
        </Link>
      </nav>
    </div>
  );
}
