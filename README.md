# Dinamik Okulları Samsun

Dinamik Mesleki ve Teknik Anadolu Lisesi için hazırlanan modern, erişilebilir ve mobil uyumlu kurumsal web sitesi.

## Özellikler

- Referans tasarıma sadık, tek sayfalık kurumsal bilgi mimarisi
- Kimya, Elektrik-Elektronik ve Biyomedikal program tanıtımları
- Okul, kampüs, rehberlik, yayınlar, galeri ve iletişim bölümleri
- Klavye erişimi, belirgin odak durumları ve hareket azaltma desteği
- Cloudflare Pages için statik Next.js çıktısı; Workers ve OpenAI Sites için isteğe bağlı vinext çıktısı
- Sunucu tarafında render edilen Türkçe SEO meta verileri

## Gereksinimler

- Node.js `>=22.13.0`

## Geliştirme

```bash
npm install
npm run dev
```

## Doğrulama

```bash
npm test
```

Bu komut üretim derlemesini oluşturur ve tamamlanmış sayfanın kritik içerik, meta veri ve erişilebilirlik sözleşmelerini doğrular.

Cloudflare Pages üretim derlemesi `npm run build:vercel` komutunu ve `out` çıktı dizinini kullanır. Vinext uyumluluk derlemesi gerektiğinde `npm run build:vinext` çalıştırılabilir.

## İçerik kaynakları

Kurumsal bilgiler okulun mevcut web sitesindeki `Hakkımızda` ve `Bize Ulaşın` sayfaları ile proje için sağlanan bölüm tanıtım metninden derlenmiştir. Dinamik başarı, takipçi veya kampanya rakamları sabit içerik olarak kullanılmamıştır.

Laboratuvar ve program kartlarında kullanılan temsili stok fotoğraflar Pexels üzerindeki [8926659](https://www.pexels.com/photo/people-wearing-protective-goggles-8926659/), [17894335](https://www.pexels.com/photo/student-in-goggles-sitting-by-table-in-classroom-17894335/) ve [6208709](https://www.pexels.com/photo/students-inside-a-science-laboratory-6208709/) numaralı ücretsiz görsellerdir. Galeri görselleri okulun mevcut sitesindeki faaliyet arşivinden alınmıştır; canlıya geçmeden önce öğrenci görsellerinin kullanım izinleri okul yönetimi tarafından doğrulanmalıdır.

## Proje yapısı

- `app/page.tsx`: Sayfa içeriği ve semantik yapı
- `app/globals.css`: Tasarım sistemi ve duyarlı düzen
- `app/layout.tsx`: Türkçe meta veriler ve sayfa kabuğu
- `public/images/`: Optimize edilmiş yerel görsel varlıklar
- `tests/rendered-html.test.mjs`: Statik üretim çıktısı sözleşme testleri
- `vite.config.ts` ve `worker/index.ts`: İsteğe bağlı vinext/Workers uyumluluk katmanı
