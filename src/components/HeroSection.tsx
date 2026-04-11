import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headlineLines = [
  { text: "A Perfumação de Luxo", outline: false },
  { text: "que Protege seu Equipamento", outline: true },
  { text: "Essências Profissionais", outline: true },
  { text: "com Nanotecnologia.", outline: false },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinned = pinnedRef.current;
    const media = mediaRef.current;
    const video = videoRef.current;

    if (!section || !pinned || !media || !video) return;

    const validHeadlineEls = headlineRefs.current.filter(Boolean) as HTMLSpanElement[];
    const animatedEls = [
      ...validHeadlineEls,
      subtitleRef.current,
      ctaRef.current,
      paginationRef.current,
      scrollIndicatorRef.current,
    ].filter(Boolean) as HTMLElement[];

    // Wait for video metadata to know duration
    const setup = () => {
      const duration = video.duration;
      if (!duration || !isFinite(duration)) return;

      // Pause autoplay — scroll controls playback
      video.pause();

      const ctx = gsap.context(() => {
        gsap.set(animatedEls, { willChange: "transform, opacity, filter" });
        gsap.set(media, { willChange: "transform, opacity, filter" });

        // ── Intro animation (on load) ──
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(validHeadlineEls, {
            y: 60, opacity: 0, filter: "blur(12px)", duration: 1, stagger: 0.12,
          })
          .from(subtitleRef.current, { y: 24, opacity: 0, filter: "blur(8px)", duration: 0.8 }, "-=0.45")
          .from(ctaRef.current, { y: 18, opacity: 0, filter: "blur(8px)", duration: 0.7 }, "-=0.35")
          .from(paginationRef.current, { x: 18, opacity: 0, filter: "blur(6px)", duration: 0.7 }, "-=0.25")
          .from(scrollIndicatorRef.current, { opacity: 0, filter: "blur(6px)", duration: 0.8 }, "-=0.2");

        // ── Scrollytelling: pin + video scrub + content fade out ──
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: pinned,
            scrub: 0.6,
          },
        });

        // Video scrub: advance frame-by-frame with scroll
        mainTl.to(video, {
          currentTime: duration,
          ease: "none",
        }, 0);

        // Content fade/blur out in the first 30% of scroll
        mainTl.to(
          validHeadlineEls,
          { y: -40, opacity: 0, filter: "blur(12px)", stagger: 0.02, ease: "power2.in" },
          0,
        );
        mainTl.to(
          subtitleRef.current,
          { y: -30, opacity: 0, filter: "blur(8px)", ease: "power2.in" },
          0,
        );
        mainTl.to(
          ctaRef.current,
          { y: -20, opacity: 0, filter: "blur(8px)", ease: "power2.in" },
          0.02,
        );
        mainTl.to(
          paginationRef.current,
          { x: 18, opacity: 0, filter: "blur(6px)", ease: "power2.in" },
          0.02,
        );
        mainTl.to(
          scrollIndicatorRef.current,
          { opacity: 0, filter: "blur(6px)", ease: "power2.in" },
          0.01,
        );

        // Subtle media effects during scroll
        mainTl.to(
          media,
          { scale: 1.06, filter: "blur(2px)", opacity: 0.6, ease: "power2.inOut" },
          0.5,
        );
      }, section);

      // Store context for cleanup
      (section as any).__gsapCtx = ctx;
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      (section as any).__gsapCtx?.revert();
      video.removeEventListener("loadedmetadata", setup);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[500vh] bg-background">
      <div ref={pinnedRef} className="relative h-screen w-full overflow-hidden bg-background">
        <div ref={mediaRef} className="absolute inset-0 origin-center">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/hero-video.mp4"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
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
                      : undefined
                  }
                >
                  {line.text}
                </span>
              ))}
            </div>

            <p
              ref={subtitleRef}
              className="mb-6 max-w-sm font-body text-sm leading-relaxed text-foreground/70 md:text-base"
            >
              Descubra o segredo dos maiores hotéis e clínicas do mundo. Projeção intensa,
              rendimento superior e 180 dias de garantia total.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-3">
              <a
                href="#kits"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 font-body text-xs font-bold uppercase tracking-widest text-background transition-transform hover:scale-105"
              >
                Começar Agora
              </a>
              <a
                href="#kits"
                className="inline-flex items-center justify-center rounded-full border border-foreground/30 px-6 py-3 font-body text-xs font-semibold uppercase tracking-widest text-foreground transition-all hover:border-ocre hover:text-ocre"
              >
                Ver Demonstração
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
