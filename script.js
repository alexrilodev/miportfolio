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

