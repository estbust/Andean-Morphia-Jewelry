import { Gift, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import minimalistLogo from '../../assets/brand/minimalist-logo.svg';

export default function PackagingSection() {
  const packagingSteps = [
    {
      number: '01',
      title: 'Estuche de Gamuza Celeste',
      subtitle: 'El Nido de Protección',
      description:
        'Confeccionado en gamuza suave con el tono azul celeste característico de la mariposa Morphia. Preserva el fulgor de la plata de roces y humedad ambiental.',
      badge: 'Gamuza Morphia',
    },
    {
      number: '02',
      title: 'Bolsa de Organza Traslúcida',
      subtitle: 'La Ligereza de las Alas',
      description:
        'Envuelve el estuche como un capullo etéreo, lista para ser entregada como obsequio personal o para quien inicia un nuevo ciclo vital.',
      badge: 'Presentación',
    },
    {
      number: '03',
      title: 'Tarjeta de Agradecimiento',
      subtitle: 'Sabiduría & Pautas de Cuidado',
      description:
        'Lleva el mensaje de bendición desde Cusco y la guía precisa para preservar la blancura y fulgor de tu Plata 950 a través de los años.',
      badge: 'Certificado',
    },
    {
      number: '04',
      title: 'Paño de Pulido Especial',
      subtitle: 'El Fulgor Renovado',
      description:
        'Tratado con microagentes abrillantadores no abrasivos para mantener el brillo espejo de la plata con delicadeza en tu hogar.',
      badge: 'Mantenimiento',
    },
  ];

  return (
    <section id="packaging" className="py-24 sm:py-32 bg-morphia-cream relative overflow-hidden">
      {/* Soft Blue Atmospheric Accent */}
      <div 
        className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-morphia-blue/20 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs tracking-[0.28em] uppercase font-medium text-morphia-muted border-b border-morphia-gold/40 pb-1.5">
            <Gift className="w-3.5 h-3.5 text-morphia-gold" />
            <span>El Ritual de Desempaque · Cortesía Morphia</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-morphia-dark leading-tight font-normal">
            Un ritual sagrado al descubrir tu joya
          </h2>

          <p className="text-sm sm:text-base text-morphia-muted font-light leading-relaxed max-w-2xl mx-auto">
            Recibir una pieza Andean Morphia es un acontecimiento sensorial. Cada amuleto parte desde nuestro taller en Cusco resguardado en un empaque diseñado para honrar su significado desde el primer contacto.
          </p>
        </div>

        {/* 4 Numbered Atelier Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {packagingSteps.map((step) => (
            <div
              key={step.number}
              className="bg-white p-7 sm:p-8 border border-morphia-beige/70 flex flex-col justify-between group hover:border-morphia-dark/40 hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Step Chapter Number & Delicate Badge */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-morphia-beige/40">
                  <span className="font-serif text-3xl sm:text-4xl text-morphia-gold font-normal tabular-nums">
                    {step.number}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-morphia-muted border border-morphia-beige/80 px-2 py-0.5 bg-morphia-cream/30">
                    {step.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-serif text-xl text-morphia-dark font-normal">
                  {step.title}
                </h3>
                <span className="text-[11px] text-morphia-gold font-medium block mt-1 tracking-wide">
                  {step.subtitle}
                </span>

                {/* Description */}
                <p className="text-xs text-morphia-muted mt-3 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              {/* Bottom Subtle Chapter Guarantee */}
              <div className="mt-8 pt-4 border-t border-morphia-beige/40 flex items-center justify-between text-[10px] text-morphia-muted uppercase tracking-wider">
                <span>Incluido con cada joya</span>
                <Sparkles className="w-3 h-3 text-morphia-gold" />
              </div>
            </div>
          ))}
        </div>

        {/* Cusco Provenance Section (Understated Luxury #1E1E1C with Gold Hairline Details) */}
        <div id="cusco" className="mt-20 border border-morphia-gold/30 bg-morphia-dark text-morphia-cream p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-morphia-gold font-semibold border-b border-morphia-gold/40 pb-1">
              <span>De Cusco para el Mundo · Proveniencia Sagrada</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-snug font-normal text-morphia-white">
              Despachos directos desde la Ciudad Imperial
            </h3>

            <p className="text-xs sm:text-sm text-morphia-cream/80 leading-relaxed font-light">
              Nuestras piezas son inspeccionadas y empacadas individualmente en nuestro taller cusqueño. Cada envío viaja con sello de autenticidad y código de seguimiento para que acompañes tu amuleto en su trayecto hacia cualquier destino del Perú.
            </p>

            <div className="pt-3 flex flex-wrap gap-4 text-xs">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-white/20 bg-white/[0.04] text-[11px] tracking-wider uppercase text-morphia-cream font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-morphia-gold" />
                <span>Envíos Seguros por Olva Courier & Shalom</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-white/20 bg-white/[0.04] text-[11px] tracking-wider uppercase text-morphia-cream font-light">
                <Heart className="w-3.5 h-3.5 text-morphia-gold" />
                <span>Presentación 100% Lista para Obsequio</span>
              </div>
            </div>
          </div>

          <div className="absolute right-6 bottom-6 w-44 h-36 opacity-10 pointer-events-none hidden sm:block">
            <img src={minimalistLogo} alt="" className="w-full h-full filter invert" />
          </div>
        </div>

      </div>
    </section>
  );
}
