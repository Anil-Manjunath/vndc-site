document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.nav--mobile');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function () {
    var opened = mobileNav.classList.toggle('open');
    this.setAttribute('aria-expanded', opened ? 'true' : 'false');
    mobileNav.setAttribute('aria-hidden', opened ? 'false' : 'true');
  });

  // Close when clicking a link inside mobile nav
  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    }
  });
});