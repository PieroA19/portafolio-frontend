// Preloader
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
  }, 800);
});

// Menu toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  nav.classList.toggle('open');
});

// Theme toggle with localStorage
const toggleBtn = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
if (currentTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  document.documentElement.removeAttribute('data-theme');
  toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
}

toggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'light') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

// Current year
document.addEventListener("DOMContentLoaded", function() {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animate skills
      if (entry.target.querySelector('.skills-list')) {
        const skills = entry.target.querySelectorAll('.skills-list li');
        skills.forEach((skill, index) => {
          setTimeout(() => {
            skill.style.animation = `growIn 0.5s forwards ${index * 0.1}s`;
          }, 300);
        });
      }
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// Formulario
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = e.target[0].value;
  const email = e.target[1].value;
  const message = e.target[2].value;

  // Mostrar loader
  Swal.fire({
    title: 'Enviando mensaje...',
    html: '<i>Por favor espera un momento.</i>',
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const res = await fetch('https://portafolio-backend-g73j.onrender.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();
    if (res.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado ✅',
        text: '¡Gracias por contactarme! Te responderé pronto.',
        confirmButtonColor: '#0f172a', // Azul oscuro profesional
        background: '#f8fafc',         // Color claro elegante
        color: '#0f172a'
      });
      e.target.reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar',
        text: data.error || 'Algo salió mal. Inténtalo nuevamente.',
        confirmButtonColor: '#e11d48', // Rojo profesional
        background: '#fef2f2',
        color: '#991b1b'
      });
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error de red',
      text: 'No se pudo enviar el mensaje. Verifica tu conexión a internet.',
      confirmButtonColor: '#e11d48',
      background: '#fef2f2',
      color: '#991b1b'
    });
    console.error(err);
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.classList.remove('active');
      }
    }
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    header.style.padding = '0.8rem 5%';
  } else {
    header.style.boxShadow = 'none';
    header.style.padding = '1.2rem 5%';
  }
});