// Fetch from 3 public APIs in parallel, combine, handle partial failures.
// Hint: Promise.allSettled — not Promise.all — so one failure doesn't lose the others.

const ENDPOINTS = [
  'https://api.github.com/repos/nodejs/node',
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://api.coindesk.com/v1/bpi/currentprice.json',
];

async function fetchJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url} → ${r.status}`);
  return r.json();
}

async function main() {
  // TODO: kick off all three in parallel, then combine into one summary object.
  const results = await Promise.allSettled(ENDPOINTS.map(fetchJson));
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') console.log(`✓ ${ENDPOINTS[i]}`);
    else console.error(`✗ ${ENDPOINTS[i]} — ${r.reason.message}`);
  });
}

main();
