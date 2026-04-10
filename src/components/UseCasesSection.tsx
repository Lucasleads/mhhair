import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Hotel, Stethoscope, ShoppingBag, Dumbbell, Home } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  { icon: Building2, title: "Vestiários e Banheiros Corporativos", desc: "Higiene percebida e eliminação de odores críticos." },
  { icon: Hotel, title: "Hotéis e Pousadas", desc: "A recepção memorável dos hotéis 5 estrelas." },
  { icon: Stethoscope, title: "Clínicas e Consultórios", desc: "Redução de estresse e percepção de cuidado." },
  { icon: ShoppingBag, title: "Lojas e Boutiques", desc: "Aumento do tempo de permanência e desejo de compra." },
  { icon: Dumbbell, title: "Academias e Estúdios", desc: "Frescor e energia em ambientes de alta rotatividade." },
  { icon: Home, title: "Residências de Alto Padrão", desc: "Sofisticação em cada cômodo." },
];

const UseCasesSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".use-card");
    gsap.set(items, { opacity: 0, y: 40 });
    gsap.to(items, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-body font-semibold text-ocre tracking-widest uppercase mb-3">Indicações de Uso</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Onde a Mágica Acontece
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Descubra como a aromatização profissional transforma cada tipo de ambiente.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="use-card group p-6 rounded-xl bg-card shadow-[var(--shadow-card)] border-2 border-transparent hover:border-ocre/40 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <uc.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{uc.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
