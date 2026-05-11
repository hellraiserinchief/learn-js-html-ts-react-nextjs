// `satisfies` — typecheck without widening.
const config = {
  port: 3000,
  host: 'localhost',
  debug: true,
} satisfies Record<string, string | number | boolean>;

// `port` is still typed as `number` (not number | string | boolean), so this works:
console.log(config.port.toFixed(2));

// `unknown` over `any` — forces you to narrow at the boundary.
function parseInput(raw: unknown): { name: string } {
  if (typeof raw !== 'object' || raw === null || !('name' in raw)) {
    throw new Error('Invalid input');
  }
  if (typeof (raw as { name: unknown }).name !== 'string') {
    throw new Error('name must be string');
  }
  return raw as { name: string };
}

console.log(parseInput({ name: 'Ada' }));
