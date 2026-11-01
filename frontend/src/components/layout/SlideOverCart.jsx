import { X, Trash2, ShoppingBag, ArrowRight, Gift, Sparkles, Plus, Minus } from 'lucide-react';

export default function SlideOverCart({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const shippingCost = subtotal > 250 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shippingCost;
  const totalQuantity = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-morphia-dark/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
        <div className="w-screen max-w-md bg-morphia-cream shadow-2xl border-l border-morphia-beige/80 flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-morphia-beige/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-morphia-dark" />
              <h2 id="cart-drawer-title" className="font-serif text-xl text-morphia-dark font-normal">
                Bolsa de Joyas
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 border border-morphia-beige text-morphia-muted tabular-nums">
                {totalQuantity} {totalQuantity === 1 ? 'pieza' : 'piezas'}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 border border-morphia-beige/60 hover:bg-morphia-cream text-morphia-muted hover:text-morphia-dark transition-colors"
              aria-label="Cerrar bolsa"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 mx-auto bg-white border border-morphia-beige/80 flex items-center justify-center text-morphia-muted">
                  <ShoppingBag className="w-7 h-7 opacity-30" />
                </div>
                <h3 className="font-serif text-xl text-morphia-dark font-normal">
                  Tu bolsa está vacía
                </h3>
                <p className="text-xs text-morphia-muted max-w-xs mx-auto leading-relaxed font-light">
                  Explora la colección de anillos en Plata 950 y escoge la pieza que acompañará tu renacer personal.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="whitespace-nowrap px-8 py-3.5 bg-morphia-dark text-morphia-cream hover:bg-morphia-dark/90 text-xs uppercase tracking-[0.2em] font-medium border border-morphia-dark transition-all"
                  >
                    Explorar Anillos
                  </button>
                </div>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id || item.slug}
                  className="bg-white p-4 sm:p-5 border border-morphia-beige/70 shadow-sm space-y-3"
                >
                  <div className="flex gap-4">
                    {/* Ring Image Frame with CSS Inset Crop */}
                    <div className="w-20 h-20 bg-white border border-morphia-beige/60 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={item.image_path}
                        alt={item.name}
                        style={{ clipPath: 'inset(2% 5% 2% 5%)' }}
                        className="w-full h-full object-contain [clip-path:inset(2%_5%_2%_5%)]"
                      />
                    </div>

                    {/* Ring Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-serif text-base text-morphia-dark font-normal truncate">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id || item.slug)}
                          className="text-morphia-muted hover:text-red-600 transition-colors p-1"
                          aria-label={`Eliminar ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-morphia-muted block mt-0.5">
                        Plata 950 Cusqueña
                      </span>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-semibold text-xs text-morphia-dark tabular-nums tracking-wide">
                          S/ {Number(item.price).toFixed(2)} <span className="text-[10px] font-normal text-morphia-muted">PEN</span>
                        </span>

                        {/* Architectural Quantity Counter */}
                        <div className="flex items-center border border-morphia-beige bg-morphia-cream/40">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id || item.slug, Math.max(1, item.quantity - 1))}
                            className="text-morphia-dark hover:bg-white text-xs px-2 py-1 transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-semibold text-morphia-dark px-2.5 py-0.5 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id || item.slug, item.quantity + 1)}
                            className="text-morphia-dark hover:bg-white text-xs px-2 py-1 transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Packaging Atelier Badge */}
                  <div className="pt-2.5 border-t border-morphia-beige/40 flex items-start gap-2 text-[10px] text-morphia-muted bg-morphia-cream/30 p-2 border border-morphia-beige/40">
                    <Gift className="w-3.5 h-3.5 text-morphia-gold shrink-0 mt-0.5" />
                    <span className="leading-tight font-light">
                      <strong className="font-medium text-morphia-dark">Packaging Morphia:</strong> Estuche de gamuza celeste + bolsa de organza + tarjeta.
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Luxury Atelier Receipt Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-morphia-beige/70 space-y-4 shadow-lg">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-morphia-muted">
                  <span className="uppercase tracking-wider text-[10px]">Subtotal Piezas</span>
                  <span className="tabular-nums font-medium text-morphia-dark">S/ {subtotal.toFixed(2)} PEN</span>
                </div>
                <div className="flex justify-between text-morphia-muted">
                  <span className="uppercase tracking-wider text-[10px]">Envío Courier (Perú)</span>
                  <span className="tabular-nums font-medium text-morphia-dark">
                    {shippingCost === 0 ? 'Cortesía (Gratis)' : `S/ ${shippingCost.toFixed(2)} PEN`}
                  </span>
                </div>
                {subtotal < 250 && (
                  <p className="text-[10px] text-morphia-gold italic font-light">
                    ✦ Agrega S/ {(250 - subtotal).toFixed(2)} para envío gratuito a nivel nacional.
                  </p>
                )}
                <div className="pt-2.5 border-t border-morphia-beige/60 flex justify-between text-sm font-semibold text-morphia-dark">
                  <span className="uppercase tracking-[0.16em] text-xs">Total Inversión</span>
                  <span className="tabular-nums font-medium text-base">S/ {total.toFixed(2)} PEN</span>
                </div>
              </div>

              {/* Single-line Architectural Checkout Button */}
              <button
                type="button"
                onClick={onCheckout}
                className="whitespace-nowrap w-full py-4 bg-morphia-dark text-morphia-cream hover:bg-morphia-dark/90 hover:text-morphia-white font-medium text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 border border-morphia-dark shadow-sm transition-all"
              >
                <span>Proceder al Pago · S/ {total.toFixed(2)} PEN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider text-morphia-muted">
                <Sparkles className="w-3 h-3 text-morphia-gold" />
                <span>Despacho Directo & Seguro desde Cusco</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
