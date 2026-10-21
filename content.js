/* =====================================================================
   ECRIN — DOĞUM GÜNÜ SAYFASI | İÇERİK DOSYASI (content.js)
   ---------------------------------------------------------------------
   Bu dosya sayfadaki TÜM metinleri, fotoğraf yollarını ve tarihleri
   içerir. Kod dosyalarına (index.html / style.css / script.js) dokunmadan
   buradaki değerleri değiştirerek siteyi kişiselleştirebilirsin.

   • Her alanın yanındaki yorumlarda ne yapman gerektiği yazıyor.
   • Fotoğraf yolları "images/" klasörüne göre RELATİFTİR.
   • Bir alanı boş bırakmak istersen değeri "" yapman yeterli.
   • Bu dosya <script src="content.js"></script> ile YÜKLENİR.
   ===================================================================== */

window.ECRIN_CONTENT = {

  /* -------------------------------------------------------------------
     1) SİTE GENELİ
     ------------------------------------------------------------------- */
  site: {
    // Tarayıcı sekmesinde görünen başlık
    title: "Ecrin'e Doğum Günü",
    // Arama motorları için kısa açıklama
    description: "Ecrin için hazırlanmış romantik doğum günü sayfası.",
    // Sayfanın en altındaki küçük satır
    footerNote: "Senin için, sevgiyle."
  },

  /* -------------------------------------------------------------------
     2) BÖLÜM 1 — HERO (AÇILIŞ)
     ------------------------------------------------------------------- */
  hero: {
    // Küçük, büyük harfli üst etiket
    eyebrow: "Doğum Günü",
    // Ad — siteye adını otomatik olarak işler
    name: "Ecrin",
    // Ana başlık (adın altında görünür)
    heading: "Doğum Günün Kutlu Olsun",
    // Küçük alt satır — istersen kendi cümlenle değiştir
    subtitle: "Bugün senin günün.",
    // YAZILAN (typewriter) animasyonlu mesaj.
    // KENDİ MESAJINI BURAYA YAZ.
    typingText: "[DOĞUM GÜNÜ MESAJI BURAYA EKLENECEK]",
    // Yazı hızı (ms / karakter). Daha yavaş = daha şiirsel.
    typingSpeed: 45,
    // Aşağı kaydırma ipucu
    scrollHint: "Aşağı kaydır"
  },

  /* -------------------------------------------------------------------
     3) BÖLÜM 2 — ÖZEL ANLAR (GALERİ)
     -------------------------------------------------------------------
     items dizisindeki her bir nesne bir "anı" kartıdır.
     KART SIRA SIRAYA GÖRE SAĞ/ SOL DÖNÜŞÜMLÜ DİZİLİR.
     Yani 1. kart solda, 2. kart sağda, 3. kart solda... olur.

     - image   : fotoğrafın yolu  (örn. "images/foto-1.jpg")
     - date    : isteğe bağlı tarih (örn. "12 Mayıs 2024") / "" = gizle
     - title   : isteğe bağlı başlık (örn. "İlk Günlerimiz") / "" = gizle
     - caption : kartın açıklaması  (kendi cümlenle yaz)
     - position: fotoğrafın kadrajı — "center" | "top" | "bottom" | "left" | "right"
     - align   : isteğe bağlı; varsayılan olarak sırayla dönüşümlü gelir.
                 İstersen elle "left" veya "right" yazabilirsin.
     ------------------------------------------------------------------- */
  memories: {
    // Bölüm başlığı ve alt başlığı
    heading: "Özel Anlar",
    intro: "Aşağıda, ikimizin arasından seçtiğim anlar yer alıyor.",
    items: [

      {
        image: "images/memory-1.svg",
        date: "",
        title: "",
        caption: "[Birinci anının açıklaması buraya yazılacak.]",
        position: "center"
      },

      {
        image: "images/memory-2.svg",
        date: "",
        title: "",
        caption: "[İkinci anının açıklaması buraya yazılacak.]",
        position: "center"
      },

      {
        image: "images/memory-3.svg",
        date: "",
        title: "",
        caption: "[Üçüncü anının açıklaması buraya yazılacak.]",
        position: "center"
      },

      {
        image: "images/memory-4.svg",
        date: "",
        title: "",
        caption: "[Dördüncü anının açıklaması buraya yazılacak.]",
        position: "center"
      },

      {
        image: "images/memory-5.svg",
        date: "",
        title: "",
        caption: "[Beşinci anının açıklaması buraya yazılacak.]",
        position: "center"
      },

      {
        image: "images/memory-6.svg",
        date: "",
        title: "",
        caption: "[Altıncı anının açıklaması buraya yazılacak.]",
        position: "center"
      }

    ]
  },
  /* -------------------------------------------------------------------
     4) BÖLÜM 4 — SON MESAJ (KAPANIŞ)
     ------------------------------------------------------------------- */
  finale: {
    // Küçük üst etiket
    eyebrow: "Son Bir Söz",
    // Bölüm başlığı
    heading: "Senin İçin",
    // Ana mesaj — KENDİ MESAJINI BURAYA YAZ
    message: "[SON MESAJ BURAYA EKLENECEK]",
    // İmza satırının solundaki metin
    signatureLabel: "Her şey senin için,",
    // İmza — kendi adını veya bir söz yaz
    signature: "Ecrin",
    // İmzanın altındaki küçük satır
    signatureNote: "Doğum günün kutlu olsun.",
    // Kapanışta gösterilecek küçük kalp animasyonu
    closingMark: "♥"
  },

  /* -------------------------------------------------------------------
     5) MÜZİK (isteğe bağlı)
     -------------------------------------------------------------------
     • Sesli müzik ASLA otomatik başlamaz; kullanıcı butona basmalıdır.
     • Müzik dosyası yoksa site sorunsuz çalışmaya devam eder.
     • Dosyayı  "audio/"  klasörüne koy ve aşağıdaki yolu güncelle.
     • Örnek: "audio/birthday.mp3"  (mp3 / m4a / ogg desteklenir)
     ------------------------------------------------------------------- */
  music: {
    // Müzik dosyasının yolu. Boş bırakırsan müzik butonu gizlenir.
    src: "",
    // Butonun üzerindeki etiketler
    playLabel: "Müziği Aç",
    pauseLabel: "Müziği Kapat",
    // Müzik en düşük sesle başlar (0.0 - 1.0)
    volume: 0.35
  },

  /* -------------------------------------------------------------------
     6) GALERİ AYARLARI
     ------------------------------------------------------------------- */
  gallery: {
    // Her kartın üstünde görünecek küçük numara etiketi (ör. "01")
    showIndex: true,
    // Fotoğraf çerçevesindeki altın/şarampol çizgi (true / false)
    showFrame: true
  }

};

