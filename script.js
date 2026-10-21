/* =====================================================================
   ECRIN — DOĞUM GÜNÜ SAYFASI | script.js
   ---------------------------------------------------------------------
   Saf (vanilla) JavaScript. Build aracı, kütüphane veya sunucu yok.
   Tüm metinler content.js içinden okunur.
   ===================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     0) YARDIMCILAR
     ------------------------------------------------------------------ */
  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /** İçerik nesnesinden "a.b.c" yolunu okur. */
  function get(obj, path) {
    if (!obj || !path) return '';
    var parts = String(path).split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur === null || typeof cur !== 'object') return '';
      cur = cur[parts[i]];
    }
    return (cur === undefined || cur === null) ? '' : cur;
  }

  /** prefers-reduced-motion tercihi. */
  function prefersReducedMotion() {
    return !!(window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /** HTML kaçışı (kullanıcı metinlerini güvenle yazar). */
  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /** HTML etiketlerini koruyan, satır sonlarını <br> yapan sadeleştirici. */
  function formatText(str) {
    return escapeHTML(str).replace(/\n/g, '<br>');
  }

  /* ------------------------------------------------------------------
     1) İÇERİĞİ BAĞLA
     ------------------------------------------------------------------
     data-content="hero.name" gibi işaretleri content.js'teki
     değerlerle doldurur. HTML'de yazılı varsayılanlar
     içerik dosyası yoksa da görünmeye devam eder.
     ------------------------------------------------------------------ */
  var CONTENT = window.ECRIN_CONTENT || {};

  function applyContent() {
    $$('[data-content]').forEach(function (el) {
      var value = get(CONTENT, el.getAttribute('data-content'));
      if (value !== '' && value !== null && value !== undefined) {
        el.textContent = value;
      }
    });

    // Sayfa meta bilgileri (sekme başlığı / paylaşım kartları)
    var title = get(CONTENT, 'site.title');
    if (title) {
      document.title = title;
      var ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);
    }

    var desc = get(CONTENT, 'site.description');
    if (desc) {
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', desc);
      var ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', desc);
    }
  }

  /* ------------------------------------------------------------------
     2) ANI KARTLARINI OLUŞTUR
     --------------------------------------------------------------------
     Sırayla: 1. kart solda (fotoğraf sol), 2. kart sağda...
     align değeri elle verilmişse o yön kullanılır.
     ------------------------------------------------------------------ */
  var PLACEHOLDER_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">' +
    '<rect x="3" y="4" width="18" height="16" rx="2"/>' +
    '<circle cx="8.5" cy="9.5" r="1.6"/>' +
    '<path d="m4 17 4.6-4.6a2 2 0 0 1 2.8 0L20 20" stroke-linecap="round"/>' +
    '</svg>';

  var ORNAMENT_SVG =
    '<svg viewBox="0 0 96 14" fill="none">' +
    '<path d="M2 7h30M64 7h30" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>' +
    '<path d="M48 1.5c2 2.4 3 4 3 5a3 3 0 0 1-6 0c0-1 1-2.6 3-5Z" stroke="currentColor" stroke-width="1"/>' +
    '</svg>';

  function buildMemories() {
    var list = $('#memoryList');
    if (!list) return;

    var memories = get(CONTENT, 'memories.items');
    if (!Array.isArray(memories) || memories.length === 0) {
      list.innerHTML =
        '<p class="noscript-note">Anılar bölümü için content.js dosyasına ' +
        'birkaç anı eklemelisin.</p>';
      return;
    }

    var showIndex = get(CONTENT, 'gallery.showIndex');
    var showFrame = get(CONTENT, 'gallery.showFrame');
    var frag = document.createDocumentFragment();

    memories.forEach(function (item, i) {
      item = item || {};

      var image    = item.image || '';
      var date     = item.date || '';
      var title    = item.title || '';
      var caption  = item.caption || '';
      var position = item.position || 'center';

      /* --- yön (varsayılan: dönüşümlü solda/sağda) --- */
      var align = item.align || (i % 2 === 0 ? 'left' : 'right');

      /* --- kart --- */
      var card = document.createElement('article');
      card.className = 'memory reveal';
      if (align === 'right') card.classList.add('memory--reverse');

      /* --- fotoğraf tarafı --- */
      var figure = document.createElement('figure');
      figure.className = 'memory__figure';

      if (showIndex) {
        var index = document.createElement('span');
        index.className = 'memory__index';
        index.textContent = (i + 1 < 10 ? '0' : '') + (i + 1);
        figure.appendChild(index);
      }

      var wrap = document.createElement('div');
      wrap.className = 'memory__img-wrap';

      if (image) {
        var img = document.createElement('img');
        img.className = 'memory__img';
        img.src = image;
        img.alt = title || ('Anı ' + (i + 1));
        img.loading = 'lazy';
        img.decoding = 'async';
        img.setAttribute('data-position', position);

        // Fotoğraf yoksa / yüklenemezse yer tutucu göster
        img.addEventListener('error', function () {
          wrap.classList.add('has-placeholder');
          var ph = wrap.querySelector('.memory__placeholder');
          if (ph) ph.classList.add('is-active');
        });
        img.addEventListener('load', function () {
          wrap.classList.remove('has-placeholder');
          var ph = wrap.querySelector('.memory__placeholder');
          if (ph) ph.classList.remove('is-active');
        });

        wrap.appendChild(img);
      }

      var placeholder = document.createElement('div');
      placeholder.className = 'memory__placeholder';
      placeholder.innerHTML = PLACEHOLDER_ICON +
        '<span>Fotoğraf buraya<br>' + escapeHTML(image || 'images/') + '</span>';
      if (!image) placeholder.classList.add('is-active');
      wrap.appendChild(placeholder);

      figure.appendChild(wrap);

      if (showFrame) {
        var frame = document.createElement('span');
        frame.className = 'memory__frame';
        frame.setAttribute('aria-hidden', 'true');
        figure.appendChild(frame);
      }

      card.appendChild(figure);

      /* --- metin tarafı --- */
      var body = document.createElement('div');
      body.className = 'memory__body';

      if (date) {
        var d = document.createElement('span');
        d.className = 'memory__date';
        d.textContent = date;
        body.appendChild(d);
      }

      if (title) {
        var t = document.createElement('h3');
        t.className = 'memory__title';
        t.textContent = title;
        body.appendChild(t);
      }

      var c = document.createElement('p');
      c.className = 'memory__caption';
      c.innerHTML = formatText(caption);
      body.appendChild(c);

      var orn = document.createElement('span');
      orn.className = 'memory__ornament';
      orn.setAttribute('aria-hidden', 'true');
      orn.innerHTML = ORNAMENT_SVG;
      body.appendChild(orn);

      card.appendChild(body);
      frag.appendChild(card);
    });

    list.innerHTML = '';
    list.appendChild(frag);
  }

  /* ------------------------------------------------------------------
     3) YAZILAN (TYPEWRITER) ANİMASYON
     ------------------------------------------------------------------ */
  function startTyping() {
    var el = $('#typing');
    if (!el) return;

    var text = get(CONTENT, 'hero.typingText');
    var speed = parseInt(get(CONTENT, 'hero.typingSpeed'), 10);
    if (!speed || speed < 10) speed = 45;

    var caret = '<span class="typing__caret" aria-hidden="true"></span>';

    el.innerHTML = caret;   // önceki içeriği temizle

    if (!text) return;

    // Azaltılmış hareket tercihinde mesajı anında göster
    if (prefersReducedMotion()) {
      el.innerHTML = escapeHTML(text) + caret;
      el.classList.add('is-done');
      return;
    }

    var i = 0;
    function type() {
      if (i <= text.length) {
        el.innerHTML = escapeHTML(text.slice(0, i)) + caret;
        i++;
        setTimeout(type, speed);
      } else {
        el.classList.add('is-done');
      }
    }
    setTimeout(type, 900);   // kısa başlangıç gecikmesi
  }

  /* ------------------------------------------------------------------
     4) SCROLL REVEAL — Intersection Observer
     ------------------------------------------------------------------ */
  function initReveal() {
    var items = $$('.reveal');
    if (!items.length) return;

    // Azaltılmış hareket veya eski tarayıcı: hepsini hemen göster
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      $$('.memory').forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-delay'), 10) || 0;
        el.style.setProperty('--delay', delay + 'ms');
        el.classList.add('is-visible');

        observer.unobserve(el);
      });
    }, {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px'
    });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------------------
     5) ÜST ÇUBUK (sabit) — kaydırma durumu
     ------------------------------------------------------------------ */
  function initTopbar() {
    var bar = $('#topbar');
    if (!bar) return;

    function onScroll() {
      if (window.scrollY > 24) {
        bar.classList.add('is-stuck');
      } else {
        bar.classList.remove('is-stuck');
      }
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
     6) YUMUŞAK KAYDIRMA
     ------------------------------------------------------------------
     Üst çubuk yüksekliği kadar boşluk bırakarak hedefe kaydırır
     ve klavyeyle gezinenler için hedefe odaklanır.
     ------------------------------------------------------------------ */
  function initSmoothScroll() {
    var links = $$('a[href^="#"]');
    if (!links.length) return;

    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (!id || id === '#') return;

        var target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();

        var topbar = $('#topbar');
        var offset = topbar ? topbar.offsetHeight + 12 : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: top,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });

        // Klavye / ekran okuyucu için hedefe odaklan
        if (!target.hasAttribute('tabindex')) {
          target.setAttribute('tabindex', '-1');
        }
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ------------------------------------------------------------------
     7) MÜZİK
     ------------------------------------------------------------------
     • Ses ASLA otomatik başlamaz.
     • Dosya yoksa buton gizlenir, site çalışmaya devam eder.
     ------------------------------------------------------------------ */
  function initMusic() {
    var btn = $('#musicBtn');
    var audio = $('#bgMusic');
    if (!btn || !audio) return;

    var src = get(CONTENT, 'music.src');
    var playLabel = get(CONTENT, 'music.playLabel') || 'Müziği Aç';
    var pauseLabel = get(CONTENT, 'music.pauseLabel') || 'Müziği Kapat';
    var volume = parseFloat(get(CONTENT, 'music.volume'));

    // Müzik tanımlı değilse butonu gizle
    if (!src) {
      btn.classList.add('is-unavailable');
      btn.hidden = true;
      return;
    }

    audio.src = src;
    audio.loop = true;
    if (!isNaN(volume) && volume >= 0) {
      audio.volume = Math.min(1, volume);
    }

    var label = $('.music-btn__label', btn);
    if (label) label.textContent = playLabel;

    btn.hidden = false;

    function setPlaying(isPlaying) {
      btn.classList.toggle('is-playing', isPlaying);
      btn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
      if (label) label.textContent = isPlaying ? pauseLabel : playLabel;
    }

    function hideUnavailable() {
      btn.classList.add('is-unavailable');
      btn.hidden = true;
    }

    btn.addEventListener('click', function () {
      if (audio.paused) {
        var promise = audio.play();
        if (promise && typeof promise.catch === 'function') {
          promise.catch(hideUnavailable);
        }
      } else {
        audio.pause();
      }
    });

    audio.addEventListener('play',  function () { setPlaying(true); });
    audio.addEventListener('pause', function () { setPlaying(false); });
    audio.addEventListener('error', hideUnavailable);

    // Dosyanın gerçekten var olduğunu erkenden denetle.
    // (preload="none" olduğu için tarayıcı yüklemeyi kendiliğinden yapmaz.)
    try {
      audio.load();
    } catch (e) {
      hideUnavailable();
    }
  }

  /* ------------------------------------------------------------------
     8) YIL
     ------------------------------------------------------------------ */
  function initYear() {
    var el = $('#year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------
     9) HERO'DA YUMUŞAK PARALLAKS (çok hafif)
     ------------------------------------------------------------------ */
  function initParallax() {
    if (prefersReducedMotion()) return;
    var glow = $('.hero__glow');
    if (!glow) return;

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight) {
          glow.style.transform = 'translateX(-50%) translateY(' + (y * 0.12) + 'px)';
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
     10) BAŞLAT
     ------------------------------------------------------------------ */
  function init() {
    applyContent();
    buildMemories();
    startTyping();
    initReveal();
    initTopbar();
    initSmoothScroll();
    initMusic();
    initYear();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();