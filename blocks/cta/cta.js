export default function init(el) {
  const row = el.querySelector(':scope > div');
  if (!row) return;

  const cols = [...row.children];
  const textCol = cols[0];
  const styleCol = cols[1];

  if (textCol) textCol.classList.add('cta-content');

  if (styleCol) {
    const style = styleCol.textContent.trim().toLowerCase();
    if (style) el.classList.add(style);
    styleCol.remove();
  }

  const link = textCol?.querySelector('a');
  if (link) link.classList.add('cta-link');
}
