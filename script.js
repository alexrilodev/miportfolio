/*Light box certificaciones*/

document.addEventListener("DOMContentLoaded", function() {
    const lightbox = document.getElementById("lightbox");
    const imagenAmpliada = document.getElementById("imagen-ampliada");
    const cerrar = document.querySelector(".cerrar");

    document.querySelectorAll("#certificacion img").forEach(img => {
        img.addEventListener("click", function() {
            lightbox.style.display = "block";
            imagenAmpliada.src = this.src;
        });
    });

    cerrar.addEventListener("click", function() {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
});

/* Animación navegación */

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const toggleBtn = document.getElementById('toggle-nav');
  const navList = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul li a');
  let isDesktop = window.innerWidth > 768;

  // Mostrar / ocultar menú en móviles
  toggleBtn.addEventListener('click', () => {
    navList.classList.toggle('show');
  });

  // Ocultar menú móvil al clicar un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navList.classList.remove('show');
      }
    });
  });

  // Ocultar nav al hacer scroll en escritorio (siempre oculto)
  window.addEventListener('scroll', () => {
    if (isDesktop) {
      nav.style.top = '-80px'; // siempre oculto al hacer scroll
    }
  });

  // Mostrar nav si el ratón está en el borde superior (solo escritorio)
  document.addEventListener('mousemove', (e) => {
    if (isDesktop) {
      if (e.clientY <= 50) {
        nav.style.top = '0'; // reaparece si el ratón toca el borde superior
      } else {
        nav.style.top = '-80px'; // desaparece si se mueve fuera del borde
      }
    }
  });

  // Detectar cambio de tamaño de pantalla para alternar modo escritorio/móvil
  window.addEventListener('resize', () => {
    isDesktop = window.innerWidth > 768;
    if (isDesktop) {
      navList.classList.remove('show');
      nav.style.top = '0';
    } else {
      nav.style.top = '0'; // en móvil siempre visible en nav inferior
    }
  });
});
