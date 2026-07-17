(function () {
  'use strict';

  // Why-LSN expand toggles
  var togs = document.querySelectorAll('.why-card .tog');
  Array.prototype.forEach.call(togs, function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var target = document.getElementById(btn.getAttribute('aria-controls'));
      if (!target) return;
      btn.setAttribute('aria-expanded', String(!expanded));
      target.setAttribute('aria-hidden', String(expanded));
      target.classList.toggle('open', !expanded);
      var ic = btn.querySelector('.ic');
      if (ic) ic.textContent = expanded ? '+' : '−';
    });
  });

  // Sticky "Train My Team" CTA — show after scroll past hero, hide when enquiry form is in view
  var stickyCta = document.getElementById('stickycta');
  var form = document.getElementById('enquiry-form');
  if (stickyCta) {
    var formVisible = false;
    var update = function () {
      var shouldShow = window.scrollY > 500 && !formVisible;
      stickyCta.classList.toggle('on', shouldShow);
    };
    if (form && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        formVisible = entries[0].isIntersecting;
        update();
      }, { rootMargin: '-80px 0px' }).observe(form);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // Popular Training — hydrate from courses.json (static HTML is fallback if fetch fails)
  var popular = document.getElementById('popular-grid');
  if (popular && window.fetch) {
    fetch('/assets/courses.json')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !Array.isArray(data.courses)) return;
        popular.innerHTML = data.courses.map(courseCard).join('');
      })
      .catch(function () { /* keep static fallback */ });
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function courseCard(c) {
    var meta = [];
    if (c.whoFor)   meta.push('<li><span class="k">Who it’s for</span><span>' + esc(c.whoFor)   + '</span></li>');
    if (c.delivery) meta.push('<li><span class="k">Delivery</span><span>'          + esc(c.delivery) + '</span></li>');
    if (c.duration) meta.push('<li><span class="k">Duration</span><span>'          + esc(c.duration) + '</span></li>');
    if (c.cpd)      meta.push('<li><span class="k">CPD</span><span>'               + esc(c.cpd)      + '</span></li>');
    return '<article class="course">' +
      '<h3>' + esc(c.title) + '</h3>' +
      '<p class="cshort">' + esc(c.short) + '</p>' +
      '<ul class="cmeta">' + meta.join('') + '</ul>' +
      (c.price ? '<div class="cprice">' + esc(c.price) + '</div>' : '') +
      '<div class="cbtns">' +
        '<a class="btn btn-bl btn-sm" href="#">View course</a>' +
        '<a class="btn btn-ghost btn-sm" href="#enquiry-form">Train my team</a>' +
      '</div>' +
    '</article>';
  }
})();
