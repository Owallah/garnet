import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="shell flex min-h-[70vh] flex-col justify-center py-24">
      <p className="text-sm text-accent">404</p>
      <h1 className="mt-4 text-4xl">That page isn&apos;t here</h1>
      <p className="mt-5 max-w-md text-lg text-muted">
        The link may be out of date. Start from the homepage, or tell us what you were looking for.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href="/">Go to homepage</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">Contact us</ButtonLink>
      </div>
    </main>
  );
}
