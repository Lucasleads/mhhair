import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Package, ShieldCheck, CreditCard } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  cx: Math.random() * 100,
  cy: Math.random() * 100,
  r: 1.5 + Math.random() * 3,
  dur: 6 + Math.random() * 8,
  delay: Math.random() * 5,
}));

const FinalCtaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 md:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(228 55% 14%) 0%, hsl(228 55% 20%) 40%, hsl(38 60% 45%) 100%)",
      }}
    >
      {/* SVG Particle mist */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {particles.map((p) => (
          <circle key={p.id} cx={`${p.cx}%`} cy={`${p.cy}%`} r={p.r} fill="white" opacity="0.08">
            <animate attributeName="cy" values={`${p.cy}%;${p.cy - 15}%;${p.cy}%`} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.04;0.12;0.04" dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      <div className="cta-content max-w-3xl mx-auto text-center relative z-10">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground leading-tight mb-6">
          Transforme seu Ambiente em uma Experiência Inesquecível Hoje.
        </h2>
        <p className="font-body text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
          Escolha a tecnologia que protege seu investimento e conquista seus clientes.
        </p>

        <a
          href="#kits"
          className="inline-block bg-ocre text-ocre-foreground font-body font-bold text-lg px-10 py-4 rounded-xl shadow-[var(--shadow-ocre)] hover:scale-105 hover:shadow-[0_12px_32px_hsl(38_72%_55%/0.5)] transition-all duration-300 uppercase tracking-wide"
        >
          Escolher Minha Fragrância
        </a>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-10">
          {[
            { icon: Package, text: "Frete Grátis" },
            { icon: ShieldCheck, text: "180 Dias de Garantia" },
            { icon: CreditCard, text: "12x no Cartão" },
          ].map((s) => (
            <div key={s.text} className="flex items-center gap-2 text-primary-foreground/70">
              <s.icon className="w-5 h-5" />
              <span className="font-body text-sm">{s.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
