// Gallery: filter buttons, masonry grid and lightbox. Photos come from gallery-data.js
(function () {
  var data = (window.GALLERY || []).slice();
  var grid = document.getElementById('g-grid');
  var filters = document.getElementById('g-filters');
  var empty = document.getElementById('g-empty');
  if (!grid) return;

  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lb-img');
  var lbTitle = document.getElementById('lb-title');
  var lbCat = document.getElementById('lb-cat');
  var lbCount = document.getElementById('lb-count');
  var current = 'All';
  var visible = [];
  var index = 0;
  var lastFocus = null;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Filter buttons from the categories in use
  var cats = ['All'];
  data.forEach(function (d) { if (d.category && cats.indexOf(d.category) < 0) cats.push(d.category); });
  filters.innerHTML = cats.map(function (c) {
    return '<button type="button" role="tab" class="g-f' + (c === current ? ' is-on' : '') + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
  }).join('');
  if (cats.length < 3) filters.hidden = true; // no point filtering one category

  function render() {
    visible = data.filter(function (d) { return current === 'All' || d.category === current; });
    grid.innerHTML = visible.map(function (d, i) {
      return '<figure class="g-item" data-i="' + i + '" tabindex="0" role="button" aria-label="Open photo: ' + esc(d.title) + '">' +
        '<img src="' + esc(d.src) + '" alt="' + esc(d.alt || d.title) + '" loading="lazy">' +
        '<figcaption><strong>' + esc(d.title) + '</strong><span>' + esc(d.category) + '</span></figcaption>' +
        '</figure>';
    }).join('');
    empty.hidden = visible.length > 0;
  }

  filters.addEventListener('click', function (e) {
    var b = e.target.closest('.g-f');
    if (!b) return;
    current = b.dataset.cat;
    filters.querySelectorAll('.g-f').forEach(function (x) { x.classList.toggle('is-on', x === b); });
    render();
  });

  // Lightbox
  function show(i) {
    index = (i + visible.length) % visible.length;
    var d = visible[index];
    lbImg.src = d.src;
    lbImg.alt = d.alt || d.title;
    lbTitle.textContent = d.title;
    lbCat.textContent = d.category;
    lbCount.textContent = (index + 1) + ' / ' + visible.length;
  }
  function open(i) {
    lastFocus = document.activeElement;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    show(i);
    document.getElementById('lb-close').focus();
  }
  function close() {
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  grid.addEventListener('click', function (e) {
    var f = e.target.closest('.g-item');
    if (f) open(+f.dataset.i);
  });
  grid.addEventListener('keydown', function (e) {
    var f = e.target.closest('.g-item');
    if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(+f.dataset.i); }
  });
  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', function () { show(index - 1); });
  document.getElementById('lb-next').addEventListener('click', function () { show(index + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  render();
})();
