"use client";

import * as React from "react";
import "./globals.css";

/**
 * The last resort: catches failures in the root layout itself, where the
 * header, footer and font variables are all unavailable. It has to render its
 * own <html> and <body>.
 *
 * Styling is inline rather than utility classes, because a failure this deep
 * may well be the stylesheet or the theme script not loading. This must look
 * deliberate with nothing but its own attributes to rely on.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("[global error]", error.digest ?? "", error.message);
  }, [error]);

  return (
    <html lang="en-KE">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#eae4dd",
          color: "#3a3234",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          lineHeight: 1.6,
        }}
      >
        <main style={{ maxWidth: "36rem", margin: "0 auto", padding: "2rem 1.5rem" }}>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#8d0130" }}>
            Garnet Solutions Limited
          </p>
          <h1
            style={{
              margin: "1rem 0 0",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              fontWeight: 300,
              color: "#280000",
            }}
          >
            The site is having a problem
          </h1>
          <p style={{ margin: "1.5rem 0 0", fontSize: "1.125rem", color: "#6b6062" }}>
            Something failed before the page could load. Try again in a moment.
          </p>

          <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                border: "1px solid #6b0125",
                backgroundColor: "#8d0130",
                color: "#ffffff",
                padding: "0.75rem 1.5rem",
                borderRadius: 4,
                font: "inherit",
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages --
                client-side navigation is exactly what has failed here; a full
                document load is the point. */}
            <a
              href="/"
              style={{
                border: "1px solid #8a7f72",
                color: "#280000",
                padding: "0.75rem 1.5rem",
                borderRadius: 4,
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
            >
              Go to homepage
            </a>
          </div>

          {error.digest ? (
            <p style={{ marginTop: "2.5rem", fontSize: "0.875rem", color: "#6b6062" }}>
              Reference: {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
