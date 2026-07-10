/* KAGBENI — site engine */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- Preloader ---------- */
  var loader = document.querySelector('.loader');
  if (loader && !reduced) {
    var altEl = loader.querySelector('[data-alt]');
    var t0 = performance.now();
    var DUR = 1400;
    (function tick(now) {
      var p = Math.min((now - t0) / DUR, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      if (altEl) altEl.textContent = 'ALT ' + Math.round(2804 * eased).toString().padStart(4, '0') + ' M';
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    var closeLoader = function () {
      setTimeout(function () { loader.classList.add('is-done'); }, 1550);
      setTimeout(function () { loader.remove(); }, 2800);
    };
    if (document.readyState === 'complete') closeLoader();
    else window.addEventListener('load', closeLoader);
    /* Hard fallback: never trap the visitor behind the curtain */
    setTimeout(function () {
      if (document.body.contains(loader)) {
        loader.classList.add('is-done');
        setTimeout(function () { loader.remove(); }, 1200);
      }
    }, 4200);
  } else if (loader) {
    loader.remove();
  }

  /* ---------- Fit the giant hero word to the viewport ---------- */
  var heroTitle = document.querySelector('.hero__title');
  function fitTitle() {
    if (!heroTitle) return;
    heroTitle.style.fontSize = '';
    var base = parseFloat(getComputedStyle(heroTitle).fontSize);
    var avail = heroTitle.clientWidth;
    var need = heroTitle.scrollWidth;
    if (need > avail) {
      heroTitle.style.fontSize = Math.floor(base * (avail / need) * 0.985) + 'px';
    }
  }
  fitTitle();
  window.addEventListener('resize', fitTitle);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTitle);

  /* ---------- Scroll progress ---------- */
  var progress = document.querySelector('.progress b');

  /* ---------- Header hide/show ---------- */
  var head = document.querySelector('.site-head');
  var lastY = 0;

  function onScroll() {
    var y = window.scrollY;
    if (head) {
      head.classList.toggle('is-solid', y > 60);
      if (y > 300 && y > lastY && !document.body.classList.contains('menu-open')) {
        head.classList.add('is-hidden');
      } else {
        head.classList.remove('is-hidden');
      }
      lastY = y;
    }
    if (progress) {
      var max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.site-nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Cursor dot ---------- */
  if (finePointer && !reduced) {
    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
    var dx = -100, dy = -100, cx = -100, cy = -100;
    document.addEventListener('mousemove', function (e) { dx = e.clientX; dy = e.clientY; });
    (function loop() {
      cx += (dx - cx) * 0.22;
      cy += (dy - cy) * 0.22;
      dot.style.left = cx + 'px';
      dot.style.top = cy + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('mouseenter', function () { dot.classList.add('is-grown'); });
      el.addEventListener('mouseleave', function () { dot.classList.remove('is-grown'); });
    });
  }

  /* ---------- Reveal on scroll (threshold 0: works for any element height) ---------- */
  var revs = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !reduced) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('on'); rio.unobserve(en.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -7% 0px' });
    revs.forEach(function (el) { rio.observe(el); });
  } else {
    revs.forEach(function (el) { el.classList.add('on'); });
  }

  /* ---------- Manifesto: light words up as they pass ---------- */
  var mani = document.querySelector('.manifesto');
  if (mani) {
    var words = mani.querySelectorAll('.w');
    if ('IntersectionObserver' in window && !reduced) {
      var wio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var el = en.target;
            var i = Array.prototype.indexOf.call(words, el);
            setTimeout(function () { el.classList.add('lit'); }, (i % 14) * 55);
            wio.unobserve(el);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px -18% 0px' });
      words.forEach(function (w) { wio.observe(w); });
    } else {
      words.forEach(function (w) { w.classList.add('lit'); });
    }
  }

  /* ---------- Story: sticky image crossfade ---------- */
  var steps = document.querySelectorAll('.step');
  var storyImgs = document.querySelectorAll('.story__frame img');
  var storyCap = document.querySelector('.story__caption');
  if (steps.length && storyImgs.length) {
    function setStory(i) {
      storyImgs.forEach(function (img, k) { img.classList.toggle('is-on', k === i); });
      steps.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
      if (storyCap) storyCap.textContent = storyImgs[i].dataset.caption || '';
    }
    setStory(0);
    if ('IntersectionObserver' in window) {
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            setStory(Array.prototype.indexOf.call(steps, en.target));
          }
        });
      }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });
      steps.forEach(function (s) { sio.observe(s); });
    }
  }

  /* ---------- Journey: scroll-driven horizontal rail ---------- */
  var journey = document.querySelector('.journey');
  if (journey) {
    var rail = journey.querySelector('.journey__rail');
    var useNative = reduced || !finePointer || innerWidth < 900;
    if (useNative) {
      journey.classList.add('is-native');
    } else {
      function span() { return rail.scrollWidth - document.documentElement.clientWidth; }
      function sizeJourney() {
        journey.style.height = (span() + innerHeight * 1.35) + 'px';
      }
      sizeJourney();
      window.addEventListener('resize', function () {
        if (innerWidth < 900) { journey.classList.add('is-native'); journey.style.height = ''; rail.style.transform = ''; }
        else { journey.classList.remove('is-native'); sizeJourney(); }
      });
      window.addEventListener('scroll', function () {
        if (journey.classList.contains('is-native')) return;
        var r = journey.getBoundingClientRect();
        var total = journey.offsetHeight - innerHeight;
        var p = Math.min(Math.max(-r.top / total, 0), 1);
        rail.style.transform = 'translateX(' + (-span() * p) + 'px)';
      }, { passive: true });
    }
  }

  /* ---------- Season tabs ---------- */
  var tabs = document.querySelectorAll('.season-tabs button');
  var panels = document.querySelectorAll('.season-panel');
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
      panels.forEach(function (p, k) { p.classList.toggle('is-on', k === i); });
    });
    tab.addEventListener('keydown', function (e) {
      var next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
      if (next === null) return;
      var t = tabs[(next + tabs.length) % tabs.length];
      t.click(); t.focus();
    });
  });

  /* ---------- Accordion ---------- */
  document.querySelectorAll('.acc__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.acc__item');
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------- Lightbox ---------- */
  var shots = Array.prototype.slice.call(document.querySelectorAll('[data-shot]'));
  if (shots.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML =
      '<span class="lightbox__meta"></span><img alt="">' +
      '<button class="c" aria-label="Close">&times;</button>' +
      '<button class="p" aria-label="Previous">&larr;</button>' +
      '<button class="n" aria-label="Next">&rarr;</button>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    var lbMeta = lb.querySelector('.lightbox__meta');
    var cur = 0;
    function show(i) {
      cur = (i + shots.length) % shots.length;
      lbImg.src = shots[cur].getAttribute('href');
      lbImg.alt = (shots[cur].querySelector('img') || {}).alt || 'Photograph of Kagbeni';
      lbMeta.textContent = String(cur + 1).padStart(2, '0') + ' / ' + String(shots.length).padStart(2, '0') +
        '  —  ' + (shots[cur].dataset.label || 'KAGBENI');
    }
    function openLb(i) { show(i); lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
    function closeLb() { lb.classList.remove('is-open'); document.body.style.overflow = ''; }
    shots.forEach(function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); openLb(i); });
    });
    lb.querySelector('.c').addEventListener('click', closeLb);
    lb.querySelector('.p').addEventListener('click', function () { show(cur - 1); });
    lb.querySelector('.n').addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  /* ---------- Marquee: duplicate for seamless loop ---------- */
  document.querySelectorAll('.marquee__track').forEach(function (t) {
    t.innerHTML += t.innerHTML;
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
