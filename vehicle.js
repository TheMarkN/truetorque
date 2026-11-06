// Vehicle / part selector for Oil, Brakes, Suspension, Batteries and Wipers pages.
// NOTE: the make/model list below is a starter dataset for the prototype.
(function () {
  var KEY = 'tt_vehicle';
  var MODELS = {
    'Toyota': ['Allion', 'Axio', 'Corolla', 'Fielder', 'Harrier', 'Hiace', 'Hilux', 'Land Cruiser V8', 'Passo', 'Premio', 'Prado', 'Probox', 'RAV4', 'Vitz', 'Wish'],
    'Nissan': ['Juke', 'March', 'Navara', 'Note', 'Serena', 'Sylphy', 'Tiida', 'X-Trail'],
    'Subaru': ['Forester', 'Impreza', 'Legacy', 'Outback', 'XV'],
    'Mazda': ['Atenza', 'Axela', 'CX-3', 'CX-5', 'Demio'],
    'Honda': ['Civic', 'CR-V', 'Fit', 'Vezel'],
    'Mitsubishi': ['ASX', 'L200', 'Lancer', 'Outlander', 'Pajero'],
    'Isuzu': ['D-Max', 'MU-X', 'NPR'],
    'Suzuki': ['Alto', 'Jimny', 'Swift', 'Vitara'],
    'Volkswagen': ['Golf', 'Passat', 'Polo', 'Tiguan'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC'],
    'BMW': ['3 Series', '5 Series', 'X3', 'X5'],
    'Land Rover': ['Defender', 'Discovery', 'Range Rover Sport'],
    'Ford': ['Everest', 'Focus', 'Ranger']
  };
  var CC = ['660', '1000', '1200', '1300', '1500', '1600', '1800', '2000', '2400', '2500', '2800', '3000', '3500', '4000', '4500'];
  var YEARS = [];
  for (var y = new Date().getFullYear(); y >= 2000; y--) YEARS.push(String(y));
  var TRIMS = ['Base', 'Standard', 'Sport', 'Luxury', 'Hybrid', '4WD'];

  var root = document.querySelector('.vsel');
  if (!root) return;
  var category = root.dataset.category;
  var card = document.getElementById('vsel-card');
  var gate = document.getElementById('gate');
  var results = document.getElementById('results');
  var vehText = document.getElementById('veh-text');

  function fill(sel, list) {
    sel.innerHTML = '<option value="" selected disabled hidden></option>' +
      list.map(function (o) { return '<option value="' + o + '">' + o + '</option>'; }).join('');
  }

  // Tabs
  root.querySelectorAll('.tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      root.querySelectorAll('.tab').forEach(function (t) {
        t.classList.toggle('is-on', t === tab);
        t.setAttribute('aria-selected', t === tab);
      });
      root.querySelectorAll('.vpanel').forEach(function (p) {
        p.classList.toggle('is-on', p.id === tab.dataset.panel);
      });
    });
  });

  // Make & Model form: cascading selects
  var formMake = document.getElementById('v-make');
  var order = ['make', 'model', 'cc', 'year', 'trim'].map(function (id) { return document.getElementById(id); });
  fill(order[0], Object.keys(MODELS));
  fill(order[2], CC.map(function (c) { return c; }));
  fill(order[3], YEARS);
  fill(order[4], TRIMS);

  function updateMake(e) {
    if (e && e.target === order[0]) {
      fill(order[1], MODELS[order[0].value] || []);
      // reset downstream choices when make changes
      [2, 3, 4].forEach(function (i) { order[i].selectedIndex = 0; });
    }
    if (e && e.target === order[1]) {
      [2, 3, 4].forEach(function (i) { order[i].selectedIndex = 0; });
    }
    var all = true;
    order.forEach(function (sel, i) {
      var prev = i === 0 || !!order[i - 1].value;
      sel.disabled = !prev;
      sel.parentElement.classList.toggle('is-disabled', !prev);
      if (!prev) sel.selectedIndex = 0;
      if (!sel.value) all = false;
    });
    formMake.querySelector('button[type=submit]').disabled = !all;
  }
  formMake.addEventListener('change', updateMake);
  formMake.addEventListener('reset', function () {
    setTimeout(function () { fill(order[1], []); updateMake(); }, 0);
  });
  updateMake();

  // Service Part form
  var formPart = document.getElementById('v-part');
  var partSel = document.getElementById('part');
  fill(partSel, JSON.parse(formPart.dataset.parts));
  formPart.addEventListener('change', function () {
    formPart.querySelector('button[type=submit]').disabled = !partSel.value;
  });
  formPart.addEventListener('reset', function () {
    setTimeout(function () { formPart.querySelector('button[type=submit]').disabled = true; }, 0);
  });

  // Show / hide
  function show(summary) {
    vehText.textContent = summary;
    card.hidden = true;
    gate.hidden = true;
    results.hidden = false;
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function save(summary) {
    try { sessionStorage.setItem(KEY, summary); } catch (e) {}
  }

  formMake.addEventListener('submit', function (e) {
    e.preventDefault();
    var s = order[0].value + ' ' + order[1].value + ' · ' + order[2].value + 'cc · ' + order[3].value + ' · ' + order[4].value;
    save(s); show(s);
  });
  formPart.addEventListener('submit', function (e) {
    e.preventDefault();
    var s = 'Part: ' + partSel.value;
    save(s); show(s);
  });

  document.getElementById('veh-change').addEventListener('click', function () {
    try { sessionStorage.removeItem(KEY); } catch (e) {}
    results.hidden = true;
    gate.hidden = false;
    card.hidden = false;
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Remember the vehicle across the selector pages in this visit
  var saved = null;
  try { saved = sessionStorage.getItem(KEY); } catch (e) {}
  if (saved) {
    vehText.textContent = saved;
    card.hidden = true;
    gate.hidden = true;
    results.hidden = false;
  }
})();
