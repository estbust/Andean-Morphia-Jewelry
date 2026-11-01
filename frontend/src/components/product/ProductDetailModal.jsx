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
      className="fixed inset-0 z-50 bg-morphia-dark/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="bg-morphia-cream rounded-3xl max-w-4xl w-full border border-morphia-beige/80 shadow-2xl relative overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-morphia-white/80 hover:bg-morphia-white text-morphia-dark border border-morphia-beige/60 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-morphia-blue"
          aria-label="Cerrar ventana de detalles"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Clean White Frame for Image */}
          <div className="md:col-span-6 bg-morphia-white p-8 sm:p-10 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-morphia-beige/60">
            {/* Subtle background decorative wings */}
            <div className="absolute top-4 left-4 w-28 h-28 opacity-10 pointer-events-none">
              <img src={logoWings} alt="" className="w-full h-full object-contain" />
            </div>

            <div className="relative w-full aspect-square max-w-[340px] flex items-center justify-center">
              <img
                src={product.image_path}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-morphia-blue/30 text-morphia-dark border border-morphia-blue/60">
                {product.metal_type === 'ORO' ? 'Oro Cusqueño' : 'Plata 950 Genuina'}
              </span>
              <span className="text-xs text-morphia-muted">
                Hecho a mano en Cusco
              </span>
            </div>
          </div>

          {/* Right Column: Editorial & Storytelling Details */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Product Header */}
              <div className="pr-8">
                <span className="text-[11px] uppercase tracking-widest text-morphia-muted font-semibold block mb-1">
                  Colección de Anillos · Andean Morphia
                </span>
                <h2 id="modal-product-title" className="font-serif text-2xl sm:text-3xl text-morphia-dark leading-snug">
                  {product.name}
                </h2>
                <div className="mt-2 text-xl font-semibold text-morphia-dark">
                  S/ {formattedPrice} <span className="text-xs font-normal text-morphia-muted">PEN</span>
                </div>
              </div>

              {/* Tabs for Deep Content */}
              <div className="mt-6 border-b border-morphia-beige/60 flex space-x-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('symbolism')}
                  className={`pb-2 text-xs uppercase tracking-wider font-semibold transition-all relative ${
                    activeTab === 'symbolism'
                      ? 'text-morphia-dark'
                      : 'text-morphia-muted hover:text-morphia-dark'
                  }`}
                >
                  Simbolismo
                  {activeTab === 'symbolism' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-morphia-dark" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('technical')}
                  className={`pb-2 text-xs uppercase tracking-wider font-semibold transition-all relative ${
                    activeTab === 'technical'
                      ? 'text-morphia-dark'
                      : 'text-morphia-muted hover:text-morphia-dark'
                  }`}
                >
                  Ficha Técnica
                  {activeTab === 'technical' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-morphia-dark" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('packaging')}
                  className={`pb-2 text-xs uppercase tracking-wider font-semibold transition-all relative ${
                    activeTab === 'packaging'
                      ? 'text-morphia-dark'
                      : 'text-morphia-muted hover:text-morphia-dark'
                  }`}
                >
                  Packaging Incluido
                  {activeTab === 'packaging' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-morphia-dark" />
                  )}
                </button>
              </div>

              {/* Tab Content Display */}
              <div className="mt-5 min-h-[140px]">
                {activeTab === 'symbolism' && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <div className="p-4 rounded-2xl bg-morphia-white/80 border border-morphia-beige/70">
                      <div className="flex items-center gap-2 text-morphia-gold mb-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[11px] uppercase tracking-wider font-semibold">
                          Significado Andino & Metamorfosis
                        </span>
                      </div>
                      <p className="font-serif italic text-sm sm:text-base text-morphia-dark leading-relaxed">
                        &ldquo;{product.symbolic_meaning}&rdquo;
                      </p>
                    </div>
                    <p className="text-xs text-morphia-muted leading-relaxed">
                      {product.short_description}
                    </p>
                  </div>
                )}

                {activeTab === 'technical' && (
                  <div className="space-y-3 text-xs leading-relaxed animate-in fade-in duration-150">
                    <div className="p-4 rounded-2xl bg-morphia-white/80 border border-morphia-beige/70 space-y-2">
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-morphia-silver shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-morphia-dark block">Pureza del Metal:</strong>
                          <span className="text-morphia-muted">
                            Plata 950 garantizada (95% plata pura y 5% aleación para dureza óptima).
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Feather className="w-4 h-4 text-morphia-silver shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-morphia-dark block">Detalles & Taller:</strong>
                          <span className="text-morphia-muted">
                            {product.technical_details}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-morphia-muted italic">
                      ✦ Cada anillo es único; las micro marcas labradas a mano acreditan su autenticidad artesanal cusqueña.
                    </p>
                  </div>
                )}

                {activeTab === 'packaging' && (
                  <div className="space-y-3 text-xs animate-in fade-in duration-150">
                    <div className="p-4 rounded-2xl bg-morphia-blue/15 border border-morphia-blue/40 space-y-2.5">
                      <div className="flex items-center gap-2 text-morphia-dark font-semibold">
                        <Gift className="w-4 h-4 text-morphia-dark" />
                        <span>Experiencia Morphia Incluida:</span>
                      </div>
                      <ul className="space-y-1.5 text-morphia-muted pl-1">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-morphia-gold" />
                          <span><strong>Estuche de gamuza celeste:</strong> protege el brillo y la energía de la joya.</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-morphia-gold" />
                          <span><strong>Bolsa de organza:</strong> presentación etérea inspirada en las alas de mariposa.</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-morphia-gold" />
                          <span><strong>Tarjeta de agradecimiento y cuidado:</strong> guía de preservación de Plata 950.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-morphia-beige/60 flex items-center gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3.5 px-6 rounded-2xl text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-md ${
                  added
                    ? 'bg-green-700 text-white'
                    : 'bg-morphia-dark text-morphia-cream hover:bg-morphia-dark/90 hover:text-morphia-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Agregado a la Bolsa!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Agregar a la Bolsa</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-3.5 px-5 rounded-2xl border border-morphia-beige bg-morphia-white hover:bg-morphia-cream text-morphia-dark text-xs uppercase tracking-wider font-medium transition-all"
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
