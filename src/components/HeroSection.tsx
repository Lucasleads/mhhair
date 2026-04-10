import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Check, Play } from "lucide-react";

const quickSeals = ["Frete Grátis Brasil", "100% Puro", "Não Entope a Máquina"];

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, { x: -60, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
      gsap.from(videoWrapRef.current, { scale: 0.9, opacity: 0, rotation: 2, duration: 1, ease: "power3.out", delay: 0.4 });
      gsap.from(productRef.current, { scale: 0.85, opacity: 0, y: 40, duration: 1.1, ease: "power3.out", delay: 0.6 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden px-4 md:px-8 py-16 md:py-0 bg-background"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 70% 50%, hsl(var(--ocre) / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Right Column: Video + Product — first on mobile */}
        <div className="lg:order-2 order-1 relative">
          <div className="flex flex-col items-center gap-6">
            {/* Video */}
            <div ref={videoWrapRef} className="relative w-full max-w-lg mx-auto">
              {/* Glow behind video */}
              <div className="absolute -inset-4 rounded-3xl blur-3xl pointer-events-none" style={{ background: "hsl(var(--ocre) / 0.12)" }} />

              <div
                className="relative rounded-3xl overflow-hidden border-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] group"
                style={{ borderColor: "hsl(var(--ocre))" }}
              >
                {/* Noise grain on video */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none opacity-[0.04] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "100px 100px",
                  }}
                />

                <video
                  ref={videoRef}
                  className="w-full aspect-video object-cover"
                  playsInline
                  preload="metadata"
                  controls={isPlaying}
                  onClick={handlePlay}
                >
                  <source src="/videos/autoridade.mp4" type="video/mp4" />
                </video>

                {/* Custom play button */}
                {!isPlaying && (
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 z-20 flex items-center justify-center bg-foreground/10 backdrop-blur-[2px] transition-opacity hover:bg-foreground/20"
                    aria-label="Reproduzir vídeo"
                  >
                    <span className="w-20 h-20 rounded-full bg-ocre flex items-center justify-center shadow-[var(--shadow-ocre)] animate-[pulse_2s_ease-in-out_infinite]">
                      <Play className="w-8 h-8 text-ocre-foreground ml-1" fill="currentColor" />
                    </span>
                  </button>
                )}
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-2 md:-right-4 z-30 bg-ocre text-ocre-foreground font-body font-bold text-xs px-4 py-2 rounded-full shadow-lg rotate-3">
                ✨ 25 Anos de Autoridade
              </div>
            </div>

          </div>
        </div>

        {/* Left Column: Text + CTA */}
        <div ref={textRef} className="lg:order-1 order-2">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-foreground leading-[1.15] mb-6">
            A Perfumação de Luxo que{" "}
            <span className="text-success">Protege seu Equipamento</span>:{" "}
            <span className="text-ocre">Essências Profissionais</span> com Nanotecnologia.
          </h1>

          <p className="font-body text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
            Descubra o segredo dos maiores hotéis e clínicas do mundo. Projeção intensa, rendimento superior e 180 dias de garantia total.
          </p>

          {/* Quick seals */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-10">
            {quickSeals.map((s) => (
              <span key={s} className="flex items-center gap-2 font-body text-sm text-foreground/80">
                <Check className="w-4 h-4 text-success" />
                {s}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#kits"
              className="inline-block bg-ocre text-ocre-foreground font-body font-bold text-base px-8 py-4 rounded-xl shadow-[var(--shadow-ocre)] hover:scale-105 hover:shadow-[0_12px_32px_hsl(38_72%_55%/0.5)] transition-all duration-300 uppercase tracking-wide"
            >
              Escolher Fragrância
            </a>
            <a
              href="#kits"
              className="inline-block border-2 border-foreground/20 text-foreground font-body font-semibold text-base px-8 py-4 rounded-xl hover:border-ocre/60 hover:text-ocre transition-all duration-300"
            >
              Assinar e Economizar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
