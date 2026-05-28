function toggleItem(item, container) {
  const wasOpen = item.classList.contains('is-open');
  container.querySelectorAll('.accordion-item').forEach((i) => {
    i.classList.remove('is-open');
    const h = i.querySelector('.accordion-heading');
    if (h) h.setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen) {
    item.classList.add('is-open');
    const h = item.querySelector('.accordion-heading');
    if (h) h.setAttribute('aria-expanded', 'true');
  }
}

function decorateAccordion(container) {
  const items = [...container.querySelectorAll(':scope > div')];
  items.forEach((item, idx) => {
    item.classList.add('accordion-item');
    if (idx === 0) item.classList.add('is-open');

    const heading = item.querySelector('h3, h4, h5, h6');
    if (!heading) return;

    heading.classList.add('accordion-heading');
    heading.setAttribute('role', 'button');
    heading.setAttribute('aria-expanded', idx === 0 ? 'true' : 'false');
    heading.tabIndex = 0;

    const content = document.createElement('div');
    content.classList.add('accordion-content');
    const siblings = [];
    let next = heading.nextElementSibling;
    while (next) {
      siblings.push(next);
      next = next.nextElementSibling;
    }
    siblings.forEach((sib) => content.append(sib));
    heading.after(content);

    heading.addEventListener('click', () => toggleItem(item, container));
    heading.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem(item, container);
      }
    });
  });
}

export default function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];

  rows.forEach((row, idx) => {
    row.classList.add('showcase-row');
    if (idx % 2 === 1) row.classList.add('showcase-row-reversed');

    const cols = [...row.children];
    if (cols.length >= 2) {
      const imageCol = cols.find((col) => col.querySelector('picture'));
      const textCol = cols.find((col) => !col.querySelector('picture') || col.querySelector('h2, h3'));

      if (imageCol) imageCol.classList.add('showcase-image');
      if (textCol) {
        textCol.classList.add('showcase-text');
        const accordionWrapper = textCol.querySelector(':scope > div');
        if (accordionWrapper) {
          accordionWrapper.classList.add('accordion-wrapper');
          decorateAccordion(accordionWrapper);
        }
      }
    }
  });
}
