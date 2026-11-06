// Finder widget behaviour
(function () {
  var finder = document.getElementById('finder-card');
  if (!finder) return;

  // Top tabs (Shop Tyres / Book a Service)
  finder.querySelectorAll('.tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      finder.querySelectorAll('.tab').forEach(function (t) {
        t.classList.toggle('is-on', t === tab);
        t.setAttribute('aria-selected', t === tab);
      });
      finder.querySelectorAll('.panel').forEach(function (p) {
        p.classList.toggle('is-on', p.id === tab.dataset.panel);
      });
    });
  });

  // Sub tabs (By Tyre Size / By Vehicle)
  finder.querySelectorAll('.seg-b').forEach(function (b) {
    b.addEventListener('click', function () {
      var seg = b.parentElement;
      seg.querySelectorAll('.seg-b').forEach(function (x) { x.classList.toggle('is-on', x === b); });
      var panel = seg.parentElement;
      panel.querySelectorAll('.sub').forEach(function (f) { f.classList.toggle('is-on', f.id === b.dataset.sub); });
    });
  });

  // Cascading selects: each field unlocks when the previous one is chosen
  finder.querySelectorAll('form').forEach(function (form) {
    var fields = Array.prototype.slice.call(form.querySelectorAll('.field'));
    var submit = form.querySelector('button[type=submit]');

    function update() {
      var allSet = true;
      fields.forEach(function (f, i) {
        var input = f.querySelector('select,input');
        var prevSet = i === 0 || !!fields[i - 1].querySelector('select,input').value;
        var wasDisabled = input.disabled;
        input.disabled = !prevSet;
        f.classList.toggle('is-disabled', !prevSet);
        if (!prevSet && !wasDisabled) input.selectedIndex = 0;
        if (!input.value) allSet = false;
      });
      submit.disabled = !allSet;
    }

    form.addEventListener('change', update);
    form.addEventListener('reset', function () { setTimeout(update, 0); });
    update();
  });

  // Date: no past dates
  var d = document.getElementById('when');
  if (d) d.min = new Date().toISOString().split('T')[0];
})();
