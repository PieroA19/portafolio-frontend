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


// Manejo del formulario de contacto
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = e.target[0].value;
  const email = e.target[1].value;
  const message = e.target[2].value;

  try {
    const res = await fetch('https://portafolio-backend-g73j.onrender.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('✅ Mensaje enviado con éxito');
      e.target.reset();
    } else {
      alert('❌ Error: ' + data.error);
    }
  } catch (err) {
    alert('⚠️ Ocurrió un error al enviar el mensaje.');
    console.error(err);
  }
});