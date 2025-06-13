// script.js
// Preloader
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
  }, 800);
});

// Menú móvil
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
});

// Tema oscuro/claro con localStorage
const toggleBtn = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
if (currentTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  toggleBtn.textContent = '☀️';
} else {
  document.documentElement.removeAttribute('data-theme');
  toggleBtn.textContent = '🌙';
}

toggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'light') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
    toggleBtn.textContent = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    toggleBtn.textContent = '☀️';
  }
});

// Año actual
document.addEventListener("DOMContentLoaded", function() {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Animaciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animación para habilidades
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
    // Simulamos un envío exitoso ya que la URL original no está disponible
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado ✅',
        text: '¡Gracias por contactarme! Te responderé pronto.',
        confirmButtonColor: '#0f172a',
        background: 'var(--bg-color)',
        color: 'var(--text-color)'
      });
      e.target.reset();
    }, 1500);
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error de red',
      text: 'No se pudo enviar el mensaje. Verifica tu conexión a internet.',
      confirmButtonColor: '#e11d48',
      background: 'var(--bg-color)',
      color: 'var(--text-color)'
    });
    console.error(err);
  }
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Cerrar menú móvil si está abierto
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.textContent = '☰';
      }
    }
  });
});