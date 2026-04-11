import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Tecnologia", href: "#tecnologia" },
  { label: "Planos", href: "#kits" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Red trust banner */}
      <div className="fixed top-0 left-0 w-full z-[60] bg-destructive text-destructive-foreground">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-center gap-4 md:gap-8 text-[10px] md:text-xs font-body font-bold uppercase tracking-[0.15em]">
          <span>🚚 Frete Grátis para Todo Brasil</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">⚡ Entrega Rápida</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">🛡️ Garantia de 180 Dias</span>
        </div>
      </div>

      <header
        className={`fixed top-[30px] left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/40 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-ocre flex items-center justify-center text-ocre-foreground font-heading font-bold text-sm group-hover:scale-110 transition-transform">
            MH
          </span>
          <span className="font-heading text-xl font-bold text-foreground tracking-tight">
            MH <span className="font-light">AIR</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#kits"
            className="font-body text-xs font-semibold uppercase tracking-widest text-foreground border border-foreground/20 px-5 py-2.5 rounded-full hover:border-ocre hover:text-ocre transition-all"
          >
            Assinar e Economizar
          </a>
          <a
            href="#kits"
            className="font-body text-xs font-bold uppercase tracking-widest bg-ocre text-ocre-foreground px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-[var(--shadow-ocre)]"
          >
            Escolher Fragrância
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/40 px-6 py-6 space-y-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-body text-sm text-foreground uppercase tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <a
              href="#kits"
              onClick={() => setMobileOpen(false)}
              className="text-center font-body text-xs font-bold uppercase tracking-widest bg-ocre text-ocre-foreground px-5 py-3 rounded-full"
            >
              Escolher Fragrância
            </a>
          </div>
        </div>
      )}
      </header>
    </>
  );
};

export default Header;
