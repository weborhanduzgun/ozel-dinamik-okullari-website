export const staffGroups = [
  {
    category: "Rehberlik",
    role: "Psikolojik Danışman ve Rehberlik Öğretmeni",
    names: ["Seren Yılmaz", "Ümit Şahin", "Rabianur Üstün", "Ayten Dicle Aydın"],
  },
  {
    category: "Elektrik - Elektronik",
    role: "Elektrik-Elektronik Teknolojileri Öğretmeni",
    names: ["Sena Demircioğlu", "Gamze Öztürk", "Umut Çepni", "Ferhat Akbulut", "Nesrin Beşir", "Yılmaz Ceylan"],
  },
  {
    category: "Biyomedikal",
    role: "Biyomedikal Cihaz Teknolojileri Öğretmeni",
    names: ["Aysan Büşra Tosun", "Belgin Dumanlı", "Melisa Tokmak", "Burak Nuhoğlu", "Beyzanur Tınmaz", "Ecem Yatarkalkmaz"],
  },
  {
    category: "Kimya",
    role: "Kimya Teknolojileri Öğretmeni",
    names: ["Can Horozalioğlu", "Derya Çok", "Sibel Kelkitli Özçelik", "Bahri Dağdeviren"],
  },
  {
    category: "Matematik",
    role: "Matematik Öğretmeni",
    names: ["Yusuf Sefa Koç", "Ferdi Elbaşı", "Pınar Çakmak", "Beyzanur Atsan Gündekal", "Kader Aslan", "Büşra Tok", "Rukiye Gülcan", "Büşra Öztürk"],
  },
  {
    category: "Türk Dili ve Edebiyatı",
    role: "Türk Dili ve Edebiyatı Öğretmeni",
    names: ["Hümeyra Ömür Dağdeviren", "Ayşe Sarıkaya", "Berre Mısırlı Erdinli", "Sümeyye Bektaş", "Engin Deniz Yıldırım Altuğ"],
  },
  {
    category: "Fen Bilimleri",
    role: "Fizik, Biyoloji ve Fen Bilimleri Öğretmeni",
    names: ["Nuriye Yumlu Güngör", "Ercan Altınkap", "Meltem Korkmaz", "Hanife İrem Keskin", "Damla Altungayular", "Zeynep Bozdemir"],
  },
  {
    category: "İngilizce",
    role: "İngilizce Öğretmeni",
    names: ["Rümeysa Güney", "Mihriban Çelik", "Melike Demirbağ"],
  },
  {
    category: "Sosyal Bilimler",
    role: "Tarih, Coğrafya ve Felsefe Öğretmeni",
    names: ["Kader Danışmaz", "Nazmiye Aksu", "Deniz Çöp", "Tuncay Erdinli", "Fatma Zehra Soruklu", "Ayşe Güler", "Elmas Yadigaroğlu", "Betül Müdür", "Furkan Kamış"],
  },
  {
    category: "Din Kültürü",
    role: "Din Kültürü ve Ahlak Bilgisi Öğretmeni",
    names: ["Özlem Yılmaz", "Esra Yavuz", "Fatmagül Genç Tüfek", "Saime Naime Ezber"],
  },
  {
    category: "Spor ve Sanat",
    role: "Beden Eğitimi, Müzik ve Görsel Sanatlar Öğretmeni",
    names: ["Mahir Yatkın", "Yunus Emre Sağlam", "Mustafa Topçu", "Alican Mazlum", "Ömercan Sondaş"],
  },
] as const;

export const staffMembers = staffGroups.flatMap((group) =>
  group.names.map((name) => ({ name, category: group.category, role: group.role })),
);
