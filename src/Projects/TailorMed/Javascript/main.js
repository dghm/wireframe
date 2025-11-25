// TailorMed Wireframe - 基礎互動腳本

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburgerMenu && mobileNav) {
    hamburgerMenu.addEventListener('click', function() {
      hamburgerMenu.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = hamburgerMenu.contains(event.target) || mobileNav.contains(event.target);
      if (!isClickInside && mobileNav.classList.contains('active')) {
        hamburgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
      }
    });
  }
});
