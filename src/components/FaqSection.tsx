import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "As essências danificam minha máquina?",
    a: "Absolutamente não. Nossas essências utilizam Nanotecnologia anti-entupimento exclusiva, com nanopartículas que preservam o atomizador e aumentam a vida útil do seu equipamento. Diferente de essências convencionais, nossa formulação foi desenvolvida para proteger — não agredir — seu investimento.",
  },
  {
    q: "Como funciona a Garantia Blindada de 180 dias?",
    a: "É simples: você tem 6 meses de cobertura total. Se não ficar satisfeito com o resultado, a fragrância ou tiver qualquer problema com seu equipamento relacionado ao uso da essência, devolvemos 100% do seu investimento. Sem burocracia, sem letras pequenas.",
  },
  {
    q: "O produto já vem pronto para uso?",
    a: "Sim! Nossas essências são formulações profissionais prontas para uso em aparelhos de névoa fria. Basta adicionar ao reservatório da sua máquina e ligar. Não é necessário diluir, misturar ou preparar nada.",
  },
  {
    q: "Quais máquinas são compatíveis?",
    a: "Nossas essências são compatíveis com máquinas de Nanopartículas, Ultrassônicas e Nebulizadores profissionais. A formulação com nanotecnologia garante funcionamento otimizado em todos esses tipos de equipamentos.",
  },
  {
    q: "Como funciona o Clube de Assinatura?",
    a: "Com o Clube de Assinatura você recebe suas essências mensalmente com 15% de desconto fixo + brindes exclusivos. E o melhor: pode trocar de fragrância a qualquer momento via WhatsApp. Sem fidelidade, cancele quando quiser.",
  },
];

const FaqSection = () => (
  <section className="py-20 px-4 md:px-8 bg-muted/40">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-sm font-body font-semibold text-ocre tracking-widest uppercase mb-3">Dúvidas Frequentes</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
          Tudo o que Você Precisa Saber
        </h2>
        <p className="font-body text-muted-foreground">
          Respostas diretas para as perguntas mais comuns sobre nossas essências.
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="bg-card rounded-xl border border-border px-6 shadow-sm data-[state=open]:shadow-[var(--shadow-card)]"
          >
            <AccordionTrigger className="font-body font-semibold text-foreground text-left py-5 hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FaqSection;
