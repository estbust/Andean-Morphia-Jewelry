import { Sun, Moon, Compass, Sparkles } from 'lucide-react';
import logoWings from '../../assets/brand/logo-wings.svg';
import minimalistLogo from '../../assets/brand/minimalist-logo.svg';

export default function ManifestoSection() {
  return (
    <section id="manifiesto" className="py-24 sm:py-32 bg-morphia-beige/35 border-y border-morphia-beige/60 relative overflow-hidden">
      {/* Subtle Atmosphere */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-morphia-blue/15 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Introduction */}
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs tracking-[0.28em] uppercase font-medium text-morphia-muted border-b border-morphia-gold/40 pb-1.5">
            <img
              src={minimalistLogo}
              alt=""
              className="w-4 h-3.5 opacity-80"
            />
            <span>El Manifiesto de Andean Morphia</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-morphia-dark leading-[1.18] font-normal">
            Donde la nobleza andina se funde con el arte de renacer
          </h2>

          <div className="pt-2">
            <p className="font-serif italic text-xl sm:text-2xl text-morphia-dark/90 leading-relaxed font-normal max-w-2xl mx-auto">
              &ldquo;La transformación no es perder lo que fuiste, sino tener el coraje de volver a brillar en tu versión más libre y soberana.&rdquo;
            </p>
          </div>
        </div>

        {/* Asymmetric Editorial Pillars Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Featured Hero Pillar (5 Cols): The Morphia Metamorphosis & Wings Monogram */}
          <div className="lg:col-span-5 bg-white border border-morphia-beige/80 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-sm group">
            {/* Architectural Top Index */}
            <div className="flex items-center justify-between pb-4 border-b border-morphia-beige/40">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-morphia-muted font-medium">
                Pilar I · Filosofía
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-morphia-gold">
                Metamorfosis
              </span>
            </div>

            {/* Central Visual Monogram Display */}
            <div className="my-8 py-6 px-4 bg-morphia-cream/30 border border-morphia-beige/50 text-center relative">
              <img
                src={logoWings}
                alt="Alas Andean Morphia"
                className="w-44 sm:w-52 h-auto mx-auto filter drop-shadow-sm group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <span className="block mt-4 text-[9px] uppercase tracking-[0.25em] font-medium text-morphia-muted">
                Sello Emblemático Morphia
              </span>
            </div>

            {/* Pillar Content */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-morphia-dark">
                <Compass className="w-4 h-4 text-morphia-gold" />
                <h3 className="font-serif text-2xl text-morphia-dark font-normal">
                  El Vuelo de la Morphia
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-morphia-muted leading-relaxed font-light">
                La mariposa Morphia azul habita los bosques nubosos andino-amazónicos del Cusco. Su ciclo vital nos recuerda que la crisálida no es un encierro, sino la antesala obligada del despertar hacia tu propia luminosidad.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-morphia-beige/40 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-medium text-morphia-dark">
              <span>Renovación & Libertad</span>
              <Sparkles className="w-3 h-3 text-morphia-gold" />
            </div>
          </div>

          {/* Staggered Companion Pillars (7 Cols): Ancestral Craft & Lunar Silver */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            
            {/* Companion Pillar 2: Ancestral Cusco Goldsmithing */}
            <div className="bg-white border border-morphia-beige/80 p-8 sm:p-10 flex-1 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-morphia-beige/40 mb-5">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-morphia-muted font-medium">
                    Pilar II · Proveniencia
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-morphia-gold">
                    Cusco Imperial
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-morphia-beige/50 text-morphia-dark flex items-center justify-center">
                      <Sun className="w-4 h-4 text-morphia-gold" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-morphia-dark font-normal">
                      Orfebrería Ancestral Cusqueña
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-morphia-muted leading-relaxed font-light">
                    Cusco no es únicamente nuestra cuna, es la raíz viva de un linaje de maestros plateros que honran los metales nobles con respeto y devoción. Cada anillo nace de manos artesanas que funden, cincelan y bruñen el metal con paciencia y maestría milenaria.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-morphia-beige/40 text-[10px] uppercase tracking-[0.2em] font-medium text-morphia-dark">
                Hecho a Mano en Talleres Tradicionales del Valle Sagrado
              </div>
            </div>

            {/* Companion Pillar 3: Silver 950 - Lunar Metal */}
            <div className="bg-white border border-morphia-beige/80 p-8 sm:p-10 flex-1 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-morphia-beige/40 mb-5">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-morphia-muted font-medium">
                    Pilar III · Alquimia
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-morphia-silver">
                    Qollqe · Mama Killa
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-morphia-silver/15 text-morphia-dark flex items-center justify-center">
                      <Moon className="w-4 h-4 text-morphia-silver" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-morphia-dark font-normal">
                      Plata 950: El Metal Lunar
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-morphia-muted leading-relaxed font-light">
                    Elegimos con firmeza la ley 950 por su blancura resplandeciente, tacto noble y pureza inalterable. En la cosmovisión andina, la plata (Qollqe) es la manifestación de Mama Killa, deidad protectora de las transiciones, el alma y los ciclos de renovación interior.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-morphia-beige/40 text-[10px] uppercase tracking-[0.2em] font-medium text-morphia-dark">
                Pureza 95% Garantizada · Protección & Trascendencia
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
