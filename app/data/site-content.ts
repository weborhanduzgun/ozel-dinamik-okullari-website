export type NavigationItem = {
  label: string;
  href: string;
};

export type Department = {
  slug: string;
  title: string;
  branch: string;
  shortDescription: string;
  overview: string;
  image: string;
  learningAreas: string[];
  facilities: string[];
  careerAreas: string[];
  higherEducation: string[];
};

export type StaffMember = {
  name: string;
  title: string;
  department: string;
};

export const school = {
  name: "Dinamik Mesleki ve Teknik Anadolu Lisesi",
  shortName: "Dinamik Samsun MTAL",
  description:
    "Samsun'da akademik eğitimi mesleki uygulama, teknoloji ve güçlü öğrenci yaşamıyla birleştiren mesleki ve teknik Anadolu lisesi.",
  address: "Toybelen Mah. Anadolu Bulvarı No:225, İlkadım / Samsun",
  phones: ["0850 218 28 06", "0362 465 53 53", "0546 776 50 60"],
  hours: "Pazartesi – Cumartesi, 08:30 – 18:00",
  instagram: "https://www.instagram.com/dinamikokullarisamsun",
  youtube: "https://www.youtube.com/channel/UCmwV6um8k2UhRbSzQEhyM6g",
  maps:
    "https://www.google.com/maps/search/?api=1&query=Toybelen+Mahallesi+Anadolu+Bulvar%C4%B1+No%3A225+%C4%B0lkad%C4%B1m+Samsun",
} as const;

export const navigation: NavigationItem[] = [
  { label: "Anasayfa", href: "/" },
  { label: "Bölümler", href: "/bolumler" },
  { label: "Okulumuz Hakkında", href: "/okulumuz-hakkinda" },
  { label: "Kadromuz", href: "/kadromuz" },
  { label: "Akademik Çalışmalar", href: "/akademik-calismalar" },
  {
    label: "Sosyal-Kültürel-Sportif Çalışmalar",
    href: "/sosyal-kulturel-sportif-calismalar",
  },
  { label: "Başarılar", href: "/basarilar" },
  { label: "İletişim", href: "/iletisim" },
];

export const departments: Department[] = [
  {
    slug: "kimya-teknolojileri",
    title: "Kimya Teknolojileri",
    branch: "Kimya Laboratuvarı Dalı",
    shortDescription:
      "Numune alma, çözelti hazırlama, nitel-nicel analiz ve cihazlı laboratuvar uygulamaları.",
    overview:
      "Kimya Teknolojileri alanı; sektörün ihtiyaçları, bilimsel gelişmeler ve güvenli çalışma ilkeleri doğrultusunda analiz, kalite kontrol ve laboratuvar yeterlikleri kazandırır. Okulumuzda Kimya Laboratuvarı dalında dört yıllık eğitim verilir.",
    image: "/images/hero-lab.jpg",
    learningAreas: [
      "Numune alma ve numune hazırlama",
      "Nitel, nicel ve biyokimyasal analizler",
      "Enstrümantal analiz ve raporlama",
      "Çözelti hazırlama ve kalite kontrol",
      "Kimyasal atık yönetimi ve iş güvenliği",
    ],
    facilities: [
      "Kimya uygulama laboratuvarı",
      "Cihazlı analiz çalışma alanı",
      "Güvenli numune hazırlama istasyonları",
    ],
    careerAreas: [
      "Gıda ve ilaç sektörü",
      "Çevre ve kalite kontrol laboratuvarları",
      "Kozmetik, boya ve polimer endüstrisi",
      "Enerji, maden ve petrokimya işletmeleri",
    ],
    higherEducation: [
      "Kimya Teknolojisi",
      "Laboratuvar Teknolojisi",
      "Biyokimya",
      "Gıda Teknolojisi",
      "İş Sağlığı ve Güvenliği",
    ],
  },
  {
    slug: "elektrik-elektronik-teknolojileri",
    title: "Elektrik-Elektronik Teknolojileri",
    branch: "Elektrik Tesisatları ve Dağıtımı Dalı",
    shortDescription:
      "Devre, ölçme, tesisat projesi, kuvvet-kumanda panoları ve sistem testleri.",
    overview:
      "Elektrik-Elektronik Teknolojileri alanı; planlama, montaj, ölçme, bakım ve test süreçlerinde ihtiyaç duyulan mesleki yeterlikleri uygulamalı eğitimle kazandırır. Okulumuzda Elektrik Tesisatları ve Dağıtımı dalında dört yıllık eğitim verilir.",
    image: "/images/electronics.jpg",
    learningAreas: [
      "Elektrik devreleri ve ölçme",
      "Tesisat projelendirme ve montaj",
      "Kuvvet ve kumanda panoları",
      "Simülasyon ve baskı devre çalışmaları",
      "Bakım, arıza bulma ve güvenli test",
    ],
    facilities: [
      "Elektrik tesisat atölyesi",
      "Pano ve kumanda uygulama alanı",
      "Elektronik ölçme ve devre laboratuvarı",
    ],
    careerAreas: [
      "Endüstriyel tesisler",
      "Elektrik dağıtım ve enerji işletmeleri",
      "Teknik servis ve bakım birimleri",
      "Otomasyon ve güvenlik sistemleri",
    ],
    higherEducation: [
      "Elektrik",
      "Elektronik Teknolojisi",
      "Mekatronik",
      "Kontrol ve Otomasyon Teknolojisi",
      "Elektrik-Elektronik Mühendisliği (M.T.O.K.)",
    ],
  },
  {
    slug: "biyomedikal-cihaz-teknolojileri",
    title: "Biyomedikal Cihaz Teknolojileri",
    branch: "Tıbbi Görüntüleme Sistemleri Dalı",
    shortDescription:
      "Tıbbi cihazların teknik altyapısı, kurulumu, ölçümü, bakımı ve güvenli kullanımı.",
    overview:
      "Biyomedikal Cihaz Teknolojileri alanı, sağlık kuruluşlarında kullanılan cihazların kurulum, kontrol, bakım ve teknik servis süreçlerine yönelik yeterlikler kazandırır. Okulumuzda Tıbbi Görüntüleme Sistemleri dalında dört yıllık eğitim verilir.",
    image: "/images/biomedical.jpg",
    learningAreas: [
      "Tıbbi cihaz elektroniği",
      "Tıbbi görüntüleme sistemlerinin temelleri",
      "Kurulum, kontrol ve kalibrasyon yaklaşımı",
      "Bakım, arıza analizi ve teknik dokümantasyon",
      "Hasta ve kullanıcı güvenliği",
    ],
    facilities: [
      "Biyomedikal cihaz laboratuvarı",
      "Elektronik ölçme istasyonları",
      "Cihaz sökme, inceleme ve bakım alanı",
    ],
    careerAreas: [
      "Hastanelerin biyomedikal birimleri",
      "Tıbbi cihaz teknik servisleri",
      "Sağlık teknolojileri firmaları",
      "Kalibrasyon ve kalite kontrol kuruluşları",
    ],
    higherEducation: [
      "Biyomedikal Cihaz Teknolojisi",
      "Elektronik Teknolojisi",
      "Elektronörofizyoloji",
      "Mekatronik",
      "Biyomedikal Mühendisliği (M.T.O.K.)",
    ],
  },
];

export const staffPreview: StaffMember[] = [
  { name: "Seren Yılmaz", title: "Rehberlik Öğretmeni", department: "Rehberlik" },
  { name: "Ümit Şahin", title: "Rehberlik Öğretmeni", department: "Rehberlik" },
  {
    name: "Sena Demircioğlu",
    title: "Elektrik-Elektronik Teknolojileri Öğretmeni",
    department: "Elektrik-Elektronik",
  },
  {
    name: "Gamze Öztürk",
    title: "Elektrik-Elektronik Teknolojileri Öğretmeni",
    department: "Elektrik-Elektronik",
  },
  {
    name: "Aysan Büşra Tosun",
    title: "Biyomedikal Cihaz Teknolojileri Öğretmeni",
    department: "Biyomedikal",
  },
  {
    name: "Belgin Dumanlı",
    title: "Biyomedikal Cihaz Teknolojileri Öğretmeni",
    department: "Biyomedikal",
  },
  {
    name: "Can Horozalioğlu",
    title: "Kimya Teknolojileri Öğretmeni",
    department: "Kimya",
  },
  {
    name: "Derya Çok",
    title: "Kimya Teknolojileri Öğretmeni",
    department: "Kimya",
  },
  { name: "Yusuf Sefa Koç", title: "Matematik Öğretmeni", department: "Akademik" },
  {
    name: "Hümeyra Ömür Dağdeviren",
    title: "Türk Dili ve Edebiyatı Öğretmeni",
    department: "Akademik",
  },
  { name: "Nuriye Yumlu Güngör", title: "Fizik Öğretmeni", department: "Akademik" },
  { name: "Hanife İrem Keskin", title: "Biyoloji Öğretmeni", department: "Akademik" },
];

export const academicWork = [
  {
    title: "Ders ve Atölye Bütünlüğü",
    description:
      "Akademik kazanımlar; laboratuvar, atölye, proje ve sektör uygulamalarıyla somutlaştırılır.",
  },
  {
    title: "Rehberlik ve Kariyer Planlama",
    description:
      "Öğrencinin ilgi, yetenek ve hedefleri düzenli görüşmelerle izlenir; alan ve yükseköğretim seçenekleri birlikte planlanır.",
  },
  {
    title: "Proje Tabanlı Öğrenme",
    description:
      "Araştırma, problem çözme, ekip çalışması ve sunum becerileri disiplinler arası projelerle geliştirilir.",
  },
  {
    title: "Ölçme ve Gelişim Takibi",
    description:
      "Öğrencinin akademik ve mesleki gelişimi düzenli değerlendirmeler, geri bildirim ve destek çalışmalarıyla takip edilir.",
  },
];

export const studentLife = [
  {
    title: "Sosyal Etkinlikler ve Kulüpler",
    description: "Öğrenci toplulukları, gönüllülük, kültür-sanat ve okul içi etkinlikler.",
  },
  {
    title: "TEKNOFEST ve Yarışma Kültürü",
    description: "Fikir geliştirme, prototipleme, ekip kurma ve yarışma hazırlık süreçleri.",
  },
  {
    title: "Spor Faaliyetleri",
    description: "Takım sporları, bireysel gelişim, okul turnuvaları ve sağlıklı yaşam alışkanlıkları.",
  },
  {
    title: "Geziler ve Kültürel Programlar",
    description: "Teknik geziler, müze ve üniversite ziyaretleri ile sınıf dışı öğrenme deneyimleri.",
  },
];

export const managedContentFallback = [
  {
    type: "news",
    slug: "bilim-kultur-ve-sanat-dergileri",
    title: "Bilim, Kültür ve Sanat Dergilerimiz",
    summary: "Öğrencilerin bilimsel, kültürel ve sanatsal üretimlerini buluşturan dönem yayınları.",
    href: "https://samsun.dinamikokullari.com/mayis-haziran-ayi-bilim-kultur-ve-sanat-dergimiz",
  },
  {
    type: "project",
    slug: "dijital-kimligimle-varim",
    title: "Dijital Kimliğimle Varım",
    summary: "eTwinning ortaklığıyla güvenli ve bilinçli dijital yaşama odaklanan öğrenci projesi.",
    href: "https://samsun.dinamikokullari.com/dijital-kimligimle-varim-projesinde-e-twinnig-proje-ortagiyiz-2",
  },
  {
    type: "academic",
    slug: "rehberlik-mesleki-gelisim",
    title: "Rehberlik ve Mesleki Gelişim İçerikleri",
    summary: "Kariyer, sınav süreci ve ergenlik dönemine yönelik öğrenci-veli rehberlik içerikleri.",
    href: "https://samsun.dinamikokullari.com/rehberlik-mesleki-gelisim-dergisi",
  },
] as const;

