import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RecurrenceToggle from "./RecurrenceToggle";
import PricingCard from "./PricingCard";
import TrustSignals from "./TrustSignals";

import productAlecrim from "@/assets/product-alecrim.jpg";
import productLuxury from "@/assets/product-luxury.jpg";
import productJardimZen from "@/assets/product-jardim-zen.jpg";
import productCandy from "@/assets/product-candy.jpg";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Kit Experience — 8 Fragrâncias",
    subtitle: "8 frascos de 100ml",
    image: productCandy,
    priceUnit: 197.0,
    priceSubscription: 167.45,
    highlight: "Ideal para conhecer todas as opções",
    benefits: [
      "Nanotecnologia anti-entupimento",
      "Frete Grátis para todo o Brasil",
      "8 fragrâncias exclusivas para teste",
    ],
  },
  {
    title: "1 Unidade Profissional (1L)",
    subtitle: "1 frasco de 1L + 1 Amostra de 100ml",
    image: productAlecrim,
    priceUnit: 149.9,
    priceSubscription: 127.42,
    benefits: [
      "Nanotecnologia anti-entupimento",
      "Frete Grátis para todo o Brasil",
      "Brinde: Essência 100ml extra",
    ],
  },
  {
    title: "Combo 3 Unidades (3L)",
    subtitle: "3 frascos de 1L + 1 Amostra de 100ml",
    image: productLuxury,
    priceUnit: 397.0,
    priceSubscription: 337.45,
    badge: "MAIS VENDIDO",
    isFeatured: true,
    benefits: [
      "Nanotecnologia anti-entupimento",
      "Frete Grátis para todo o Brasil",
      "Brinde: Essência 100ml extra",
    ],
  },
  {
    title: "Kit Business 5 Unidades (5L)",
    subtitle: "5 frascos de 1L + 1 Amostra de 100ml",
    image: productJardimZen,
    priceUnit: 597.0,
    priceSubscription: 507.45,
    highlight: "Melhor Preço por Litro",
    benefits: [
      "Nanotecnologia anti-entupimento",
      "Frete Grátis para todo o Brasil",
      "Brinde: Essência 100ml extra",
    ],
  },
];

const KitsPricingSection = () => {
  const [isSubscription, setIsSubscription] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cardEls = cardsRef.current.querySelectorAll(".pricing-card");

    gsap.set(cardEls, { opacity: 0, y: 60, rotateX: 8 });

    gsap.to(cardEls, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Escolha o Seu Kit Ideal
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto mb-8">
            Essências profissionais com nanotecnologia exclusiva. Aroma que conecta, sensação que permanece.
          </p>
          <RecurrenceToggle isSubscription={isSubscription} onToggle={setIsSubscription} />
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: "1000px" }}
        >
          {cards.map((card) => (
            <PricingCard key={card.title} {...card} isSubscription={isSubscription} />
          ))}
        </div>

        <TrustSignals />
      </div>
    </section>
  );
};

export default KitsPricingSection;
