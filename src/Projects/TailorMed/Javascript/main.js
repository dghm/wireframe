// TailorMed Wireframe - 基礎互動腳本

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburgerMenu && mobileNav) {
    hamburgerMenu.addEventListener('click', function () {
      hamburgerMenu.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
      const isClickInside =
        hamburgerMenu.contains(event.target) ||
        mobileNav.contains(event.target);
      if (!isClickInside && mobileNav.classList.contains('active')) {
        hamburgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        const isActive = item.classList.contains('active');
        // Close all FAQ items
        faqItems.forEach(function (faqItem) {
          faqItem.classList.remove('active');
        });
        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Language Switcher Toggle
  const languageSwitcher = document.querySelector('.language-switcher-fixed');
  const languageSwitcherBtn = document.querySelector('.language-switcher-btn');

  if (languageSwitcher && languageSwitcherBtn) {
    languageSwitcherBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      languageSwitcher.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (event) {
      if (!languageSwitcher.contains(event.target)) {
        languageSwitcher.classList.remove('active');
      }
    });

    // Handle language option clicks
    const languageOptions = document.querySelectorAll(
      '.language-switcher-option'
    );
    languageOptions.forEach(function (option) {
      option.addEventListener('click', function (e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        const langText = this.querySelector('span').textContent.trim();

        // Update button text
        const buttonText = languageSwitcherBtn.querySelector(
          '.language-switcher-text'
        );
        if (buttonText) {
          buttonText.textContent = langText;
        }

        // Close dropdown
        languageSwitcher.classList.remove('active');

        // Here you can add actual language switching logic
        // For example: window.location.href = `?lang=${lang}`;
        console.log('Language switched to:', lang);
      });
    });
  }
});
