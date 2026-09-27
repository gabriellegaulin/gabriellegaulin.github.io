(function () {
  const root = document.querySelector('[data-sketchbook]');
  if (!root || !window.SKETCHBOOK_PAGES) return;

  const spread = root.querySelector('[data-spread]');
  const count = root.parentElement.querySelector('[data-page-count]');
  const editToggle = document.querySelector('[data-sketch-edit]');
  const prev = root.querySelector('[data-prev]');
  const next = root.querySelector('[data-next]');
  let index = 0;
  let editing = false;
  const pages = window.SKETCHBOOK_PAGES.map((page, i) => ({...page, i}));
  const storageKey = 'gabrielle-sketchbook-edits';

  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (e) {}

  function assetPath(path) {
    const base = window.SITE_BASEURL || '';
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return base + path;
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, function (c) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'})[c];
    });
  }

  function valueFor(key, fallback) {
    return Object.prototype.hasOwnProperty.call(saved, key) ? saved[key] : fallback;
  }

  function render() {
    const page = pages[index];
    const leftKey = page.i + ':left_note';
    const rightKey = page.i + ':right_note';
    spread.innerHTML = `
      <div class="sketch-page sketch-left">
        <div class="sketch-page-number">${escapeHtml(page.left_title)}</div>
        <img src="${assetPath(page.left_image)}" alt="">
        <div class="editable-note" contenteditable="${editing}" data-key="${leftKey}">${escapeHtml(valueFor(leftKey, page.left_note)).replace(/\n/g, '<br>')}</div>
      </div>
      <div class="sketch-binding" aria-hidden="true"></div>
      <div class="sketch-page sketch-right">
        <div class="sketch-page-number">${escapeHtml(page.right_title)}</div>
        <img src="${assetPath(page.right_image)}" alt="">
        <div class="editable-note" contenteditable="${editing}" data-key="${rightKey}">${escapeHtml(valueFor(rightKey, page.right_note)).replace(/\n/g, '<br>')}</div>
      </div>`;

    spread.querySelectorAll('.editable-note').forEach(function (el) {
      el.addEventListener('input', function () {
        saved[el.dataset.key] = el.innerText;
        try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch (e) {}
      });
    });
    count.textContent = (index + 1) + ' / ' + pages.length;
  }

  function turn(direction) {
    if (pages.length < 2) return;
    spread.classList.add(direction === 1 ? 'turn-next' : 'turn-prev');
    setTimeout(function () {
      index = (index + direction + pages.length) % pages.length;
      render();
      spread.className = 'book-spread';
    }, 230);
  }

  prev.addEventListener('click', function () { turn(-1); });
  next.addEventListener('click', function () { turn(1); });
  editToggle.addEventListener('click', function () {
    editing = !editing;
    editToggle.textContent = editing ? 'done ✓' : 'edit ✎';
    root.classList.toggle('is-editing', editing);
    render();
  });
  render();
})();
