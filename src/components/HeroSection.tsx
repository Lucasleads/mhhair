import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFrameSequence } from "@/hooks/useFrameSequence";

gsap.registerPlugin(ScrollTrigger);

const headlineLines = [
  { text: "A Perfumação de Luxo", outline: false, highlight: null },
  { text: "que Protege seu Equipamento", outline: false, highlight: null },
  { text: "Essências Profissionais", outline: false, highlight: null },
  { text: "com Nanotecnologia.", outline: false, highlight: null },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const { loaded, setProgress } = useFrameSequence(canvasRef);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinned = pinnedRef.current;
    const media = mediaRef.current;

    if (!section || !pinned || !media) return;

    const validHeadlineEls = headlineRefs.current.filter(Boolean) as HTMLSpanElement[];
    const contentEls = [
      ...validHeadlineEls,
      subtitleRef.current,
      ctaRef.current,
      paginationRef.current,
      scrollIndicatorRef.current,
    ].filter(Boolean) as HTMLElement[];

    const ctx = gsap.context(() => {
      // ── Set initial hidden state ──
      gsap.set(contentEls, { y: 60, opacity: 0, filter: "blur(12px)" });
      gsap.set(media, { willChange: "transform, opacity, filter" });

      // ── Intro animation (on load) ──
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });
      introTl
        .to(validHeadlineEls, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.12 })
        .to(subtitleRef.current, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 }, "-=0.45")
        .to(ctaRef.current, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7 }, "-=0.35")
        .to(paginationRef.current, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7 }, "-=0.25")
        .to(scrollIndicatorRef.current, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 }, "-=0.2");

      // ── Scroll-driven: frame sequence + exit animations ──
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          onUpdate: (self) => {
            // Drive the canvas frame sequence from scroll progress
            setProgress(self.progress);
          },
        },
      });

      // Content fade/blur out in first 15%
      masterTl.to(validHeadlineEls, { y: -40, opacity: 0, filter: "blur(12px)", stagger: 0.02, ease: "power2.in", duration: 0.15 }, 0);
      masterTl.to(subtitleRef.current, { y: -30, opacity: 0, filter: "blur(8px)", ease: "power2.in", duration: 0.15 }, 0);
      masterTl.to(ctaRef.current, { y: -20, opacity: 0, filter: "blur(8px)", ease: "power2.in", duration: 0.15 }, 0.02);
      masterTl.to(paginationRef.current, { x: 18, opacity: 0, filter: "blur(6px)", ease: "power2.in", duration: 0.15 }, 0.02);
      masterTl.to(scrollIndicatorRef.current, { opacity: 0, filter: "blur(6px)", ease: "power2.in", duration: 0.1 }, 0);

      // Media blur/zoom in second half
      masterTl.to(media, { scale: 1.06, filter: "blur(2px)", opacity: 0.6, ease: "power2.inOut", duration: 0.5 }, 0.5);
    }, section);

    return () => {
      ctx.revert();
    };
  }, [setProgress]);

  return (
    <section ref={sectionRef} className="relative h-[500vh] bg-background">
      <div ref={pinnedRef} className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {/* Top banner */}
        <div className="absolute top-0 left-0 right-0 z-30 overflow-hidden bg-primary">
          <div className="flex animate-[marquee_18s_linear_infinite] whitespace-nowrap py-2.5">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="mx-8 font-body text-sm font-semibold text-primary-foreground tracking-wide">
                🚚 Frete Grátis para Todo Brasil &nbsp;•&nbsp; ⚡ Entrega Rápida &nbsp;•&nbsp; 🛡️ Garantia de 180 Dias
              </span>
            ))}
          </div>
        </div>
        <div ref={mediaRef} className="absolute inset-0 origin-center">
          <canvas
            ref={canvasRef}
            className="h-full w-full object-cover"
            aria-hidden="true"
            style={{ display: loaded ? "block" : "none" }}
          />
          {/* Loading placeholder */}
          {!loaded && (
            <div className="h-full w-full bg-background" />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--background) / 0.88) 0%, hsl(var(--background) / 0.65) 28%, hsl(var(--background) / 0.15) 55%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--background) / 0.3) 0%, transparent 30%, transparent 60%, hsl(var(--background) / 0.7) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-12 md:pb-24 lg:px-16 lg:pb-28">
          <div className="max-w-lg">
            <div className="mb-4">
              {headlineLines.map((line, index) => (
                <span
                  key={line.text}
                  ref={(element) => {
                    headlineRefs.current[index] = element;
                  }}
                  className={`block font-heading text-xl font-bold leading-[0.85] tracking-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl ${
                    line.outline ? "text-transparent" : "text-foreground"
                  }`}
                  style={
                    line.outline
                      ? { WebkitTextStroke: "1px hsl(var(--foreground))" }
                      : { color: "#0a0a0a" }
                  }
                >
                  {line.text}
                </span>
              ))}
            </div>

            <p
              ref={subtitleRef}
              className="mb-6 max-w-sm font-body text-sm leading-relaxed text-foreground md:text-base"
            >
              <span className="font-bold text-ocre">Descubra o segredo</span> dos maiores hotéis e clínicas do mundo. Projeção intensa,
              rendimento superior e 180 dias de garantia total.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-3">
              <a
                href="#kits"
                className="inline-flex items-center justify-center rounded-full bg-ocre px-6 py-3 font-body text-xs font-bold uppercase tracking-widest text-ocre-foreground transition-transform hover:scale-105"
              >
                Assinar e Economizar
              </a>
              <a
                href="#kits"
                className="inline-flex items-center justify-center rounded-full border border-ocre-light px-6 py-3 font-body text-xs font-semibold uppercase tracking-widest text-ocre-light transition-all hover:bg-ocre-light/10 hover:border-ocre hover:text-ocre"
              >
                Escolher Fragrância
              </a>
            </div>
          </div>
        </div>

        <div
          ref={paginationRef}
          className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
        >
          <span className="font-body text-xs tracking-widest text-foreground/70">01</span>
          <div className="h-12 w-px bg-foreground/20" />
          <span className="font-body text-xs tracking-widest text-foreground/35">04</span>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-foreground/65">
            Scroll to explore
          </span>
          <div className="h-8 w-px animate-pulse bg-foreground/20" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
