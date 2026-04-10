import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface PricingCardProps {
  title: string;
  subtitle?: string;
  image: string;
  priceUnit: number;
  priceSubscription: number;
  isSubscription: boolean;
  benefits: string[];
  badge?: string;
  highlight?: string;
  isFeatured?: boolean;
}

const PricingCard = ({
  title,
  subtitle,
  image,
  priceUnit,
  priceSubscription,
  isSubscription,
  benefits,
  badge,
  highlight,
  isFeatured,
}: PricingCardProps) => {
  const [fadeKey, setFadeKey] = useState(0);
  const prevSub = useRef(isSubscription);

  useEffect(() => {
    if (prevSub.current !== isSubscription) {
      setFadeKey((k) => k + 1);
      prevSub.current = isSubscription;
    }
  }, [isSubscription]);

  const currentPrice = isSubscription ? priceSubscription : priceUnit;
  const savings = priceUnit - priceSubscription;
  const formattedPrice = currentPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

  return (
    <div
      className={cn(
        "pricing-card relative flex flex-col rounded-2xl bg-card overflow-hidden transition-all duration-500 ease-out",
        "hover:-translate-y-2.5",
        isFeatured
          ? "border-2 border-ocre shadow-[var(--shadow-ocre)]"
          : "border border-border shadow-[var(--shadow-card)]",
        "hover:shadow-[var(--shadow-card-hover)]"
      )}
    >
      {badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-ocre text-ocre-foreground text-xs font-bold font-body uppercase tracking-wider px-5 py-1.5 rounded-b-lg">
          {badge}
        </div>
      )}

      <div className="product-glossy relative bg-secondary/50 flex items-center justify-center p-6 pt-10">
        <img
          src={image}
          alt={title}
          className="w-full max-w-[240px] h-auto object-contain drop-shadow-lg"
        />
      </div>

      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground leading-tight">{title}</h3>
          {subtitle && (
            <p className="text-xs font-body text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>

        <div key={fadeKey} className="animate-fade-in">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-body text-muted-foreground">R$</span>
            <span className="text-3xl font-heading font-bold text-foreground">{formattedPrice}</span>
          </div>
          {isSubscription && savings > 0 && (
            <p className="text-sm font-body font-semibold text-ocre mt-1">
              Economia de R$ {savings.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          )}
          {highlight && (
            <span className="inline-block mt-2 text-xs font-body font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
              {highlight}
            </span>
          )}
        </div>

        <ul className="flex flex-col gap-2 flex-1">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm font-body text-card-foreground">
              <Check className="w-4 h-4 mt-0.5 shrink-0 text-success" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <button
          className={cn(
            "w-full py-3.5 rounded-xl font-body font-bold text-sm uppercase tracking-wider transition-all duration-300",
            "bg-ocre text-ocre-foreground hover:brightness-110 hover:shadow-[var(--shadow-ocre)]",
            "active:scale-[0.98]"
          )}
        >
          {isSubscription ? "ASSINAR AGORA" : "COMPRAR AGORA"}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
