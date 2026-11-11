'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
if (menuButton && navigation) {
  const closeMenu = () => { menuButton.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
}

const filterButtons = document.querySelectorAll('[data-filter]');
const entries = document.querySelectorAll('.publication-entry');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  let count = 0;
  entries.forEach(entry => { entry.hidden = button.dataset.filter !== 'all' && entry.dataset.category !== button.dataset.filter; if (!entry.hidden) count++; });
  const status = document.querySelector('#filter-status');
  if (status) status.textContent = `Showing ${count} research output${count === 1 ? '' : 's'}`;
}));
// A deep link to a publication always reveals that output, including after filtering.
window.addEventListener('hashchange', () => {
  if ([...entries].some(entry => `#${entry.id}` === location.hash)) document.querySelector('[data-filter="all"]')?.click();
});

const citationData = document.querySelector('#citations');
if (citationData) {
  const citations = JSON.parse(citationData.textContent);
  document.querySelectorAll('.copy-citation').forEach(button => button.addEventListener('click', async () => {
    const text = citations[button.dataset.citation];
    const status = document.querySelector('.copy-status');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied ✓';
      if (status) status.textContent = 'Citation copied to clipboard.';
      setTimeout(() => { button.textContent = 'Copy citation'; }, 2500);
    } catch {
      if (status) { status.textContent = `Select and copy this citation: ${text}`; status.setAttribute('tabindex', '-1'); status.focus(); }
    }
  }));
}

const dialog = document.querySelector('.photo-dialog');
if (dialog) {
  let photoTrigger = null;
  document.querySelectorAll('.photo-open').forEach(button => button.addEventListener('click', () => {
    photoTrigger = button;
    const image = dialog.querySelector('img');
    image.src = button.dataset.photo;
    image.alt = button.querySelector('img').alt;
    dialog.querySelector('p').textContent = button.dataset.caption;
    dialog.showModal();
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => photoTrigger?.focus());
}
