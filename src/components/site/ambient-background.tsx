/**
 * Page-wide atmosphere: two soft red glow fields plus a fine grain layer.
 * Both layers are fixed and pointer-events-none so scrolling never repaints them.
 */
export function AmbientBackground() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="drift-a absolute -top-[28vh] left-1/2 h-[70vh] w-[110vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand)_38%,transparent),transparent)] blur-3xl" />
        <div className="drift-b absolute top-[55vh] -left-[20vw] h-[55vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand)_18%,transparent),transparent)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_25%,var(--background)_78%)]" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </>
  );
}
