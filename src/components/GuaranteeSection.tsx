import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Clock, RotateCcw } from "lucide-react";
import guaranteeSeal from "@/assets/guarantee-seal.png";

gsap.registerPlugin(ScrollTrigger);

const guaranteePoints = [
  {
    icon: ShieldCheck,
    text: "Garantia incondicional de 180 dias",
  },
  {
    icon: Clock,
    text: "Teste sem pressa e com total segurança",
  },
  {
    icon: RotateCcw,
    text: "Devolução simples e sem burocracia",
  },
];

const GuaranteeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Stamp effect on the seal
      if (sealRef.current) {
        gsap.from(sealRef.current, {
          scale: 3,
          opacity: 0,
          rotation: -25,
          duration: 0.6,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        });

        // After stamp lands, subtle shine sweep
        gsap.to(".seal-shine", {
          x: 300,
          delay: 0.8,
          duration: 0.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        });
      }

      // Text content slide in
      gsap.from(".guar-text", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden"
      style={{ background: "hsl(216 76% 32%)" }}
    >
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 20L20 0h1L0 21zm40-1L21 40h-1l20-20zm0-19L21 0h-1L40 19z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.08] blur-3xl pointer-events-none"
        style={{ background: "hsl(var(--ocre))" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Seal Column */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                ref={sealRef}
                src={guaranteeSeal}
                alt="Selo de Garantia MH AIR"
                loading="lazy"
                width={1024}
                height={1024}
                className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain drop-shadow-[0_8px_30px_hsl(30_58%_62%/0.4)]"
              />
              {/* Shine sweep overlay */}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <div
                  className="seal-shine absolute top-0 -left-[150px] w-[100px] h-full opacity-40"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    transform: "skewX(-15deg)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div>
            <p className="guar-text font-body text-xs uppercase tracking-[0.35em] mb-4 font-semibold" style={{ color: "hsl(var(--ocre))" }}>
              Garantia Blindada
            </p>

            <h2 className="guar-text font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-6">
              Sua compra 100% protegida
            </h2>

            <p className="guar-text font-heading text-xl md:text-2xl font-bold text-white/95 leading-snug mb-6 border-l-4 pl-5" style={{ borderColor: "hsl(var(--ocre))" }}>
              "Se você não ficar satisfeito, devolvemos o valor investido."
            </p>

            <p className="guar-text font-body text-white/70 text-base leading-relaxed mb-8 max-w-lg">
              Confiamos tanto na qualidade das nossas essências que oferecemos 180 dias para você testar. Sem letras miúdas, sem pegadinhas.
            </p>

            {/* Guarantee points */}
            <div className="space-y-4">
              {guaranteePoints.map((point) => (
                <div key={point.text} className="guar-text flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--ocre) / 0.15)" }}>
                    <point.icon className="w-5 h-5" style={{ color: "hsl(var(--ocre))" }} />
                  </div>
                  <span className="font-body text-sm font-semibold text-white/90">
                    {point.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
