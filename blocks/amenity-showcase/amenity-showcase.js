export default function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];

  rows.forEach((row, idx) => {
    row.classList.add('amenity-item');
    if (idx % 2 === 0) row.classList.add('amenity-item-tall');

    const cols = [...row.children];
    if (cols.length >= 2) {
      cols[0].classList.add('amenity-badge');
      cols[1].classList.add('amenity-image');
    } else if (cols.length === 1) {
      cols[0].classList.add('amenity-image');
    }
  });
}
