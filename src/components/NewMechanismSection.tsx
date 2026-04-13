import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, AlertTriangle, Droplets, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const oldWay = [
  {
    icon: AlertTriangle,
    title: "Acúmulo de Resíduos",
    desc: "Essências comuns deixam depósitos oleosos que entopem e danificam seu atomizador ao longo do tempo.",
  },
  {
    icon: Droplets,
    title: "Névoa Irregular",
    desc: "Partículas grandes e desiguais reduzem a projeção e desperdiçam produto.",
  },
];

const newWay = [
  {
    icon: Sparkles,
    title: "Névoa Pura com Nanotecnologia",
    desc: "A MH AIR gera partículas nanométricas que se dispersam uniformemente, sem deixar resíduos.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança Total para seu Equipamento",
    desc: "Não agride atomizadores, aumenta a vida útil e garante funcionamento perfeito por muito mais tempo.",
  },
];

const NewMechanismSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".mech-animate", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-4 md:px-8 bg-muted/40">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="mech-animate font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight max-w-2xl mx-auto">
            Por que essências comuns{" "}
            <span className="text-destructive">estragam</span>{" "}
            seu atomizador?
          </h2>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Old Way */}
          <div className="mech-animate">
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 md:p-8 h-full">
              <h3 className="font-heading text-lg font-bold text-destructive mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Essências Comuns
              </h3>
              <div className="space-y-6">
                {oldWay.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* New Way */}
          <div className="mech-animate">
            <div className="rounded-xl border border-success/20 bg-success/5 p-6 md:p-8 h-full relative overflow-hidden">
              {/* Subtle glow */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl"
                style={{ background: "hsl(var(--success))" }}
              />
              <h3 className="font-heading text-lg font-bold text-success mb-6 flex items-center gap-2 relative z-10">
                <ShieldCheck className="w-5 h-5" />
                Nanotecnologia MH AIR
              </h3>
              <div className="space-y-6 relative z-10">
                {newWay.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="mech-animate mt-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-success/10 border border-success/20 px-6 py-3">
            <ShieldCheck className="w-5 h-5 text-success" />
            <span className="font-body text-sm font-semibold text-foreground">
              Segurança Total para seu Equipamento — Garantia de 180 dias
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewMechanismSection;
