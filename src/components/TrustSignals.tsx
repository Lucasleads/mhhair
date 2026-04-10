import { Package, ShieldCheck, Truck } from "lucide-react";

const signals = [
  { icon: Package, title: "Frete Grátis", desc: "Para todo o Brasil" },
  { icon: ShieldCheck, title: "Garantia Blindada", desc: "180 dias de segurança total" },
  { icon: Truck, title: "Entrega Rápida", desc: "Envio em até 24h úteis" },
];

const TrustSignals = () => (
  <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-12 border-t border-border mt-12">
    {signals.map((s) => (
      <div key={s.title} className="flex items-center gap-3">
        <s.icon className="w-7 h-7 text-accent shrink-0" />
        <div>
          <p className="text-sm font-body font-bold text-foreground">{s.title}</p>
          <p className="text-xs font-body text-muted-foreground">{s.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

export default TrustSignals;
