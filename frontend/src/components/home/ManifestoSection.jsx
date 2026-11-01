import { Sun, Moon, Compass } from 'lucide-react';
import logoWings from '../../assets/brand/logo-wings.svg';
import minimalistLogo from '../../assets/brand/minimalist-logo.svg';

export default function ManifestoSection() {
  return (
    <section id="manifiesto" className="py-24 sm:py-32 bg-morphia-beige/40 border-y border-morphia-beige/60 relative overflow-hidden">
      {/* Subtle Wing Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-morphia-blue/20 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Introduction */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-morphia-white/80 border border-morphia-beige/70 shadow-sm mb-2">
            <img
              src={minimalistLogo}
              alt="Morphia butterfly seal"
              className="w-8 h-6 text-morphia-dark"
            />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-morphia-muted block">
            El Manifiesto de Andean Morphia
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-morphia-dark leading-tight">
            Donde la nobleza andina se funde con el arte de renacer
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-morphia-dark/90 leading-relaxed">
            &ldquo;La transformación no es perder lo que fuiste, sino tener el coraje de volver a brillar en tu versión más libre y soberana.&rdquo;
          </p>
        </div>

        {/* Central Visual Wing Monogram */}
        <div className="my-16 flex justify-center">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-morphia-white/70 border border-morphia-beige/80 shadow-md backdrop-blur-sm max-w-xl w-full text-center">
            <img
              src={logoWings}
              alt="Andean Morphia Wings Monogram"
              className="w-48 sm:w-64 h-auto mx-auto filter drop-shadow-sm text-morphia-dark"
            />
            <p className="mt-4 text-xs tracking-widest uppercase font-semibold text-morphia-muted">
              Símbolo de Metamorfosis & Origen Cusqueño
            </p>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Morphia */}
          <div className="bg-morphia-white/85 rounded-2xl p-8 border border-morphia-beige/70 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-morphia-blue/30 text-morphia-dark flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-morphia-dark">
                El Vuelo de la Morphia
              </h3>
              <p className="text-xs sm:text-sm text-morphia-muted leading-relaxed font-light">
                La mariposa Morphia azul habita los bosques nubosos andino-amazónicos de Cusco. Su ciclo nos enseña que el crisálido no es un encierro, sino la antesala del despertar hacia tu propia luminosidad.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-morphia-beige/40 text-[11px] uppercase tracking-wider font-semibold text-morphia-dark">
              Transformación & Libertad
            </div>
          </div>

          {/* Pillar 2: Andes Heritage */}
          <div className="bg-morphia-white/85 rounded-2xl p-8 border border-morphia-beige/70 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-morphia-beige text-morphia-dark flex items-center justify-center">
                <Sun className="w-5 h-5 text-morphia-gold" />
              </div>
              <h3 className="font-serif text-xl text-morphia-dark">
                Orfebrería Ancestral Cusqueña
              </h3>
              <p className="text-xs sm:text-sm text-morphia-muted leading-relaxed font-light">
                Cusco no es solo nuestro hogar, es la raíz de un linaje de orfebres que honran los metales nobles con respeto y devoción. Cada anillo nace de manos artesanas que funden, cincelan y pulen con paciencia ancestral.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-morphia-beige/40 text-[11px] uppercase tracking-wider font-semibold text-morphia-dark">
              Hecho a Mano en Cusco
            </div>
          </div>

          {/* Pillar 3: Silver 950 */}
          <div className="bg-morphia-white/85 rounded-2xl p-8 border border-morphia-beige/70 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-morphia-silver/20 text-morphia-dark flex items-center justify-center">
                <Moon className="w-5 h-5 text-morphia-silver" />
              </div>
              <h3 className="font-serif text-xl text-morphia-dark">
                Plata 950: El Metal Lunar
              </h3>
              <p className="text-xs sm:text-sm text-morphia-muted leading-relaxed font-light">
                Elegimos la ley 950 por su blancura resplandeciente y autenticidad. En la cosmología andina, la plata (Qollqe) es la manifestación de Mama Killa, protectora de las transiciones y los ciclos del corazón.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-morphia-beige/40 text-[11px] uppercase tracking-wider font-semibold text-morphia-dark">
              Pureza & Protección Energética
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
