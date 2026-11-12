'use strict';

const cvDetails = [...document.querySelectorAll('.cv-entry-details')];
const cvControls = document.querySelector('.cv-controls');
const cvDetailsStatus = document.querySelector('#cv-details-status');

if (cvControls && cvDetails.length) {
  cvControls.hidden = false;
  cvControls.querySelector('[data-cv-expand]').addEventListener('click', () => {
    cvDetails.forEach(detail => { detail.open = true; });
    if (cvDetailsStatus) cvDetailsStatus.textContent = 'All experience and project details expanded.';
  });
  cvControls.querySelector('[data-cv-collapse]').addEventListener('click', () => {
    cvDetails.forEach(detail => { detail.open = false; });
    if (cvDetailsStatus) cvDetailsStatus.textContent = 'Experience and project details collapsed.';
  });
}

const cvPrint = document.querySelector('[data-cv-print]');
if (cvPrint) {
  cvPrint.hidden = false;
  cvPrint.addEventListener('click', () => window.print());
}

let cvBeforePrint = null;
window.addEventListener('beforeprint', () => {
  cvBeforePrint = cvDetails.map(detail => detail.open);
  cvDetails.forEach(detail => { detail.open = true; });
});
window.addEventListener('afterprint', () => {
  if (cvBeforePrint) cvDetails.forEach((detail, index) => { detail.open = cvBeforePrint[index]; });
  cvBeforePrint = null;
});

const cvSectionLinks = [...document.querySelectorAll('.cv-toc a[href^="#"]')];
const cvSections = [...document.querySelectorAll('.cv-section')];
const cvActivate = id => {
  cvSectionLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};

if (cvSections.length) {
  const initial = cvSections.find(section => `#${section.id}` === location.hash) || cvSections[0];
  cvActivate(initial.id);
  cvSectionLinks.forEach(link => link.addEventListener('click', () => cvActivate(link.hash.slice(1))));
  if ('IntersectionObserver' in window) {
    const cvObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) cvActivate(visible[0].target.id);
    }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
    cvSections.forEach(section => cvObserver.observe(section));
  }
}
