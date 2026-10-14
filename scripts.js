/* ============================================================
   Mega Express · Tarjeta digital
   Todo lo editable está en CONFIG. No se inventan datos: los
   campos marcados como pendientes deben completarse con datos
   reales del cliente.
   ============================================================ */

const CONFIG = {
  cliente: {
    nombre: "Mega Express Soluciones",
    // Nombre legal confirmado por el cliente: MEGA EXPRESS soluciones s.a.s.
    // Se usa en la ficha de contacto (vCard) y en los datos estructurados.
    nombreCompleto: "Mega Express Soluciones",
    profesion: "Internet Fibra Óptica · Planes desde $50.000",
    tagline: "Fibra óptica simétrica con 5 planes desde $50.000 COP/mes. Sin estudio de crédito, apto para reportados y para cualquier nacionalidad.",
    disponible: true,
    verificado: true
  },
  colores: {
    primary:  "#1e40af",
    secondary:"#facc15",
    accent:   "#eff6ff"
  },
  contacto: {
    telefonoDisplay: "+57 300 7098778",
    telefonoE164: "+573007098778",
    whatsapp: "573007098778",
    mensajeWhatsapp: "Hola, quiero información sobre el internet de Mega Express",
    email: "megaexpres83@gmail.com"
  },
  urlTarjeta: window.location.href,

  /* Sin enlaces reales de redes: los botones NO se muestran (evita enlaces rotos). */
  redes: {
    instagram: "",
    facebook: "",
    tiktok: ""
  },

  /* Los 4 diferenciadores del servicio. No son planes: los planes van en `planes`. */
  servicios: [
    { icono:"fa-solid fa-arrows-left-right", nombre:"Velocidad Simétrica", descripcion:"Misma velocidad de subida y bajada para todos tus dispositivos.", precio:"" },
    { icono:"fa-solid fa-shield-halved", nombre:"Sin Estudio Crédito", descripcion:"Instalación sin trámites ni revisión de centrales de riesgo.", precio:"" },
    { icono:"fa-solid fa-user-check", nombre:"Apto Reportados", descripcion:"Aunque estés reportado en DataCrédito, podemos instalarte.", precio:"" },
    { icono:"fa-solid fa-earth-americas", nombre:"Cualquier Nacionalidad", descripcion:"Servicio disponible para todas las nacionalidades.", precio:"" }
  ],

  /* ── Planes ──────────────────────────────────────────────────────
     Mismos planes y precios del servicio (verificados contra el sitio
     en vivo del proveedor el 13-oct-2026). El "Familiar" va destacado,
     igual que en el sitio del proveedor: guía al cliente a un plan medio.
     El botón de cada plan abre WhatsApp con el nombre del plan. */
  planes: [
    { id:"basico",  nombre:"Básico",   velocidad:"100 Mbps", precio:50000,  descripcion:"Navegar, redes sociales y streaming en HD." },
    { id:"familiar",nombre:"Familiar", velocidad:"150 Mbps", precio:60000,  descripcion:"Para hogares con varios dispositivos conectados.", destacado:true },
    { id:"plus",    nombre:"Plus",     velocidad:"200 Mbps", precio:70000,  descripcion:"Teletrabajo, estudio y streaming 4K sin interrupciones." },
    { id:"premium", nombre:"Premium",  velocidad:"250 Mbps", precio:85000,  descripcion:"Más velocidad para jugar y descargar sin límites." },
    { id:"ultra",   nombre:"Ultra",    velocidad:"300 Mbps", precio:100000, descripcion:"Máxima velocidad para hogares exigentes." }
  ],

  /* No hay fotos reales de instalaciones aún: se muestran láminas "Foto pendiente". */
  galeria: [],

  cobertura: {
    texto: "Disponibilidad inmediata. Envíanos tu ubicación por WhatsApp para validar cobertura técnica en tu zona.",
    zonas: ["Residencial", "Cualquier nacionalidad", "Sin revisión de centrales de riesgo"]
  },

  informacion: {
    horarios: [
      { dias: "Lunes a viernes", horas: "09:00 – 17:00" },
      { dias: "Sábado", horas: "09:00 – 15:00" },
      { dias: "Domingo", horas: "Cerrado" }
    ],
    direccion: "Calle 64 AB #105 A 93, Santa Margarita",
    telefonos: [
      { label: "Línea de ventas", numero: "+573007098778", display: "+57 300 7098778" }
    ]
  }
};

/* ── utilidades ── */
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

(function(){
  "use strict";

  /* ── Servicios (con precio, o "Incluido en el plan" si falta) ── */
  const listaServicios = $('#lista-servicios');
  CONFIG.servicios.forEach(s => {
    const precio = s.precio ? `<span class="precio">${esc(s.precio)}</span>` : `<span class="precio precio-pend">Incluido en el plan</span>`;
    listaServicios.insertAdjacentHTML('beforeend', `
      <div class="servicio-item">
        <div class="ic"><i class="${s.icono}" aria-hidden="true"></i></div>
        <div class="servicio-cuerpo"><h3>${esc(s.nombre)}</h3><p>${esc(s.descripcion)}</p>${precio}</div>
      </div>`);
  });

  /* ── Planes: rejilla de 2 columnas, el último a todo el ancho.
        Cada plan abre WhatsApp con SU nombre en el mensaje, para que quien
        atiende sepa de una qué plan quiere el cliente. El plan destacado
        lleva borde amarillo y la etiqueta "Recomendado". ── */
  const rejillaPlanes = $('#planes-grid');
  if (rejillaPlanes) {
    const ultimo = CONFIG.planes.length - 1;
    CONFIG.planes.forEach((p, i) => {
      const precio = '$' + p.precio.toLocaleString('es-CO');
      const texto = `Hola, quiero contratar el plan ${p.nombre} de Mega Express`;
      const clases = 'plan-card'
        + (p.destacado ? ' plan-card--destacado' : '')
        + (i === ultimo ? ' plan-card--ancho' : '');
      rejillaPlanes.insertAdjacentHTML('beforeend', `
        <article class="${clases}">
          ${p.destacado ? '<span class="plan-badge">Recomendado</span>' : ''}
          <div class="plan-cuerpo">
            <div class="plan-nombre">${esc(p.nombre)}</div>
            <div class="plan-velocidad">${esc(p.velocidad)}</div>
            <div class="plan-precio">${precio}<small> /mes</small></div>
            <p class="plan-desc">${esc(p.descripcion)}</p>
          </div>
          <a class="plan-btn" href="https://wa.me/${esc(CONFIG.contacto.whatsapp)}?text=${encodeURIComponent(texto)}"
             target="_blank" rel="noopener noreferrer"
             aria-label="Contratar por WhatsApp el plan ${esc(p.nombre)} de ${esc(p.velocidad)}">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Contratar
          </a>
        </article>`);
    });
  }

  /* ── Galería: fotos reales + láminas "Foto pendiente" ── */
  const wrapper = $('#swiper-wrapper');
  CONFIG.galeria.forEach(g => {
    wrapper.insertAdjacentHTML('beforeend', `<div class="swiper-slide"><img src="${g.src}" alt="${esc(g.alt)}" loading="lazy"></div>`);
  });
  const FALTANTES = 6 - CONFIG.galeria.length;
  for (let i = 0; i < FALTANTES; i++) {
    wrapper.insertAdjacentHTML('beforeend', `
      <div class="swiper-slide">
        <div class="ph" role="img" aria-label="Foto pendiente por agregar">
          <i class="fa-regular fa-image" aria-hidden="true"></i>
          <span>Foto pendiente</span>
        </div>
      </div>`);
  }

  /* ── Horarios (tabla visible) ── */
  const tablaHorarios = $('#horarios-tabla');
  CONFIG.informacion.horarios.forEach(h => {
    tablaHorarios.insertAdjacentHTML('beforeend', `
      <div class="horario-row">
        <span class="horario-dias">${esc(h.dias)}</span>
        <span class="horario-horas">${esc(h.horas)}</span>
      </div>`);
  });

  /* ── Información (teléfonos → tel, WhatsApp → wa.me, dirección → Maps) ── */
  const listaInfo = $('#lista-informacion');
  CONFIG.informacion.telefonos.forEach(t => {
    listaInfo.insertAdjacentHTML('beforeend', `
      <a class="info-row info-link" href="tel:${esc(t.numero)}">
        <span class="ic"><i class="fa-solid fa-phone" aria-hidden="true"></i></span>
        <span>${esc(t.label)} — ${esc(t.display)}</span>
      </a>`);
  });
  listaInfo.insertAdjacentHTML('beforeend', `
    <a class="info-row info-link" href="https://wa.me/${esc(CONFIG.contacto.whatsapp)}" target="_blank" rel="noopener noreferrer">
      <span class="ic"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></span>
      <span>WhatsApp — ${esc(CONFIG.contacto.telefonoDisplay)}</span>
    </a>`);
  if (CONFIG.informacion.direccion) {
    const q = encodeURIComponent(CONFIG.informacion.direccion);
    listaInfo.insertAdjacentHTML('beforeend', `
      <a class="info-row info-link" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener noreferrer">
        <span class="ic"><i class="fa-solid fa-location-dot" aria-hidden="true"></i></span>
        <span>${esc(CONFIG.informacion.direccion)}</span>
      </a>`);
  }
  if (CONFIG.contacto.email) {
    listaInfo.insertAdjacentHTML('beforeend', `
      <a class="info-row info-link" href="mailto:${esc(CONFIG.contacto.email)}">
        <span class="ic"><i class="fa-regular fa-envelope" aria-hidden="true"></i></span>
        <span>${esc(CONFIG.contacto.email)}</span>
      </a>`);
  }

  const chips = $('#cobertura-chips');
  CONFIG.cobertura.zonas.forEach(z => {
    chips.insertAdjacentHTML('beforeend', `<span class="chip">${esc(z)}</span>`);
  });

  /* ── Redes: solo se muestran si hay enlace real ── */
  const redesRow = $('#redes-row');
  const redes = [
    { key:'instagram', icono:'fa-brands fa-instagram', nombre:'Instagram' },
    { key:'facebook',  icono:'fa-brands fa-facebook-f', nombre:'Facebook' },
    { key:'tiktok',    icono:'fa-brands fa-tiktok', nombre:'TikTok' }
  ];
  let redesVisibles = 0;
  redes.forEach(r => {
    const url = CONFIG.redes[r.key];
    if (url && !/^https:\/\/(instagram|facebook|tiktok)\.com\/?$/.test(url)) {
      redesRow.insertAdjacentHTML('beforeend',
        `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="${r.nombre}"><i class="${r.icono}" aria-hidden="true"></i></a>`);
      redesVisibles++;
    }
  });
  if (!redesVisibles) redesRow.style.display = 'none';

  /* ── Acciones ── */
  function accionWhatsApp(){
    window.open(`https://wa.me/${CONFIG.contacto.whatsapp}?text=${encodeURIComponent(CONFIG.contacto.mensajeWhatsapp)}`, '_blank');
  }
  function accionLlamar(){
    window.location.href = `tel:${CONFIG.contacto.telefonoE164}`;
  }
  function accionGuardarContacto(){
    const v = [
      "BEGIN:VCARD","VERSION:3.0",
      `FN:${CONFIG.cliente.nombreCompleto}`,
      `ORG:${CONFIG.cliente.nombreCompleto}`,
      `TITLE:${CONFIG.cliente.profesion}`,
      `TEL;TYPE=CELL:${CONFIG.contacto.telefonoE164}`,
      "END:VCARD"
    ].join("\n");
    const blob = new Blob([v], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'Mega_Express.vcf';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
    mostrarToast("Contacto descargado");
  }
  async function accionShareNativo(){
    try {
      await navigator.share({
        title: CONFIG.cliente.nombreCompleto,
        text: CONFIG.cliente.tagline,
        url: CONFIG.urlTarjeta
      });
    } catch (e) { /* cancelado por el usuario */ }
  }
  function accionCopiarLink(){
    const t = CONFIG.urlTarjeta;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(t).then(() => mostrarToast("Vínculo copiado"), () => copiarFallback(t));
    } else {
      copiarFallback(t);
    }
  }
  function copiarFallback(texto){
    const ta = document.createElement('textarea');
    ta.value = texto; ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); mostrarToast("Vínculo copiado"); } catch (e) { mostrarToast("Copia: " + texto); }
    ta.remove();
  }

  /* ── Modales ── */
  let swiperInstance = null;
  function abrirModal(id){
    const el = document.getElementById(id);
    el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (id === 'modal-galeria' && !swiperInstance) {
      swiperInstance = new Swiper('#swiper-galeria', {
        loop: true, spaceBetween: 10, autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true }
      });
    }
    if (id === 'modal-compartir') {
      const qrEl = $('#qr-code');
      if (!qrEl.dataset.rendered) {
        new QRCode(qrEl, { text: CONFIG.urlTarjeta, width: 150, height: 150, colorDark: CONFIG.colores.primary });
        qrEl.dataset.rendered = "1";
      }
    }
  }
  function cerrarModal(el){
    el.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function cerrarTodos(){
    document.querySelectorAll('.modal.is-open').forEach(m => cerrarModal(m));
  }

  /* ── Delegación de clics ── */
  document.addEventListener('click', function(e){
    const btnAction = e.target.closest('[data-action]');
    if (btnAction) {
      const act = btnAction.dataset.action;
      if (act === 'whatsapp') accionWhatsApp();
      else if (act === 'llamar') accionLlamar();
      else if (act === 'guardar') accionGuardarContacto();
      else if (act === 'copiar-link') accionCopiarLink();
      else if (act === 'compartir') abrirModal('modal-compartir');
      return;
    }

    const btnScroll = e.target.closest('[data-scroll]');
    if (btnScroll) {
      const destino = document.getElementById(btnScroll.dataset.scroll);
      if (destino) destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const btnModal = e.target.closest('[data-modal]');
    if (btnModal) { abrirModal(btnModal.dataset.modal); return; }

    if (e.target.closest('[data-close]')) { cerrarModal(e.target.closest('[data-modal-root]')); return; }
    if (e.target.hasAttribute('data-modal-root')) { cerrarModal(e.target); return; }
  });

  /* ── Compartir nativo (solo si el navegador lo soporta) ── */
  const btnShare = $('#btn-share-nativo');
  if (navigator.share) {
    btnShare.style.display = '';
    btnShare.addEventListener('click', accionShareNativo);
  }

  /* ── Teclado: Escape cierra modales ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarTodos();
  });

  function mostrarToast(msg){
    const t = $('#toast'); t.textContent = msg; t.classList.add('is-visible');
    setTimeout(() => t.classList.remove('is-visible'), 2200);
  }

  /* ── Splash, año y service worker ── */
  window.addEventListener('load', () => {
    setTimeout(() => $('#splash').classList.add('is-hidden'), 800);
    $('#anio').textContent = new Date().getFullYear();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {});
    }
  });
})();
