export default function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];

  rows.forEach((row) => {
    row.classList.add('feature-grid-item');
    const cols = [...row.children];
    if (cols.length >= 2) {
      cols[0].classList.add('feature-grid-icon');
      cols[1].classList.add('feature-grid-content');
    }
  });
}
