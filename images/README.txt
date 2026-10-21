================================================================================
 FOTOĞRAFLAR KLASÖRÜ
================================================================================

Bu klasöre Ecrin'in gerçek fotoğraflarını koyabilirsin. Şu anda burada sadece
"memory-1.svg" ... "memory-6.svg" adlı geçici yer tutucu (placeholder) görseller
vardır. Bunlar sayfanın boş görünmemesi için konuldu.

--------------------------------------------------------------------------------
 NASIL DEĞİŞTİRİLİR?
--------------------------------------------------------------------------------

1) Fotoğrafını bu klasöre kopyala.
   Örnek dosya adları:
       images/memory-1.jpg
       images/memory-2.jpg
       images/memory-3.jpg
       ...

2) content.js dosyasını aç ve ilgili satırı güncelle:

       {
         image: "images/memory-1.jpg",   <-- burayı değiştir
         date:  "",
         title: "",
         caption: "...",
         position: "center"
       }

3) Sayfayı yenile. Yeni fotoğrafın otomatik olarak görünür.

--------------------------------------------------------------------------------
 TAVSİYELER
--------------------------------------------------------------------------------

* Dosya adlarında boşluk ve Türkçe karakter KULLANMA.
  "images/benim fotograflarim/bir.jpg" yerine
  "images/benim-fotograflarim/bir.jpg" yaz.
  (Bazı tarayıcılar boşluklu yolları sorunlu yükler.)

* Dosya adlarını KÜÇÜK HARF ve sadece harf/rakam/tire kullanarak yaz.
  "Memory-1.JPG" yerine "memory-1.jpg" daha güvenlidir.

* Önerilen boyut / oran:
    - Yükseklik: 1400 - 2200 piksel
    - Oran    : 4:5 (dikey) veya 3:4
    - Dosya   : .jpg (en uyumlu) veya .webp

* Fotoğrafın kadrajını değiştirmek istersen "position" değerini kullan:
    "center"  -> ortala (varsayılan)
    "top"     -> üst kısmı göster
    "bottom"  -> alt kısmı göster
    "left"    -> sol tarafı göster
    "right"   -> sağ tarafı göster

* Fotoğrafın yüklenemezse sayfa boş kalmaz; otomatik olarak
  "Fotoğraf buraya" yazan şık bir yer tutucu gösterilir.

* Daha fazla / daha az anı eklemek istersen content.js içindeki
  "memories.items" dizisine yeni bir { ... } bloğu ekle.
  Sıralama otomatik olarak sağ/sol dönüşümlü devam eder.

--------------------------------------------------------------------------------
 SİLME
--------------------------------------------------------------------------------

Yer tutucu görselleri sildikten sonra content.js'teki yolları da güncelle.
Artık kullanılmayan .svg dosyaları silebilirsin.
