// Write your predicted output ABOVE each block as a comment, THEN run it.
// Sync first → microtasks (Promise) → macrotasks (setTimeout).

// --- 1 ---
// Predict:
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');

// --- 2 ---
// Predict:
async function a() {
  console.log('a-start');
  await b();
  console.log('a-end');
}
async function b() {
  console.log('b');
}
a();
console.log('after-a');

// --- 3 ---
// Predict:
setTimeout(() => console.log('to-1'), 0);
queueMicrotask(() => console.log('mt-1'));
Promise.resolve().then(() => {
  console.log('p-1');
  queueMicrotask(() => console.log('mt-2'));
});
console.log('sync');

// TODO: add 7 more snippets of your own. Predict before running.
