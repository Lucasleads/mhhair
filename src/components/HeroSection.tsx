import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const frameCount = 144;
const frameSources = Array.from(
  { length: frameCount },
  (_, index) => `/hero-frames/frame-${String(index + 1).padStart(3, "0")}.jpg`,
);

const headlineLines = [
  { text: "A Perfumação de Luxo", outline: false },
  { text: "que Protege seu Equipamento", outline: true },
  { text: "Essências Profissionais", outline: true },
  { text: "com Nanotecnologia.", outline: false },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const imageCacheRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number>();
  const resizeTimeoutRef = useRef<number>();
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const renderedFrameRef = useRef(-1);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;

    if (!section || !sticky || !canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const drawFrame = (frameIndex: number) => {
      const image = imageCacheRef.current[frameIndex];
      if (!image || !image.complete) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const imageRatio = image.naturalWidth / image.naturalHeight;
      const viewportRatio = viewportWidth / viewportHeight;

      let drawWidth = viewportWidth;
      let drawHeight = viewportHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imageRatio > viewportRatio) {
        drawHeight = viewportHeight;
        drawWidth = drawHeight * imageRatio;
        offsetX = (viewportWidth - drawWidth) / 2;
      } else {
        drawWidth = viewportWidth;
        drawHeight = drawWidth / imageRatio;
        offsetY = (viewportHeight - drawHeight) / 2;
      }

      context.clearRect(0, 0, viewportWidth, viewportHeight);
      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      renderedFrameRef.current = frameIndex;
    };

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(Math.max(renderedFrameRef.current, 0));
    };

    const updateProgressTarget = () => {
      const maxScrollableDistance = section.offsetHeight - window.innerHeight;
      const sectionTop = section.getBoundingClientRect().top;

      targetProgressRef.current = maxScrollableDistance > 0
        ? clamp(-sectionTop / maxScrollableDistance, 0, 1)
        : 0;
    };

    imageCacheRef.current = frameSources.map((src, index) => {
      const image = new Image();
      image.src = src;
      image.decoding = "async";
      image.loading = "eager";

      if (index === 0) {
        image.onload = () => {
          sizeCanvas();
          drawFrame(0);
        };
      }

      return image;
    });

    const renderLoop = () => {
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.14;
      const nextFrame = Math.round(currentProgressRef.current * (frameCount - 1));

      if (nextFrame !== renderedFrameRef.current) {
        drawFrame(nextFrame);
      }

      rafRef.current = window.requestAnimationFrame(renderLoop);
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = window.setTimeout(() => {
        sizeCanvas();
        updateProgressTarget();
      }, 80);
    };

    sizeCanvas();
    updateProgressTarget();
    rafRef.current = window.requestAnimationFrame(renderLoop);

    window.addEventListener("scroll", updateProgressTarget, { passive: true });
    window.addEventListener("resize", handleResize);

    const validHeadlineEls = headlineRefs.current.filter(Boolean) as HTMLSpanElement[];

    const introTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    introTimeline
      .from(validHeadlineEls, {
        y: 72,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
      })
      .from(
        subtitleRef.current!,
        { y: 28, opacity: 0, duration: 0.8 },
        "-=0.45",
      )
      .from(
        ctaRef.current!,
        { y: 20, opacity: 0, duration: 0.7 },
        "-=0.35",
      )
      .from(
        paginationRef.current!,
        { x: 18, opacity: 0, duration: 0.7 },
        "-=0.25",
      )
      .from(
        scrollIndicatorRef.current!,
        { opacity: 0, duration: 0.8 },
        "-=0.2",
      );

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current);
      }

      window.removeEventListener("scroll", updateProgressTarget);
      window.removeEventListener("resize", handleResize);

      try {
        introTimeline.revert();
      } catch {
        introTimeline.kill();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-background">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden bg-background">
        <div className="absolute inset-0">
          <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--background) / 0.78) 0%, hsl(var(--background) / 0.42) 32%, hsl(var(--background) / 0.16) 58%, hsl(var(--background) / 0.32) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--background) / 0.08) 0%, transparent 40%, hsl(var(--background) / 0.5) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <div className="mb-6 md:mb-8">
              {headlineLines.map((line, index) => (
                <span
                  key={line.text}
                  ref={(element) => {
                    headlineRefs.current[index] = element;
                  }}
                  className={`block font-heading text-2xl font-bold leading-[0.95] tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl ${
                    line.outline ? "text-transparent" : "text-foreground"
                  }`}
                  style={
                    line.outline
                      ? {
                          WebkitTextStroke: "1.5px hsl(var(--foreground))",
                        }
                      : undefined
                  }
                >
                  {line.text}
                </span>
              ))}
            </div>

            <p
              ref={subtitleRef}
              className="mb-8 max-w-xl font-body text-base leading-relaxed text-foreground/80 md:mb-10 md:text-lg"
            >
              Descubra o segredo dos maiores hotéis e clínicas do mundo. Projeção intensa,
              rendimento superior e 180 dias de garantia total.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <a
                href="#kits"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-4 font-body text-sm font-bold uppercase tracking-widest text-background transition-transform hover:scale-105"
              >
                Começar Agora
              </a>
              <a
                href="#kits"
                className="inline-flex items-center justify-center rounded-full border border-foreground/30 px-8 py-4 font-body text-sm font-semibold uppercase tracking-widest text-foreground transition-all hover:border-ocre hover:text-ocre"
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
