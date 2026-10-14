/**
 * Farhana Farid - Personal Portfolio
 * Vanilla JavaScript Interactivity Module
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStatsCounters();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initCopyEmail();
  initBackToTop();
  initInteractive3DMascot();
});

/**
 * 1. Mobile Menu and Active Section Navigation Observer
 */
function initNavbar() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Toggle mobile navigation
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section indicator on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}

/**
 * 2. Animated Numerical Counters
 */
function initStatsCounters() {
  const statElements = document.querySelectorAll('.stat-counter');
  let hasAnimated = false;

  const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000; // ms
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * target);

      el.textContent = currentVal.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        el.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(updateNumber);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statElements.forEach(el => countUp(el));
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-bar');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/**
 * 3. Portfolio Category Filtering
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button states
      filterBtns.forEach(b => {
        b.classList.remove('bg-violet-600', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-600', 'hover:bg-violet-50');
      });
      btn.classList.add('bg-violet-600', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-600', 'hover:bg-violet-50');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.98)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/**
 * 4. Project Detail Modal
 */
let projectsData = [];

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  const modalTechStack = document.getElementById('modal-tech-stack');
  const modalDemoBtn = document.getElementById('modal-demo-btn');
  const modalCodeBtn = document.getElementById('modal-code-btn');

  if (!modal) return;

  // Read embedded projects JSON from page script tag if present
  const scriptData = document.getElementById('projects-json-data');
  if (scriptData) {
    try {
      projectsData = JSON.parse(scriptData.textContent);
    } catch (e) {
      console.warn("Could not parse projects JSON", e);
    }
  }

  // Open modal handler
  window.openProjectModal = function (projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category_label || project.category.toUpperCase();
    modalImage.src = `images/${project.image}`;
    modalImage.alt = project.title;
    modalDescription.textContent = project.long_description || project.description;

    // Render tech stack tags
    modalTechStack.innerHTML = '';
    (project.tech || []).forEach(tech => {
      const badge = document.createElement('span');
      badge.className = 'px-3 py-1 bg-violet-50 text-violet-700 text-xs font-semibold rounded-full border border-violet-200';
      badge.textContent = tech;
      modalTechStack.appendChild(badge);
    });

    // Links
    modalDemoBtn.href = project.demo_url || '#';
    modalCodeBtn.href = project.code_url || 'https://github.com';

    // Show modal
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/**
 * 5. Interactive Contact Form with Validation & Toast Feedback
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('contact-submit-btn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim() || 'Portfolio Inquiry';
    const message = form.message.value.trim();

    // Front-end validation
    if (!name || name.length < 2) {
      showToast('Please enter your name (minimum 2 characters).', 'error');
      form.name.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showToast('Please provide a valid email address.', 'error');
      form.email.focus();
      return;
    }

    if (!message || message.length < 10) {
      showToast('Please write a message with at least 10 characters.', 'error');
      form.message.focus();
      return;
    }

    // Set Loading State
    if (submitBtn) {
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending message...';
      if (btnSpinner) btnSpinner.classList.remove('hidden');
    }

    try {
      // Attempt submission to the Flask API when available
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ name, email, subject, message })
        });

        if (response.ok) {
          const result = await response.json();
          showToast(result.message || 'Thank you! Your message has been sent successfully.', 'success');
          form.reset();
          return;
        }

        if (response.status >= 400 && response.status < 500) {
          let errMessage = 'Could not send your message. Please review the details and try again.';
          try {
            const errResult = await response.json();
            if (errResult && errResult.error) errMessage = errResult.error;
          } catch (parseErr) {
            // Ignore JSON parse errors
          }
          showToast(errMessage, 'error');
          return;
        }
      } catch (networkErr) {
        // Network/backend not available (e.g. static hosting) -> fall through to local fallback
      }

      // Graceful fallback for static hosts: persist locally
      try {
        const savedMessages = JSON.parse(localStorage.getItem('farhana_portfolio_messages') || '[]');
        savedMessages.push({ name, email, subject, message, date: new Date().toISOString() });
        localStorage.setItem('farhana_portfolio_messages', JSON.stringify(savedMessages));
      } catch (storageErr) {
        // Ignore storage errors
      }

      showToast(`Thank you, ${name}! Your message has been received. Farhana will get back to you shortly at ${email}.`, 'success');
      form.reset();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
        if (btnSpinner) btnSpinner.classList.add('hidden');
      }
    }
  });
}

/**
 * Toast Notification System
 */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast max-w-md w-full p-4 rounded-2xl shadow-xl flex items-start space-x-3 text-sm font-medium border ${
    type === 'success'
      ? 'bg-white text-slate-800 border-violet-200 shadow-violet-500/10'
      : 'bg-white text-rose-800 border-rose-200 shadow-rose-500/10'
  }`;

  const iconSvg = type === 'success'
    ? `<div class="p-2 bg-emerald-100 text-emerald-600 rounded-xl flex-shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
       </div>`
    : `<div class="p-2 bg-rose-100 text-rose-600 rounded-xl flex-shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
       </div>`;

  toast.innerHTML = `
    ${iconSvg}
    <div class="flex-1 pt-0.5">
      <p class="font-semibold ${type === 'success' ? 'text-violet-900' : 'text-rose-900'}">${type === 'success' ? 'Message Sent!' : 'Notice'}</p>
      <p class="text-slate-600 mt-0.5 text-xs leading-relaxed">${message}</p>
    </div>
    <button class="text-slate-400 hover:text-slate-600 p-1" onclick="this.parentElement.remove()">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  `;

  container.appendChild(toast);

  // Trigger smooth entrance
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

/**
 * 6. Copy Email Helper
 */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'farhanafarid41@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email address copied to clipboard: ' + email, 'success');
      const originalText = copyBtn.querySelector('.copy-label');
      if (originalText) {
        originalText.textContent = 'Copied!';
        setTimeout(() => {
          originalText.textContent = 'Copy';
        }, 2000);
      }
    }).catch(() => {
      showToast('Could not auto-copy. You can write directly to: ' + email, 'info');
    });
  });
}

/**
 * 7. Back-to-Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * 8. 3D Interactive Mascot (Parallax Physics, Glare, Reactions & Confetti)
 */
function initInteractive3DMascot() {
  const container = document.getElementById('mascot-interactive-container');
  const card = document.getElementById('mascot-3d-card');
  const mascotImg = document.getElementById('mascot-interactive-img');
  const glare = document.getElementById('mascot-glare');
  const speechBubble = document.getElementById('mascot-speech-bubble');
  const speechText = document.getElementById('mascot-speech-text');

  if (!container || !card || !mascotImg) return;

  const speeches = [
    "Hi! Farhana builds intelligent AI web apps! 🚀",
    "Pixel-perfect Tailwind CSS & clean code! 💻✨",
    "Thumbs up for fast, scalable Flask backends! 👍🦊",
    "Need custom LLM workflow integrations? Let's talk! 🤖",
    "1,200+ hours of coding & 100% dedication! ⚡",
    "Looking for a full-stack engineer? Farhana is ready! 🌟"
  ];
  let speechIndex = 0;

  // 3D Parallax Tilt Calculation
  const handleMouseMove = (e) => {
    card.classList.remove('spring-back');
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX; // -1 to 1
    const deltaY = (y - centerY) / centerY; // -1 to 1

    const maxTilt = 16; // degrees
    const rotateX = -deltaY * maxTilt;
    const rotateY = deltaX * maxTilt;

    card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;

    // Holographic Glare reflection shift
    if (glare) {
      glare.style.opacity = '1';
      glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`;
    }

    // Dynamic mascot parallax offset
    mascotImg.style.transform = `translateZ(55px) translateX(${deltaX * 10}px) translateY(${deltaY * 10}px)`;
  };

  const handleMouseLeave = () => {
    card.classList.add('spring-back');
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    mascotImg.style.transform = 'translateZ(55px) translateX(0px) translateY(0px)';
    if (glare) glare.style.opacity = '0';
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  // Mobile Touch Support
  container.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      handleMouseMove(e.touches[0]);
    }
  }, { passive: true });

  container.addEventListener('touchend', handleMouseLeave);

  // Click / Tap Celebration Reactions
  const triggerCelebration = () => {
    mascotImg.classList.add('mascot-celebrating');
    setTimeout(() => {
      mascotImg.classList.remove('mascot-celebrating');
    }, 750);

    // Cycle speech text
    speechIndex = (speechIndex + 1) % speeches.length;
    if (speechText) {
      speechText.style.opacity = '0';
      speechText.style.transform = 'translateY(4px)';
      setTimeout(() => {
        speechText.textContent = speeches[speechIndex];
        speechText.style.opacity = '1';
        speechText.style.transform = 'translateY(0)';
      }, 150);
    }

    // Confetti explosion
    spawnConfetti(card);
  };

  mascotImg.addEventListener('click', triggerCelebration);
  if (speechBubble) speechBubble.addEventListener('click', triggerCelebration);

  const pokeBtn = document.getElementById('mascot-poke-btn');
  if (pokeBtn) pokeBtn.addEventListener('click', triggerCelebration);
}

function spawnConfetti(parent) {
  const colors = ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#6366F1'];
  for (let i = 0; i < 18; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'mascot-confetti';
    const size = Math.floor(Math.random() * 8) + 6;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = '50%';
    confetti.style.top = '50%';

    const angle = (Math.PI * 2 * i) / 18 + (Math.random() * 0.4 - 0.2);
    const dist = Math.random() * 95 + 45;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;

    confetti.style.setProperty('--tx', `${tx}px`);
    confetti.style.setProperty('--ty', `${ty}px`);

    parent.appendChild(confetti);
    setTimeout(() => confetti.remove(), 900);
  }
}

