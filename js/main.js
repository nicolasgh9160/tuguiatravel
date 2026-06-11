// ====== TuguiaTravel - JS ======

// Marca link activo según la página
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-tg .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Cerrar el menú móvil al hacer clic en un enlace
  const navCollapse = document.getElementById('mainNav');
  if (navCollapse) {
    navCollapse.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) {
          new bootstrap.Collapse(navCollapse).hide();
        }
      });
    });
  }

  // ====== Validación del formulario de contacto ======
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    nombre:  { el: form.querySelector('#nombre'),  test: v => v.trim().length >= 2 && v.trim().length <= 80,
               msg: 'Ingresa tu nombre (entre 2 y 80 caracteres).' },
    email:   { el: form.querySelector('#email'),   test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) && v.length <= 120,
               msg: 'Ingresa un correo electrónico válido.' },
    telefono:{ el: form.querySelector('#telefono'),test: v => v === '' || /^[+\d\s\-()]{7,20}$/.test(v),
               msg: 'Ingresa un teléfono válido (opcional).' },
    interes: { el: form.querySelector('#interes'), test: v => v !== '',
               msg: 'Selecciona una opción.' },
    mensaje: { el: form.querySelector('#mensaje'), test: v => v.trim().length >= 10 && v.trim().length <= 800,
               msg: 'El mensaje debe tener entre 10 y 800 caracteres.' },
    privacidad:{ el: form.querySelector('#privacidad'), test: el => el.checked,
               msg: 'Debes aceptar la política de privacidad.', isCheckbox: true }
  };

  const setError = (entry, hasError) => {
    entry.el.classList.toggle('is-invalid', hasError);
    entry.el.setAttribute('aria-invalid', hasError ? 'true' : 'false');
    const fb = entry.el.parentElement.querySelector('.invalid-feedback');
    if (fb) fb.textContent = hasError ? entry.msg : '';
  };

  // Validación en vivo
  Object.values(fields).forEach(entry => {
    if (!entry.el) return;
    const evt = entry.isCheckbox ? 'change' : 'blur';
    entry.el.addEventListener(evt, () => {
      const value = entry.isCheckbox ? entry.el : entry.el.value;
      setError(entry, !entry.test(value));
    });
  });

  // Contador de caracteres del mensaje
  const mensaje = fields.mensaje.el;
  const counter = document.getElementById('mensajeCount');
  if (mensaje && counter) {
    mensaje.addEventListener('input', () => {
      counter.textContent = `${mensaje.value.length} / 800`;
    });
  }

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    let firstInvalid = null;

    Object.values(fields).forEach(entry => {
      if (!entry.el) return;
      const value = entry.isCheckbox ? entry.el : entry.el.value;
      const ok = entry.test(value);
      setError(entry, !ok);
      if (!ok) {
        valid = false;
        if (!firstInvalid) firstInvalid = entry.el;
      }
    });

    const successAlert = document.getElementById('formSuccess');
    const errorAlert = document.getElementById('formError');
    successAlert.classList.add('d-none');
    errorAlert.classList.add('d-none');

    if (!valid) {
      errorAlert.classList.remove('d-none');
      firstInvalid && firstInvalid.focus();
      return;
    }

    // Simular envío
    const submitBtn = form.querySelector('button[type="submit"]');
    const original = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';

    setTimeout(() => {
      successAlert.classList.remove('d-none');
      successAlert.focus();
      form.reset();
      if (counter) counter.textContent = '0 / 800';
      submitBtn.disabled = false;
      submitBtn.innerHTML = original;
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 900);
  });
});
