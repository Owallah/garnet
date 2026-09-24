import { Section } from "@/components/shared/section";
import { MediaSlot } from "@/components/shared/media-slot";
import { geographicReach } from "@/content/company";

/**
 * Reach shown as three widening measures rather than a map or a set of pins.
 * The widths are proportional to how far each ring extends, which makes the
 * relationship between them legible without a map the client would then have
 * to keep accurate.
 */
const widths = ["28%", "62%", "100%"];

export function Reach() {
  return (
    <Section>
      <div className="grid items-center gap-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <h2 className="type-section">
            Nairobi outwards
          </h2>
          <p className="mt-6 max-w-lg text-lg text-muted">
            Garnet operates from Nairobi, works nationally across Kenya, and structures regionally
            where a requirement calls for it.
          </p>

          <dl className="mt-12 space-y-7">
            {geographicReach.map((place, index) => (
              <div key={place.title}>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="text-xl text-ink">{place.title}</dt>
                </div>
                <div
                  aria-hidden
                  className="mt-3 h-1 bg-accent"
                  style={{ width: widths[index] }}
                />
                <dd className="mt-3 text-sm text-muted">{place.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-6">
          <MediaSlot
            slot="home-reach"
            ratio="4/3"
            className="corner-brand"
            sizes="(min-width: 1024px) 46vw, 100vw"
          />
        </div>
      </div>
    </Section>
  );
}