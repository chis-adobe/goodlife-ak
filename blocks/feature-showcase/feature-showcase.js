export default function init(el) {
  const rows = [...el.querySelectorAll(':scope > div')];

  rows.forEach((row, idx) => {
    row.classList.add('showcase-row');
    if (idx % 2 === 1) row.classList.add('showcase-row-reversed');

    const cols = [...row.children];
    if (cols.length >= 2) {
      const imageCol = cols.find((col) => col.querySelector('picture'));
      const textCol = cols.find((col) => col.querySelector('h2'));

      if (imageCol) imageCol.classList.add('showcase-image');
      if (textCol) textCol.classList.add('showcase-text');
    }
  });
}
