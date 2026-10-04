import { products } from '../data/products';
import { buildQuote, whatsappUrl } from '../lib/quote.mjs';

const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const mobileNav = document.querySelector<HTMLElement>('#mobile-nav');
function closeMenu() {
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (mobileNav) mobileNav.hidden = true;
}
menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  if (mobileNav) mobileNav.hidden = expanded;
});
mobileNav
  ?.querySelectorAll('a')
  .forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const specDialog = document.querySelector<HTMLDialogElement>('#spec-dialog')!;
const quoteDialog = document.querySelector<HTMLDialogElement>('#quote-dialog')!;
const quoteForm = document.querySelector<HTMLFormElement>('#quote-form')!;
const quoteLines = document.querySelector<HTMLDivElement>('#quote-lines')!;
const lineTemplate = document.querySelector<HTMLTemplateElement>(
  '#quote-line-template',
)!;
const quoteError = document.querySelector<HTMLElement>('#quote-error')!;
let selectedProduct = products[0].id;

function text(id: string, value: string) {
  document.getElementById(id)!.textContent = value;
}
function readQuote() {
  const formData = new FormData(quoteForm);
  return {
    business: String(formData.get('business') || ''),
    city: String(formData.get('city') || ''),
    notes: String(formData.get('notes') || ''),
    items: Array.from(
      quoteLines.querySelectorAll<HTMLElement>('.quote-line'),
    ).map((line) => ({
      id: line.querySelector<HTMLSelectElement>('[name=product]')!.value,
      finish: line.querySelector<HTMLSelectElement>('[name=finish]')!.value,
      quantity: Number(
        line.querySelector<HTMLInputElement>('[name=quantity]')!.value,
      ),
    })),
  };
}
function refreshQuote() {
  quoteError.hidden = true;
  try {
    text('quote-message', buildQuote(readQuote(), products));
  } catch (error) {
    text(
      'quote-message',
      error instanceof Error ? error.message : 'Lengkapi formulir penawaran.',
    );
  }
}
function addLine(productId = products[0].id) {
  const line = lineTemplate.content.firstElementChild!.cloneNode(
    true,
  ) as HTMLElement;
  const productSelect =
    line.querySelector<HTMLSelectElement>('[name=product]')!;
  const finishSelect = line.querySelector<HTMLSelectElement>('[name=finish]')!;
  const product = products.find((p) => p.id === productId) || products[0];
  productSelect.value = product.id;
  finishSelect.value = product.finish;
  productSelect.addEventListener('change', () => {
    finishSelect.value = products.find(
      (p) => p.id === productSelect.value,
    )!.finish;
    refreshQuote();
  });
  line
    .querySelector<HTMLButtonElement>('.remove-line')!
    .addEventListener('click', () => {
      if (quoteLines.childElementCount > 1) {
        line.remove();
        document.getElementById('add-quote-line')!.focus();
        refreshQuote();
      } else {
        quoteError.textContent =
          'Sisakan sedikitnya satu produk untuk penawaran.';
        quoteError.hidden = false;
      }
    });
  quoteLines.append(line);
  refreshQuote();
}
function openQuote(productId?: string) {
  closeMenu();
  if (specDialog.open) specDialog.close();
  if (quoteLines.childElementCount === 0) addLine(productId);
  else if (productId) {
    const existing = Array.from(
      quoteLines.querySelectorAll<HTMLSelectElement>('[name=product]'),
    ).find((select) => select.value === productId);
    if (!existing) addLine(productId);
  }
  refreshQuote();
  quoteDialog.showModal();
}
document
  .querySelectorAll<HTMLButtonElement>('[data-quote-open]')
  .forEach((button) =>
    button.addEventListener('click', () =>
      openQuote(button.dataset.quoteOpen || undefined),
    ),
  );
document
  .getElementById('add-quote-line')!
  .addEventListener('click', () => addLine());
quoteForm.addEventListener('input', refreshQuote);
quoteForm.addEventListener('change', refreshQuote);
quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    const url = whatsappUrl(
      buildQuote(readQuote(), products),
      quoteDialog.dataset.phone,
    );
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.append(link);
    link.click();
    link.remove();
  } catch (error) {
    quoteError.textContent =
      error instanceof Error ? error.message : 'Periksa kembali isian Anda.';
    quoteError.hidden = false;
  }
});

document
  .querySelectorAll<HTMLButtonElement>('[data-spec-open]')
  .forEach((button) =>
    button.addEventListener('click', () => {
      const product = products.find((p) => p.id === button.dataset.specOpen);
      if (!product) return;
      selectedProduct = product.id;
      text('spec-code', `${product.id} / FORM STUDY`);
      text('spec-title', product.name);
      text('spec-category', `${product.category} · ${product.finish}`);
      text('spec-description', product.description);
      text('spec-material', product.material);
      const img = document.querySelector<HTMLImageElement>('#spec-image')!;
      img.src = product.image;
      img.alt = `Ilustrasi ${product.name}`;
      const tbody = document.getElementById('spec-measurements')!;
      tbody.replaceChildren();
      product.dimensions.forEach((dimension) => {
        const row = document.createElement('tr');
        const label = document.createElement('th');
        const value = document.createElement('td');
        label.scope = 'row';
        label.textContent = dimension.label;
        value.textContent = String(dimension.value);
        row.append(label, value);
        tbody.append(row);
      });
      specDialog.showModal();
    }),
  );
document
  .getElementById('spec-quote')!
  .addEventListener('click', () => openQuote(selectedProduct));
[specDialog, quoteDialog].forEach((dialog) => {
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const controls = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'button, input, select, textarea, a[href], summary, [tabindex]',
      ),
    ).filter(
      (control) =>
        control.tabIndex >= 0 &&
        !control.matches(':disabled') &&
        control.getClientRects().length > 0,
    );
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (!first) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  dialog
    .querySelector('[data-close-dialog]')!
    .addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.toggle(
      'dialog-open',
      specDialog.open || quoteDialog.open,
    );
  });
});
const dialogObserver = new MutationObserver(() => {
  document.documentElement.classList.toggle(
    'dialog-open',
    specDialog.open || quoteDialog.open,
  );
});
[specDialog, quoteDialog].forEach((dialog) =>
  dialogObserver.observe(dialog, {
    attributes: true,
    attributeFilter: ['open'],
  }),
);

document.querySelectorAll<HTMLElement>('[data-catalog]').forEach((catalog) => {
  const filters = catalog.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const cards = catalog.querySelectorAll<HTMLElement>('[data-category]');
  function filter(category: string) {
    let count = 0;
    cards.forEach((card) => {
      card.hidden = category !== 'Semua' && card.dataset.category !== category;
      if (!card.hidden) count++;
    });
    filters.forEach((button) =>
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.filter === category),
      ),
    );
    const counter = catalog.querySelector('[data-catalog-count]');
    if (counter) counter.textContent = `${count} bentuk`;
  }
  filters.forEach((button) =>
    button.addEventListener('click', () => filter(button.dataset.filter!)),
  );
  const requested = new URLSearchParams(window.location.search).get('kategori');
  if (
    requested &&
    Array.from(filters).some((button) => button.dataset.filter === requested) &&
    filters.length
  )
    filter(requested);
});
