import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { after, before, test } from "node:test";

const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const nextBin = createRequire(import.meta.url).resolve("next/dist/bin/next");

let serverProcess;

async function waitForServer(timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) return;
    } catch {
      // Server not ready yet — keep polling.
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(`Server did not become ready on ${BASE_URL} within ${timeoutMs}ms`);
}

before(async () => {
  // Spawn the `next` binary directly (no shell/npx wrapper) so `.kill()` in
  // the `after` hook terminates the real process instead of an orphaned child.
  serverProcess = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
    cwd: new URL("..", import.meta.url),
    stdio: "pipe",
  });
  await waitForServer(30000);
});

after(() => {
  serverProcess?.kill();
});

async function render() {
  return fetch(BASE_URL);
}

async function readRoute(route) {
  const response = await fetch(`${BASE_URL}${route}`);
  assert.equal(response.status, 200, `${route} should respond with 200`);
  return response.text();
}

test("renders the completed Turkish school homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]+lang="tr"/i);
  assert.match(html, /<title>Dinamik Mesleki ve Teknik Anadolu Lisesi \| Samsun<\/title>/i);
  assert.match(html, /Geleceğin.*Teknolojisini.*Bugünden Öğren/s);
  assert.match(html, /Kimya Teknolojileri/);
  assert.match(html, /Elektrik-Elektronik Teknolojileri/);
  assert.match(html, /Biyomedikal Cihaz Teknolojileri/);
  assert.match(html, /Ön Kayıt Talebi/);
  assert.match(html, /Toybelen Mahallesi Anadolu Bulvarı No:225/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps essential navigation and accessibility contracts", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /href="#main-content"[^>]*>\s*İçeriğe geç/i);
  assert.match(html, /<main id="main-content">/i);
  assert.match(html, /aria-label="Ana navigasyon"/i);
  assert.match(html, /href="\/bolumler"[^>]*>\s*Bölümler/i);
  assert.match(html, /Bölümler[\s\S]*Kimya[\s\S]*Elektrik - Elektronik[\s\S]*Biyomedikal/i);
  assert.match(html, /href="\/okulumuz"[^>]*>\s*Okulumuz/i);
  assert.match(html, /Okulumuz[\s\S]*Hakkımızda[\s\S]*Okul Kıyafetlerimiz[\s\S]*Rehberlik/i);
  assert.match(
    html,
    /Galeri[\s\S]*Sosyal, Kültürel ve Sportif Çalışmalar/i,
  );
  assert.match(html, /href="\/galeri"[^>]*>\s*Galeri/i);
  assert.match(html, /href="\/kadromuz"/i);
  assert.match(html, /href="\/basarilarimiz"/i);
  assert.match(html, /aria-label="Hızlı erişim"/i);
  assert.match(html, /aria-label="WhatsApp üzerinden iletişime geçin"/i);
  assert.match(html, /href="tel:\+908502182806"/i);
  assert.match(html, /href="tel:\+903624655353"/i);
  assert.match(html, /aria-expanded="false"/i);
  assert.doesNotMatch(html, /href="\/haberler"|>\s*Yayınlar\s*</i, "Yayınlar/Haberler was intentionally removed");
});

test("exports every primary frontend route with working internal navigation", async () => {
  const routes = [
    "/hakkimizda",
    "/okulumuz",
    "/bolumler",
    "/bolumler/kimya-teknolojileri",
    "/bolumler/elektrik-elektronik-teknolojileri",
    "/bolumler/biyomedikal-cihaz-teknolojileri",
    "/kadromuz",
    "/okul-kiyafetlerimiz",
    "/faaliyetlerimiz",
    "/galeri",
    "/basarilarimiz",
    "/rehberlik",
    "/iletisim",
    "/on-kayit",
    "/kvkk",
  ];

  for (const route of routes) {
    const html = await readRoute(route);
    assert.match(html, /<main id="main-content">|<main id="about-content">/i, `${route} needs a main landmark`);
    assert.match(html, /aria-label="Ana navigasyon"/i, `${route} needs shared navigation`);
    assert.match(html, /Dinamik Okulları/i, `${route} needs the school brand`);
  }
});

test("publishes a clear KVKK notice and separates optional WhatsApp preference", async () => {
  const [kvkkHtml, registrationHtml] = await Promise.all([
    readRoute("/kvkk"),
    readRoute("/on-kayit"),
  ]);

  assert.match(kvkkHtml, /Ön kayıt aydınlatma metni/i);
  assert.match(kvkkHtml, /Veri sorumlusu/i);
  assert.match(kvkkHtml, /KVKK Madde 11/i);
  assert.match(kvkkHtml, /Veri güvenliği/i);
  assert.match(registrationHtml, /name="privacyNoticeAcknowledged"/i);
  assert.match(registrationHtml, /name="whatsappConsent"/i);
  assert.match(registrationHtml, /İsteğe bağlı/i);
  assert.match(registrationHtml, /href="\/kvkk#aydinlatma"/i);
});

test("redirects unauthenticated admin requests to the login page", async () => {
  const response = await fetch(`${BASE_URL}/admin`, { redirect: "manual" });
  assert.ok([307, 308, 302].includes(response.status), "unauthenticated /admin should redirect");
  const location = response.headers.get("location") ?? "";
  assert.match(location, /\/admin\/login$/);
});

test("publishes only the three active branches from the provided program reference", async () => {
  const pages = await Promise.all([
    readRoute("/bolumler"),
    readRoute("/bolumler/kimya-teknolojileri"),
    readRoute("/bolumler/elektrik-elektronik-teknolojileri"),
    readRoute("/bolumler/biyomedikal-cihaz-teknolojileri"),
  ]);
  const html = pages.join("\n");

  assert.match(html, /Kimya Laboratuvarı Dalı/i);
  assert.match(html, /Elektrik Tesisatları ve Dağıtımı Dalı/i);
  assert.match(html, /Tıbbi Görüntüleme Sistemleri Dalı/i);
  assert.doesNotMatch(html, /Petrol Endüstrisi|Asansör Sistemleri|Yaşam Destek ve Tedavi Cihazları/i);
});

test("renders the cinematic homepage composition while preserving the brand logos", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /src="\/images\/dinamik-logo-retina\.png"/i);
  assert.match(html, /src="\/images\/footer-logo-dinamik\.png"/i);
  assert.match(html, /class="hero"/i);
  assert.doesNotMatch(html, /class="stats-section"/i);
  assert.match(html, /class="departments-footer-link"/i);
  assert.match(html, /class="hero-rail"/i);
  assert.equal((html.match(/class="hero-tile(?: hero-tile--large)?"/gi) ?? []).length, 3);
});

test("removes disposable starter preview code and dependency", async () => {
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await assert.rejects(access(new URL("../app/_sites-preview/preview.css", import.meta.url)));
});

test("keeps in-page links valid and document IDs unique", async () => {
  const response = await render();
  const html = await response.text();
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const hashTargets = [...html.matchAll(/\shref="#([^"]+)"/g)].map((match) => match[1]);

  assert.equal(new Set(ids).size, ids.length, "Rendered HTML contains duplicate IDs");

  for (const target of hashTargets) {
    assert.ok(ids.includes(target), `Missing target for in-page link: #${target}`);
  }
});
