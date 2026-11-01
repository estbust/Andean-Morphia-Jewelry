import { Mail, MapPin, Sparkles, Heart, ShieldCheck, Gift } from 'lucide-react';
import mainLogo from '../../assets/brand/main-logo.svg';
import minimalistLogo from '../../assets/brand/minimalist-logo.svg';

export default function Footer() {
  return (
    <footer className="bg-morphia-dark text-morphia-cream pt-16 pb-12 border-t border-morphia-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Manifesto Snippet */}
        <div className="text-center max-w-2xl mx-auto pb-12 border-b border-morphia-muted/30">
          <div className="flex justify-center mb-4">
            <img
              src={minimalistLogo}
              alt="Morphia butterfly seal"
              className="w-10 h-8 opacity-80 filter invert"
            />
          </div>
          <p className="font-serif italic text-xl sm:text-2xl text-morphia-beige mb-3 tracking-wide">
            &ldquo;La transformación es el arte de volver a brillar&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-morphia-cream/70 tracking-widest uppercase">
            Joyería con alma nacida en las alturas sagradas de Cusco, Perú
          </p>
        </div>

        {/* Value Proposition Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-b border-morphia-muted/30 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="p-3 rounded-full bg-morphia-gold/15 text-morphia-gold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-morphia-white">
                Plata 950 Cusqueña
              </h3>
              <p className="text-xs text-morphia-cream/70 mt-0.5">
                Alta pureza garantizada trabajada por maestros orfebres.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="p-3 rounded-full bg-morphia-blue/15 text-morphia-blue">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-morphia-white">
                Packaging Celestial Morphia
              </h3>
              <p className="text-xs text-morphia-cream/70 mt-0.5">
                Estuche gamuza celeste + bolsa de organza + tarjeta de cuidado.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="p-3 rounded-full bg-morphia-beige/15 text-morphia-beige">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-morphia-white">
                Envíos Seguros a Todo el Perú
              </h3>
              <p className="text-xs text-morphia-cream/70 mt-0.5">
                Despachos rastreados desde la ciudad imperial de Cusco.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Columns Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <img
              src={mainLogo}
              alt="Andean Morphia Jewelry"
              className="h-14 w-auto filter invert brightness-95 mb-2"
            />
            <p className="text-xs text-morphia-cream/75 leading-relaxed">
              Inspirados en la metamorfosis de la mariposa Morphia y el legado de los Andes, creamos piezas que celebran tu renacer personal y autenticidad.
            </p>
            <div className="flex items-center gap-2 text-xs text-morphia-gold pt-1">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Cusco — Valle Sagrado, Perú</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-morphia-beige mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs text-morphia-cream/80">
              <li>
                <a href="#catalogo" className="hover:text-morphia-gold transition-colors">
                  Colección de Anillos
                </a>
              </li>
              <li>
                <a href="#manifiesto" className="hover:text-morphia-gold transition-colors">
                  El Manifiesto & Simbolismo
                </a>
              </li>
              <li>
                <a href="#packaging" className="hover:text-morphia-gold transition-colors">
                  Experiencia de Packaging
                </a>
              </li>
              <li>
                <a href="#cusco" className="hover:text-morphia-gold transition-colors">
                  Origen & Tradición Cusqueña
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Packaging Promise */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-morphia-beige mb-4">
              Promesa de Calidad
            </h4>
            <ul className="space-y-2.5 text-xs text-morphia-cream/80">
              <li className="flex items-start gap-2">
                <span className="text-morphia-gold font-bold">✓</span>
                <span>Plata 950 genuina pulida a mano</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-morphia-gold font-bold">✓</span>
                <span>Estuche de gamuza celeste incluido en cada pieza</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-morphia-gold font-bold">✓</span>
                <span>Guía de cuidado y paño protector</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-morphia-gold font-bold">✓</span>
                <span>Garantía de artesanía cusqueña</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-morphia-beige mb-4">
              Contacto & Redes Oficiales
            </h4>
            <p className="text-xs text-morphia-cream/75">
              Atención personalizada y consultas de tallas de anillos:
            </p>
            <div className="space-y-2 text-xs">
              <a
                href="mailto:andeanmorphiajewelry@gmail.com"
                className="flex items-center gap-2 text-morphia-cream hover:text-morphia-gold transition-colors group"
              >
                <Mail className="w-4 h-4 text-morphia-gold group-hover:scale-110 transition-transform" />
                <span className="truncate">andeanmorphiajewelry@gmail.com</span>
              </a>
            </div>

            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-morphia-cream/60 block mb-2">
                Síguenos en nuestras comunidades:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/andeanmorphia.jewelry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-morphia-cream hover:text-morphia-gold transition-all flex items-center justify-center"
                  aria-label="Instagram @andeanmorphia.jewelry"
                  title="Instagram: @andeanmorphia.jewelry"
                >
                  <svg className="w-4 h-4 fill-none stroke-currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://tiktok.com/@andeanmorphia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-morphia-cream hover:text-morphia-gold text-xs font-medium tracking-wider transition-all"
                  aria-label="TikTok @andeanmorphia"
                  title="TikTok: @andeanmorphia"
                >
                  TikTok
                </a>
                <a
                  href="https://facebook.com/andeanmorphia.jewelry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-morphia-cream hover:text-morphia-gold text-xs font-medium tracking-wider transition-all"
                  aria-label="Facebook @andeanmorphia.jewelry"
                  title="Facebook: @andeanmorphia.jewelry"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 mt-4 border-t border-morphia-muted/20 flex flex-col sm:flex-row items-center justify-between text-xs text-morphia-cream/60 gap-4">
          <p>© 2026 Andean Morphia Jewelry. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Hecho con devoción y orgullo artesanal en Cusco, Perú</span>
            <Heart className="w-3.5 h-3.5 text-morphia-gold fill-morphia-gold inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
