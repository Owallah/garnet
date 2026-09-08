# Images

Drop licensed photographs here, then point the matching slot at them in
`src/content/media.ts` by setting `src` (for example `/images/home-hero.jpg`)
and writing the `alt` text.

Naming: use the slot id, e.g. `home-hero.jpg`, `home-reach.jpg`.

Before adding a file:

- Resize to no more than 2400px on the long edge. Next.js generates the
  responsive sizes; it cannot undo an oversized original.
- Save as JPEG at quality 80. AVIF and WebP are produced automatically.
- Record where the image came from and under what licence. If attribution is
  required, put it in the slot's `credit` field.
- Check whether recognisable people in the frame are covered by a model
  release. This matters more on a financial services site than a blog.