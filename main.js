/* ============================================
   PORTFOLIO 
   @auther: Muhammad Ahmad
   Email Js & Animations
   ============================================ */

'use strict';

// Js Email Config (fix Important)
const EMAILJS_PUBLIC_KEY = 'JwJGQuD4QgP_0dv7f';   // <-- replace
const EMAILJS_SERVICE_ID = 'service_oymb5vq';   // <-- replace
const EMAILJS_TEMPLATE_ID = 'template_akmuhzi';  // <-- replace

// Carrd Data
const PROJECTS = {
  photobooth: {
    tag: 'Web App · JavaScript',
    title: "Photo Booth App",
    desc: `A custom photobooth web app features live camera with real-time CSS filters, cute sticker overlays, polaroid-style 
    strip layouts, and an instant download button. Built with vanilla JS and the Canvas API 
    so it runs entirely in the browser with no backend required.`,
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API', 'MediaDevices API'],
    img: 'assets/images/project_photobooth.png',
    live: '#',
    code: '#',
  },
  dashboard: {
    tag: 'Dashboard · React',
    title: 'Analytics Dashboard ✦',
    desc: `A sleek data visualization dashboard built with React and Chart.js. Features
            real-time chart updates via WebSocket simulation, dark/light mode theming,
            responsive grid layout using CSS Grid, and interactive filter controls.
            Deployed on Vercel with zero-config CI/CD.`,
    tech: ['React', 'Chart.js', 'CSS Grid', 'WebSocket', 'Vercel'],
    img: 'assets/images/project_dashboard.png',
    live: '#',
    code: '#',
  },
  coming: {
    tag: 'Coming Soon',
    title: 'Next Adventure',
    desc: `Something exciting is quietly in the works. A new project that combines creative
            design with thoughtful engineering — built with care and a whole lot of
            passion. Stay tuned for the big reveal. It's going to be something special. 🚀`,
    tech: ['', '', ''],
    img: '',
    live: null,
    code: null,
  },
};

// Loading screen 
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
  }, 700);
});

// Date Tracker not necessary added by AI
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// AI made toggle fix later
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const toggleIcon = themeToggle?.querySelector('.toggle-icon');
const toggleLabel = themeToggle?.querySelector('.toggle-label');

let isDark = localStorage.getItem('theme') === 'dark';

function applyTheme(dark) {
  isDark = dark;
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  if (toggleIcon) toggleIcon.textContent = dark ? '🌙' : '☀️';
  if (toggleLabel) toggleLabel.textContent = dark ? 'Dark' : 'Light';
}

// AI made fix later
applyTheme(isDark);

themeToggle?.addEventListener('click', () => applyTheme(!isDark));

// Cursor Elements Adjust for Movement and drag
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-card, .social-link');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
});

// Animate on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Fade animation scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// non flickity elements
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        setTimeout(() => { fill.style.width = (fill.dataset.level || '80') + '%'; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsGrid = document.getElementById('skills-grid');
if (skillsGrid) skillObserver.observe(skillsGrid);

// AI made scroll anchor fix later I think
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// AI made orbs animation fix animation Not working on theme change later
const orbs = document.querySelectorAll('.orb');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  orbs.forEach((orb, i) => {
    const speed = 0.04 + i * 0.015;
    orb.style.transform = `translateY(${scrollY * speed * (i % 2 === 0 ? 1 : -1)}px)`;
  });
}, { passive: true });

// Parallax hover effect working well no need to fix
const hero = document.getElementById('hero');
const heroAvatar = document.querySelector('.hero-avatar');
const heroBadges = document.querySelectorAll('.hero-badge');

if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    if (heroAvatar) heroAvatar.style.transform = `translate(${cx * 18}px, ${cy * 10}px)`;
    heroBadges.forEach((badge, i) => {
      const d = 1 + i * 0.5;
      badge.style.transform = `translate(${cx * 12 * d}px, ${cy * 8 * d}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    if (heroAvatar) heroAvatar.style.transform = '';
    heroBadges.forEach(b => b.style.transform = '');
  });
}

// Project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-12px) scale(1.015) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    setTimeout(() => card.style.transition = '', 600);
  });
});

// span from Hero section AI made fix later
const taglineEl = document.querySelector('.hero-tagline');
if (taglineEl) {
  const originalText = taglineEl.textContent.trim();
  setTimeout(() => {
    taglineEl.textContent = '';
    taglineEl.style.opacity = '1';
    taglineEl.style.transform = 'none';
    let i = 0;
    const type = () => {
      if (i < originalText.length) { taglineEl.textContent += originalText[i++]; setTimeout(type, 18); }
    };
    type();
  }, 1600);
}

// Light box not working fix later it will work on live I think?
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const backdrop = document.getElementById('modal-backdrop');

function openModal(key) {
  const data = PROJECTS[key];
  if (!data) return;

  // populate
  document.getElementById('modal-hero-img').src = data.img || '';
  document.getElementById('modal-hero-img').style.display = data.img ? 'block' : 'none';
  document.getElementById('modal-tag').textContent = data.tag;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-desc').textContent = data.desc;

  const techEl = document.getElementById('modal-tech');
  techEl.innerHTML = data.tech.map(t => `<span class="modal-tech-pill">${t}</span>`).join('');

  const liveBtn = document.getElementById('modal-live-btn');
  const codeBtn = document.getElementById('modal-code-btn');

  if (data.live) {
    liveBtn.href = data.live;
    liveBtn.style.display = '';
  } else {
    liveBtn.style.display = 'none';
  }

  if (data.code) {
    codeBtn.href = data.code;
    codeBtn.style.display = '';
  } else {
    codeBtn.style.display = 'none';
  }

  // open with animation
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modal.querySelector('#modal-content').scrollTop = 0;

  // re-register hover for cursor
  ring.classList.remove('hovering');
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Click on project card (but not on overlay links)
document.querySelectorAll('.project-card[data-modal]').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('.overlay-link')) return; // let links work normally
    openModal(card.dataset.modal);
  });
});

modalClose?.addEventListener('click', closeModal);
backdrop?.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Back end Critical fuck ups fix later AI sucks
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('btn-submit');

// Email Intializer not HTTP secured (bannable requests) fix important
if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value.trim();
  const message = document.getElementById('form-message').value.trim();

  if (!name || !email || !message) {
    submitBtn.textContent = 'Please fill required fields';
    setTimeout(() => { submitBtn.textContent = 'Send message'; }, 2000);
    return;
  }

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  const templateParams = { from_name: name, from_email: email, subject, message };

  try {
    if (typeof emailjs !== 'undefined' && EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
      //Js email extension
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    } else {
      // demo mode (no need but here in case needed for blank test)
      await new Promise(r => setTimeout(r, 1200));
      console.log('Demo mode — EmailJS not configured yet. Message:', templateParams);
    }

    submitBtn.textContent = 'Message sent!';
    contactForm.reset();

    setTimeout(() => {
      submitBtn.textContent = 'Send message';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3500);

  } catch (err) {
    console.error('EmailJS error:', err);
    submitBtn.textContent = 'Failed to send. Please, try again';
    submitBtn.style.background = 'linear-gradient(135deg, #185e2248, #1ac42831)';
    submitBtn.disabled = false;
  

    setTimeout(() => {
      submitBtn.textContent = 'Send message ✦';
      submitBtn.style.background = '';
    }, 3000);
  }
});

// trail lazy fix later it's buggy
function createSparkle(x, y) {
  const s = document.createElement('div');
  s.style.cssText = `
    position: fixed;
    left: ${x}px; top: ${y}px;
    width: 6px; height: 6px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9997;
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    background: hsl(${Math.random() * 60 + 290}deg, 80%, 75%);
    transition: transform 0.6s ease, opacity 0.6s ease;
  `;
  document.body.appendChild(s);
  requestAnimationFrame(() => {
    s.style.transform = `translate(${(Math.random() - 0.5) * 40}px, ${-20 - Math.random() * 20}px) scale(0)`;
    s.style.opacity = '0';
  });
  setTimeout(() => s.remove(), 650);
}

let sparkleThrottle = 0;
document.addEventListener('mousemove', (e) => {
  if (++sparkleThrottle % 5 === 0) createSparkle(e.clientX, e.clientY);
});

console.log('%c portfolio loaded crafted with love', 'font-family: serif; font-size: 14px; color: #217c3c9d;');
