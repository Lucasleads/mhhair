import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Hotel, Stethoscope, ShoppingBag, Dumbbell, Home, Sparkles } from "lucide-react";

import usecaseCorporate from "@/assets/usecase-corporate.jpg";
import usecaseHotel from "@/assets/usecase-hotel.jpg";
import usecaseClinic from "@/assets/usecase-clinic.jpg";
import usecaseBoutique from "@/assets/usecase-boutique.jpg";
import usecaseGym from "@/assets/usecase-gym.jpg";
import usecaseHome from "@/assets/usecase-home.jpg";

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: Building2,
    title: "Vestiários e Banheiros Corporativos",
    desc: "Higiene percebida e eliminação de odores críticos. Seus colaboradores merecem o melhor.",
    image: usecaseCorporate,
    tag: "Corporativo",
  },
  {
    icon: Hotel,
    title: "Hotéis e Pousadas",
    desc: "A recepção memorável dos hotéis 5 estrelas. A primeira impressão que fideliza.",
    image: usecaseHotel,
    tag: "Hotelaria",
  },
  {
    icon: Stethoscope,
    title: "Clínicas e Consultórios",
    desc: "Redução de estresse e percepção de cuidado. Ambiente que acolhe e tranquiliza.",
    image: usecaseClinic,
    tag: "Saúde",
  },
  {
    icon: ShoppingBag,
    title: "Lojas e Boutiques",
    desc: "Aumento do tempo de permanência e desejo de compra. Aroma que converte.",
    image: usecaseBoutique,
    tag: "Varejo",
  },
  {
    icon: Dumbbell,
    title: "Academias e Estúdios",
    desc: "Frescor e energia em ambientes de alta rotatividade. Motivação no ar.",
    image: usecaseGym,
    tag: "Fitness",
  },
  {
    icon: Home,
    title: "Residências de Alto Padrão",
    desc: "Sofisticação em cada cômodo. Transforme sua casa em um refúgio sensorial.",
    image: usecaseHome,
    tag: "Residencial",
  },
];

const UseCasesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      const headerEl = sectionRef.current!.querySelector(".uc-header");
      if (headerEl) {
        gsap.fromTo(headerEl,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }

      // Cards stagger
      const items = gridRef.current!.querySelectorAll(".use-card");
      gsap.fromTo(items,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );

      // Image parallax on each card
      items.forEach((card) => {
        const img = card.querySelector(".uc-img");
        if (img) {
          gsap.fromTo(img,
            { scale: 1.15 },
            { scale: 1, duration: 1.2, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-8 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(var(--secondary) / 0.08) 0%, hsl(var(--background)) 50%, hsl(var(--muted) / 0.3) 100%)" }}>
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.05] blur-3xl" style={{ background: "hsl(var(--ocre))" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="uc-header text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-ocre/30 bg-ocre/10 px-5 py-2 mb-5">
            <Sparkles className="w-4 h-4 text-ocre" />
            <span className="font-body text-xs font-bold text-ocre tracking-widest uppercase">
              Indicações de Uso
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Onde a{" "}
            <span className="text-ocre relative">
              Mágica
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M1 5.5C40 2 80 2 100 4C120 6 160 6 199 3" stroke="hsl(var(--ocre))" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>{" "}
            Acontece
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Descubra como a aromatização profissional transforma cada tipo de ambiente em uma experiência sensorial inesquecível.
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="use-card group relative rounded-2xl overflow-hidden bg-card border border-border/60 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-2 transition-all duration-500 cursor-default"
            >
              {/* Image */}
              <div className="relative h-48 md:h-52 overflow-hidden">
                <img
                  src={uc.image}
                  alt={uc.title}
                  loading="lazy"
                  width={768}
                  height={512}
                  className="uc-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border/40 px-3 py-1">
                    <uc.icon className="w-3.5 h-3.5 text-ocre" />
                    <span className="font-body text-[11px] font-bold text-foreground uppercase tracking-wider">
                      {uc.tag}
                    </span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-ocre transition-colors duration-300">
                  {uc.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {uc.desc}
                </p>
              </div>

              {/* Bottom accent on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-ocre/0 via-ocre to-ocre/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
