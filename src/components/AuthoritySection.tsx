import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlaskConical, Globe, Cog, Brain } from "lucide-react";
import garantiaSelo from "@/assets/garantia-blindada.jpg";

gsap.registerPlugin(ScrollTrigger);

const differentials = [
  { icon: FlaskConical, title: "Químicos Especialistas", desc: "Formulação exclusiva e testada" },
  { icon: Globe, title: "Presença Global", desc: "Atuação no Brasil e no exterior" },
  { icon: Cog, title: "Preservação Total", desc: "Aumenta a vida útil da sua máquina" },
  { icon: Brain, title: "Conexão Emocional", desc: "Alta fidelidade olfativa (o cheiro real)" },
];

const AnimatedCounter = ({ target }: { target: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => setStarted(true),
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!started || !ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val).toString();
      },
    });
  }, [started, target]);

  return <span ref={ref} className="tabular-nums">0</span>;
};

const AuthoritySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);
  const diffsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text slide from left
      if (textRef.current) {
        gsap.from(textRef.current, {
          x: -80,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 80%", once: true },
        });
      }

      // Video fade-in with scale
      if (videoRef.current) {
        gsap.from(videoRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: videoRef.current, start: "top 80%", once: true },
        });
      }

      // Guarantee block
      if (guaranteeRef.current) {
        gsap.from(guaranteeRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: guaranteeRef.current, start: "top 85%", once: true },
        });
      }

      // Differentials stagger
      if (diffsRef.current) {
        const items = diffsRef.current.querySelectorAll(".diff-item");
        gsap.from(items, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: diffsRef.current, start: "top 85%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 md:px-8 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, hsl(150 10% 93% / 0.7), transparent 60%), radial-gradient(ellipse at 80% 80%, hsl(150 15% 90% / 0.5), transparent 50%), hsl(210 20% 97%)",
      }}
    >
      {/* Parallax subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Grid: Text + Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Video — comes first on mobile */}
          <div ref={videoRef} className="lg:col-span-6 lg:order-2 order-1">
            <div className="relative group">
              <div className="rounded-2xl overflow-hidden border-2 border-ocre/40 shadow-[var(--shadow-card)] transition-shadow duration-500 group-hover:shadow-[0_0_30px_hsl(38_72%_55%/0.3)]">
                <video
                  className="w-full aspect-video object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster=""
                >
                  <source src="/videos/autoridade.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="text-xs font-body text-muted-foreground mt-3 text-center italic">
                Assista: O especialista Cristiano Orcel explica a tecnologia por trás da sua fragrância.
              </p>
            </div>
          </div>

          {/* Text — Authority */}
          <div ref={textRef} className="lg:col-span-6 lg:order-1 order-2">
            <p className="text-sm font-body font-semibold text-ocre tracking-widest uppercase mb-3">
              Autoridade &amp; Confiança
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-tight mb-6">
              Mais de{" "}
              <span className="text-ocre inline-flex items-baseline gap-1">
                <AnimatedCounter target={25} />+
              </span>{" "}
              Anos Definindo o Padrão do Marketing Olfativo.
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Cristiano Orcel percorreu o mundo estudando as maiores referências em aromatização de ambientes. De feiras internacionais a laboratórios de alta performance, ele reuniu o conhecimento que deu origem ao grupo MH AIR — referência brasileira em marketing olfativo com tecnologia de ponta.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Cada fragrância é formulada por químicos especialistas e passa por testes rigorosos de durabilidade, segurança e compatibilidade com máquinas de aromatização profissionais.
            </p>
          </div>
        </div>

        {/* Guarantee Block */}
        <div
          ref={guaranteeRef}
          className="mt-16 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(228 55% 14%), hsl(228 55% 22%))",
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
            <div className="shrink-0">
              <img
                src={garantiaSelo}
                alt="Selo Garantia Blindada 180 dias"
                className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                Garantia Blindada de{" "}
                <span className="text-ocre">180 Dias</span>
              </h3>
              <p className="font-body text-primary-foreground/80 leading-relaxed max-w-2xl">
                Confiamos tanto na nossa nanotecnologia que você tem 6 meses de cobertura total. Se não ficar satisfeito ou se houver qualquer problema com seu equipamento, devolvemos seu investimento. Satisfação garantida ou seu dinheiro de volta.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Differentials */}
        <div ref={diffsRef} className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((d) => (
            <div
              key={d.title}
              className="diff-item flex flex-col items-center text-center p-6 rounded-xl bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <d.icon className="w-7 h-7 text-accent" />
              </div>
              <h4 className="font-heading text-lg font-semibold text-foreground mb-1">{d.title}</h4>
              <p className="font-body text-sm text-muted-foreground">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
