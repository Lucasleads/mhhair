import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    // Wait for video metadata
    const initScrollVideo = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      // Pin the hero and scrub video currentTime
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const time = self.progress * duration;
          video.currentTime = time;
        },
      });
    };

    if (video.readyState >= 1) {
      initScrollVideo();
    } else {
      video.addEventListener("loadedmetadata", initScrollVideo, { once: true });
    }

    // Entrance animations
    const ctx = gsap.context(() => {
      // Headline lines stagger
      gsap.from(headlineRefs.current.filter(Boolean), {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.3,
      });

      // Subtitle
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.9,
      });

      // CTAs
      gsap.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 1.1,
      });

      // Scroll indicator
      gsap.from(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 1,
        delay: 1.6,
      });

      // Pagination
      gsap.from(paginationRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.8,
        delay: 1.4,
      });

      // Video fade-in
      gsap.from(video, {
        scale: 1.1,
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
        delay: 0.2,
      });
    }, wrapper);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const headlineLines = [
    { text: "A Perfumação de Luxo", outline: false },
    { text: "que Protege seu Equipamento", outline: true },
    { text: "Essências Profissionais", outline: true },
    { text: "com Nanotecnologia.", outline: false },
  ];

  return (
    <section
      ref={wrapperRef}
      className="relative w-full h-screen overflow-hidden bg-background"
    >
      {/* Video — full bleed, behind text */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end pointer-events-none">
        <video
          ref={videoRef}
          className="w-[90%] md:w-[55%] h-auto max-h-[85vh] object-contain opacity-90"
          src="/videos/hero-scroll.mp4"
          muted
          playsInline
          preload="auto"
        />
        {/* Subtle gradient overlay to ensure text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--background)) 0%, hsl(var(--background) / 0.7) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        {/* Headline */}
        <div className="mb-6 md:mb-8">
          {headlineLines.map((line, i) => (
            <span
              key={i}
              ref={(el) => { headlineRefs.current[i] = el; }}
              className={`block font-heading font-bold leading-[1.05] tracking-tight ${
                line.outline
                  ? "text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                  : "text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
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

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed mb-8 md:mb-10"
        >
          Descubra o segredo dos maiores hotéis e clínicas do mundo. Projeção
          intensa, rendimento superior e 180 dias de garantia total.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <a
            href="#kits"
            className="inline-flex items-center justify-center font-body font-bold text-sm uppercase tracking-widest bg-foreground text-background px-8 py-4 rounded-full hover:scale-105 transition-transform"
          >
            Começar Agora
          </a>
          <a
            href="#kits"
            className="inline-flex items-center justify-center font-body font-semibold text-sm uppercase tracking-widest border border-foreground/30 text-foreground px-8 py-4 rounded-full hover:border-ocre hover:text-ocre transition-all"
          >
            Ver Demonstração
          </a>
        </div>
      </div>

      {/* Pagination indicator — right side */}
      <div
        ref={paginationRef}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3"
      >
        <span className="font-body text-xs text-muted-foreground tracking-widest">01</span>
        <div className="w-px h-12 bg-foreground/20" />
        <span className="font-body text-xs text-muted-foreground/40 tracking-widest">04</span>
      </div>

      {/* Scroll indicator — bottom center */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll to explore
        </span>
        <div className="w-px h-8 bg-foreground/20 animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
