/* --- Cambiar modo oscuro a claro --- */
const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'light') {
    document.documentElement.removeAttribute('data-theme');
    toggleBtn.textContent = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    toggleBtn.textContent = '☀️';
  }
});
/* --- Cambiar modo oscuro a claro --- */


/* --- Saber año automaticamente --- */
document.addEventListener("DOMContentLoaded", function() {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
/* --- Saber año automaticamente --- */


document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = e.target[0].value;
  const email = e.target[1].value;
  const message = e.target[2].value;

  // Mostrar loader elegante
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
