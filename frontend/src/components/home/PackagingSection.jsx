import { Gift, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import minimalistLogo from '../../assets/brand/minimalist-logo.svg';

export default function PackagingSection() {
  const packagingSteps = [
    {
      number: '01',
      title: 'Estuche de Gamuza Celeste',
      subtitle: 'El nido de protección',
      description:
        'Confeccionado en gamuza suave con el tono azul pastel característico de la mariposa Morphia. Protege el brillo de la plata de roces y humedad.',
      badge: 'Gamuza Morphia',
    },
    {
      number: '02',
      title: 'Bolsa de Organza Traslúcida',
      subtitle: 'La ligereza de las alas',
      description:
        'Envuelve el estuche como un capullo etéreo, lista para ser entregada como regalo personal o para esa persona especial que está transitando una nueva etapa.',
      badge: 'Detalle de Regalo',
    },
    {
      number: '03',
      title: 'Tarjeta de Agradecimiento & Cuidado',
      subtitle: 'Sabiduría para tu joya',
      description:
        'Incluye el mensaje de bendición desde Cusco y las pautas precisas para preservar la blancura y fulgor de tu Plata 950 por generaciones.',
      badge: 'Guía de Mantenimiento',
    },
    {
      number: '04',
      title: 'Paño de Pulido Especial',
      subtitle: 'El fulgor renovado',
      description:
        'Tratado con microagentes abrillantadores no abrasivos para revivir el brillo de la plata cuando lo desees en la comodidad de tu hogar.',
      badge: 'Cuidado Permanente',
    },
  ];

  return (
    <section id="packaging" className="py-24 sm:py-32 bg-morphia-cream relative overflow-hidden">
      {/* Soft Blue Atmospheric Accent */}
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-morphia-blue/30 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-morphia-blue/20 border border-morphia-blue/50 text-xs tracking-widest uppercase font-semibold text-morphia-dark">
            <Gift className="w-3.5 h-3.5 text-morphia-dark" />
            <span>Experiencia de Desempaque</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-morphia-dark leading-tight">
            Un ritual de transformación al abrir tu joya
          </h2>

          <p className="text-sm sm:text-base text-morphia-muted font-light leading-relaxed">
            Creemos que recibir una joya debe sentirse como un momento sagrado. Cada pieza Andean Morphia parte desde Cusco en un packaging pensado para enamorar tus sentidos desde el primer instante.
          </p>
        </div>

        {/* Visual Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {packagingSteps.map((step) => (
            <div
              key={step.number}
              className="bg-morphia-white rounded-3xl p-6 sm:p-8 border border-morphia-beige/70 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Step Number & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-2xl text-morphia-gold font-medium">
                    {step.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-morphia-cream border border-morphia-beige text-morphia-muted">
                    {step.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-serif text-xl text-morphia-dark group-hover:text-morphia-dark/80 transition-colors">
                  {step.title}
                </h3>
                <span className="text-xs text-morphia-gold font-medium block mt-1 tracking-wide">
                  {step.subtitle}
                </span>

                {/* Description */}
                <p className="text-xs text-morphia-muted mt-3 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              {/* Bottom Subtle Guarantee */}
              <div className="mt-8 pt-4 border-t border-morphia-beige/40 flex items-center gap-1.5 text-[11px] text-morphia-muted">
                <Sparkles className="w-3 h-3 text-morphia-gold shrink-0" />
                <span>Incluido sin costo adicional</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cusco Origin Highlight Strip */}
        <div id="cusco" className="mt-20 rounded-3xl bg-morphia-dark text-morphia-cream p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-morphia-gold font-semibold">
              De Cusco para el Mundo
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-snug">
              Despachos directos desde la Ciudad Imperial
            </h3>
            <p className="text-xs sm:text-sm text-morphia-cream/80 leading-relaxed font-light">
              Nuestras joyas son empacadas cuidadosamente en nuestro taller cusqueño. Cada envío incluye sello de autenticidad y código de seguimiento para que acompañes tu pedido en su viaje hasta tus manos en cualquier rincón del Perú.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-morphia-cream">
                <ShieldCheck className="w-4 h-4 text-morphia-gold" />
                Envíos por Olva Courier & Shalom
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-morphia-cream">
                <Heart className="w-4 h-4 text-morphia-gold" />
                Empaque 100% listo para obsequio
              </span>
            </div>
          </div>

          <div className="absolute right-4 bottom-4 w-40 h-32 opacity-10 pointer-events-none hidden sm:block">
            <img src={minimalistLogo} alt="" className="w-full h-full filter invert" />
          </div>
        </div>

      </div>
    </section>
  );
}
