"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";

const WHATSAPP_NUMBER = "905467765060";

export function RegistrationForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) {
      setStatus("error");
      return;
    }

    const data = new FormData(form);
    if (String(data.get("website") ?? "").trim()) return;

    const studentName = String(data.get("studentName") ?? "").trim();
    const parentName = String(data.get("parentName") ?? "").trim();
    const grade = String(data.get("grade") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const department = String(data.get("department") ?? "Kararsızım").trim();

    const message = [
      "Merhaba, Dinamik Okulları hakkında ön kayıt bilgisi almak istiyorum.",
      `Öğrenci: ${studentName}`,
      `Veli: ${parentName}`,
      `Sınıf: ${grade}`,
      `İlgilenilen alan: ${department}`,
      `Telefon: ${phone}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (!whatsappWindow) {
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  return (
    <form className="registration-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row form-row--two">
        <label>
          <span>Öğrencinin adı soyadı</span>
          <input name="studentName" autoComplete="name" required maxLength={80} />
        </label>
        <label>
          <span>Velinin adı soyadı</span>
          <input name="parentName" autoComplete="name" required maxLength={80} />
        </label>
      </div>

      <div className="form-row form-row--two">
        <label>
          <span>Mevcut sınıf</span>
          <select name="grade" required defaultValue="">
            <option value="" disabled>Seçiniz</option>
            <option>8. Sınıf</option>
            <option>9. Sınıf</option>
            <option>10. Sınıf</option>
            <option>11. Sınıf</option>
          </select>
        </label>
        <label>
          <span>Telefon</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            minLength={10}
            maxLength={20}
            pattern="[0-9+() -]{10,20}"
            placeholder="05xx xxx xx xx"
          />
        </label>
      </div>

      <label>
        <span>İlgilenilen alan</span>
        <select name="department" defaultValue="Kararsızım">
          <option>Kararsızım</option>
          <option>Kimya Teknolojileri</option>
          <option>Elektrik-Elektronik Teknolojileri</option>
          <option>Biyomedikal Cihaz Teknolojileri</option>
        </select>
      </label>

      <label className="honeypot" aria-hidden="true">
        <span>Web sitesi</span>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="consent-field">
        <input name="consent" type="checkbox" required />
        <span>
          Bilgilerimin kayıt talebime dönüş yapılması amacıyla okulun resmî WhatsApp
          hattına aktarılmasını kabul ediyorum.
        </span>
      </label>

      <div className="form-footer">
        <p>
          Bu site form verilerini saklamaz. Gönderim, onayınızla WhatsApp üzerinden
          tamamlanır.
        </p>
        <button className="button button--primary" type="submit">
          WhatsApp ile Talep Gönder
          <ArrowRight size={17} aria-hidden="true" />
        </button>
      </div>

      <p className={`form-status form-status--${status}`} aria-live="polite">
        {status === "success" ? (
          <><CheckCircle2 size={17} aria-hidden="true" /> WhatsApp açıldı. Mesajı kontrol edip gönderin.</>
        ) : null}
        {status === "error" ? "Lütfen zorunlu alanları kontrol edin veya açılır pencereye izin verin." : null}
      </p>
    </form>
  );
}
