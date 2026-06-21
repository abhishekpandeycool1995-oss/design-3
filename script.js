// ===== Page Transition =====
(function () {
  const transition = document.querySelector('.page-transition');
  if (transition) {
    transition.classList.remove('active');
    document.querySelectorAll('a[href]:not([href^="#"]):not([href*="javascript"]):not([target="_blank"])').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.endsWith('.html') && !href.startsWith('http')) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          transition.classList.add('active');
          setTimeout(function () {
            window.location.href = href;
          }, 500);
        });
      }
    });
  }
})();

// ===== Sticky Header =====
(function () {
  var header = document.querySelector('.header');
  if (!header) return;
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (window.scrollY > 80) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== Mobile Hamburger =====
(function () {
  var hamburger = document.querySelector('.hamburger');
  var nav = document.querySelector('.header-nav');
  if (!hamburger || !nav) return;
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ===== IntersectionObserver for Reveal Animations =====
(function () {
  var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealElements.length) return;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  revealElements.forEach(function (el) {
    observer.observe(el);
  });
})();

// ===== Counter Animation =====
(function () {
  var counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          var value = target.textContent.replace(/[^0-9.]/g, '');
          var hasSuffix = target.textContent.replace(/[0-9.]/g, '');
          var start = 0;
          var end = parseFloat(value);
          var duration = 2000;
          var startTime = null;
          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * end);
            target.textContent = current + hasSuffix;
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              target.textContent = value + hasSuffix;
            }
          }
          window.requestAnimationFrame(step);
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach(function (el) {
    observer.observe(el);
  });
})();

// ===== FAQ Accordion =====
(function () {
  var faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', function () {
      var isActive = item.classList.contains('active');
      faqItems.forEach(function (el) { el.classList.remove('active'); });
      if (!isActive) item.classList.add('active');
    });
  });
})();

// ===== Smooth Scroll =====
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// ===== Form Validation =====
(function () {
  var forms = document.querySelectorAll('form');
  if (!forms.length) return;
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var valid = true;
      var inputs = form.querySelectorAll('input[required], textarea[required]');
      inputs.forEach(function (input) {
        var group = input.closest('.form-group');
        if (!group) return;
        if (!input.value.trim()) {
          group.classList.add('error');
          valid = false;
        } else {
          group.classList.remove('error');
        }
        if (input.type === 'email' && input.value.trim()) {
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            group.classList.add('error');
            valid = false;
          }
        }
      });
      if (!valid) {
        e.preventDefault();
        var firstError = form.querySelector('.form-group.error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        var btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.textContent = 'Sending...';
          btn.disabled = true;
        }
      }
    });
  });
})();

// ===== Back to Top =====
(function () {
  var btn = document.querySelector('.back-to-top');
  if (!btn) return;
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (window.scrollY > 400) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
