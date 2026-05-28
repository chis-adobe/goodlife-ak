export default function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];

  if (rows[0]) {
    rows[0].classList.add('club-selector-header');
  }

  if (rows[1]) {
    rows[1].classList.add('club-selector-details');
  }

  if (rows[2]) {
    rows[2].classList.add('club-selector-action');
    const link = rows[2].querySelector('a');
    if (link) {
      link.classList.add('change-club-link');
    }
  }
}
