import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

  return new Response(html, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

test("renders the completed Turkish school homepage in the static export", async () => {
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
  assert.match(html, /Toybelen Mah\. Anadolu Bulvarı No:225/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps essential navigation and accessibility contracts", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /href="#main-content"[^>]*>\s*İçeriğe geç/i);
  assert.match(html, /<main id="main-content">/i);
  assert.match(html, /aria-label="Ana navigasyon"/i);
  assert.match(html, /Bölümler[\s\S]*Kimya[\s\S]*Elektrik - Elektronik[\s\S]*Biyomedikal/i);
  assert.match(html, /Okulumuz[\s\S]*Okulumuz Hakkında[\s\S]*Okul Kıyafetlerimiz/i);
  assert.match(
    html,
    /Galeri[\s\S]*Sosyal - Kültürel - Sportif Çalışmalar[\s\S]*Dinamik Okul Bölümlerimiz/i,
  );
  assert.match(html, /href="#bolumler"[^>]*>\s*Dinamik Okul Bölümlerimiz/i);
  assert.match(html, /href="https:\/\/samsun\.dinamikokullari\.com\/kadromuz"/i);
  assert.match(html, /href="https:\/\/samsun\.dinamikokullari\.com\/basarilarimiz"/i);
  assert.match(html, /aria-label="Hızlı erişim"/i);
  assert.match(html, /aria-label="WhatsApp üzerinden iletişime geçin"/i);
  assert.match(html, /href="tel:\+908502182806"/i);
  assert.match(html, /href="tel:\+903624655353"/i);
  assert.match(html, /aria-expanded="false"/i);
});

test("renders the cinematic homepage composition while preserving the brand logos", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /src="\/images\/dinamik-logo-retina\.png"/i);
  assert.match(html, /src="\/images\/footer-logo-dinamik\.png"/i);
  assert.match(html, /class="hero"/i);
  assert.doesNotMatch(html, /class="stats-section"/i);
  assert.match(html, /id="news-title"[^>]*>Haberler &amp; Duyurular</i);
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
