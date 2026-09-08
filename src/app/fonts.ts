import localFont from "next/font/local";

/**
 * Kind Sans (Gravitype, Marco Pezzotta) carries every piece of text on the
 * site — display and body both. Four weights are loaded and no more; each
 * additional weight is another render-blocking request for a marginal
 * difference nobody notices.
 *
 * LICENCE — ACTION REQUIRED BEFORE LAUNCH
 * The supplied archive is the demo release: its bundled licence file reads
 * "Demo for Personal Use". That does not cover a commercial website. A
 * desktop-plus-webfont licence must be bought from the foundry before this
 * site goes live, and the .woff2 files here replaced with the licensed build.
 *
 * Self-hosted rather than loaded from a font CDN: no third-party request on
 * first paint, no cookie or IP disclosure to another host, and the files are
 * subsetted and cached with the rest of the deployment.
 */
export const kindSans = localFont({
  src: [
    { path: "../fonts/KindSans-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/KindSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/KindSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/KindSans-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-kind-sans",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: "Arial",
});