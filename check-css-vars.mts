/**
 * Guards against `utility-[--var]`, which Tailwind v4 emits literally.
 *
 *   npm run check:css-vars
 *
 * `rounded-[--radius-md]` compiles to `border-radius: --radius-md`, which is
 * invalid CSS and silently dropped by the browser. The correct v4 syntax is
 * `rounded-(--radius-md)`. There is no build error and no type error, which is
 * how fifteen of them accumulated across the codebase before anyone noticed
 * that every button and input was rendering square-cornered.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const OFFENDER = /[a-z-]+-\[--[a-z0-9-]+\]/g;

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx?|css)$/.test(entry)) out.push(full);
  }
  return out;
}

let found = 0;
for (const file of walk("src")) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      for (const match of line.matchAll(OFFENDER)) {
        found += 1;
        const fixed = match[0].replace("[--", "(--").replace("]", ")");
        console.error(`${file}:${i + 1}  ${match[0]}  ->  ${fixed}`);
      }
    });
}

if (found > 0) {
  console.error(
    `\n${found} invalid CSS-variable utilit${found === 1 ? "y" : "ies"}.` +
      " Tailwind v4 needs parentheses, not brackets.",
  );
  process.exit(1);
}
console.log("No invalid CSS-variable utilities.");
