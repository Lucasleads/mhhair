import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Fingerprint, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Brain,
    title: "Memória",
    desc: "O olfato é o sentido mais ligado à memória. Uma fragrância certa faz seu cliente lembrar de você para sempre.",
  },
  {
    icon: Fingerprint,
    title: "Identidade",
    desc: "Crie uma assinatura olfativa única. Seu ambiente ganha personalidade e se diferencia de qualquer outro.",
  },
  {
    icon: Heart,
    title: "Emoção",
    desc: "Aromas despertam sentimentos profundos. Conforto, desejo, confiança — tudo pelo poder de uma fragrância.",
  },
];

const OlfactiveConnectionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Main quote reveal — starts invisible and scales up
      gsap.from(".olfc-quote", {
        opacity: 0,
        scale: 0.92,
        y: 30,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      // Decorative line expands
      gsap.from(".olfc-line", {
        scaleX: 0,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });

      // Pillars reveal with stagger — simulating fragrance dispersal
      gsap.from(".olfc-pillar", {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".olfc-pillars", start: "top 80%", once: true },
      });

      // Ambient mist particles
      const particles = sectionRef.current!.querySelectorAll(".olfc-particle");
      particles.forEach((p, i) => {
        gsap.fromTo(
          p,
          { opacity: 0, y: 20, scale: 0 },
          {
            opacity: 0.5,
            y: `random(-60, -20)`,
            scale: `random(0.5, 1.5)`,
            duration: `random(3, 5)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.6,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-4 md:px-8 overflow-hidden"
      style={{ background: "hsl(22 44% 72% / 0.08)" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: "hsl(var(--ocre))" }}
      />

      {/* Ambient mist particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="olfc-particle absolute rounded-full"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              background: "hsl(var(--ocre) / 0.3)",
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Main quote */}
        <div className="olfc-quote mb-16">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-ocre/80 mb-6 font-semibold">
            Conexão Olfativa
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-snug tracking-tight mb-4">
            Uma fragrância não é apenas um cheiro...
          </h2>
          <p className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: "hsl(var(--ocre))" }}>
            Ela cria memória.
          </p>
        </div>

        {/* Decorative line */}
        <div className="olfc-line mx-auto w-24 h-px bg-ocre/40 mb-16 origin-center" />

        {/* Three pillars */}
        <div className="olfc-pillars grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="olfc-pillar flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border border-ocre/20 transition-all duration-500 group-hover:shadow-[var(--shadow-ocre)] group-hover:scale-105" style={{ background: "hsl(22 44% 72% / 0.1)" }}>
                <pillar.icon className="w-7 h-7 text-ocre" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 tracking-wide">
                {pillar.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed tracking-wide max-w-xs">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OlfactiveConnectionSection;
