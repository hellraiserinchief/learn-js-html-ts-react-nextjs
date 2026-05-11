# Day 4 — The Event Loop, Microtasks, and "Why is my code weird"

**Reading (60 min):** [Exploring JS — Foundations of async programming](https://exploringjs.com/js/book/ch_async-js.html), then watch [Jake Archibald's "In The Loop"](https://www.youtube.com/watch?v=cCOL7MC4Pl0) (35 min, the single best explanation in existence).

## Key concepts

- JavaScript is single-threaded. The runtime has a call stack, a task queue (macrotasks), and a microtask queue.
- Microtasks (Promise callbacks, `queueMicrotask`) run before the next macrotask.
- `setTimeout(fn, 0)` is **not** immediate — it waits for the call stack to empty.

## Exercise

Predict the output of 10 mixed sync/async snippets **before running them**. Get them all right. This is the muscle that pays off in React's `useEffect` later.

## Run it

```bash
node predictions.js
```
