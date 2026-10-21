# 🎂 Ecrin'e Doğum Günü

Ecrin için hazırlanmış, romantik ve animasyonlu tek sayfalık doğum günü sitesi.

**Tamamen saf HTML5 + CSS3 + Vanilla JavaScript ile yazılmıştır.**
Node.js, React, Vite, Next.js, npm, build aracı, backend veya ücretli bir servis
**gerekmez**. `index.html` dosyasına çift tıklayarak açabilirsin.

---

## 📁 Proje Yapısı

```
ecrin-birthday/
├── index.html      → Sayfanın HTML yapısı
├── style.css       → Tüm tasarım ve animasyonlar
├── script.js       → Yazı animasyonu, scroll animasyonları, müzik
├── content.js      → TÜM metinler, fotoğraf yolları ve tarihler (BURAYI DÜZENLE)
├── images/         → Fotoğrafların duracağı klasör
│   └── README.txt  → Fotoğraf değiştirme talimatları
├── audio/          → (isteğe bağlı) müzik dosyası
└── README.md       → Bu dosya
```

> **Önemli:** Metinlerin, fotoğraf yollarının ve tarihlerin tamamı
> `content.js` dosyasındadır. `index.html` ve `style.css` dosyalarına
> dokunmadan siteyi tamamen kişiselleştirebilirsin.

---

## 1️⃣ Siteyi Yerelde Nasıl Açılır?

**En kolay yol:**

1. `ecrin-birthday` klasörünü aç.
2. `index.html` dosyasına **çift tıkla**.
3. Site tarayıcında açılır. Hazır.

**Alternatif (VS Code):** Klasörü VS Code'da aç, `index.html`'e tıkla ve
sağ üstteki canlı sunucu (Live Server) simgesine bas.

> ⚠️ **Not:** Site `file://` protokolüyle de sorunsuz çalışır. `fetch()` veya
> `XMLHttpRequest` **kullanılmaz**; `content.js` klasik bir `<script>` olarak
> yüklenir. Bu yüzden hiçbir yerel sunucu kurmana gerek yoktur.

---

## 2️⃣ Fotoğrafları Nasıl Değiştiririm?

1. Gerçek fotoğrafını `images/` klasörüne kopyala. Örnek: `images/memory-1.jpg`
2. `content.js` dosyasında ilgili anının `image` satırını güncelle:

```js
{
  image: "images/memory-1.jpg",   // <-- burayı değiştir
  date:  "12 Mayıs 2024",
  title: "İlk Günlerimiz",
  caption: "Buraya o anı anlatan cümleni yaz.",
  position: "center"
}
```

3. Tarayıcıda `Ctrl + F5` ile yenile.

**Daha fazla detay için:** `images/README.txt` dosyasına bak.

### Her anı kartı için desteklenen alanlar

| Alan       | Zorunlu | Açıklama                                                            |
|------------|---------|----------------------------------------------------------------------|
| `image`    | Evet    | Fotoğrafın yolu. `images/` klasörüne göre **göreli** yol.            |
| `date`     | Hayır   | Tarih metni. `""` yaparsan gizlenir.                                 |
| `title`    | Hayır   | Başlık. `""` yaparsan gizlenir.                                      |
| `caption`  | Evet    | Kartın açıklaması.                                                  |
| `position` | Hayır   | Kadraj: `center` · `top` · `bottom` · `left` · `right`               |
| `align`    | Hayır   | Elle yön: `left` (fotoğraf solda) veya `right` (fotoğraf sağda).     |

> Varsayılan olarak kartlar **dönüşümlü** dizilir: 1. kart solda, 2. kart
> sağda, 3. kart solda… `align` yazarak bunu elle değiştirebilirsin.


---

## 3️⃣ Türkçe Mesajları Nasıl Düzenlerim?

Tüm metinler `content.js` dosyasında. Dosyayı aç ve şu yerleri düzenle:

### Hero (açılış) mesajı

```js
hero: {
  eyebrow: "Doğum Günü",
  name: "Ecrin",
  heading: "Doğum Günün Kutlu Olsun",
  subtitle: "Bugün senin günün.",
  typingText: "[DOĞUM GÜNÜ MESAJI BURAYA EKLENECEK]",  // <-- buraya
  typingSpeed: 45,   // yazı hızı (ms/karakter)
  scrollHint: "Aşağı kaydır"
}
```

### Son mesaj ve imza

```js
finale: {
  eyebrow: "Son Bir Söz",
  heading: "Senin İçin",
  message: "[SON MESAJ BURAYA EKLENECEK]",   // <-- buraya
  signatureLabel: "Her şey senin için,",
  signature: "Ecrin",                        // <-- imza
  signatureNote: "Doğum günün kutlu olsun.",
  closingMark: "♥"
}
```

### Diğer alanlar

| Yol                    | Ne işe yarar                         |
|------------------------|--------------------------------------|
| `site.title`           | Tarayıcı sekmesi başlığı             |
| `site.description`     | Arama motoru açıklaması              |
| `site.footerNote`      | Sayfa altındaki küçük satır          |
| `memories.heading`     | "Özel Anlar" bölüm başlığı           |
| `memories.intro`       | Bölümün alt açıklaması               |
| `memories.items[]`     | Altı anı kartı                       |
| `music.src`            | Müzik dosyasının yolu                |
| `music.volume`         | Müzik ses seviyesi (0.0 – 1.0)       |
| `gallery.showIndex`    | Kartlarda "01, 02, 03" numara rozeti |
| `gallery.showFrame`    | Fotoğrafların altın çerçevesi        |

> 💡 Metinlerde satır başı bırakabilirsin — otomatik olarak `<br>` olur.

---

## 4️⃣ Müzik Nasıl Eklenir? (isteğe bağlı)

1. Müzik dosyasını `audio/` klasörüne koy. Örnek: `audio/birthday.mp3`
   (`.mp3`, `.m4a`, `.ogg` desteklenir.)
2. `content.js` içinde yolu belirt:

```js

---

## 5️⃣ GitHub Pages'te Nasıl Yayınlarım?

> GitHub Pages **ücretsizdir**. Sunucu, veritabanı veya ücretli servis gerekmez.

**1) Depoyu oluştur**
GitHub'da **New repository** → ad olarak `ecrin-birthday` yaz.
*Public* seç ve **Create repository** de.

**2) Dosyaları yükle**
- **Add file → Upload files** yolunu izle.
- `ecrin-birthday` klasörünün **içindeki** tüm dosyaları seç
  (`index.html`, `style.css`, `script.js`, `content.js`, `images/`, `audio/`).
- ⚠️ **Dikkat:** Klasörün *içindeki* dosyaları yükle, klasörün kendisini değil.
  Kök dizinde `index.html` görünmeli.
- **Commit changes** de.

**3) Pages'ı aktifleştir**
- Repo → **Settings** → sol menüden **Pages**
- **Source** → **Deploy from a branch**
- Branch: **main** / **/ (root)** seç → **Save**

**4) Birkaç dakika bekle**
Siten şu adreste yayınlanır:

```
https://<kullanıcı-adın>.github.io/ecrin-birthday/
```

> 💡 Kendine özel alan adın varsa
> (Settings → Pages → Custom domain) ekleyebilirsin.

---

## 6️⃣ Yayınlanan Siteyi Nasıl Güncellerim?

1. GitHub'da depoyu aç.
2. Değiştirmek istediğin dosyayı tıkla (örneğin `content.js`).
3. **✏️ Edit** (kalem) simgesine bas.
4. Değişikliği yap ve **Commit changes** → **Commit changes** de.
5. **1–2 dakika** içinde GitHub Pages otomatik yeniden yayınlar.
6. Tarayıcıda `Ctrl + F5` ile yenile.

> ⚠️ Tarayıcı önbelleği eski görüntüyü gösterebilir. `Ctrl + F5` veya
> özel pencerede (Incognito) açarak kontrol et.

**Yeni fotoğraf eklemek için:** `images/` klasörüne dosyayı yükle
(**Add file → Upload files**), sonra `content.js` içindeki yolu güncelle.

---

## ✨ Özellikler

- ✍️ **Yazı (typewriter) animasyonlu** hero mesajı
- 🖼️ **Dönüşümlü editorial galeri** — 1. kart solda, 2. kart sağda, …
- 🌸 **Intersection Observer** ile kademeli scroll animasyonları
- ♿ **prefers-reduced-motion** desteği
- 📱 **Tamamen responsive** — masaüstü, tablet, iPhone ve Android
- 🚫 **Yatay kaydırma engellendi** (`overflow-x: hidden`)
- 🎵 **İsteğe bağlı müzik** — otomatik başlamaz, dosya yoksa sorunsuz çalışır
- 🖼️ **Fotoğraf yüklenmezse** şık yer tutucu gösterir
- ♿ **Klavye erişilebilirliği** ve odak halkaları
- 🚫 **Bağımlılık yok** — build aracı, paket yöneticisi veya sunucu yok

---

## 🎨 Renk Paleti

| Renk               | Kodu       | Kullanım                        |
|--------------------|------------|---------------------------------|
| Krem (Cream)       | `#fdf8f4`  | Ana zemin                       |
| Soluk Gül (Blush)  | `#f3dfe0`  | Vurgu, kalpler                  |
| Beyaz (White)      | `#ffffff`  | Kart zeminleri                  |
| Şarampol (Burgundy)| `#7d2f3c`  | Başlıklar, metin                |
| Altın (Gold)       | `#c9a96a`  | İnce çizgi ve çerçeve detayları |

Tipografi: **Cormorant Garamond** (başlıklar) + **Jost** (gövde metni).
Google Fonts bağlantısı kesilse bile sayfa sistem fontlarıyla düzgün görünür.

---

## 📁 Dosya adlarını değiştirmem gerekir mi?

Hayır. Tüm yollar **göreli** (`images/...`, `audio/...`, `style.css`...) ve
klasör adı ne olursa olsun site çalışır. Klasörü istediğin yere taşıyabilirsin.

---

## 💝 Son not

Bu site Ecrin için, sevgiyle hazırlandı. Metinleri ve fotoğrafları
`content.js` dosyasından kolayca güncelleyebilirsin — kod bilgisi gerekmez.

Mutlu yıllar! 🌹

music: {
  src: "audio/birthday.mp3",   // <-- buraya
  playLabel: "Müziği Aç",
  pauseLabel: "Müziği Kapat",
  volume: 0.35
}
```

**Güvenlik notları:**
- Ses **asla otomatik başlamaz**; sadece kullanıcı butona bastığında çalar.
- Müzik dosyası yoksa veya yol yanlışsa **buton otomatik gizlenir** ve site
  sessizce çalışmaya devam eder.
- `src` boş bırakılırsa müzik butonu hiç görünmez.
