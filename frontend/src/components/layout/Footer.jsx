import { Mail, MapPin, Sparkles, Heart, ShieldCheck, Gift } from 'lucide-react';
import mainLogo from '../../assets/brand/main-logo.svg';
import minimalistLogo from '../../assets/brand/minimalist-logo.svg';

export default function Footer() {
  return (
    <footer className="bg-morphia-dark text-morphia-cream pt-20 pb-12 border-t border-morphia-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Manifesto Snippet (Maison Colophon) */}
        <div className="text-center max-w-2xl mx-auto pb-14 border-b border-white/10">
          <div className="flex justify-center mb-5">
            <img
              src={minimalistLogo}
              alt="Morphia butterfly seal"
              className="w-9 h-7 opacity-75 filter invert"
            />
          </div>
          <p className="font-serif italic text-2xl sm:text-3xl text-morphia-beige mb-3 tracking-wide font-normal">
            &ldquo;La transformación es el arte de volver a brillar&rdquo;
          </p>
          <p className="text-[10px] sm:text-xs text-morphia-cream/60 tracking-[0.25em] uppercase font-light">
            Joyería con alma nacida en las alturas sagradas del Cusco, Perú
          </p>
        </div>

        {/* Value Proposition Atelier Markers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-b border-white/10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 p-5 bg-white/[0.02] border border-white/10">
            <div className="p-2.5 border border-morphia-gold/40 text-morphia-gold shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-morphia-white">
                Plata 950 Cusqueña
              </h3>
              <p className="text-xs text-morphia-cream/70 mt-1 font-light leading-relaxed">
                Alta pureza garantizada trabajada a mano por maestros orfebres.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-5 bg-white/[0.02] border border-white/10">
            <div className="p-2.5 border border-morphia-blue/40 text-morphia-blue shrink-0">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-morphia-white">
                Packaging Celestial Morphia
              </h3>
              <p className="text-xs text-morphia-cream/70 mt-1 font-light leading-relaxed">
                Estuche de gamuza celeste + organza + guía de cuidado incluida.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-5 bg-white/[0.02] border border-white/10">
            <div className="p-2.5 border border-morphia-beige/40 text-morphia-beige shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-morphia-white">
                Envíos Seguros a Todo el Perú
              </h3>
              <p className="text-xs text-morphia-cream/70 mt-1 font-light leading-relaxed">
                Despachos rastreados directamente desde el taller en Cusco.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Columns Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-14">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <img
              src={mainLogo}
              alt="Andean Morphia Jewelry"
              className="h-12 w-auto filter invert brightness-95 mb-3"
            />
            <p className="text-xs text-morphia-cream/75 leading-relaxed font-light">
              Inspirados en la metamorfosis de la mariposa Morphia y la nobleza de los Andes, creamos piezas de autor que celebran tu renacer personal y soberanía interior.
            </p>
            <div className="flex items-center gap-2 text-xs text-morphia-gold pt-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[11px] tracking-wider uppercase font-light">Cusco — Valle Sagrado, PE</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.22em] font-semibold text-morphia-beige mb-4 pb-1 border-b border-white/10">
              Navegación Atelier
            </h4>
            <ul className="space-y-2.5 text-xs text-morphia-cream/80 font-light">
              <li>
                <a href="#catalogo" className="hover:text-morphia-gold transition-colors block py-0.5">
                  Colección de Anillos
                </a>
              </li>
              <li>
                <a href="#manifiesto" className="hover:text-morphia-gold transition-colors block py-0.5">
                  El Manifiesto & Simbolismo
                </a>
              </li>
              <li>
                <a href="#packaging" className="hover:text-morphia-gold transition-colors block py-0.5">
                  El Ritual de Desempaque
                </a>
              </li>
              <li>
                <a href="#cusco" className="hover:text-morphia-gold transition-colors block py-0.5">
                  Origen & Tradición Cusqueña
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Packaging Promise */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.22em] font-semibold text-morphia-beige mb-4 pb-1 border-b border-white/10">
              Promesa de Calidad
            </h4>
            <ul className="space-y-2.5 text-xs text-morphia-cream/80 font-light">
              <li className="flex items-start gap-2">
                <span className="text-morphia-gold text-[10px]">◆</span>
                <span>Plata 950 ley genuina pulida a mano</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-morphia-gold text-[10px]">◆</span>
                <span>Estuche de gamuza celeste en cada joya</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-morphia-gold text-[10px]">◆</span>
                <span>Guía de preservación y paño especial</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-morphia-gold text-[10px]">◆</span>
                <span>Garantía de artesanía orfebre cusqueña</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.22em] font-semibold text-morphia-beige mb-4 pb-1 border-b border-white/10">
              Contacto & Redes Oficiales
            </h4>
            <p className="text-xs text-morphia-cream/75 font-light">
              Atención personalizada y consultas de tallas de anillos:
            </p>
            <div className="space-y-2 text-xs">
              <a
                href="mailto:andeanmorphiajewelry@gmail.com"
                className="flex items-center gap-2 text-morphia-cream hover:text-morphia-gold transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 text-morphia-gold transition-transform group-hover:scale-110" />
                <span className="truncate font-light">andeanmorphiajewelry@gmail.com</span>
              </a>
            </div>

            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-morphia-cream/60 block mb-3 font-light">
                Comunidad Andean Morphia:
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://instagram.com/andeanmorphia.jewelry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-white/20 hover:border-morphia-gold text-morphia-cream hover:text-morphia-gold transition-all flex items-center justify-center"
                  aria-label="Instagram @andeanmorphia.jewelry"
                  title="Instagram: @andeanmorphia.jewelry"
                >
                  <svg className="w-4 h-4 fill-none stroke-currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://tiktok.com/@andeanmorphia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-white/20 hover:border-morphia-gold text-morphia-cream hover:text-morphia-gold text-[11px] font-medium tracking-wider uppercase transition-all"
                  aria-label="TikTok @andeanmorphia"
                  title="TikTok: @andeanmorphia"
                >
                  TikTok
                </a>
                <a
                  href="https://facebook.com/andeanmorphia.jewelry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-white/20 hover:border-morphia-gold text-morphia-cream hover:text-morphia-gold text-[11px] font-medium tracking-wider uppercase transition-all"
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
        <div className="pt-8 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-morphia-cream/60 gap-4 font-light">
          <p>© 2026 Andean Morphia Jewelry. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1.5 text-[11px] tracking-wider uppercase">
            <span>Hecho con devoción y orgullo artesanal en Cusco, Perú</span>
            <Heart className="w-3 h-3 text-morphia-gold fill-morphia-gold inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
