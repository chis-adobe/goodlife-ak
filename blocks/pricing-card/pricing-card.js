export default function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];

  if (rows[0]) {
    rows[0].classList.add('pricing-card-header');
  }

  if (rows[1]) {
    rows[1].classList.add('pricing-card-description');
  }

  if (rows[2]) {
    rows[2].classList.add('pricing-card-price');
    const cols = [...rows[2].children];
    if (cols.length >= 2) {
      const wholeAmount = cols[0].textContent.trim();
      const remainder = cols[1].textContent.trim();
      rows[2].innerHTML = `<div class="price-display"><span class="price-whole">${wholeAmount}</span><span class="price-rest">${remainder}</span></div>`;
    }
  }

  if (rows[3]) {
    rows[3].classList.add('pricing-card-disclaimer');
  }
}
