// ============================================================
// Mega Express — lógica (plantilla base KONFÍO ZINC)
// QR dinámico 160x160 + vCard + compartir + año + service worker
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const qrEl = document.getElementById('qrcode');
  if (qrEl && typeof QRCode !== 'undefined') {
    new QRCode(qrEl, {
      text: window.location.href,
      width: 160,
      height: 160,
      colorDark: '#1e40af',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  const copiar = (texto) => {
    const ok = () => {};
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).catch(() => {});
    } else {
      const ta = document.createElement('textarea');
      ta.value = texto; ta.style.position = 'fixed'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      ta.remove();
    }
    ok();
  };

  // Compartir nativo con respaldo a copiar enlace
  document.getElementById('btn-share').addEventListener('click', async () => {
    const data = { title: 'Mega Express', text: 'Internet Fibra Óptica por $50.000 COP/mes. ¡Sin estudio de crédito!', url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(data); } catch (e) {}
    } else {
      copiar(window.location.href);
    }
  });

  // Guardar contacto (vCard)
  document.getElementById('btn-vcard').addEventListener('click', () => {
    const vCardData = 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Mega Express\r\nORG:Mega Express\r\nTEL;TYPE=CELL:+573028589954\r\nTEL;TYPE=CELL:+573217490310\r\nNOTE:Internet Fibra Optica por $50.000 COP mensual. Apto para reportados y todas las nacionalidades sin estudio de credito.\r\nEND:VCARD';
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mega_Express.vcf';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  });

  // Año
  const anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  // Service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  }
});
