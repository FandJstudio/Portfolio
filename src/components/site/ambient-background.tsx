/**
 * Page atmosphere, deliberately minimal.
 *
 * The layout carries its depth in ruled lines and flat planes, so the
 * background does not compete: one very low vignette to stop the edges of the
 * viewport reading as flat, and a fine grain so the near-black never bands on
 * cheap panels. Both fixed and pointer-events-none, so scrolling repaints
 * nothing.
 */
export function AmbientBackground() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(120%_75%_at_50%_0%,color-mix(in_oklch,var(--brand)_9%,transparent),transparent_58%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-60 opacity-[0.028] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </>
  );
}
