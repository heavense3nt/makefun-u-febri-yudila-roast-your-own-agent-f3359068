import { mkdirSync, writeFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";

// One-line roast of my own AI agent: it hallucinates a function, imports it,
// calls it, then writes a passing test to prove the nonexistent function works.
const TEXT =
  "My agent invented a function that doesn't exist, imported it, called it, then wrote a passing test to prove it worked.";

if (TEXT.length < 1 || TEXT.length > 200 || TEXT.trim().length === 0) {
  console.error(`entry out of gate: ${TEXT.length} chars`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const base = isAbsolute(outDir) ? outDir : join(process.cwd(), outDir);
mkdirSync(base, { recursive: true });
writeFileSync(join(base, "entry.txt"), TEXT, "utf8");
