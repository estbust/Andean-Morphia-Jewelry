import { ArrowDown, Sparkles } from 'lucide-react';
import logoWings from '../../assets/brand/logo-wings.svg';
import minimalistLogo from '../../assets/brand/minimalist-logo.svg';

export default function HeroSection({ onExploreClick }) {
  const handleScrollToCatalog = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('catalogo');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToManifesto = () => {
    const el = document.getElementById('manifiesto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-morphia-cream via-[#F8F2E4] to-[#F1E9D7]/60">
      {/* Subtle Ambient Atmosphere */}
      <div 
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-morphia-blue/20 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true"
      />
      <div 
        className="absolute -top-24 right-10 w-96 h-96 bg-morphia-beige/30 rounded-full blur-2xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Story & Call To Action */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8">
            
            {/* Top Atelier Micro-Typography */}
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs tracking-[0.28em] uppercase text-morphia-muted font-medium pb-2 border-b border-morphia-gold/40">
              <span className="text-morphia-dark font-semibold">Atelier Cusco</span>
              <span className="text-morphia-gold text-[8px]">◆</span>
              <span>Plata 950 Ley</span>
              <span className="text-morphia-gold text-[8px]">◆</span>
              <span>Piezas Artesanales</span>
            </div>

            {/* Main Title in DM Serif Display */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] text-morphia-dark leading-[1.12] tracking-tight font-normal">
              Joyas que nos recuerdan la{' '}
              <span className="font-serif italic font-normal text-morphia-dark">
                belleza de renacer
              </span>
            </h1>

            {/* Subtitle with Ancestral Cusco Craftsmanship & Morphia Butterfly */}
            <p className="text-sm sm:text-base text-morphia-muted max-w-xl mx-auto lg:mx-0 font-light leading-relaxed tracking-wide">
              Forjadas en el corazón sagrado del Cusco, cada una de nuestras piezas fusiona la milenaria orfebrería andina con la sabiduría de la mariposa Morphia. Amuletos atemporales que celebran tu metamorfosis personal.
            </p>

            {/* Call to Actions (Single line, architectural buttons) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
              <button
                type="button"
                onClick={handleScrollToCatalog}
                className="whitespace-nowrap px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium bg-morphia-dark text-morphia-cream hover:bg-morphia-dark/90 hover:text-morphia-white border border-morphia-dark shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>Explorar Colección de Anillos</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={handleScrollToManifesto}
                className="whitespace-nowrap px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium bg-morphia-white/80 hover:bg-morphia-white text-morphia-dark border border-morphia-beige hover:border-morphia-dark/40 shadow-sm transition-all duration-300 flex items-center justify-center"
              >
                <span>Conocer el Manifiesto</span>
              </button>
            </div>

            {/* Trust Points with Clean Hairlines */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-morphia-beige/60 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-morphia-dark font-normal">100%</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-morphia-muted font-medium block mt-0.5">Plata 950 Ley</span>
              </div>
              <div className="border-l border-morphia-beige/60 pl-4">
                <span className="block font-serif text-xl sm:text-2xl text-morphia-dark font-normal">Cusco</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-morphia-muted font-medium block mt-0.5">Origen Ancestral</span>
              </div>
              <div className="border-l border-morphia-beige/60 pl-4">
                <span className="block font-serif text-xl sm:text-2xl text-morphia-dark font-normal">Gamuza</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-morphia-muted font-medium block mt-0.5">Estuche Incluido</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer Subtle Frame Accent */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-morphia-blue/30 via-morphia-beige/40 to-white/70 blur-lg opacity-60 -z-10" />

              {/* Main Ring Showcase Container (Architectural Gallery Exhibition) */}
              <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-morphia-beige/80 shadow-xl relative overflow-hidden group">
                
                {/* Subtle Background Watermark Wings */}
                <div className="absolute top-3 right-3 w-32 h-32 opacity-10 pointer-events-none">
                  <img src={logoWings} alt="" className="w-full h-full object-contain" />
                </div>

                {/* Top Atelier Identification */}
                <div className="flex items-center justify-between pb-3.5 border-b border-morphia-beige/50">
                  <div className="flex items-center gap-2">
                    <img src={minimalistLogo} alt="" className="w-4 h-3.5 opacity-80" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-morphia-muted">
                      Pieza Icónica · Morphia
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-morphia-dark border border-morphia-beige px-2 py-0.5 bg-morphia-cream/40">
                    Plata 950
                  </span>
                </div>

                {/* Featured Ring Photo with CSS Crop to Eliminate Dark Canvas Edges */}
                <div className="my-6 aspect-square w-full bg-[#FFFFFF] flex items-center justify-center p-3 overflow-hidden relative">
                  <img
                    src="/products/two-headed-snake-ring.png"
                    alt="Anillo dos cabezas de serpiente - Plata 950"
                    style={{ clipPath: 'inset(2% 5% 2% 5%)' }}
                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-700 ease-out [clip-path:inset(2%_5%_2%_5%)]"
                  />
                  
                  {/* Clean Museum Gallery Plaque */}
                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm border border-morphia-beige/80 px-3 py-1.5 text-right shadow-sm">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-morphia-muted font-medium block leading-none mb-0.5">
                      Pieza de Autor
                    </span>
                    <span className="font-sans font-semibold text-xs tracking-wider text-morphia-dark tabular-nums">
                      S/ 128.00 <span className="text-[10px] font-normal text-morphia-muted">PEN</span>
                    </span>
                  </div>
                </div>

                {/* Product Teaser Info */}
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl text-morphia-dark font-normal">
                    Anillo dos cabezas de serpiente
                  </h3>
                  <p className="text-xs text-morphia-muted italic leading-relaxed font-light">
                    &ldquo;Inspirado en la sabiduría ancestral andina (Amaru), simboliza la dualidad y el cambio de piel para renacer.&rdquo;
                  </p>
                </div>

                {/* Unboxing Micro Tag & Atelier Action */}
                <div className="mt-5 pt-3.5 border-t border-morphia-beige/50 flex items-center justify-between text-xs text-morphia-dark">
                  <span className="flex items-center gap-1.5 text-morphia-muted text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-morphia-gold" />
                    <span>Estuche gamuza celeste incluido</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleScrollToCatalog}
                    className="text-[11px] font-medium uppercase tracking-[0.18em] text-morphia-dark hover:text-morphia-gold transition-colors underline-offset-4 hover:underline"
                  >
                    Ver Colección →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
