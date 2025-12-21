import serviceWebApps from '../img/service-web-apps.svg';
import serviceAutomation from '../img/service-automation.svg';
import servicePlatform from '../img/service-platform.svg';
import serviceDesktop from '../img/service-desktop.svg';

document.addEventListener('DOMContentLoaded', () => {
  const navbarNav = document.getElementById('navbarNav');
  const navbarToggler = document.getElementById('navbar-toggler');
  const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]')).filter(
    (link) => link.getAttribute('href') !== '#'
  );
  const navLinks = anchorLinks.filter((link) => link.closest('#navbarNav'));

  const collapseNav = () => {
    if (!navbarNav || !navbarNav.classList.contains('show')) return;
    navbarNav.classList.remove('show');
    if (navbarToggler) {
      navbarToggler.classList.add('collapsed');
      navbarToggler.setAttribute('aria-expanded', 'false');
    }
  };

  if (navbarToggler && navbarNav) {
    navbarToggler.addEventListener('click', () => {
      const isOpen = navbarNav.classList.toggle('show');
      navbarToggler.classList.toggle('collapsed', !isOpen);
      navbarToggler.setAttribute('aria-expanded', String(isOpen));
    });
  }

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href')?.substring(1);
      const target = targetId ? document.getElementById(targetId) : null;

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `#${targetId}`);
      }

      collapseNav();
    });
  });

  const setActiveSection = (id) => {
    navLinks.forEach((link) => {
      const targetId = link.getAttribute('href')?.substring(1);
      const isActive = targetId === id;
      link.classList.toggle('active', isActive);
      link.parentElement?.classList.toggle('active', isActive);
    });
  };

  const observedSections = navLinks
    .map((link) => link.getAttribute('href')?.substring(1))
    .filter(Boolean)
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (observedSections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    observedSections.forEach((section) => observer.observe(section));
  }

  const currentHash = window.location.hash.replace('#', '');
  if (currentHash) {
    setActiveSection(currentHash);
  }

  const serviceIcons = {
    'service-icon-web-apps': serviceWebApps,
    'service-icon-automation': serviceAutomation,
    'service-icon-platform': servicePlatform,
    'service-icon-desktop': serviceDesktop,
  };

  Object.entries(serviceIcons).forEach(([id, src]) => {
    const icon = document.getElementById(id);
    if (icon) {
      icon.src = src;
    }
  });
});
