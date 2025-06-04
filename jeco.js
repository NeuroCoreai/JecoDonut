// Dark Mode Toggle with smooth icon & background transition
const toggleBtn = document.getElementById('dark-toggle');
const body = document.body;

function updateToggleIcon() {
  toggleBtn.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
}

toggleBtn.addEventListener('click', () => {
  // Add transition class to body for smooth background change
  body.classList.add('theme-transition');

  // Toggle dark mode
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
  } else {
    body.classList.add('dark');
  }

  updateToggleIcon();

  // Remove transition class after animation ends
  window.setTimeout(() => {
    body.classList.remove('theme-transition');
  }, 700);
});

// Initial icon update
updateToggleIcon();

// Scroll spy & nav active link
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Smooth scroll nav
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    const headerHeight = document.querySelector('header').offsetHeight;

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - headerHeight,
        behavior: 'smooth',
      });
    }
  });
});

// CTA Button interaction
const ctaButton = document.getElementById('cta-button');
ctaButton.addEventListener('click', () => {
  alert(
    'Terima kasih telah mendaftar! Kami akan segera menghubungi Anda mengenai mimpi masa depan Anda.'
  );
});

// Fade-in on scroll animation
const faders = document.querySelectorAll('.fade-in');

function checkFadeIn() {
  const triggerBottom = window.innerHeight * 0.85;

  faders.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('animate-fade-in');
    }
  });
}

window.addEventListener('scroll', checkFadeIn);
window.addEventListener('load', checkFadeIn);

// Background canvas animation (futuristic moving lines)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let lines = [];

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();

window.addEventListener('resize', resize);

class Line {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.length = 80 + Math.random() * 120;
    this.speed = 0.5 + Math.random();
    this.angle = Math.random() * Math.PI * 2;
    this.opacity = 0.1 + Math.random() * 0.3;
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.opacity -= 0.0015;
    if (
      this.x < 0 ||
      this.x > width ||
      this.y < 0 ||
      this.y > height ||
      this.opacity <= 0
    ) {
      this.reset();
      this.opacity = 0.3;
    }
  }
  draw(ctx) {
    ctx.strokeStyle = `rgba(118, 255, 3, ${this.opacity.toFixed(2)})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x + Math.cos(this.angle) * this.length,
      this.y + Math.sin(this.angle) * this.length
    );
    ctx.stroke();
  }
}

for (let i = 0; i < 40; i++) {
  lines.push(new Line());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  lines.forEach((line) => {
    line.update();
    line.draw(ctx);
  });
  requestAnimationFrame(animate);
}
animate();

// Logo clickable and slide left on hover effect handled by CSS