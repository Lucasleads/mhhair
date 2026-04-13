import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Users, UserCheck, Headphones } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const accessItems = [
  { icon: MessageCircle, text: "WhatsApp com especialistas" },
  { icon: Users, text: "Consultores em aromatização" },
  { icon: UserCheck, text: "Gerente olfativo dedicado" },
];

const benefitItems = [
  "Orientar uso",
  "Ajustar intensidade",
  "Recomendar fragrâncias",
  "Resolver qualquer dúvida",
];

const SupportSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".sup-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });

      gsap.from(".sup-card", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sup-cards", start: "top 85%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="sup-header text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-ocre/30 bg-ocre/10 px-5 py-2 mb-5">
            <Headphones className="w-4 h-4 text-ocre" />
            <span className="font-body text-xs font-bold text-ocre uppercase tracking-widest">
              Suporte Premium
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Atendimento{" "}
            <span className="text-ocre relative">
              Real e Humano
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M1 5.5C40 2 80 2 100 4C120 6 160 6 199 3" stroke="hsl(var(--ocre))" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base">
            Nada de chatbots ou respostas automáticas. Aqui você fala com pessoas de verdade, prontas para te ajudar.
          </p>
        </div>

        {/* Cards */}
        <div className="sup-cards grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportCards.map((card) => (
            <div
              key={card.title}
              className="sup-card group rounded-2xl bg-card border border-border/60 p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-2 transition-all duration-400 cursor-default"
            >
              <div className="w-14 h-14 rounded-xl bg-ocre/10 border border-ocre/20 flex items-center justify-center mb-5 group-hover:shadow-[var(--shadow-ocre)] group-hover:scale-105 transition-all duration-300">
                <card.icon className="w-7 h-7 text-ocre" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                {card.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://wa.me/5511999999999?text=Olá!%20Quero%20saber%20mais%20sobre%20as%20essências%20MH%20AIR"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 rounded-full px-10 py-5 font-body text-base font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: "#25D366" }}
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-[cta-ping_2s_ease-out_infinite] border-2 opacity-0" style={{ borderColor: "#25D366" }} />
            <span className="absolute inset-0 rounded-full animate-[cta-glow_2s_ease-in-out_infinite] blur-md opacity-20" style={{ background: "#25D366" }} />
            <svg className="relative z-10 w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="relative z-10">Falar com Especialista</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
