/**
 * Verifies every text and border pairing in the design system against WCAG.
 *
 *   npm run check:contrast
 *
 * This runs on the tokens rather than on rendered pages, so it catches a bad
 * value the moment someone changes one — before it reaches a browser, and
 * without needing the site running. axe still checks the rendered result.
 */

type Pair = { name: string; fg: string; bg: string; min: number };

const relativeLuminance = (hex: string) => {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
  const linear = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};

const ratio = (a: string, b: string) => {
  const [x, y] = [relativeLuminance(a), relativeLuminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const light = {
  ground: "#eae4dd",
  raised: "#f2ede7",
  band: "#e2dbd2",
  recess: "#ded6cc",
  ink: "#280000",
  body: "#3a3234",
  muted: "#665b5d",
  control: "#7d7264",
  accent: "#8d0130",
  error: "#b23a18",
};

const dark = {
  ground: "#1c100f",
  raised: "#261715",
  band: "#170c0b",
  recess: "#130a09",
  ink: "#f4ede7",
  body: "#e2d8d1",
  muted: "#a99c95",
  control: "#8e7f78",
  accent: "#d99aac",
  error: "#e07553",
};

/** The oxblood band is dark in both themes, so it is checked once per theme. */
const bandLight = "#280000";
const bandDark = "#2e1a17";
const onBand = { fifty: "#faf9f8", three: "#c3b9ac", four: "#a2988a", brass: "#b08d57" };

const pairs = (t: typeof light, label: string, oxblood: string): Pair[] => [
  { name: `${label}: body on ground`, fg: t.body, bg: t.ground, min: 4.5 },
  { name: `${label}: body on raised`, fg: t.body, bg: t.raised, min: 4.5 },
  { name: `${label}: body on band`, fg: t.body, bg: t.band, min: 4.5 },
  { name: `${label}: body on recess`, fg: t.body, bg: t.recess, min: 4.5 },
  { name: `${label}: ink on ground`, fg: t.ink, bg: t.ground, min: 4.5 },
  { name: `${label}: muted on ground`, fg: t.muted, bg: t.ground, min: 4.5 },
  { name: `${label}: muted on band`, fg: t.muted, bg: t.band, min: 4.5 },
  { name: `${label}: accent on ground`, fg: t.accent, bg: t.ground, min: 4.5 },
  { name: `${label}: accent on raised`, fg: t.accent, bg: t.raised, min: 4.5 },
  { name: `${label}: error on ground`, fg: t.error, bg: t.ground, min: 4.5 },
  // SC 1.4.11: interactive component boundaries need 3:1, not 4.5:1.
  { name: `${label}: control border on ground`, fg: t.control, bg: t.ground, min: 3 },
  { name: `${label}: control border on recess`, fg: t.control, bg: t.recess, min: 3 },
  { name: `${label}: focus ring on ground`, fg: t.accent, bg: t.ground, min: 3 },
  // The oxblood band keeps literal colours in both themes.
  { name: `${label}: limestone-50 on oxblood`, fg: onBand.fifty, bg: oxblood, min: 4.5 },
  { name: `${label}: limestone-300 on oxblood`, fg: onBand.three, bg: oxblood, min: 4.5 },
  { name: `${label}: limestone-400 on oxblood`, fg: onBand.four, bg: oxblood, min: 4.5 },
  { name: `${label}: brass on oxblood`, fg: onBand.brass, bg: oxblood, min: 4.5 },
  { name: `${label}: white on garnet fill`, fg: "#ffffff", bg: "#8d0130", min: 4.5 },
];

/**
 * Component-level pairs.
 *
 * The token pairs above all passed while six real failures sat in the
 * components, because those came from literal palette values written directly
 * into className strings rather than from the semantic tokens. A token audit
 * cannot see them. These are the specific places a literal would do damage if
 * it leaked back in.
 */
const brand = { garnet700: "#8d0130", garnet100: "#f2dee5", white: "#ffffff" };

const componentPairs: Pair[] = [
  // Filled accent controls: the fill must be visible against the page, and
  // whatever sits on the fill must be legible against it. Both, not either.
  { name: "light: checkbox fill on ground", fg: light.accent, bg: light.ground, min: 3 },
  { name: "dark:  checkbox fill on ground", fg: dark.accent, bg: dark.ground, min: 3 },
  { name: "light: checkbox tick on fill", fg: brand.white, bg: light.accent, min: 3 },
  { name: "dark:  checkbox tick on fill", fg: dark.ground, bg: dark.accent, min: 3 },

  // Selection and focus affordances, which must read against the page.
  { name: "light: radio card selected border", fg: light.accent, bg: light.ground, min: 3 },
  { name: "dark:  radio card selected border", fg: dark.accent, bg: dark.ground, min: 3 },
  { name: "light: input focus border on field", fg: light.accent, bg: light.recess, min: 3 },
  { name: "dark:  input focus border on field", fg: dark.accent, bg: dark.recess, min: 3 },
  { name: "light: focus ring on ground", fg: light.accent, bg: light.ground, min: 3 },
  { name: "dark:  focus ring on ground", fg: dark.accent, bg: dark.ground, min: 3 },

  // Progress and state marks.
  { name: "light: nav underline on raised", fg: light.accent, bg: light.raised, min: 3 },
  { name: "dark:  nav underline on raised", fg: dark.accent, bg: dark.raised, min: 3 },
  { name: "light: form progress fill", fg: light.accent, bg: light.ground, min: 3 },
  { name: "dark:  form progress fill", fg: dark.accent, bg: dark.ground, min: 3 },

  // Small labels that previously used limestone-400 on a light ground.
  { name: "light: \"Optional\" / slot label", fg: light.muted, bg: light.ground, min: 4.5 },
  { name: "dark:  \"Optional\" / slot label", fg: dark.muted, bg: dark.ground, min: 4.5 },

  // Brand fills that deliberately stay literal in both themes.
  { name: "both:  white on garnet button", fg: brand.white, bg: brand.garnet700, min: 4.5 },
  { name: "both:  garnet-100 on garnet panel", fg: brand.garnet100, bg: brand.garnet700, min: 4.5 },
];

const all = [
  ...pairs(light, "light", bandLight),
  ...pairs(dark, "dark", bandDark),
  ...componentPairs,
];

let failed = 0;
for (const pair of all) {
  const value = ratio(pair.fg, pair.bg);
  const ok = value >= pair.min;
  if (!ok) failed += 1;
  console.log(
    `${ok ? "ok  " : "FAIL"} ${value.toFixed(2).padStart(6)}:1  (needs ${pair.min})  ${pair.name}`,
  );
}

console.log(`\n${all.length - failed}/${all.length} pairs pass.`);
if (failed > 0) process.exit(1);
