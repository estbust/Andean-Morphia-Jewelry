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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-morphia-dark/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-morphia-cream shadow-2xl border-l border-morphia-beige flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-morphia-white/80 border-b border-morphia-beige/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-morphia-dark" />
              <h2 id="cart-drawer-title" className="font-serif text-xl text-morphia-dark">
                Tu Bolsa de Joyas
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-morphia-blue/30 text-morphia-dark font-medium">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-morphia-cream text-morphia-muted hover:text-morphia-dark transition-colors"
              aria-label="Cerrar bolsa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-morphia-white border border-morphia-beige flex items-center justify-center text-morphia-muted">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="font-serif text-lg text-morphia-dark">
                  Tu bolsa está vacía
                </h3>
                <p className="text-xs text-morphia-muted max-w-xs mx-auto leading-relaxed">
                  Explora nuestra colección de anillos en Plata 950 y elige la pieza que resuene con tu proceso de transformación.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-morphia-dark text-morphia-cream text-xs uppercase tracking-wider font-semibold"
                >
                  Explorar Anillos
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id || item.slug}
                  className="bg-morphia-white rounded-2xl p-4 border border-morphia-beige/60 shadow-sm space-y-3"
                >
                  <div className="flex gap-4">
                    {/* Ring Image Frame */}
                    <div className="w-20 h-20 rounded-xl bg-morphia-white border border-morphia-beige/40 p-1 flex items-center justify-center shrink-0">
                      <img
                        src={item.image_path}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Ring Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-serif text-base text-morphia-dark truncate">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id || item.slug)}
                          className="text-morphia-muted hover:text-red-500 transition-colors p-1"
                          aria-label={`Eliminar ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="text-[10px] uppercase tracking-wider font-semibold text-morphia-muted">
                        Plata 950 Cusqueña
                      </span>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-semibold text-xs text-morphia-dark">
                          S/ {Number(item.price).toFixed(2)} PEN
                        </span>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 bg-morphia-cream rounded-lg border border-morphia-beige/80 px-2 py-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id || item.slug, Math.max(1, item.quantity - 1))}
                            className="text-morphia-dark hover:text-morphia-muted text-xs p-1"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold text-morphia-dark px-1">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id || item.slug, item.quantity + 1)}
                            className="text-morphia-dark hover:text-morphia-muted text-xs p-1"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Packaging Auto Badge */}
                  <div className="pt-2 border-t border-morphia-beige/30 flex items-start gap-1.5 text-[10px] text-morphia-muted bg-morphia-blue/10 rounded-lg p-2">
                    <Gift className="w-3.5 h-3.5 text-morphia-blue shrink-0 mt-0.5" />
                    <span className="leading-tight">
                      <strong>Packaging Incluido:</strong> Estuche gamuza celeste + Bolsa de organza + Tarjeta de cuidado.
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-morphia-white/95 border-t border-morphia-beige/60 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-morphia-muted">
                  <span>Subtotal</span>
                  <span>S/ {subtotal.toFixed(2)} PEN</span>
                </div>
                <div className="flex justify-between text-morphia-muted">
                  <span>Envío a todo el Perú</span>
                  <span>{shippingCost === 0 ? 'Gratis' : `S/ ${shippingCost.toFixed(2)} PEN`}</span>
                </div>
                {subtotal < 250 && (
                  <p className="text-[11px] text-morphia-gold italic">
                    ✦ Agrega S/ {(250 - subtotal).toFixed(2)} más para envío gratuito a cualquier ciudad.
                  </p>
                )}
                <div className="pt-2 border-t border-morphia-beige/50 flex justify-between text-sm font-semibold text-morphia-dark">
                  <span>Total</span>
                  <span>S/ {total.toFixed(2)} PEN</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onCheckout}
                className="w-full py-4 rounded-2xl bg-morphia-dark text-morphia-cream hover:bg-morphia-dark/90 hover:text-morphia-white font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Proceder al Pago</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-morphia-muted">
                <Sparkles className="w-3.5 h-3.5 text-morphia-gold" />
                <span>Pago 100% seguro y garantizado desde Cusco</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
