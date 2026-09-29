/* ProFluencer Awards — shared shell: header, footer, countdown, reveal, toast */
(function () {
  'use strict';

  var PAGE = document.body.getAttribute('data-page') || '';

  var NAV = [
    { href: 'index.html',      label: 'Home',       key: 'home' },
    { href: 'categories.html', label: 'Categories', key: 'categories' },
    { href: 'nominees.html',   label: 'Nominees',   key: 'nominees' },
    { href: 'event.html',      label: 'Event',      key: 'event' },
    { href: 'sponsors.html',   label: 'Sponsors',   key: 'sponsors' },
    { href: 'news.html',       label: 'News',       key: 'news' },
    { href: 'contact.html',    label: 'Contact',    key: 'contact' }
  ];

  function navHTML() {
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '" class="' + (PAGE === n.key ? 'active' : '') + '">' + n.label + '</a>';
    }).join('');
    return '' +
      '<div class="container nav-inner">' +
        '<a class="brand" href="index.html"><img src="assets/img/logo-clean.png" alt="ProFluencer Awards Dubai 2026 logo"></a>' +
        '<nav class="nav-links">' + links + '</nav>' +
        '<a class="btn btn-gold btn-sm nav-cta" href="login.html">Influencer Login</a>' +
        '<button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>' +
      '</div>' +
      '<div class="mobile-menu" id="mmenu">' +
        NAV.map(function (n) { return '<a href="' + n.href + '">' + n.label + '</a>'; }).join('') +
        '<a href="login.html" style="color:var(--gold-lt);font-weight:800">Influencer Login</a>' +
        '<a href="admin.html" style="color:var(--muted)">Admin Portal</a>' +
      '</div>';
  }

  function footHTML() {
    var y = new Date().getFullYear();
    return '' +
      '<div class="container">' +
        '<div class="foot-grid">' +
          '<div>' +
            '<a class="brand" href="index.html" style="margin-bottom:14px"><img src="assets/img/logo-clean.png" alt="ProFluencer Awards Dubai 2026 logo" style="height:54px"></a>' +
            '<p style="color:var(--muted);font-size:14px;max-width:300px;margin-top:12px">The region\u2019s most prestigious celebration of digital influence. 10 industries, 50 awards, decided by public vote.</p>' +
          '</div>' +
          '<div><h4>Awards</h4>' +
            '<a href="categories.html">Categories</a>' +
            '<a href="nominees.html">Nominee Directory</a>' +
            '<a href="voting.html">How Voting Works</a>' +
            '<a href="results.html">Results</a>' +
            '<a href="nominate.html">Nominate Yourself</a></div>' +
          '<div><h4>Portals</h4>' +
            '<a href="login.html">Influencer Login</a>' +
            '<a href="dashboard.html">My Dashboard</a>' +
            '<a href="event.html">Ceremony & RSVP</a>' +
            '<a href="sponsors.html">Sponsors</a>' +
            '<a href="admin.html">Admin Portal</a></div>' +
          '<div><h4>Support</h4>' +
            '<a href="contact.html">Contact Us</a>' +
            '<a href="terms.html">Terms & Voting Rules</a>' +
            '<a href="privacy.html">Privacy Policy</a></div>' +
        '</div>' +
        '<div class="foot-bottom"><span>\u00A9 ' + y + ' ProFluencer Awards \u00B7 profluencerawards.com</span><span>Voting Oct 15 \u2013 Nov 30, 2026 \u00B7 Ceremony Dec 11</span></div>' +
      '</div>';
  }

  function mount() {
    var h = document.getElementById('site-header');
    if (h) { h.innerHTML = navHTML(); h.classList.add('site-header'); }
    var f = document.getElementById('site-footer');
    if (f) f.innerHTML = footHTML();
    var b = document.getElementById('burger'), m = document.getElementById('mmenu');
    if (b && m) b.addEventListener('click', function () { m.classList.toggle('open'); });
    var hdr = document.querySelector('.site-header');
    function onScroll() { if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 24); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  function targetMs() {
    try { return new Date(window.PFA ? PFA.countdownTarget() : '2026-11-30T23:59:59+04:00').getTime(); }
    catch (e) { return Date.now(); }
  }

  function votingNote() {
    if (!window.PFA) return '';
    var st = PFA.votingState(), s = PFA.settings();
    if (st === 'upcoming') return 'Voting opens Oct 15, 2026';
    if (st === 'closed') return s.resultsPublished ? 'Winners announced — see results' : 'Voting closed — results under review';
    return 'Voting closes Nov 30, 2026';
  }

  function tick() {
    var diff = Math.max(0, targetMs() - Date.now());
    var d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24,
        m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
    function set(sel, v) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.textContent = (v < 10 ? '0' : '') + v;
      });
    }
    set('[data-cd-d]', d); set('[data-cd-h]', h); set('[data-cd-m]', m); set('[data-cd-s]', s);
    var note = votingNote();
    document.querySelectorAll('[data-cd-note]').forEach(function (el) { el.textContent = note; });
  }

  function reveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }
  function revealScope(root) {
    var els = root.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    els.forEach(function (e) { io.observe(e); });
  }

  function toast(msg) {
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.faq-item button');
    if (btn) btn.parentElement.classList.toggle('open');
  });

  function copyText(txt, msg) {
    function done() { toast(msg || 'Copied to clipboard'); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, function () { fallback(); });
    } else fallback();
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    mount(); tick(); setInterval(tick, 1000); reveal();
  });

  window.APP = { toast: toast, copyText: copyText, revealScope: revealScope, votingNote: votingNote };
})();
