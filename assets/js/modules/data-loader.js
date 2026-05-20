/**
 * Cargador de Datos Dinámico - Synnergy Lab
 * Consume archivos JSON en segundo plano (fetch) y renderiza tarjetas
 * de servicios, proyectos y testimonios según el idioma del documento.
 */

(function () {
  const lang = document.documentElement.lang || 'es';
  const path = window.location.pathname;

  // 1. Detectar profundidad relativa para resolver ruta de datos
  const subfolders = [
    '/nosotros/', '/servicios/', '/proyectos/', '/agencia/', '/contacto/',
    '/about/', '/services/', '/projects/', '/agency/', '/contact/'
  ];
  const isSubfolder = subfolders.some(folder => path.includes(folder));
  const siteRootPrefix = isSubfolder ? '../../' : '../';

  // 2. Cargar Servicios si el contenedor existe
  const servicesContainer = document.getElementById('dynamic-services');
  if (servicesContainer) {
    fetch(`${siteRootPrefix}data/services.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar servicios JSON');
        return res.json();
      })
      .then((data) => {
        servicesContainer.innerHTML = data
          .map((item) => `
            <article class="card content-card" id="service-${item.id}" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <p class="section-kicker" style="font-size: 0.82rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--color-accent); letter-spacing: 0.08em; text-transform: uppercase;">
                  ${item.kicker[lang]}
                </p>
                <h3 style="margin-bottom: 0.75rem; font-family: var(--font-heading); font-size: clamp(1.2rem, 2.5vw, 1.55rem); color: var(--color-text-strong); line-height: 1.2;">
                  ${item.title[lang]}
                </h3>
                <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6;">
                  ${item.description[lang]}
                </p>
              </div>
            </article>
          `)
          .join('');
      })
      .catch((err) => console.error('[Loader] Error en servicios:', err));
  }

  // 3. Cargar Proyectos si el contenedor existe
  const projectsContainer = document.getElementById('dynamic-projects');
  if (projectsContainer) {
    fetch(`${siteRootPrefix}data/projects.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar proyectos JSON');
        return res.json();
      })
      .then((data) => {
        projectsContainer.innerHTML = data
          .map((item) => `
            <article class="card content-card" id="project-${item.id}" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <p class="section-kicker" style="font-size: 0.82rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--color-accent); letter-spacing: 0.08em; text-transform: uppercase;">
                  ${item.kicker[lang]}
                </p>
                <h3 style="margin-bottom: 0.75rem; font-family: var(--font-heading); font-size: clamp(1.2rem, 2.5vw, 1.55rem); color: var(--color-text-strong); line-height: 1.2;">
                  ${item.title[lang]}
                </h3>
                <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6;">
                  ${item.description[lang]}
                </p>
              </div>
            </article>
          `)
          .join('');
      })
      .catch((err) => console.error('[Loader] Error en proyectos:', err));
  }

  // 4. Cargar Testimonios si el contenedor existe
  const testimonialsContainer = document.getElementById('dynamic-testimonials');
  if (testimonialsContainer) {
    fetch(`${siteRootPrefix}data/testimonials.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar testimonios JSON');
        return res.json();
      })
      .then((data) => {
        testimonialsContainer.innerHTML = data
          .map((item) => `
            <article class="card content-card testimonial-card" id="testimonial-${item.id}" style="display: flex; flex-direction: column; justify-content: space-between; border-left: 4px solid var(--color-accent);">
              <blockquote style="margin: 0 0 1rem 0; font-style: italic; color: var(--color-text); font-size: 1rem; line-height: 1.6;">
                "${item.quote[lang]}"
              </blockquote>
              <div class="testimonial-author">
                <strong style="display: block; color: var(--color-text-strong); font-size: 0.95rem;">${item.name}</strong>
                <small style="display: block; color: var(--color-text-muted); font-size: 0.82rem; margin-top: 0.15rem;">
                  ${item.position[lang]}
                </small>
              </div>
            </article>
          `)
          .join('');
      })
      .catch((err) => console.error('[Loader] Error en testimonios:', err));
  }
})();
