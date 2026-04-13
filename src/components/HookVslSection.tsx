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
          <video
            className="w-full rounded-xl"
            controls
            preload="metadata"
            poster=""
          >
            <source src="/videos/vsl.mp4" type="video/mp4" />
            Seu navegador não suporta vídeo.
          </video>
        </div>

        {/* Badge 25 anos */}
        <div className="hook-animate flex flex-col items-center mb-10">
          <div className="inline-flex items-center gap-4 rounded-2xl border-2 border-ocre/40 bg-ocre/10 px-7 py-4 mb-4 shadow-[var(--shadow-ocre)] backdrop-blur-sm">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-ocre text-ocre-foreground font-heading font-extrabold text-3xl shadow-lg ring-4 ring-ocre/20">
              25
            </span>
            <div className="text-left">
              <span className="font-heading text-lg md:text-xl font-bold text-foreground block leading-tight">
                Anos de Experiência
              </span>
              <span className="font-body text-sm text-ocre font-semibold uppercase tracking-wider">
                Internacional
              </span>
            </div>
          </div>
          <p className="font-body text-sm md:text-base text-muted-foreground italic max-w-lg">
            "Você não está comprando apenas uma essência. Você está utilizando um produto desenvolvido por <span className="text-foreground font-semibold not-italic">especialistas</span>."
          </p>
        </div>


        {/* CTA */}
        <div className="hook-animate flex justify-center">
          <a
            href="#kits"
            className="group relative inline-flex items-center justify-center rounded-full bg-ocre px-10 py-5 font-body text-base font-bold uppercase tracking-widest text-ocre-foreground shadow-[var(--shadow-ocre)] transition-all hover:scale-105 hover:shadow-[0_12px_32px_hsl(38_72%_55%/0.5)]"
          >
            {/* Pulse ring 1 */}
            <span className="absolute inset-0 rounded-full animate-[cta-ping_2s_ease-out_infinite] border-2 border-ocre opacity-0" />
            {/* Pulse ring 2 */}
            <span className="absolute inset-0 rounded-full animate-[cta-ping_2s_ease-out_0.6s_infinite] border-2 border-ocre opacity-0" />
            {/* Glow */}
            <span className="absolute inset-0 rounded-full animate-[cta-glow_2s_ease-in-out_infinite] bg-ocre/20 blur-md" />
            <span className="relative z-10">Quero Minha Essência Profissional</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HookVslSection;
