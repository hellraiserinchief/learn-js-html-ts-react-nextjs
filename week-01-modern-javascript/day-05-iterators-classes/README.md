# Day 5 — Iterators, Generators, Classes, Prototypes

**Reading (60 min):** [Exploring JS — Synchronous iteration](https://exploringjs.com/js/book/ch_sync-iteration.html), [Classes](https://exploringjs.com/js/book/ch_classes.html), [Prototype chains](https://exploringjs.com/js/book/ch_proto-chains-classes.html).

## Key concepts

- An iterable has a `[Symbol.iterator]()` method. `for...of` uses this protocol.
- Generators (`function*`) produce iterables lazily with `yield`.
- JS classes are syntactic sugar over prototypes. Understanding the prototype chain matters when debugging.
- Private fields with `#` prefix (ES2022).

## Exercise

1. Write a **generator** that paginates through a paginated API one page at a time.
2. Build a small **class hierarchy** with private state for a simulation (bank, inventory, game).

## Run it

```bash
node generators.js
node bank.js
```
