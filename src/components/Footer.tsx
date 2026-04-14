import { MessageCircle } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground/70 py-12 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        {/* Brand */}
        <div>
          <h4 className="font-heading text-xl font-bold text-primary-foreground mb-3">MH AIR</h4>
          <p className="font-body text-sm leading-relaxed">
            Grupo com 25 anos de Experiência Internacional em Marketing Olfativo e Aromatização Profissional.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-body font-semibold text-primary-foreground mb-3">Contato</h4>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-ocre hover:text-ocre-light transition-colors mb-2"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp — Fale Conosco
          </a>
          <p className="font-body text-xs mt-2">contato@mhair.com.br</p>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-body font-semibold text-primary-foreground mb-3">Informações</h4>
          <p className="font-body text-xs leading-relaxed">
            CNPJ: 00.000.000/0001-00<br />
            Endereço: Rua Exemplo, 123 — São Paulo, SP<br />
            CEP: 00000-000
          </p>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-6 text-center">
        <p className="font-body text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} MH AIR — Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
