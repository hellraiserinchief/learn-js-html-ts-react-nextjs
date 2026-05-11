# Day 3 — Promises and Async/Await

**Reading (60 min):** [Exploring JS — Promises](https://exploringjs.com/js/book/ch_promises.html), [Async functions](https://exploringjs.com/js/book/ch_async-functions.html). **The most important day of Week 1.**

## Key concepts

- A Promise is a placeholder for a future value with three states: pending, fulfilled, rejected.
- `async` functions always return a Promise. `await` pauses execution until the Promise settles.
- `Promise.all`, `Promise.allSettled`, `Promise.race`, `Promise.any` — know what each does.
- Always handle rejections. An unhandled rejection crashes Node processes by default.

## Exercise

Build a script that fetches data from **3 public APIs** (e.g., GitHub, JSONPlaceholder, public weather) **in parallel**, combines results, and handles partial failures gracefully.

## Run it

```bash
node fetch-apis.js
```
