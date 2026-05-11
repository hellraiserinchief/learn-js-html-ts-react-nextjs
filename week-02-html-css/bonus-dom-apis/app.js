// Vanilla DOM — querying, events, FormData, delegation, dataset, classList.
const form = document.querySelector('#todo-form');
const list = document.querySelector('#todo-list');

let nextId = 1;

// One handler for the form (preventDefault + FormData)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  addTodo(data.text);
  form.reset();
});

// Event delegation: ONE listener on the parent, handles every child.
list.addEventListener('click', (e) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;
  const li = target.closest('li');
  if (!li) return;

  if (target.matches('[data-action="toggle"]')) {
    li.querySelector('span').classList.toggle('done');
  } else if (target.matches('[data-action="delete"]')) {
    li.remove();
  }
});

function addTodo(text) {
  const li = document.createElement('li');
  li.dataset.id = String(nextId++);
  li.innerHTML = `
    <span>${escapeHtml(text)}</span>
    <button data-action="toggle">✓</button>
    <button data-action="delete">✕</button>
  `;
  list.append(li);
}

// textContent is XSS-safe; innerHTML is not — sanitize when interpolating.
function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

// TODO: rebuild the same UI with full innerHTML rewrites every change.
// Time both versions with performance.now() for 10,000 items. Notice the gap.
