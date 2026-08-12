
// ==== ANIMACIÓN NAVEGACIÓN ====
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const toggleBtn = document.getElementById('toggle-nav');
  const navList = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul li a');
  let isDesktop = window.innerWidth > 768;

  if (!nav || !toggleBtn || !navList) return;

  // Mostrar / ocultar menú en móviles con transición suave
  toggleBtn.addEventListener('click', () => {
    navList.classList.toggle('show');
    nav.classList.toggle('active');
    const isExpanded = nav.classList.contains('active');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
  });

  // Interceptar navegación para no modificar el hash
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }

      // Cerrar menú móvil
      if (window.innerWidth <= 768) {
        navList.classList.remove('show');
        nav.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
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
      nav.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
    nav.style.top = '0';
  });

  // Indicador de sección activa con Intersection Observer
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = { rootMargin: '-50% 0px -50% 0px' };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.backgroundColor = link.getAttribute('href') === `#${id}`
            ? 'var(--color-highlight-hover)'
            : '';
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
});


// ==== CARRUSELES (Proyectos, Certificaciones y Habilidades) ====
document.querySelectorAll('.carousel-container').forEach(container => {
  const carousel = container.querySelector('.carousel');
  const nextBtn = container.querySelector('.carousel-btn.next');
  const prevBtn = container.querySelector('.carousel-btn.prev');

  if (carousel && nextBtn && prevBtn) {
    // Movimiento con botones (adaptable al tamaño de las tarjetas)
    const getScrollAmount = () => {
      const card = carousel.querySelector('.project-card');
      return card ? card.offsetWidth + 20 : 320; // 20px del gap
    };

    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
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

// === MODAL DE PROYECTOS ===
const modal = document.getElementById('projectModal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalLinks = document.getElementById('modal-links');
const modalClose = document.querySelector('.modal-close');

// Traducciones缓存
let cachedTranslations = null;

const getTranslations = async () => {
  if (cachedTranslations) return cachedTranslations;
  const lang = localStorage.getItem('lang') || 'es';
  try {
    const response = await fetch(`./lang_${lang}.json`);
    cachedTranslations = await response.json();
  } catch (error) {
    cachedTranslations = {};
  }
  return cachedTranslations;
};

// Limpiar caché cuando cambia el idioma
const clearTranslationsCache = () => { cachedTranslations = null; };

const openModal = async (card) => {
  const translations = await getTranslations();

  const imgSrc = card.dataset.projectImg;
  const imgAlt = card.dataset.projectImgAlt;
  const title = card.dataset.projectTitle;
  const descKey = card.dataset.projectDesc;
  const linksData = JSON.parse(card.dataset.projectLinks || '[]');

  modalImg.src = imgSrc;
  modalImg.alt = imgAlt;
  modalTitle.textContent = title;
  modalDesc.innerHTML = translations[descKey] || '';

  // Renderizar enlaces
  modalLinks.innerHTML = '';
  linksData.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = `${link.icon} ${translations[link.label] || link.label}`;
    modalLinks.appendChild(a);
  });

  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add('active'));
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { modal.hidden = true; }, 300);
};

// Event listeners para abrir modal
document.querySelectorAll('#proyectos .project-card').forEach(card => {
  card.addEventListener('click', () => openModal(card));
});

// Cerrar modal
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
});

// Invalidar caché de traducciones al cambiar idioma
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', clearTranslationsCache);
});

// ==== FOOTER DINÁMICO ====
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ==== MANEJO DEL FORMULARIO CON ASYNC/AWAIT (FETCH API) ====

const FORMSPREE_URL = "https://formspree.io/f/mdkwrlyw"; 
const form = document.getElementById('formContacto');
const statusMessage = document.getElementById('statusMessage');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const translations = await getTranslations();

        const submitButton = form.querySelector('input[type="submit"]');
        if (submitButton) {
            submitButton.value = translations["form_sending"];
            submitButton.disabled = true;
        }
        if (statusMessage) statusMessage.innerHTML = '';

        const formData = new FormData(form);

        try {
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                if (statusMessage) {
                    statusMessage.innerHTML = `
                        <p style="color: #4CAF50; font-weight: bold; background-color: #e8f5e9; padding: 10px; border-radius: 8px;">
                            ${translations["form_success"]}
                        </p>
                    `;
                }
                form.reset();
            } else {
                throw new Error('Error en el envío');
            }
        } catch (error) {
            if (statusMessage) {
                statusMessage.innerHTML = `
                    <p style="color: #D32F2F; font-weight: bold; background-color: #ffcdd2; padding: 10px; border-radius: 8px;">
                        ${translations["form_error"]}
                    </p>
                `;
            }
        } finally {
            if (submitButton) {
                submitButton.value = translations["form_submit_js"];
                submitButton.disabled = false;
            }
        }
    });
}
