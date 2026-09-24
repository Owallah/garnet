/**
 * Two CSS hygiene checks that neither the compiler nor the type checker can
 * make, both written after the failure they describe actually shipped.
 *
 *   npm run check:css-vars
 *
 * CHECK 1 — `utility-[--var]`, which Tailwind v4 emits literally.
 *
 * `rounded-[--radius-md]` compiles to `border-radius: --radius-md`, which is
 * invalid CSS and silently dropped by the browser. The correct v4 syntax is
 * `rounded-(--radius-md)`. There is no build error and no type error, which is
 * how fifteen of them accumulated across the codebase before anyone noticed
 * that every button and input was rendering square-cornered.
 *
 * CHECK 2 — the select chevron's hard-coded stroke against `--color-muted`.
 *
 * `.control-chevron` paints its arrow from an SVG data URI, and a data URI
 * cannot read a custom property, so the colour has to be written out as a
 * literal in both themes. That makes it the one declaration in the stylesheet
 * that can fall out of step with its token in complete silence: the audit
 * found it at `#6b6062` against a `--color-muted` that had since been darkened
 * to `#665b5d` for contrast. Nothing rendered wrong enough to notice, it was
 * just very slightly the wrong grey. This asserts the two stay equal.
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

/* ------------------------------------------------------------------------ */
/* CHECK 2: chevron stroke vs --color-muted                                  */
/* ------------------------------------------------------------------------ */

const CSS_PATH = "src/app/globals.css";
const css = readFileSync(CSS_PATH, "utf8");

/** Resolves a token to a literal hex, following one `var()` indirection. */
function resolve(token: string, scope: string): string | null {
  const direct = new RegExp(`${token}:\\s*([^;]+);`).exec(scope);
  if (!direct) return null;
  const value = direct[1].trim();
  if (value.startsWith("#")) return value.toLowerCase();

  const indirect = /var\((--[a-z0-9-]+)\)/.exec(value);
  if (!indirect) return null;
  const target = new RegExp(`${indirect[1]}:\\s*(#[0-9a-fA-F]{3,8});`).exec(css);
  return target ? target[1].toLowerCase() : null;
}

/** The stroke colour baked into a `.control-chevron` rule's data URI. */
function strokeIn(rule: RegExp): string | null {
  const block = rule.exec(css);
  if (!block) return null;
  const stroke = /stroke='%23([0-9a-fA-F]{6})'/.exec(block[0]);
  return stroke ? `#${stroke[1].toLowerCase()}` : null;
}

const darkStart = css.indexOf("\n.dark {");
const lightScope = darkStart === -1 ? css : css.slice(0, darkStart);
const darkScope = darkStart === -1 ? "" : css.slice(darkStart, css.indexOf("\n}", darkStart));

const pairs = [
  {
    theme: "light",
    rule: /(?:^|\n)[ \t]*\.control-chevron\s*\{[^}]*\}/,
    token: resolve("--color-muted", lightScope),
  },
  {
    theme: "dark",
    rule: /\.dark\s+\.control-chevron\s*\{[^}]*\}/,
    token: resolve("--color-muted", darkScope),
  },
];

let drifted = 0;
for (const { theme, rule, token } of pairs) {
  const stroke = strokeIn(rule);

  if (stroke === null || token === null) {
    console.error(
      `${CSS_PATH}  could not read the ${theme} ${stroke === null ? "chevron stroke" : "--color-muted value"}.` +
        " The rule or the token was renamed; update check-css-vars.mts to match.",
    );
    drifted += 1;
    continue;
  }

  if (stroke !== token) {
    drifted += 1;
    console.error(
      `${CSS_PATH}  ${theme} chevron stroke is ${stroke} but --color-muted is ${token}.` +
        `\n    Fix: set stroke='%23${token.slice(1)}' in the ${theme} .control-chevron data URI.`,
    );
  }
}

if (drifted > 0) {
  console.error(`\n${drifted} chevron stroke${drifted === 1 ? "" : "s"} out of step with --color-muted.`);
  process.exit(1);
}
console.log("Select chevron strokes match --color-muted in both themes.");
