import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HookVslSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hook-animate", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-4 md:px-8 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Redline */}
        <p className="hook-animate font-body text-xs uppercase tracking-[0.25em] text-ocre mb-6">
          O segredo por trás dos ambientes mais sofisticados do Brasil
        </p>

        <h2 className="hook-animate font-heading text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight mb-10 max-w-3xl mx-auto">
          Finalmente: A Tecnologia de Perfumação Profissional que{" "}
          <span className="text-primary">Protege sua Máquina de Mil Reais</span>{" "}
          enquanto Dobra a Percepção de Valor do seu Ambiente.
        </h2>

        {/* VSL Video Embed */}
        <div className="hook-animate relative mx-auto max-w-3xl mb-10 rounded-xl overflow-hidden shadow-[var(--shadow-card-hover)]">
          <div className="relative w-full bg-foreground/5" style={{ paddingBottom: "56.25%" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Placeholder for VSL — replace src with actual video */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-ocre/90 flex items-center justify-center shadow-[var(--shadow-ocre)] cursor-pointer transition-transform hover:scale-110">
                  <svg className="w-8 h-8 text-ocre-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="font-body text-sm text-muted-foreground">
                  Assista a apresentação com Cristiano
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="hook-animate">
          <a
            href="#kits"
            className="inline-flex items-center justify-center rounded-full bg-ocre px-8 py-4 font-body text-sm font-bold uppercase tracking-widest text-ocre-foreground shadow-[var(--shadow-ocre)] transition-all hover:scale-105 hover:shadow-[0_12px_32px_hsl(38_72%_55%/0.5)]"
          >
            Quero Minha Essência Profissional
          </a>
        </div>
      </div>
    </section>
  );
};

export default HookVslSection;
