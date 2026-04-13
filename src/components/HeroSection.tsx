import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFrameSequence } from "@/hooks/useFrameSequence";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const { loaded, setProgress } = useFrameSequence(canvasRef);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinned = pinnedRef.current;
    const media = mediaRef.current;

    if (!section || !pinned || !media) return;

    const contentEls = [
      badgeRef.current,
      headlineRef.current,
      subtitleRef.current,
      ctaRef.current,
      scrollIndicatorRef.current,
      paginationRef.current,
    ].filter(Boolean) as HTMLElement[];

    const mobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // On mobile, skip blur filters entirely (expensive composite operations)
      const blurIn = mobile ? "blur(0px)" : "blur(10px)";
      const blurClear = "blur(0px)";

      gsap.set(contentEls, { y: 40, opacity: 0, ...(mobile ? {} : { filter: blurIn }) });
      gsap.set(media, { willChange: "transform, opacity" });

      // Intro
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });
      introTl
        .to(badgeRef.current, { y: 0, opacity: 1, ...(mobile ? {} : { filter: blurClear }), duration: 0.5 })
        .to(headlineRef.current, { y: 0, opacity: 1, ...(mobile ? {} : { filter: blurClear }), duration: 0.6 }, "-=0.3")
        .to(subtitleRef.current, { y: 0, opacity: 1, ...(mobile ? {} : { filter: blurClear }), duration: 0.5 }, "-=0.25")
        .to(ctaRef.current, { y: 0, opacity: 1, ...(mobile ? {} : { filter: blurClear }), duration: 0.4 }, "-=0.2")
        .to(scrollIndicatorRef.current, { y: 0, opacity: 1, duration: 0.4 }, "-=0.15")
        .to(paginationRef.current, { y: 0, opacity: 1, duration: 0.4 }, "-=0.2");

      // Scroll-driven
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: mobile ? 0.6 : 0.3, // Smoother scrub on mobile
          onUpdate: (self) => setProgress(self.progress),
        },
      });

      // On mobile, only animate opacity (no blur, no filter)
      if (mobile) {
        masterTl.to(badgeRef.current, { y: -30, opacity: 0, ease: "power2.in", duration: 0.15 }, 0);
        masterTl.to(headlineRef.current, { y: -30, opacity: 0, ease: "power2.in", duration: 0.15 }, 0);
        masterTl.to(subtitleRef.current, { y: -20, opacity: 0, ease: "power2.in", duration: 0.15 }, 0);
        masterTl.to(ctaRef.current, { y: -15, opacity: 0, ease: "power2.in", duration: 0.15 }, 0.02);
        masterTl.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.1 }, 0);
        masterTl.to(media, { scale: 1.03, opacity: 0.7, ease: "power2.inOut", duration: 0.5 }, 0.5);
      } else {
        masterTl.to(badgeRef.current, { y: -40, opacity: 0, filter: "blur(12px)", ease: "power2.in", duration: 0.15 }, 0);
        masterTl.to(headlineRef.current, { y: -40, opacity: 0, filter: "blur(12px)", ease: "power2.in", duration: 0.15 }, 0);
        masterTl.to(subtitleRef.current, { y: -30, opacity: 0, filter: "blur(8px)", ease: "power2.in", duration: 0.15 }, 0);
        masterTl.to(ctaRef.current, { y: -20, opacity: 0, filter: "blur(8px)", ease: "power2.in", duration: 0.15 }, 0.02);
        masterTl.to(scrollIndicatorRef.current, { opacity: 0, filter: "blur(6px)", ease: "power2.in", duration: 0.1 }, 0);
        masterTl.to(paginationRef.current, { x: 18, opacity: 0, filter: "blur(6px)", ease: "power2.in", duration: 0.15 }, 0.02);
        masterTl.to(media, { scale: 1.06, filter: "blur(2px)", opacity: 0.6, ease: "power2.inOut", duration: 0.5 }, 0.5);
      }
    }, section);

    return () => ctx.revert();
  }, [setProgress]);

  return (
    <section ref={sectionRef} className="relative h-[500vh] bg-foreground" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div ref={pinnedRef} className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Top banner */}
        <div className="absolute top-0 left-0 right-0 z-40 overflow-hidden bg-primary">
          <div className="flex animate-[marquee_18s_linear_infinite] whitespace-nowrap py-1.5 md:py-2.5">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="mx-4 md:mx-8 font-body text-[10px] md:text-sm font-semibold text-primary-foreground tracking-wide">
                🚚 Frete Grátis &nbsp;•&nbsp; ⚡ Entrega Rápida &nbsp;•&nbsp; 🛡️ Garantia 180 Dias
              </span>
            ))}
          </div>
        </div>

        {/* Background: canvas frames or fallback */}
        <div ref={mediaRef} className="absolute inset-0 origin-center">
          <canvas
            ref={canvasRef}
            className="h-full w-full object-cover"
            aria-hidden="true"
            style={{ display: loaded ? "block" : "none" }}
          />
          {!loaded && (
            <img
              src="/hero-frames/frame-001.webp"
              alt=""
              className="h-full w-full object-cover"
            />
          )}
          {/* Gradient overlay - stronger on mobile for readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, hsl(225 30% 8% / 0.7) 0%, hsl(225 30% 8% / 0.5) 40%, hsl(225 30% 8% / 0.3) 60%, hsl(225 30% 8% / 0.6) 100%)",
            }}
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, hsl(225 30% 8% / 0.85) 0%, hsl(225 30% 8% / 0.6) 30%, hsl(225 30% 8% / 0.15) 55%, transparent 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-center items-center text-center px-5 pt-24 pb-16 md:items-start md:text-left md:px-12 md:pt-36 md:pb-24 lg:px-16 xl:px-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div ref={badgeRef} className="mb-4 md:mb-6 inline-flex items-center gap-2 rounded-full border border-ocre/30 bg-ocre/10 px-3 py-1.5 md:px-5 md:py-2.5 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ocre opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-ocre"></span>
              </span>
              <span className="font-body text-[10px] md:text-sm font-bold tracking-wider text-ocre uppercase">
                O segredo dos ambientes mais sofisticados
              </span>
            </div>

            {/* Headline */}
            <div ref={headlineRef} className="mb-4 md:mb-6">
              <h1 className="font-heading text-[2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl md:text-[3.5rem] lg:text-6xl xl:text-7xl text-primary-foreground">
                A Perfumação de Luxo
                <br />
                <span className="text-ocre">que Protege</span> seu
                <br />
                Equipamento
              </h1>
              <p className="mt-2 md:mt-3 font-heading text-base font-medium leading-tight tracking-tight text-primary-foreground/60 sm:text-xl md:text-3xl lg:text-[2rem]">
                Essências Profissionais
                <span className="text-ocre-light"> com Nanotecnologia.</span>
              </p>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="mb-5 md:mb-8 max-w-sm md:max-w-md mx-auto md:mx-0 font-body text-sm md:text-base leading-relaxed text-primary-foreground/70"
            >
              <span className="font-bold text-ocre">Descubra o segredo</span> dos maiores hotéis e clínicas do mundo. Projeção intensa,
              rendimento superior e 180 dias de garantia total.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
              <a
                href="#kits"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-full bg-ocre px-6 py-3 md:px-8 md:py-4 font-body text-xs md:text-sm font-bold uppercase tracking-widest text-ocre-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_-4px_hsl(30_58%_62%/0.5)]"
              >
                <span className="relative z-10">Assinar e Economizar</span>
                <div className="absolute inset-0 bg-gradient-to-r from-ocre to-ocre-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
              <a
                href="#kits"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-primary-foreground/25 px-6 py-3 md:px-8 md:py-4 font-body text-xs md:text-sm font-semibold uppercase tracking-widest text-primary-foreground/80 backdrop-blur-sm transition-all duration-300 hover:border-ocre hover:text-ocre hover:bg-ocre/10"
              >
                Escolher Fragrância
              </a>
            </div>

            {/* Scroll indicator - inline on mobile */}
            <div
              ref={scrollIndicatorRef}
              className="mt-6 flex flex-col items-center gap-1.5 md:hidden"
            >
              <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-ocre">
                Descobrir Agora
              </span>
              <div className="flex flex-col items-center gap-0.5">
                <div className="h-5 w-px bg-gradient-to-b from-ocre/80 to-transparent" />
                <svg
                  className="w-4 h-4 text-ocre animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Scroll indicator - absolute on desktop */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          >
            <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-ocre">
              Descobrir Agora
            </span>
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-px bg-gradient-to-b from-ocre/80 to-transparent" />
              <svg
                className="w-5 h-5 text-ocre animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Side pagination - desktop only */}
        <div
          ref={paginationRef}
          className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
        >
          <span className="font-body text-xs tracking-widest text-primary-foreground/60">01</span>
          <div className="h-12 w-px bg-primary-foreground/20" />
          <span className="font-body text-xs tracking-widest text-primary-foreground/30">04</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
