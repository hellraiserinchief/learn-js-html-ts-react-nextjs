# Bonus — WebAssembly (WASM)

**Why now:** You've offloaded CPU work to a [Web Worker](../bonus-web-workers/) — that solves the *threading* problem. WASM solves the *single-language* problem: it lets you run code written in Rust, C, C++, Go, Zig, AssemblyScript, etc. inside the browser at near-native speed. You'll reach for it ~once a year, but when you need it, nothing else works.

**Reading (90 min):** [MDN — WebAssembly Concepts](https://developer.mozilla.org/en-US/docs/WebAssembly/Concepts), [MDN — Loading and running WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly/Loading_and_running), [Rust + Wasm Book](https://rustwasm.github.io/docs/book/), [wasm-bindgen guide](https://rustwasm.github.io/wasm-bindgen/).

## When to actually use WASM

✓ Heavy compute that's already implemented in C/C++/Rust:
  - Image / video / audio: **ffmpeg.wasm**, [`@jsquash`](https://github.com/jamsinclair/jsquash) (image codecs)
  - PDF: **pdf.js** (mostly JS, but uses WASM for heavy bits), **mupdf.wasm**
  - SQL in the browser: **sql.js** (SQLite compiled to WASM)
  - Crypto / hashing at scale, regex (RE2), compression (zstd, brotli)
  - 3D / games / physics engines
✓ You have an existing native library you don't want to rewrite in JS.
✓ You need deterministic, branch-predictable performance (e.g., real-time DSP).

## When NOT to use WASM

✗ Small computation (< ~5ms in JS already). The JS↔WASM call overhead and memory copy will eat the win.
✗ DOM access. WASM can't touch the DOM directly — it has to call back into JS for that.
✗ String-heavy work that requires lots of JS↔WASM boundary crossings. Each crossing copies the string.
✗ "Faster JS" — modern V8/JSC are excellent. Profile first; don't WASM-ify a hunch.

## How it works (mental model)

A `.wasm` module is a binary that exports functions and operates on a single `ArrayBuffer` (its **linear memory**). JS instantiates it, calls exported functions, and reads/writes its memory. There's no shared object graph; you marshal data across the boundary.

## Two paths

### Path A — use an existing WASM library (90% of cases)

```bash
pnpm add sql.js
```

```ts
import initSqlJs from 'sql.js';

const SQL = await initSqlJs({
  locateFile: (file) => `/sql-wasm/${file}`,
});

const db = new SQL.Database();
db.run('CREATE TABLE users (id INTEGER, name TEXT)');
db.run("INSERT INTO users VALUES (1, 'Ada'), (2, 'Linus')");
const rows = db.exec('SELECT * FROM users');
console.log(rows[0].values); // [[1,'Ada'],[2,'Linus']]
```

You wrote zero Rust/C. You got SQLite in the browser.

### Path B — write your own (Rust is the friendliest)

```bash
# install Rust + wasm-pack one-time
curl https://sh.rustup.rs -sSf | sh
cargo install wasm-pack
```

```rust
// src/lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fib(n: u32) -> u64 {
    if n < 2 { return n as u64; }
    let (mut a, mut b) = (0u64, 1u64);
    for _ in 2..=n { let t = a + b; a = b; b = t; }
    b
}
```

```bash
wasm-pack build --target web
```

```ts
// in your Vite/React app
import init, { fib } from './pkg/my_wasm.js';
await init();
console.log(fib(50)); // 12586269025
```

## Pitfalls

- **Bundle size.** A "hello world" Rust → WASM is ~10KB after `wee_alloc` + `--release` + `wasm-opt`. Real libs (sql.js ≈ 600KB, ffmpeg.wasm ≈ 25MB) are big — lazy-load and serve compressed.
- **Async loading.** WASM modules instantiate asynchronously. Wrap in `<Suspense>` or a custom hook; never block first paint on it.
- **SharedArrayBuffer + threading** (for parallel WASM): requires the [COOP / COEP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cross-Origin-Opener-Policy) headers — not free on every host (Vercel needs explicit config).
- **WASM in a Web Worker**: the strongest combo for heavy work. The worker keeps the main thread responsive; WASM gives the worker the compute. See the [Web Workers bonus](../bonus-web-workers/).
- **Debugging** is harder than JS. Build with debug symbols and use Chrome DevTools → Sources, which can step through Rust if you set it up. Most of the time, log to JS from your `wasm_bindgen` exports.

## Exercise

Pick the path that matches your background:

**A — JS-only:** Build a small CSV → SQL filterable table in React. Use **sql.js** to run real `SELECT ... WHERE` queries against an in-browser SQLite. Compare to a hand-rolled JS filter on 100k rows — note the difference.

**B — Rust:** Write a Rust function that resizes an image (use the [`image`](https://crates.io/crates/image) crate). Compile to WASM with `wasm-pack`. Build a React component that takes a file upload, runs the resize in a Web Worker + WASM, and shows the result. Compare to the equivalent done with `<canvas>` + JS.

Either way, you'll learn:
- The instantiation lifecycle
- The cost of crossing the JS↔WASM boundary (copy a 10MB array, time it)
- When the speedup is real vs imagined
