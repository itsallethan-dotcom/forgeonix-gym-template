/** Subtle corner label for public demos and TV modes — does not block interaction. */
export function DemoWatermark() {
  return (
    <p
      className="pointer-events-none fixed bottom-3 left-3 z-[60] max-w-[min(100vw-1.5rem,14rem)] text-[9px] font-medium uppercase leading-snug tracking-[0.12em] text-white/20 sm:bottom-4 sm:left-4 sm:text-[10px] md:text-xs"
      aria-hidden
    >
      Demo mode · Powered by Forgeonix
    </p>
  );
}
