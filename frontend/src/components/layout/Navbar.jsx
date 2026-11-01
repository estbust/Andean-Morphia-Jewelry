import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles, MapPin, ChevronRight } from 'lucide-react';
import mainLogo from '../../assets/brand/main-logo.svg';
import logoAm from '../../assets/brand/logo-am.svg';

export default function Navbar({ cartCount = 0, onOpenCart, onSelectFilter }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Colección', href: '#catalogo' },
    { name: 'Historia & Simbolismo', href: '#manifiesto' },
    { name: 'Packaging', href: '#packaging' },
    { name: 'Atelier Cusco', href: '#cusco' },
  ];

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Editorial Announcement Bar */}
      <div className="bg-morphia-dark text-morphia-cream text-[10px] sm:text-[11px] py-2 px-4 text-center tracking-[0.26em] uppercase font-medium border-b border-white/10 flex items-center justify-center gap-2.5">
        <Sparkles className="w-3 h-3 text-morphia-gold hidden sm:inline" />
        <span>Atelier Cusco · Joyería Fina en Plata 950 Ley</span>
        <span className="hidden md:inline text-morphia-gold/60">◆</span>
        <span className="hidden md:inline">Estuche de Gamuza Celeste Incluido</span>
      </div>

      {/* Main Glassmorphism Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? 'backdrop-blur-md bg-morphia-cream/90 shadow-sm border-morphia-beige/70 py-2.5'
            : 'backdrop-blur-md bg-morphia-cream/80 border-morphia-beige/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-[11px] uppercase tracking-[0.22em] font-medium text-morphia-dark hover:text-morphia-muted transition-colors relative py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-morphia-gold transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Mobile menu toggle */}
            <div className="flex lg:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-morphia-dark hover:text-morphia-muted transition-colors focus:outline-none"
                aria-label="Abrir menú de navegación"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Brand Logo (Center / responsive switch) */}
            <div className="flex-1 flex justify-center lg:justify-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-block transition-transform duration-300 hover:opacity-90 group focus:outline-none"
                aria-label="Andean Morphia Jewelry - Inicio"
              >
                <img
                  src={isScrolled ? logoAm : mainLogo}
                  alt="Andean Morphia Jewelry"
                  className={`transition-all duration-300 text-morphia-dark ${
                    isScrolled
                      ? 'h-10 sm:h-11 w-auto'
                      : 'h-12 sm:h-16 w-auto'
                  }`}
                />
              </a>
            </div>

            {/* Right Action Icons & Badges */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Metal Quick Filter (Architectural Micro-Tag) */}
              <button
                onClick={() => {
                  if (onSelectFilter) onSelectFilter('PLATA');
                  handleLinkClick('#catalogo');
                }}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 border border-morphia-beige/80 bg-white/70 hover:bg-white text-morphia-dark text-[10px] tracking-[0.2em] uppercase font-medium transition-all shadow-sm"
                title="Ver colección en Plata 950"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-morphia-silver"></span>
                <span>Plata 950</span>
              </button>

              {/* Origin Marker Badge */}
              <div className="hidden xl:flex items-center text-[11px] tracking-[0.18em] uppercase text-morphia-muted font-light">
                <MapPin className="w-3.5 h-3.5 mr-1 text-morphia-gold" />
                <span>Cusco, PE</span>
              </div>

              {/* Cart Icon Button with Architectural Micro-Badge */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative p-2.5 border border-morphia-beige/80 bg-white/80 hover:bg-white text-morphia-dark shadow-sm transition-all focus:outline-none"
                aria-label={`Bolsa de compras con ${cartCount} artículos`}
              >
                <ShoppingBag className="w-4 h-4 text-morphia-dark" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-morphia-dark text-morphia-cream text-[9px] font-mono font-medium px-1.5 py-0.5 border border-morphia-cream tabular-nums shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-morphia-beige/60 bg-morphia-cream/95 backdrop-blur-xl px-6 pt-5 pb-8 space-y-4 shadow-lg animate-in fade-in duration-200">
            <div className="space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-[0.22em] font-medium text-morphia-dark hover:text-morphia-muted py-2.5 border-b border-morphia-beige/40"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-morphia-muted" />
                </button>
              ))}
            </div>

            <div className="pt-3 flex flex-col gap-3">
              <button
                onClick={() => {
                  if (onSelectFilter) onSelectFilter('PLATA');
                  handleLinkClick('#catalogo');
                }}
                className="w-full text-center py-3 px-4 text-xs uppercase tracking-[0.2em] font-medium border border-morphia-dark bg-morphia-dark text-morphia-cream shadow-sm"
              >
                Explorar Anillos Plata 950
              </button>

              <div className="text-center pt-2 text-[11px] uppercase tracking-[0.18em] text-morphia-muted flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-morphia-gold" />
                <span>Hecho a mano en Cusco, Perú</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
