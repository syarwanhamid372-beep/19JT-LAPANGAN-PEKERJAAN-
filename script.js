/* ============================================================
   KONFIGURASI - GANTI DATA DI SINI
   ============================================================ */
const CONFIG = {
  // GANTI dengan email Anda
  email: '[EMAIL]',

  // GANTI dengan nomor WhatsApp (format internasional tanpa +)
  // Contoh: 6281234567890
  whatsapp: '[NOMOR_WHATSAPP_TANPA_PLUS]',

  // Kalimat yang akan di-typing pada hero section
  typingTexts: [
    '[PROFESI / KEAHLIAN 1]',
    '[PROFESI / KEAHLIAN 2]',
    '[PROFESI / KEAHLIAN 3]',
    'Web Developer',
    'Content Creator',
  ],
};

/* ============================================================
   LOADER
   ============================================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 600);
});

/* ============================================================
   THEME TOGGLE (DARK / LIGHT MODE)
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// Ambil tema tersimpan atau gunakan light
const savedTheme = localStorage.getItem('theme') || 'light';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-sun';
  } else {
    icon.className = 'fa-solid fa-moon';
  }
}

/* ============================================================
   NAVBAR: Scroll effect, hamburger, active link
   ============================================================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar background on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top visibility
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active nav link
  updateActiveNav();
});

// Hamburger menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Tutup menu saat link diklik
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Tutup menu saat klik di luar
document.addEventListener('click', (e) => {
  if (
    navMenu.classList.contains('active') &&
    !navMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Update active nav based on scroll position
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   SMOOTH SCROLL (fallback untuk browser lama)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   TYPING ANIMATION
   ============================================================ */
const typingEl = document.getElementById('typing');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentText = CONFIG.typingTexts[textIndex];

  if (isDeleting) {
    typingEl.textContent = currentText.substring(0, charIndex--);
  } else {
    typingEl.textContent = currentText.substring(0, charIndex++);
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length + 1) {
    isDeleting = true;
    speed = 1500; // pause setelah selesai
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % CONFIG.typingTexts.length;
    speed = 300;
  }

  setTimeout(typeLoop, speed);
}

// Mulai typing
if (typingEl) {
  setTimeout(typeLoop, 800);
}

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   SKILL BAR ANIMATION
   ============================================================ */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = width;
        }, 200);
        skillObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.skill-fill').forEach(el => skillObserver.observe(el));

/* ============================================================
   PORTFOLIO FILTER
   ============================================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Set active
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.5s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Tambahkan animasi CSS secara dinamis
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);

/* ============================================================
   PORTFOLIO DETAIL MODAL
   ============================================================ */
const detailModal = document.getElementById('detailModal');
const detailImage = document.getElementById('detailImage');
const detailTitle = document.getElementById('detailTitle');
const detailDesc = document.getElementById('detailDesc');
const detailClose = document.getElementById('detailClose');

document.querySelectorAll('.view-detail').forEach(btn => {
  btn.addEventListener('click', () => {
    const title = btn.getAttribute('data-title');
    const desc = btn.getAttribute('data-desc');
    const img = btn.getAttribute('data-img');

    detailTitle.textContent = title;
    detailDesc.textContent = desc;
    detailImage.src = img;
    detailModal.classList.add('active');
  });
});

detailClose.addEventListener('click', () => detailModal.classList.remove('active'));
detailModal.addEventListener('click', (e) => {
  if (e.target === detailModal) detailModal.classList.remove('active');
});

/* ============================================================
   GALLERY LIGHTBOX / VIDEO MODAL
   ============================================================ */
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

const videoModal = document.getElementById('videoModal');
const videoWrapper = document.getElementById('videoWrapper');
const videoClose = document.getElementById('videoClose');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const type = item.getAttribute('data-type');

    if (type === 'image') {
      const img = item.querySelector('img');
      modalImage.src = img.src;
      imageModal.classList.add('active');
    } else if (type === 'video-local') {
      const video = item.querySelector('video source');
      const src = video ? video.src : '';
      videoWrapper.innerHTML = `
        <video controls autoplay>
          <source src="${src}" type="video/mp4" />
          Browser Anda tidak mendukung video.
        </video>
      `;
      videoModal.classList.add('active');
    } else if (type === 'video-youtube') {
      const videoId = item.getAttribute('data-video-id');
      videoWrapper.innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${videoId}?autoplay=1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      `;
      videoModal.classList.add('active');
    }
  });
});

modalClose.addEventListener('click', () => imageModal.classList.remove('active'));
imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal) imageModal.classList.remove('active');
});

videoClose.addEventListener('click', () => {
  videoModal.classList.remove('active');
  videoWrapper.innerHTML = '';
});
videoModal.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    videoModal.classList.remove('active');
    videoWrapper.innerHTML = '';
  }
});

// ESC untuk menutup semua modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    imageModal.classList.remove('active');
    videoModal.classList.remove('active');
    detailModal.classList.remove('active');
  }
});

/* ============================================================
   TESTIMONIAL SLIDER
   ============================================================ */
const track = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('testimonialDots');
const prevBtn = document.getElementById('prevTesti');
const nextBtn = document.getElementById('nextTesti');
const slides = document.querySelectorAll('.testimonial-card');

let currentSlide = 0;
let autoplayInterval;

// Buat dots
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('span');

function goToSlide(index) {
  currentSlide = index;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  resetAutoplay();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 5000);
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

startAutoplay();

// Swipe support untuk mobile
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50) nextSlide();
  if (touchEndX - touchStartX > 50) prevSlide();
});

/* ============================================================
   CONTACT FORM -> WHATSAPP
   ============================================================ */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validasi
  if (!name || !email || !message) {
    alert('Mohon lengkapi semua kolom.');
    return;
  }

  // Format pesan WhatsApp
  const waMessage = encodeURIComponent(
    `Halo, saya ${name}.\n\nEmail: ${email}\n\nPesan:\n${message}`
  );

  // Arahkan ke WhatsApp
  const waUrl = `https://wa.me/${CONFIG.whatsapp}?text=${waMessage}`;
  window.open(waUrl, '_blank');

  // Reset form
  contactForm.reset();
  alert('Terima kasih! Anda akan diarahkan ke WhatsApp untuk mengirim pesan.');
});

/* ============================================================
   TAHUN FOOTER OTOMATIS (opsional)
   ============================================================ */
// Kalau Anda mau tahun otomatis, hapus komentar di bawah:
// document.querySelector('.footer-bottom p').innerHTML =
//   `© ${new Date().getFullYear()} [NAMA LENGKAP]. All Rights Reserved.`;
