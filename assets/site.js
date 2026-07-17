(function () {
  'use strict';
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
})();
