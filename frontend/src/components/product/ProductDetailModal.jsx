import { useEffect, useState } from 'react';
import { X, Sparkles, Feather, ShieldCheck, Check, ShoppingBag, Gift } from 'lucide-react';
import logoWings from '../../assets/brand/logo-wings.svg';

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  const [activeTab, setActiveTab] = useState('symbolism'); // 'symbolism' | 'technical' | 'packaging'
  const [added, setAdded] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Lock scroll on background
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!product) return null;

  const formattedPrice = Number(product.price).toFixed(2);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 bg-morphia-dark/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Container: High-Jewelry Exhibition Frame */}
      <div
        className="bg-morphia-cream max-w-4xl w-full border border-morphia-beige/80 shadow-2xl relative overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Architectural Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-morphia-white/90 hover:bg-morphia-white text-morphia-dark border border-morphia-beige/70 shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-morphia-dark"
          aria-label="Cerrar ventana de detalles"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Clean White Exhibition Frame for Image */}
          <div className="md:col-span-6 bg-[#FFFFFF] p-8 sm:p-12 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-morphia-beige/60">
            {/* Subtle background decorative wings */}
            <div className="absolute top-4 left-4 w-28 h-28 opacity-10 pointer-events-none">
              <img src={logoWings} alt="" className="w-full h-full object-contain" />
            </div>

            <div className="relative w-full aspect-square max-w-[320px] flex items-center justify-center overflow-hidden">
              <img
                src={product.image_path}
                alt={product.name}
                style={{ clipPath: 'inset(2% 5% 2% 5%)' }}
                className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-700 hover:scale-105 [clip-path:inset(2%_5%_2%_5%)]"
              />
            </div>

            <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-semibold text-morphia-dark">
              <span className="px-2.5 py-1 border border-morphia-beige bg-morphia-cream/30">
                {product.metal_type === 'ORO' ? 'Oro Cusqueño' : 'Plata 950 Genuina'}
              </span>
              <span className="text-morphia-muted font-normal tracking-widest">
                Taller de Orfebrería Cusco
              </span>
            </div>
          </div>

          {/* Right Column: Editorial & Storytelling Details */}
          <div className="md:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 bg-morphia-cream/50">
            <div>
              {/* Product Header */}
              <div className="pr-8">
                <span className="text-[10px] uppercase tracking-[0.25em] text-morphia-gold font-semibold block mb-1.5">
                  Atelier Cusco · Colección 2026
                </span>
                <h2 id="modal-product-title" className="font-serif text-2xl sm:text-3xl text-morphia-dark leading-snug font-normal">
                  {product.name}
                </h2>
                <div className="mt-2.5 text-xl font-semibold text-morphia-dark tabular-nums tracking-wide">
                  S/ {formattedPrice} <span className="text-xs font-normal text-morphia-muted">PEN</span>
                </div>
              </div>

              {/* Tabs for Deep Content with Crisp Hairline Indicator */}
              <div className="mt-6 border-b border-morphia-beige/70 flex space-x-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('symbolism')}
                  className={`pb-2.5 text-[11px] uppercase tracking-[0.18em] font-medium transition-all relative ${
                    activeTab === 'symbolism'
                      ? 'text-morphia-dark font-semibold'
                      : 'text-morphia-muted hover:text-morphia-dark'
                  }`}
                >
                  Simbolismo Andino
                  {activeTab === 'symbolism' && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-morphia-dark" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('technical')}
                  className={`pb-2.5 text-[11px] uppercase tracking-[0.18em] font-medium transition-all relative ${
                    activeTab === 'technical'
                      ? 'text-morphia-dark font-semibold'
                      : 'text-morphia-muted hover:text-morphia-dark'
                  }`}
                >
                  Ficha Técnica
                  {activeTab === 'technical' && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-morphia-dark" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('packaging')}
                  className={`pb-2.5 text-[11px] uppercase tracking-[0.18em] font-medium transition-all relative ${
                    activeTab === 'packaging'
                      ? 'text-morphia-dark font-semibold'
                      : 'text-morphia-muted hover:text-morphia-dark'
                  }`}
                >
                  Packaging Incluido
                  {activeTab === 'packaging' && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-morphia-dark" />
                  )}
                </button>
              </div>

              {/* Tab Content Display */}
              <div className="mt-5 min-h-[150px]">
                {activeTab === 'symbolism' && (
                  <div className="space-y-3.5 animate-in fade-in duration-150">
                    <div className="p-4 bg-white border border-morphia-beige/70">
                      <div className="flex items-center gap-1.5 text-morphia-gold mb-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
                          Significado & Metamorfosis
                        </span>
                      </div>
                      <p className="font-serif italic text-sm sm:text-base text-morphia-dark leading-relaxed font-normal">
                        &ldquo;{product.symbolic_meaning}&rdquo;
                      </p>
                    </div>
                    <p className="text-xs text-morphia-muted leading-relaxed font-light">
                      {product.short_description}
                    </p>
                  </div>
                )}

                {activeTab === 'technical' && (
                  <div className="space-y-3 text-xs leading-relaxed animate-in fade-in duration-150">
                    <div className="p-4 bg-white border border-morphia-beige/70 space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-morphia-gold shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-morphia-dark block uppercase tracking-wider text-[10px]">Pureza del Metal:</strong>
                          <span className="text-morphia-muted font-light">
                            Plata 950 ley garantizada (95% plata pura y 5% aleación para dureza y brillo óptimo).
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Feather className="w-4 h-4 text-morphia-silver shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-morphia-dark block uppercase tracking-wider text-[10px]">Taller & Acabado:</strong>
                          <span className="text-morphia-muted font-light">
                            {product.technical_details}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-morphia-muted italic font-light">
                      ✦ Cada anillo es forjado a mano; sutiles marcas de cincel acreditan su autenticidad artesanal cusqueña.
                    </p>
                  </div>
                )}

                {activeTab === 'packaging' && (
                  <div className="space-y-3 text-xs animate-in fade-in duration-150">
                    <div className="p-4 bg-white border border-morphia-beige/70 space-y-2.5">
                      <div className="flex items-center gap-2 text-morphia-dark font-medium uppercase tracking-wider text-[10px]">
                        <Gift className="w-4 h-4 text-morphia-gold" />
                        <span>Experiencia de Desempaque Morphia:</span>
                      </div>
                      <ul className="space-y-2 text-morphia-muted font-light pl-0.5">
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-morphia-gold shrink-0 mt-0.5" />
                          <span><strong className="font-medium text-morphia-dark">Estuche de gamuza celeste:</strong> protege el fulgor y la energía de la joya.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-morphia-gold shrink-0 mt-0.5" />
                          <span><strong className="font-medium text-morphia-dark">Bolsa de organza traslúcida:</strong> presentación etérea inspirada en alas de mariposa.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-morphia-gold shrink-0 mt-0.5" />
                          <span><strong className="font-medium text-morphia-dark">Tarjeta de cuidado & agradecimiento:</strong> bendición desde Cusco y pautas de preservación.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Single-Line Architectural Actions */}
            <div className="pt-4 border-t border-morphia-beige/70 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className={`whitespace-nowrap px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm border ${
                  added
                    ? 'bg-green-800 text-white border-green-800'
                    : 'bg-morphia-dark text-morphia-cream hover:bg-morphia-dark/90 hover:text-morphia-white border-morphia-dark'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Agregado a tu Bolsa!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adquirir Pieza · S/ {formattedPrice} PEN</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="whitespace-nowrap px-6 py-4 border border-morphia-beige hover:border-morphia-dark bg-white hover:bg-morphia-cream/50 text-morphia-dark text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 text-center"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
