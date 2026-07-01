document.addEventListener("DOMContentLoaded", () => {
  // 1. Current Year in Footer
  const yearSpan = document.getElementById('current-year') || document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Active Navigation Highlighting
  setActiveNav();

  // 3. Scroll-aware Header Background State Transition (v2 Spec)
  initNavbarScroll();

  // 4. Mobile Menu Toggle
  initMobileMenu();

  // 5. Scroll to Top Behavior
  initScrollToTop();

  // 6. Scroll Reveal Observer
  initScrollReveal();

  // 7. Stats Counter Observer (Home page)
  initStatsCounter();

  // 8. FAQ Accordion Toggle
  initFAQAccordion();

  // 9. Testimonial Carousel/Slider
  initTestimonialCarousel();

  // 10. Timeline Scroll Progress Animation
  initTimelineProgress();
});

// Set active nav link based on current page
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = {
    'index.html': document.getElementById('nav-home'),
    'about.html': document.getElementById('nav-about'),
    'services.html': document.getElementById('nav-services'),
    'claims-process.html': document.getElementById('nav-claims'),
    'cases.html': document.getElementById('nav-cases'),
    'careers.html': document.getElementById('nav-careers'),
    'contact.html': document.getElementById('nav-contact')
  };

  const mobileNavLinks = {
    'index.html': document.querySelector('.nav-mobile-home'),
    'about.html': document.querySelector('.nav-mobile-about'),
    'services.html': document.querySelector('.nav-mobile-services'),
    'claims-process.html': document.querySelector('.nav-mobile-claims'),
    'cases.html': document.querySelector('.nav-mobile-cases'),
    'careers.html': document.querySelector('.nav-mobile-careers'),
    'contact.html': document.querySelector('.nav-mobile-contact')
  };

  // Reset active classes
  Object.values(navLinks).forEach(link => {
    if (link) {
      link.classList.remove('text-brandRed', 'border-b-2', 'border-brandRed', 'font-semibold');
    }
  });

  Object.values(mobileNavLinks).forEach(link => {
    if (link) {
      link.classList.remove('text-brandRed', 'font-bold');
    }
  });

  // Set active page styles
  const cleanPageName = currentPage === '' ? 'index.html' : currentPage;
  if (navLinks[cleanPageName]) {
    navLinks[cleanPageName].classList.add('text-brandRed', 'border-b-2', 'border-brandRed', 'font-semibold');
  }
  if (mobileNavLinks[cleanPageName]) {
    mobileNavLinks[cleanPageName].classList.add('text-brandRed', 'font-bold');
  }
}

// Scroll-aware sticky navbar (v2 scroll state logic)
function initNavbarScroll() {
  const header = document.getElementById('siteHeader') || document.getElementById('navbar');
  const SCROLL_THRESHOLD = 60;

  if (!header) return;

  const hasDarkHeader = document.querySelector('.hero') || document.querySelector('.page-header-banner');

  if (hasDarkHeader) {
    const updateHeaderState = () => {
      header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
    };
    document.addEventListener('scroll', updateHeaderState, { passive: true });
    updateHeaderState();
  } else {
    header.classList.add('is-scrolled');
  }
}

// Mobile navigation drawer
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('close-menu');
  const body = document.body;

  if (!toggle || !menu) return;

  const openMenu = () => {
    menu.classList.remove('hidden');
    // Slide in effect
    setTimeout(() => {
      menu.classList.add('open');
    }, 10);
    body.classList.add('menu-open');
  };

  const closeMenu = () => {
    menu.classList.remove('open');
    setTimeout(() => {
      menu.classList.add('hidden');
    }, 300);
    body.classList.remove('menu-open');
  };

  toggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close when clicking overlay background
  menu.addEventListener('click', (e) => {
    if (e.target === menu || e.target.classList.contains('backdrop-blur-sm') || e.target.classList.contains('absolute')) {
      // check if targeted overlay
      if (e.target.id !== 'close-menu' && !menu.querySelector('.relative').contains(e.target)) {
        closeMenu();
      }
    }
  });

  // Close menu on navigation link clicks
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Scroll to top button
function initScrollToTop() {
  const btn = document.getElementById('scrollToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('hidden', 'opacity-0');
      btn.classList.add('opacity-100', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0');
      setTimeout(() => {
        if (window.scrollY <= 400) btn.classList.add('hidden');
      }, 300);
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Scroll Reveal Animations
function initScrollReveal() {
  const elements = document.querySelectorAll('.scroll-reveal');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// Stats Count-up Animation with Easing (Quadratic Out)
function initStatsCounter() {
  const statsSection = document.querySelector('#claims')?.closest('section') || document.querySelector('#satisfaction')?.closest('section');
  if (!statsSection) return;

  let animated = false;

  // Quadratic ease-out helper
  const easeOutQuad = (t) => t * (2 - t);

  const animateCounters = () => {
    const duration = 2000;
    const start = Date.now();

    const update = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(1, elapsed / duration);
      const easedProgress = easeOutQuad(progress);
      
      const claims = document.getElementById('claims') || document.getElementById('assessments');
      const years = document.getElementById('years') || document.getElementById('experience');
      const satisfaction = document.getElementById('satisfaction');
      const response = document.getElementById('response') || document.getElementById('responseTime');

      if (claims) claims.textContent = Math.floor(easedProgress * 1000) + '+';
      if (years) years.textContent = Math.floor(easedProgress * 15) + '+';
      if (satisfaction) satisfaction.textContent = Math.floor(easedProgress * 98) + '%';
      if (response) {
        if (response.id === 'responseTime') {
          response.textContent = Math.floor(easedProgress * 24) + 'h';
        } else {
          response.textContent = '24/7';
        }
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    update();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animateCounters();
        animated = true;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(statsSection);
}

// FAQ Accordion Collapsible
function initFAQAccordion() {
  const buttons = document.querySelectorAll('.faq-btn');
  if (buttons.length === 0) return;

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const panel = document.getElementById(`faq-${index}`);
      if (!panel) return;

      const isClosed = !panel.classList.contains('open');

      // Close all FAQs for clean, single-open experience
      buttons.forEach((b, idx) => {
        const p = document.getElementById(`faq-${idx}`);
        if (p) {
          p.classList.remove('open');
        }
        if (b) {
          const icon = b.querySelector('svg');
          if (icon) icon.classList.remove('rotate-180');
          b.setAttribute('aria-expanded', 'false');
        }
      });

      if (isClosed) {
        panel.classList.add('open');
        const icon = btn.querySelector('svg');
        if (icon) icon.classList.add('rotate-180');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Testimonials sliding carousel
function initTestimonialCarousel() {
  const testimonials = document.querySelectorAll('.testimonial-card');
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  
  if (!track || testimonials.length <= 1) return;

  let currentIndex = 0;

  function showSlide(index) {
    if (index < 0) index = testimonials.length - 1;
    if (index >= testimonials.length) index = 0;

    currentIndex = index;
    
    // Slide transition logic (using CSS transitions)
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    testimonials.forEach((card, idx) => {
      if (idx === currentIndex) {
        card.classList.add('opacity-100');
        card.classList.remove('opacity-40');
      } else {
        card.classList.remove('opacity-100');
        card.classList.add('opacity-40');
      }
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

  // Initialize track and slide flex basis
  track.style.display = 'flex';
  track.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  track.style.width = `${testimonials.length * 100}%`;
  
  testimonials.forEach((card) => {
    card.style.flex = `0 0 ${100 / testimonials.length}%`;
  });
  
  showSlide(0);
}

// Timeline progress indicator animation
function initTimelineProgress() {
  const steps = document.querySelectorAll('.timeline-step');
  const lineH = document.querySelector('.timeline-line-progress');
  const lineV = document.querySelector('.timeline-line-progress-vertical');
  const timelineVContainer = document.querySelector('.timeline-line-vertical');

  if (steps.length === 0) return;

  // Helper to find absolute offset relative to parent container
  const getRelativeOffsetTop = (element, ancestor) => {
    let offset = 0;
    let curr = element;
    while (curr && curr !== ancestor) {
      offset += curr.offsetTop;
      curr = curr.offsetParent;
    }
    return offset;
  };

  const updateVerticalLineHeight = () => {
    if (!timelineVContainer || window.innerWidth >= 1024) return;
    
    const container = timelineVContainer.parentElement;
    const firstBadge = steps[0].querySelector('.timeline-badge');
    const lastBadge = steps[steps.length - 1].querySelector('.timeline-badge');
    
    if (firstBadge && lastBadge && container) {
      const topPos = getRelativeOffsetTop(firstBadge, container) + firstBadge.offsetHeight / 2;
      const bottomPos = getRelativeOffsetTop(lastBadge, container) + lastBadge.offsetHeight / 2;
      const height = bottomPos - topPos;
      
      timelineVContainer.style.top = `${topPos}px`;
      timelineVContainer.style.height = `${height}px`;
    }
  };

  // Run on load and on resize
  updateVerticalLineHeight();
  window.addEventListener('resize', updateVerticalLineHeight);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight / 2) {
        entry.target.classList.add('active');
        const badge = entry.target.querySelector('.timeline-badge');
        if (badge) {
          badge.classList.remove('bg-slate-100', 'text-slate-500');
          badge.classList.add('bg-brandGreen', 'text-white');
        }
      }
    });

    const activeSteps = document.querySelectorAll('.timeline-step.active');
    const ratio = Math.max(0, activeSteps.length - 1) / Math.max(1, steps.length - 1);
    
    if (lineH) lineH.style.width = `${ratio * 100}%`;
    if (lineV) lineV.style.height = `${ratio * 100}%`;
  }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });

  steps.forEach(step => observer.observe(step));
}
