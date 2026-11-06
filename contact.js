// Contact form: opens the visitor's email app with the message pre-filled.
// (Static site, so there is no server to send mail. Swap for a form service later.)
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(form);
    var body = [
      'Name: ' + (f.get('first') || '') + ' ' + (f.get('last') || ''),
      'Phone: ' + (f.get('phone') || ''),
      'Email: ' + (f.get('email') || ''),
      'Service: ' + (f.get('service') || ''),
      '',
      f.get('message') || ''
    ].join('\n');
    var subject = 'Website enquiry' + (f.get('service') ? ' - ' + f.get('service') : '');
    window.location.href = 'mailto:sales@truetorque.co.ke?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    document.getElementById('form-note').hidden = false;
  });
})();
