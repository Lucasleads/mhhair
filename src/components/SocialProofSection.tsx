import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Mariana Souza",
    role: "Proprietária — Hotel Boutique",
    text: "Desde que começamos a usar a WHAIR, nossos hóspedes elogiam o aroma do lobby. A taxa de retorno aumentou 30% em 3 meses.",
  },
  {
    name: "Carlos Mendes",
    role: "Gestor — Clínica Odontológica",
    text: "O ambiente da clínica ficou muito mais acolhedor. Os pacientes relatam menos ansiedade. A essência faz toda a diferença.",
  },
  {
    name: "Fernanda Lima",
    role: "Gerente — Boutique de Moda",
    text: "As clientes passam mais tempo na loja e sempre perguntam qual é o perfume. Virou parte da nossa identidade de marca.",
  },
  {
    name: "Roberto Alves",
    role: "Diretor — Academia Premium",
    text: "Eliminamos os odores desagradáveis e criamos um ambiente energizante. Nossos alunos adoram. Recomendo demais!",
  },
  {
    name: "Juliana Costa",
    role: "Arquiteta de Interiores",
    text: "Indico a WHAIR para todos os meus projetos de alto padrão. A qualidade é incomparável e o suporte é excepcional.",
  },
  {
    name: "André Martins",
    role: "CEO — Rede de Coworkings",
    text: "Implementamos em 12 unidades. A percepção de profissionalismo disparou. Investimento com retorno garantido.",
  },
  {
    name: "Patrícia Rocha",
    role: "Dona — Spa & Wellness",
    text: "A nanotecnologia da WHAIR é real. Sem resíduos, sem entupimento. Funciona perfeitamente há mais de 1 ano sem manutenção.",
  },
  {
    name: "Lucas Ferreira",
    role: "Proprietário — Restaurante Fine Dining",
    text: "O aroma complementa a experiência gastronômica. Clientes dizem que nosso restaurante tem 'algo especial'. É a WHAIR.",
  },
];

const SocialProofSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clamped);
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".sp-header",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(".sp-carousel",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-8 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="sp-header text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-ocre/30 bg-ocre/10 px-6 py-3 mb-6 shadow-sm">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-ocre fill-ocre" />
              ))}
            </div>
            <span className="font-body text-sm md:text-base font-bold text-foreground">
              +500 empresas perfumadas com sucesso
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O que nossos clientes{" "}
            <span className="text-ocre">dizem</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base">
            Histórias reais de quem transformou seus ambientes com a WHAIR.
          </p>
        </div>

        {/* Carousel */}
        <div className="sp-carousel relative">
          {/* Navigation buttons */}
          <button
            onClick={() => scrollTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTo(currentIndex + 1)}
            disabled={currentIndex >= maxIndex}
            className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards track */}
          <div className="overflow-hidden mx-6 md:mx-8">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <div className="h-full rounded-2xl bg-background border border-border/60 p-6 md:p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-400">
                    {/* Quote icon */}
                    <Quote className="w-8 h-8 text-ocre/30 mb-4" />

                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-ocre fill-ocre" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 min-h-[80px]">
                      "{t.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                      <div className="w-10 h-10 rounded-full bg-ocre/15 flex items-center justify-center flex-shrink-0">
                        <span className="font-body text-sm font-bold text-ocre">
                          {getInitials(t.name)}
                        </span>
                      </div>
                      <div>
                        <p className="font-body text-sm font-bold text-foreground leading-tight">
                          {t.name}
                        </p>
                        <p className="font-body text-xs text-muted-foreground">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-ocre w-7"
                    : "bg-muted-foreground/25 hover:bg-muted-foreground/40"
                }`}
                aria-label={`Ir para slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
