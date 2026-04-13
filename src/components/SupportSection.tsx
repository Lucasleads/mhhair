import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Users, UserCheck, Headphones } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const supportCards = [
  {
    icon: MessageCircle,
    title: "WhatsApp Direto",
    desc: "Atendimento rápido e humanizado pelo WhatsApp. Sem robôs, sem espera. Fale com quem entende do assunto.",
  },
  {
    icon: Users,
    title: "Consultoria Especializada",
    desc: "Nossa equipe te ajuda a escolher a fragrância ideal para o seu ambiente e tipo de negócio.",
  },
  {
    icon: UserCheck,
    title: "Gerente Dedicado",
    desc: "Clientes do Clube de Assinatura contam com um gerente exclusivo para acompanhar cada detalhe.",
  },
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
      </div>
    </section>
  );
};

export default SupportSection;
