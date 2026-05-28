export default function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];

  if (rows[0]) {
    rows[0].classList.add('pricing-card-header');
    const heading = rows[0].querySelector('h2, h3, h4');
    if (heading) heading.classList.add('pricing-plan-name');
  }

  if (rows[1]) {
    rows[1].classList.add('pricing-card-body');
    const priceEl = rows[1].querySelector('p:first-child, strong');
    if (priceEl) priceEl.classList.add('pricing-amount');
  }

  if (rows[2]) {
    rows[2].classList.add('pricing-card-cta');
  }

  if (rows[3]) {
    rows[3].classList.add('pricing-card-disclaimer');
  }
}
