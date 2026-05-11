# Bonus — Web Workers

**Why now:** JavaScript is single-threaded. Any CPU work over ~50ms blocks the main thread, jankifies scrolling, and tanks INP. Web Workers let you offload work to a real OS thread. You'll reach for them maybe 2–3 times a year, but knowing when is the difference between "ship it" and "rewrite the whole feature."

**Reading (45 min):** [MDN — Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), [MDN — Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects), [Comlink](https://github.com/GoogleChromeLabs/comlink) (RPC wrapper that makes workers feel like local async functions).

## When to use

- **Heavy parsing**: large CSV/JSON, Markdown, syntax highlighting (Shiki, Prism).
- **Math**: image processing, audio analysis, large-scale data crunching, search index building.
- **Crypto / hashing**: SubtleCrypto, hashing big files.
- **Compression**: zstd / brotli of payloads before upload.

## When NOT to use

- DOM access (workers can't touch the DOM).
- Anything that takes <50ms — the postMessage overhead kills the win.
- "I want concurrency" — JS isn't multi-threaded for IO; `await` already gives you that.

## Setup (Vite)

Vite has first-class worker support:

```ts
// src/heavy.worker.ts
self.onmessage = (e: MessageEvent<number[]>) => {
  const result = e.data.map((n) => n * n).reduce((a, b) => a + b, 0);
  self.postMessage(result);
};

// src/App.tsx
const worker = new Worker(new URL('./heavy.worker.ts', import.meta.url), { type: 'module' });

worker.onmessage = (e) => console.log('result:', e.data);
worker.postMessage([1, 2, 3, /* ...10 million numbers... */]);
```

## With Comlink (recommended for anything non-trivial)

```ts
// src/api.worker.ts
import * as Comlink from 'comlink';
const api = {
  square: (n: number) => n * n,
  parseCSV: (csv: string) => /* ... */ [],
};
Comlink.expose(api);

// src/App.tsx
import * as Comlink from 'comlink';
const worker = new Worker(new URL('./api.worker.ts', import.meta.url), { type: 'module' });
const api = Comlink.wrap<typeof import('./api.worker.ts').default>(worker);

await api.square(7); // 49 — feels like a regular await, runs on another thread
```

## Transferables — for big data

Don't `postMessage(hugeArrayBuffer)` and pay the structured-clone cost. **Transfer** ownership instead:

```ts
const buf = new ArrayBuffer(100_000_000);
worker.postMessage(buf, [buf]); // second arg = transfer list; main thread loses access
```

## Exercise

Build a "find primes up to N" demo:

1. Naive version on the main thread. Click button, scroll the page mid-compute — notice the freeze.
2. Move the prime-finding into a worker. Same click, but scroll stays smooth.
3. Wire a progress bar via `postMessage({ progress: pct })` from the worker every 100ms.
4. Open Performance panel during step 1 vs step 3 — compare main thread bars.
