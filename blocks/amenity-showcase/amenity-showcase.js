export default function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];
  const imageRow = rows[0];
  const badgeRow = rows[1];

  if (imageRow) {
    imageRow.classList.add('amenity-images');
    const cols = [...imageRow.children];
    cols.forEach((col) => col.classList.add('amenity-image-col'));
  }

  if (badgeRow) {
    badgeRow.classList.add('amenity-badges');
    const badges = [...badgeRow.children];
    badges.forEach((badge) => badge.classList.add('amenity-badge'));
  }
}
