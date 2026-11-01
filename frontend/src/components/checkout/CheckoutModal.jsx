import { useState } from 'react';
import { X, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { createOrder } from '../../services/api';

export default function CheckoutModal({ isOpen, onClose, cartItems = [], onOrderComplete }) {
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    customer_full_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    city: 'Cusco',
    gift_note: '',
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );
  const shippingCost = subtotal > 250 || subtotal === 0 ? 0 : 15;
  const total = (subtotal + shippingCost).toFixed(2);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const orderPayload = {
      customer_full_name: formData.customer_full_name,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone,
      shipping_address: formData.shipping_address,
      city: formData.city,
      gift_note: formData.gift_note,
      total_amount: total,
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
      })),
    };

    try {
      const response = await createOrder(orderPayload);
      setCompletedOrder(response);
      if (onOrderComplete) onOrderComplete();
    } catch (err) {
      setError(err.message || 'Error al registrar pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-morphia-dark/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-morphia-cream max-w-xl w-full border border-morphia-beige/80 shadow-2xl relative overflow-hidden my-auto p-6 sm:p-8 md:p-10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white text-morphia-dark border border-morphia-beige/80 transition-colors shadow-sm focus:outline-none"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        {completedOrder ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-5">
            <div className="w-14 h-14 bg-white border border-green-700/30 text-green-800 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-morphia-gold block mb-1">
                Atelier Cusco · Pedido Confirmado
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-morphia-dark font-normal">
                Tu joya comenzará su viaje
              </h3>
            </div>

            <div className="p-5 bg-white border border-morphia-beige/80 max-w-md mx-auto text-left text-xs space-y-2.5 shadow-sm">
              <div className="flex justify-between border-b border-morphia-beige/40 pb-2">
                <span className="text-morphia-muted uppercase tracking-wider text-[10px]">Número de Pedido:</span>
                <strong className="text-morphia-dark font-mono text-sm">
                  {completedOrder.order_number || 'AM-2026-9281'}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-morphia-muted uppercase tracking-wider text-[10px]">Cliente:</span>
                <span className="text-morphia-dark font-medium">{formData.customer_full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-morphia-muted uppercase tracking-wider text-[10px]">Destino:</span>
                <span className="text-morphia-dark font-medium">{formData.city}, Perú</span>
              </div>
              <div className="flex justify-between border-t border-morphia-beige/40 pt-2 font-semibold">
                <span className="text-morphia-dark uppercase tracking-wider text-[10px]">Total Inversión:</span>
                <span className="text-morphia-dark tabular-nums font-semibold text-sm">S/ {total} PEN</span>
              </div>
            </div>

            <p className="text-xs text-morphia-muted max-w-sm mx-auto leading-relaxed font-light">
              Hemos enviado los detalles y código de seguimiento a <strong>{formData.customer_email}</strong>. Tu pedido incluye el estuche de gamuza celeste y la tarjeta de cuidado.
            </p>

            <div className="pt-3">
              <button
                type="button"
                onClick={onClose}
                className="whitespace-nowrap px-8 py-3.5 bg-morphia-dark text-morphia-cream text-xs uppercase tracking-[0.2em] font-medium hover:bg-morphia-dark/90 border border-morphia-dark transition-all"
              >
                Volver al Atelier
              </button>
            </div>
          </div>
        ) : (
          /* Order Form */
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-morphia-gold block mb-1">
                Atelier Morphia · Despacho Seguro
              </span>
              <h3 className="font-serif text-2xl text-morphia-dark font-normal">
                Datos de Envío & Entrega
              </h3>
              <p className="text-xs text-morphia-muted mt-1 font-light leading-relaxed">
                Despachamos desde Cusco a todas las provincias del Perú con empaque sellado de cortesía.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-morphia-dark font-medium uppercase tracking-wider text-[10px] mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  name="customer_full_name"
                  value={formData.customer_full_name}
                  onChange={handleChange}
                  placeholder="Ej. María Elena Quispe"
                  className="w-full px-3.5 py-2.5 bg-white border border-morphia-beige/80 text-morphia-dark placeholder:text-morphia-muted/50 focus:outline-none focus:border-morphia-dark focus:ring-1 focus:ring-morphia-dark transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-morphia-dark font-medium uppercase tracking-wider text-[10px] mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleChange}
                    placeholder="maria@ejemplo.pe"
                    className="w-full px-3.5 py-2.5 bg-white border border-morphia-beige/80 text-morphia-dark placeholder:text-morphia-muted/50 focus:outline-none focus:border-morphia-dark focus:ring-1 focus:ring-morphia-dark transition-all"
                  />
                </div>

                <div>
                  <label className="block text-morphia-dark font-medium uppercase tracking-wider text-[10px] mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    name="customer_phone"
                    value={formData.customer_phone}
                    onChange={handleChange}
                    placeholder="+51 984 000 000"
                    className="w-full px-3.5 py-2.5 bg-white border border-morphia-beige/80 text-morphia-dark placeholder:text-morphia-muted/50 focus:outline-none focus:border-morphia-dark focus:ring-1 focus:ring-morphia-dark transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-morphia-dark font-medium uppercase tracking-wider text-[10px] mb-1">
                    Dirección de Entrega *
                  </label>
                  <input
                    type="text"
                    required
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    placeholder="Av. El Sol 123, Dpto 4"
                    className="w-full px-3.5 py-2.5 bg-white border border-morphia-beige/80 text-morphia-dark placeholder:text-morphia-muted/50 focus:outline-none focus:border-morphia-dark focus:ring-1 focus:ring-morphia-dark transition-all"
                  />
                </div>

                <div>
                  <label className="block text-morphia-dark font-medium uppercase tracking-wider text-[10px] mb-1">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Cusco, Lima..."
                    className="w-full px-3.5 py-2.5 bg-white border border-morphia-beige/80 text-morphia-dark placeholder:text-morphia-muted/50 focus:outline-none focus:border-morphia-dark focus:ring-1 focus:ring-morphia-dark transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-morphia-dark font-medium uppercase tracking-wider text-[10px] mb-1">
                  Dedicatoria de Regalo (Opcional)
                </label>
                <textarea
                  name="gift_note"
                  rows="2"
                  value={formData.gift_note}
                  onChange={handleChange}
                  placeholder="Mensaje personalizado para la tarjeta de agradecimiento..."
                  className="w-full px-3.5 py-2 bg-white border border-morphia-beige/80 text-morphia-dark placeholder:text-morphia-muted/50 focus:outline-none focus:border-morphia-dark focus:ring-1 focus:ring-morphia-dark transition-all"
                />
              </div>

              {/* Price summary badge */}
              <div className="p-3.5 bg-white border border-morphia-beige/80 flex items-center justify-between font-medium">
                <span className="uppercase tracking-wider text-[10px] text-morphia-muted">Total a Pagar:</span>
                <span className="text-base text-morphia-dark font-semibold tabular-nums">
                  S/ {total} <span className="text-xs font-normal text-morphia-muted">PEN</span>
                </span>
              </div>

              {/* Single-line Architectural Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="whitespace-nowrap w-full py-4 bg-morphia-dark text-morphia-cream hover:bg-morphia-dark/90 hover:text-morphia-white text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 border border-morphia-dark shadow-sm transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirmando pedido con Cusco...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-morphia-gold" />
                    <span>Confirmar Pedido (S/ {total} PEN)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
