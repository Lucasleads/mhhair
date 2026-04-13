import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HookVslSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Autoplay video when section enters viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = true;
          video.play().catch(() => {});
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-4 md:px-8 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Redline */}
        <p className="hook-animate font-body text-xs uppercase tracking-[0.25em] text-ocre mb-6">
          O segredo por trás dos ambientes mais sofisticados do Brasil
        </p>

        <h2 className="hook-animate font-heading text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight mb-4 max-w-3xl mx-auto">
          Finalmente: A Tecnologia de Perfumação Profissional que{" "}
          <span className="text-primary">Protege sua Máquina de Mil Reais</span>{" "}
          enquanto Dobra a Percepção de Valor do seu Ambiente.
        </h2>

        {/* Play instruction */}
        <div className="hook-animate flex items-center justify-center gap-2 mb-6">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-destructive"></span>
          </span>
          <p className="font-body text-sm md:text-base font-semibold text-destructive uppercase tracking-wider">
            Clique no play e assista agora
          </p>
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-destructive"></span>
          </span>
        </div>

        {/* VSL Video Embed - VTurb style */}
        <div className="hook-animate relative mx-auto max-w-3xl mb-10 group">
          {/* Outer glow border */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-ocre via-primary to-ocre opacity-70 blur-sm animate-pulse" />
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-ocre via-primary to-ocre opacity-50" />
          <div className="relative rounded-xl overflow-hidden shadow-[0_20px_60px_-12px_hsl(38_72%_55%/0.4)] bg-background">
            <video
              className="w-full rounded-xl cursor-pointer"
              controls
              preload="metadata"
              poster=""
            >
              <source src="/videos/vsl.mp4" type="video/mp4" />
              Seu navegador não suporta vídeo.
            </video>
          </div>
          {/* Bottom arrow indicator */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <svg className="w-6 h-6 text-ocre animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </div>
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
