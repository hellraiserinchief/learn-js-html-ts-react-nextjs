#!/usr/bin/env node
// CLI entry point — wire flags, call the fetcher, write the report.
import { writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: {
    out: { type: 'string', short: 'o', default: 'report.json' },
  },
});

async function main() {
  // TODO: fetch + transform using a class + generator from your modules
  const report = { generatedAt: new Date().toISOString(), items: [] };
  await writeFile(values.out, JSON.stringify(report, null, 2));
  console.log(`✓ Wrote ${values.out}`);
}

main().catch((err) => {
  console.error('✗', err);
  process.exit(1);
});
