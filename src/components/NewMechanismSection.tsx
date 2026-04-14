import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, AlertTriangle, Droplets, Sparkles, X, Check, Zap } from "lucide-react";

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
  {
    icon: X,
    title: "Manutenção Constante",
    desc: "Limpezas frequentes e trocas de peças que geram custo e dor de cabeça.",
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
  {
    icon: Zap,
    title: "Performance Superior",
    desc: "Projeção máxima com consumo reduzido. Rende mais e perfuma melhor.",
  },
];

const NewMechanismSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header
      gsap.from(".mech-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });

      // Old way card - slide from left
      gsap.from(".mech-old", {
        x: -60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mech-old", start: "top 80%", once: true },
      });

      // New way card - slide from right
      gsap.from(".mech-new", {
        x: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mech-new", start: "top 80%", once: true },
      });

      // Old way items stagger
      gsap.from(".old-item", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: ".mech-old", start: "top 70%", once: true },
      });

      // New way items stagger
      gsap.from(".new-item", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: ".mech-new", start: "top 70%", once: true },
      });

      // Glow pulse on new card border
      gsap.to(".mech-new-glow", {
        opacity: 0.6,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Bottom badge
      gsap.from(".mech-badge", {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".mech-badge", start: "top 90%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-4 md:px-8 overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(var(--muted) / 0.4) 0%, hsl(var(--background)) 100%)" }}>
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 mech-header">
          <span className="inline-block font-body text-xs uppercase tracking-[0.3em] text-destructive/80 mb-4 font-semibold">
            ⚠️ Atenção: Isso pode estar destruindo seu equipamento
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight max-w-3xl mx-auto">
            Por que essências comuns{" "}
            <span className="text-destructive relative">
              estragam
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M1 5.5C40 2 80 2 100 4C120 6 160 6 199 3" stroke="hsl(var(--destructive))" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>{" "}
            seu atomizador?
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto text-base md:text-lg">
            Descubra a diferença entre o método tradicional e a tecnologia que protege seu investimento.
          </p>
        </div>

        {/* VS divider for mobile */}
        <div className="flex md:hidden justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-heading font-bold text-lg shadow-lg">
            VS
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 relative">
          {/* VS divider for desktop */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center font-heading font-bold text-xl shadow-xl border-4 border-background">
              VS
            </div>
          </div>

          {/* Old Way */}
          <div className="mech-old">
            <div className="rounded-2xl border-2 border-destructive/30 bg-card p-7 md:p-8 h-full relative overflow-hidden shadow-lg">
              {/* Red accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-destructive/60 via-destructive to-destructive/60" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-destructive">
                    Essências Comuns
                  </h3>
                  <span className="font-body text-xs text-destructive/70 uppercase tracking-wider">O problema</span>
                </div>
              </div>

              <div className="space-y-5">
                {oldWay.map((item, i) => (
                  <div key={item.title} className="old-item flex gap-4 group">
                    <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center transition-colors group-hover:bg-destructive/20">
                      <item.icon className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-body font-bold text-foreground mb-1 text-[15px]">{item.title}</h4>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Danger stamp */}
              <div className="mt-8 flex items-center gap-2 rounded-lg bg-destructive/5 border border-destructive/15 px-4 py-3">
                <X className="w-5 h-5 text-destructive flex-shrink-0" />
                <span className="font-body text-sm text-destructive font-semibold">
                  Resultado: prejuízo, mau cheiro e manutenção cara
                </span>
              </div>
            </div>
          </div>

          {/* New Way */}
          <div className="mech-new relative">
            {/* Animated glow border */}
            <div className="mech-new-glow absolute -inset-[2px] rounded-2xl opacity-30" style={{ background: "linear-gradient(135deg, hsl(var(--success)), hsl(var(--ocre)), hsl(var(--success)))" }} />
            
            <div className="rounded-2xl border-2 border-success/40 bg-card p-7 md:p-8 h-full relative overflow-hidden shadow-lg">
              {/* Success accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success/60 via-ocre to-success/60" />
              
              {/* Ambient glows */}
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-15 blur-3xl" style={{ background: "hsl(var(--success))" }} />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ background: "hsl(var(--ocre))" }} />

              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-11 h-11 rounded-xl bg-success/10 border border-success/30 flex items-center justify-center relative">
                  <ShieldCheck className="w-6 h-6 text-success" />
                  {/* LED dot */}
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-success">
                    Nanotecnologia MH AIR
                  </h3>
                  <span className="font-body text-xs text-success/70 uppercase tracking-wider">A solução definitiva</span>
                </div>
              </div>

              <div className="space-y-5 relative z-10">
                {newWay.map((item, i) => (
                  <div key={item.title} className="new-item flex gap-4 group">
                    <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-lg bg-success/10 border border-success/20 flex items-center justify-center transition-colors group-hover:bg-success/20">
                      <item.icon className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h4 className="font-body font-bold text-foreground mb-1 text-[15px]">{item.title}</h4>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Success stamp */}
              <div className="mt-8 flex items-center gap-2 rounded-lg bg-success/5 border border-success/20 px-4 py-3 relative z-10">
                <Check className="w-5 h-5 text-success flex-shrink-0" />
                <span className="font-body text-sm text-success font-semibold">
                  Resultado: economia, durabilidade e perfumação perfeita
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom badge */}
        <div className="mech-badge mt-14 text-center">
          <div className="relative inline-flex items-center gap-4 rounded-2xl border-2 border-success/40 bg-success/10 px-8 py-5 shadow-lg backdrop-blur-sm">
            {/* Glow behind */}
            <div className="absolute inset-0 rounded-2xl opacity-20 blur-xl" style={{ background: "hsl(var(--success))" }} />
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-success text-success-foreground shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="relative text-left">
              <span className="font-heading text-lg md:text-xl font-bold text-foreground block leading-tight">
                Segurança Total para seu Equipamento
              </span>
              <span className="font-body text-sm font-semibold text-success uppercase tracking-wider">
                Garantia de 180 dias
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewMechanismSection;
