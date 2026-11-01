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
      {/* Subtle Ambient Glow Circles */}
      <div 
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-morphia-blue/30 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true"
      />
      <div 
        className="absolute -top-24 right-10 w-96 h-96 bg-morphia-beige/40 rounded-full blur-2xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Story & Call To Action */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8">
            
            {/* Top Brand Badges */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-morphia-beige bg-morphia-white/80 shadow-sm text-xs tracking-widest uppercase text-morphia-dark">
              <span className="w-2 h-2 rounded-full bg-morphia-gold animate-ping"></span>
              <span className="font-semibold text-morphia-dark">Plata 950 Cusqueña</span>
              <span className="text-morphia-muted">·</span>
              <span className="text-morphia-muted">Hecho a Mano</span>
            </div>

            {/* Main Title in DM Serif Display */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-morphia-dark leading-[1.15] tracking-tight">
              Joyas que nos recuerdan la{' '}
              <span className="relative inline-block text-morphia-dark">
                belleza de renacer
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-morphia-blue/70"
                  viewBox="0 0 250 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C60 3 190 3 247 9"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle with Ancestral Cusco Craftsmanship & Morphia Butterfly */}
            <p className="text-base sm:text-lg text-morphia-muted max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Forjadas en el corazón sagrado del Cusco, cada una de nuestras piezas fusiona la milenaria tradición de la orfebrería andina con la sabiduría de la mariposa Morphia. Amuletos atemporales que celebran tu transformación personal.
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                type="button"
                onClick={handleScrollToCatalog}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-morphia-dark text-morphia-cream hover:bg-morphia-dark/90 hover:text-morphia-white text-xs sm:text-sm uppercase tracking-[0.2em] font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-morphia-gold"
              >
                <span>Explorar Colección de Anillos</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <button
                type="button"
                onClick={handleScrollToManifesto}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-morphia-beige hover:border-morphia-dark/40 bg-morphia-white/60 hover:bg-morphia-white text-morphia-dark text-xs sm:text-sm uppercase tracking-[0.15em] font-medium transition-all"
              >
                <span>Conocer el Manifiesto</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-6 border-t border-morphia-beige/40 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="block font-serif text-lg sm:text-xl text-morphia-dark">100%</span>
                <span className="text-[11px] uppercase tracking-wider text-morphia-muted">Plata 950 Ley</span>
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-xl text-morphia-dark">Cusco</span>
                <span className="text-[11px] uppercase tracking-wider text-morphia-muted">Origen Ancestral</span>
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-xl text-morphia-dark">Gamuza</span>
                <span className="text-[11px] uppercase tracking-wider text-morphia-muted">Estuche Incluido</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer Decorative Frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-morphia-blue/40 via-morphia-beige/60 to-white/80 blur-xl opacity-70 -z-10" />

              {/* Main Ring Showcase Container */}
              <div className="bg-morphia-white rounded-3xl p-6 sm:p-8 border border-morphia-beige/70 shadow-lg relative overflow-hidden group">
                
                {/* Subtle Background Watermark Wings */}
                <div className="absolute top-2 right-2 w-32 h-32 opacity-10 pointer-events-none">
                  <img src={logoWings} alt="" className="w-full h-full object-contain" />
                </div>

                {/* Top Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-morphia-beige/30">
                  <div className="flex items-center gap-2">
                    <img src={minimalistLogo} alt="" className="w-5 h-4 opacity-75" />
                    <span className="text-[11px] uppercase tracking-widest font-semibold text-morphia-muted">
                      Pieza Icónica
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-morphia-blue/30 text-morphia-dark text-[10px] font-semibold tracking-wider uppercase">
                    Plata 950
                  </span>
                </div>

                {/* Featured Ring Photo with smooth zoom */}
                <div className="my-6 aspect-square w-full rounded-2xl bg-morphia-white flex items-center justify-center p-4 overflow-hidden relative">
                  <img
                    src="/products/two-headed-snake-ring.png"
                    alt="Anillo dos cabezas de serpiente - Plata 950"
                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute bottom-3 right-3 bg-morphia-cream/90 backdrop-blur-sm border border-morphia-beige/60 px-3 py-1 rounded-full text-xs font-semibold text-morphia-dark shadow-sm">
                    S/ 128.00 PEN
                  </div>
                </div>

                {/* Product Teaser Info */}
                <div className="space-y-2">
                  <h3 className="font-serif text-xl text-morphia-dark">
                    Anillo dos cabezas de serpiente
                  </h3>
                  <p className="text-xs text-morphia-muted italic leading-relaxed">
                    &ldquo;Inspirado en la sabiduría ancestral andina (Amaru), simboliza la dualidad y el cambio de piel para renacer.&rdquo;
                  </p>
                </div>

                {/* Unboxing Micro Tag */}
                <div className="mt-4 pt-3 border-t border-morphia-beige/30 flex items-center justify-between text-xs text-morphia-dark">
                  <span className="flex items-center gap-1.5 text-morphia-muted">
                    <Sparkles className="w-3.5 h-3.5 text-morphia-gold" />
                    <span>Estuche gamuza celeste de regalo</span>
                  </span>
                  <button
                    onClick={handleScrollToCatalog}
                    className="text-xs font-semibold uppercase tracking-wider text-morphia-dark hover:text-morphia-gold transition-colors"
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
