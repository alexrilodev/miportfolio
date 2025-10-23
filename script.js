
/* Animación navegación */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const toggleBtn = document.getElementById('toggle-nav');
  const navList = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul li a');
  let isDesktop = window.innerWidth > 768;

  // Mostrar / ocultar menú en móviles con transición suave
  toggleBtn.addEventListener('click', () => {
    navList.classList.toggle('show');
    nav.classList.toggle('active');
  });

  // Ocultar menú móvil suavemente al clicar un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navList.classList.remove('show');
        nav.classList.remove('active');

      }
    });
  });

  // Ocultar nav al hacer scroll en escritorio
  window.addEventListener('scroll', () => {
    if (isDesktop) {
      nav.style.top = '-80px';
    }
  });

  // Mostrar nav si el ratón está en el borde superior
  document.addEventListener('mousemove', (e) => {
    if (isDesktop) {
      if (e.clientY <= 50) {
        nav.style.top = '0';
      } else {
        nav.style.top = '-80px';
      }
    }
  });

  // Detectar cambio de tamaño de pantalla
  window.addEventListener('resize', () => {
    isDesktop = window.innerWidth > 768;
    if (isDesktop) {
      navList.classList.remove('show');
      nav.style.top = '0';
    } else {
      nav.style.top = '0';
    }
  });
});

// ==== CARRUSELES (Proyectos y Certificaciones) ====
document.querySelectorAll('.carousel-container').forEach(container => {
  const carousel = container.querySelector('.carousel');
  const nextBtn = container.querySelector('.carousel-btn.next');
  const prevBtn = container.querySelector('.carousel-btn.prev');

  if (carousel && nextBtn && prevBtn) {
    // Movimiento con botones
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: 320, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -320, behavior: 'smooth' });
    });

    // Movimiento táctil / arrastre con ratón
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => isDown = false);
    carousel.addEventListener('mouseup', () => isDown = false);

    carousel.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }
});

// === Expandir / contraer project-cards ===
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function () {
    // Contrae cualquier otra tarjeta expandida
    document.querySelectorAll('.project-card.expanded').forEach(other => {
      if (other !== card) other.classList.remove('expanded');
    });

    // Alterna el estado de la tarjeta clicada
    this.classList.toggle('expanded');
  });
});

// ==== MANEJO DEL FORMULARIO CON ASYNC/AWAIT (FETCH API) ====

const FORMSPREE_URL = "https://formspree.io/f/mdkwrlyw"; 

const form = document.getElementById('formContacto');
const statusMessage = document.getElementById('statusMessage');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Detiene el envío predeterminado (la redirección)

        // Deshabilita el botón y muestra "Enviando..."
        const submitButton = form.querySelector('input[type="submit"]');
        submitButton.value = 'Enviando...';
        submitButton.disabled = true;
        statusMessage.innerHTML = ''; // Limpia mensajes anteriores

        // Crea un objeto con los datos del formulario
        const formData = new FormData(form);

        try {
            // Envía los datos a Formspree usando Fetch API
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // 📧 Envío Exitoso: Muestra el mensaje de confirmación bonito
                statusMessage.innerHTML = `
                    <p style="color: #4CAF50; font-weight: bold; background-color: #e8f5e9; padding: 10px; border-radius: 8px;">
                        ✅ ¡Mensaje enviado! Contestaré tu consulta lo antes posible.
                    </p>
                `;
                form.reset(); // Limpia los campos del formulario
            } else {
                // ❌ Fallo en el envío (ej. error de servidor de Formspree)
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    throw new Error(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    throw new Error('Hubo un problema al enviar el formulario.');
                }
            }
        } catch (error) {
            // 🚨 Error de conexión o cualquier otro error
            console.error('Error de envío:', error);
            statusMessage.innerHTML = `
                <p style="color: #D32F2F; font-weight: bold; background-color: #ffcdd2; padding: 10px; border-radius: 8px;">
                    ❌ Lo sentimos, ocurrió un error. Por favor, inténtalo de nuevo más tarde.
                </p>
            `;
        } finally {
            // Habilita el botón de nuevo y restablece el texto
            submitButton.value = 'Enviar';
            submitButton.disabled = false;
        }
    });
}