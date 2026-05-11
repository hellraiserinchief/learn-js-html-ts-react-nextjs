# Day 1 — Variables, Scope, and the Module System

**Reading (45 min):** [Exploring JS — Variables and assignment](https://exploringjs.com/js/book/ch_variables.html), [Modules](https://exploringjs.com/js/book/ch_modules.html).

## Key concepts

- `let` and `const` have block scope; `var` has function scope. Forget `var` exists.
- The Temporal Dead Zone: accessing a `let`/`const` before declaration throws.
- ES modules use `import` / `export`. They are strict-mode by default and statically analyzed.
- Files must be `.mjs` or have `"type": "module"` in `package.json`.

## Exercise

Split a single-file Node script (any small project — a calculator, a fizzbuzz, anything) into 3+ modules with both named and default exports.

## Run it

```bash
node app.js
```
