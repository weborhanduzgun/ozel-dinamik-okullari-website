import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the completed Turkish school homepage", async () => {
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
  assert.match(html, /Sosyal - Kültürel - Sportif Çalışmalar/i);
  assert.match(html, /href="https:\/\/samsun\.dinamikokullari\.com\/kadromuz"/i);
  assert.match(html, /href="https:\/\/samsun\.dinamikokullari\.com\/basarilarimiz"/i);
  assert.match(html, /aria-label="Hızlı erişim"/i);
  assert.match(html, /aria-label="WhatsApp üzerinden iletişime geçin"/i);
  assert.match(html, /href="tel:\+908502182806"/i);
  assert.match(html, /href="tel:\+903624655353"/i);
  assert.match(html, /aria-expanded="false"/i);
});

test("removes disposable starter preview code and dependency", async () => {
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await assert.rejects(access(new URL("../app/_sites-preview/preview.css", import.meta.url)));
});
