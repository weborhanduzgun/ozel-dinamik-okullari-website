export type DepartmentAccent = "red" | "indigo" | "cyan";

export type Department = {
  slug: string;
  shortTitle: string;
  title: string;
  branch: string;
  image: string;
  accent: DepartmentAccent;
  lead: string;
  purpose: string;
  facts: Array<{ label: string; value: string }>;
  skills: string[];
  learningAreas: Array<{ title: string; text: string }>;
  careerAreas: string[];
};

export const departments: Department[] = [
  {
    slug: "kimya-teknolojileri",
    shortTitle: "Kimya",
    title: "Kimya Teknolojileri",
    branch: "Kimya Laboratuvarı Dalı",
    image: "/images/hero-lab.jpg",
    accent: "red",
    lead:
      "Kimyasal süreçleri güvenli laboratuvar uygulamaları, numune hazırlama ve cihazlı analiz yöntemleriyle öğren.",
    purpose:
      "Sektörün ihtiyaçları ile bilimsel ve teknolojik gelişmeleri buluşturan; standartlara uygun, dikkatli ve profesyonel laboratuvar çalışması yürütebilen nitelikli meslek elemanları yetiştirmek.",
    facts: [
      { label: "Aktif dal", value: "Kimya Laboratuvarı" },
      { label: "Eğitim süresi", value: "4 öğretim yılı" },
      { label: "Çalışma modeli", value: "Uygulamalı laboratuvar" },
    ],
    skills: [
      "Temel kimyasal işlemler ve mesleki hesaplamalar",
      "Numune alma, hazırlama ve atık işlemleri",
      "Katyon ve anyonların toplu analizleri",
      "Asit, baz, nem, kül ve elek analizleri",
      "Gravimetrik ve titrimetrik analiz yöntemleri",
      "Spektrofotometre ve fotometre uygulamaları",
      "Kromatografik yöntemlerle numune analizi",
      "İyi Laboratuvar Uygulamaları ve iş güvenliği",
    ],
    learningAreas: [
      {
        title: "Analitik düşünme",
        text: "Numuneyi doğru hazırlar, ölçüm sonuçlarını değerlendirir ve laboratuvar verisini yorumlarsın.",
      },
      {
        title: "Cihazlı analiz",
        text: "Spektrofotometre, kolorimetre, refraktometre ve kromatografik yöntemleri tanırsın.",
      },
      {
        title: "Güvenli laboratuvar",
        text: "Kimyasal maddeler, atıklar ve ekipmanlarla güvenli çalışma kültürü geliştirirsin.",
      },
    ],
    careerAreas: [
      "Kimya ve analiz laboratuvarları",
      "Gıda ve ilaç sektörü",
      "Çevre ve kalite kontrol birimleri",
      "Petrokimya ve enerji sektörü",
      "Kozmetik ve temizlik ürünleri",
      "Yükseköğretimin ilgili programları",
    ],
  },
  {
    slug: "elektrik-elektronik-teknolojileri",
    shortTitle: "Elektrik - Elektronik",
    title: "Elektrik-Elektronik Teknolojileri",
    branch: "Elektrik Tesisatları ve Dağıtımı Dalı",
    image: "/images/electronics.jpg",
    accent: "indigo",
    lead:
      "Devre bilgisinden tesisat projelerine, kuvvet ve kumanda panolarından test uygulamalarına uzanan güçlü bir teknik eğitim.",
    purpose:
      "Temel elektrik-elektronik, ölçme ve mekanik uygulamalarını iş sağlığı ve güvenliği kurallarına uygun biçimde gerçekleştirebilen; proje okuyabilen ve teknik çözüm üretebilen nitelikli meslek elemanları yetiştirmek.",
    facts: [
      { label: "Aktif dal", value: "Tesisatlar ve Dağıtım" },
      { label: "Eğitim süresi", value: "4 öğretim yılı" },
      { label: "Çalışma modeli", value: "Atölye ve proje" },
    ],
    skills: [
      "Temel elektrik-elektronik ve ölçme uygulamaları",
      "Devre hesaplamaları ve temel devre deneyleri",
      "Bilgisayarlı devre çizimi ve simülasyon",
      "Baskı devre tasarımı",
      "Kuvvet ve kumanda panoları hazırlama",
      "Elektrik tesisatı projesi hazırlama",
      "Kontrol panoları ve topraklama uygulamaları",
      "Test, kontrol ve güvenli devreye alma",
    ],
    learningAreas: [
      {
        title: "Devre ve ölçme",
        text: "Elektrik devrelerini hesaplar, ölçüm araçlarını doğru kullanır ve sonuçları değerlendirirsin.",
      },
      {
        title: "Proje ve simülasyon",
        text: "Bilgisayar destekli çizim ve simülasyonlarla fikirleri uygulanabilir projelere dönüştürürsün.",
      },
      {
        title: "Pano ve tesisat",
        text: "Yönetmeliklere uygun tesisat, kuvvet, kumanda ve kontrol panosu uygulamaları yaparsın.",
      },
    ],
    careerAreas: [
      "Elektrik taahhüt ve tesisat firmaları",
      "Sanayi bakım ve teknik servis birimleri",
      "Enerji üretim ve dağıtım tesisleri",
      "Otomasyon ve kontrol sistemleri",
      "Yapı ve endüstriyel proje ekipleri",
      "Yükseköğretimin ilgili programları",
    ],
  },
  {
    slug: "biyomedikal-cihaz-teknolojileri",
    shortTitle: "Biyomedikal",
    title: "Biyomedikal Cihaz Teknolojileri",
    branch: "Tıbbi Görüntüleme Sistemleri Dalı",
    image: "/images/biomedical.jpg",
    accent: "cyan",
    lead:
      "Tıbbi görüntüleme cihazlarının kurulum, bakım, onarım, kalibrasyon ve veri bağlantı süreçlerini teknik bir bakışla keşfet.",
    purpose:
      "Tıbbi görüntüleme cihazlarının kurulum şartlarını kontrol edebilen; yetkisi dâhilinde montaj, ilk çalıştırma, bakım, onarım, kalibrasyon ve ayar işlerini yürütebilen nitelikli teknik elemanlar yetiştirmek.",
    facts: [
      { label: "Aktif dal", value: "Tıbbi Görüntüleme" },
      { label: "Teknik odak", value: "Bakım ve kalibrasyon" },
      { label: "Çalışma modeli", value: "Cihaz ve sistem" },
    ],
    skills: [
      "İş organizasyonu ve teknik dokümantasyon",
      "Temel elektrik ve elektromekanik kontroller",
      "Biyomedikal sistemlerde temel ölçümler",
      "Kurulum ve ortam şartlarının kontrolü",
      "Ultrason, röntgen ve tomografi sistemleri",
      "Periyodik bakım, kalibrasyon ve ayar kontrolü",
      "Bilgisayar ve çevre birimi bağlantıları",
      "Hastane veri ağı bağlantı ve tanımlamaları",
    ],
    learningAreas: [
      {
        title: "Cihaz sistemleri",
        text: "Görüntüleme ünitelerinin bileşenlerini, kurulum koşullarını ve çalışma prensiplerini tanırsın.",
      },
      {
        title: "Bakım ve kalibrasyon",
        text: "Periyodik bakım, ölçümleme, ayar ve arıza tespit süreçlerinde sistematik çalışma geliştirirsin.",
      },
      {
        title: "Sağlık teknolojisi",
        text: "Teknik doğruluk, hasta güvenliği ve ekip çalışmasının aynı sistemde nasıl buluştuğunu öğrenirsin.",
      },
    ],
    careerAreas: [
      "Hastanelerin teknik hizmet birimleri",
      "Biyomedikal cihaz teknik servisleri",
      "Tıbbi görüntüleme sistemi firmaları",
      "Kalibrasyon ve bakım kuruluşları",
      "Sağlık teknolojileri tedarikçileri",
      "Yükseköğretimin ilgili programları",
    ],
  },
];

export function getDepartment(slug: string) {
  return departments.find((department) => department.slug === slug);
}
