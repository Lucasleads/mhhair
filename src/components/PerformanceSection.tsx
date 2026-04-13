import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Fingerprint, Zap } from "lucide-react";
import performanceLuxury from "@/assets/performance-luxury.jpg";

gsap.registerPlugin(ScrollTrigger);

const topics = [
  {
    icon: TrendingUp,
    title: "Aumenta o Valor Percebido",
    desc: "Clientes associam ambientes perfumados a qualidade superior. Um aroma estratégico eleva a percepção do seu negócio instantaneamente.",
  },
  {
    icon: Fingerprint,
    title: "Cria sua Identidade Olfativa",
    desc: "Assim como uma logo visual, o aroma se torna a assinatura da sua marca. Memorável e única.",
  },
  {
    icon: Zap,
    title: "Impacto Imediato e Duradouro",
    desc: "Projeção intensa que alcança cada canto do ambiente. A névoa nanométrica garante distribuição perfeita e duração prolongada.",
  },
];

const PerformanceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image: starts blurred and gains sharpness
      gsap.from(".perf-image", {
        filter: "blur(8px)",
        scale: 1.05,
        opacity: 0.6,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      // Text items slide up
      gsap.from(".perf-text-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 80%", once: true },
      });

      // Floating particles
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll(".particle");
        particles.forEach((p, i) => {
          gsap.to(p, {
            y: `random(-40, 40)`,
            x: `random(-20, 20)`,
            opacity: `random(0.3, 0.8)`,
            duration: `random(3, 6)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.4,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-8 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.3) 100%)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div ref={imageRef} className="relative">
            <div className="perf-image relative rounded-2xl overflow-hidden shadow-[var(--shadow-card-hover)]">
              <img
                src={performanceLuxury}
                alt="Ambiente luxuoso com névoa aromática"
                loading="lazy"
                width={1024}
                height={1280}
                className="w-full h-[400px] md:h-[520px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>

            {/* Floating particles overlay */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="particle absolute rounded-full bg-ocre/40"
                  style={{
                    width: `${Math.random() * 6 + 3}px`,
                    height: `${Math.random() * 6 + 3}px`,
                    top: `${Math.random() * 90 + 5}%`,
                    left: `${Math.random() * 90 + 5}%`,
                    opacity: 0.4,
                  }}
                />
              ))}
            </div>

            {/* Accent border */}
            <div className="absolute -inset-1 rounded-2xl border-2 border-ocre/15 -z-10" />
          </div>

          {/* Text Column */}
          <div ref={textRef}>
            <div className="perf-text-item mb-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-ocre/30 bg-ocre/10 px-4 py-1.5">
                <span className="font-body text-xs font-bold text-ocre uppercase tracking-widest">
                  Performance & Sofisticação
                </span>
              </span>
            </div>

            <h2 className="perf-text-item font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-tight mb-6">
              O aroma que projeta muito mais e{" "}
              <span className="text-ocre">define sua marca</span>
            </h2>

            <p className="perf-text-item font-body text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
              Alta performance, projeção intensa e fragrâncias sofisticadas para transformar qualquer ambiente em uma experiência sensorial marcante.
            </p>

            {/* Topics */}
            <div className="space-y-6">
              {topics.map((topic) => (
                <div key={topic.title} className="perf-text-item flex gap-4 group">
                  <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-ocre/10 border border-ocre/20 flex items-center justify-center transition-all duration-300 group-hover:shadow-[var(--shadow-ocre)] group-hover:scale-105">
                    <topic.icon className="w-6 h-6 text-ocre" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-foreground mb-1">
                      {topic.title}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {topic.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
