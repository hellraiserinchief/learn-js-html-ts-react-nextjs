// Structural typing — same shape, different name, still compatible.
type Point = { x: number; y: number };
type Vector = { x: number; y: number };

const p: Point = { x: 1, y: 2 };
const v: Vector = p; // ✓ same shape

console.log({ p, v });

// Inference — don't annotate what TS can figure out.
const numbers = [1, 2, 3]; // inferred as number[]
const user = { name: 'Alice', age: 30 }; // inferred as { name: string; age: number }

// Annotate function parameters; let return types infer.
function greet(name: string) {
  return `Hello, ${name}`; // return type inferred as string
}

console.log(greet('world'));

// TODO: convert your Week 1 capstone CLI tool to TS. Reuse this tsconfig.
