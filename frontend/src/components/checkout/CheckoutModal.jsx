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
      className="fixed inset-0 z-50 bg-morphia-dark/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-morphia-cream rounded-3xl max-w-xl w-full border border-morphia-beige shadow-2xl relative overflow-hidden my-auto p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-morphia-white/80 hover:bg-morphia-white text-morphia-muted hover:text-morphia-dark transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs uppercase tracking-widest font-semibold text-morphia-gold block">
              ¡Pedido Confirmado!
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-morphia-dark">
              Tu joya comenzará su viaje
            </h3>

            <div className="p-4 rounded-2xl bg-morphia-white border border-morphia-beige max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-morphia-beige/40 pb-2">
                <span className="text-morphia-muted">Número de Pedido:</span>
                <strong className="text-morphia-dark font-mono text-sm">
                  {completedOrder.order_number || 'AM-2026-9281'}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-morphia-muted">Cliente:</span>
                <span className="text-morphia-dark font-medium">{formData.customer_full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-morphia-muted">Destino:</span>
                <span className="text-morphia-dark font-medium">{formData.city}, Perú</span>
              </div>
              <div className="flex justify-between border-t border-morphia-beige/40 pt-2 font-semibold">
                <span className="text-morphia-dark">Monto Total:</span>
                <span className="text-morphia-dark">S/ {total} PEN</span>
              </div>
            </div>

            <p className="text-xs text-morphia-muted max-w-sm mx-auto leading-relaxed">
              Hemos enviado los detalles y código de seguimiento a <strong>{formData.customer_email}</strong>. Tu pedido incluye el estuche de gamuza celeste y la tarjeta de agradecimiento.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-morphia-dark text-morphia-cream text-xs uppercase tracking-widest font-semibold hover:bg-morphia-dark/90 transition-all"
              >
                Volver a la Tienda
              </button>
            </div>
          </div>
        ) : (
          /* Order Form */
          <div>
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-morphia-gold block">
                Finalizar Compra
              </span>
              <h3 className="font-serif text-2xl text-morphia-dark mt-1">
                Datos de Envío y Entrega
              </h3>
              <p className="text-xs text-morphia-muted mt-1">
                Despachamos desde Cusco a todas las provincias del Perú con empaque seguro.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-700 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-morphia-dark font-medium mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  name="customer_full_name"
                  value={formData.customer_full_name}
                  onChange={handleChange}
                  placeholder="Ej. María Elena Quispe"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-morphia-white border border-morphia-beige text-morphia-dark placeholder:text-morphia-muted/60 focus:outline-none focus:ring-2 focus:ring-morphia-blue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-morphia-dark font-medium mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleChange}
                    placeholder="maria@ejemplo.pe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-morphia-white border border-morphia-beige text-morphia-dark placeholder:text-morphia-muted/60 focus:outline-none focus:ring-2 focus:ring-morphia-blue"
                  />
                </div>

                <div>
                  <label className="block text-morphia-dark font-medium mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    name="customer_phone"
                    value={formData.customer_phone}
                    onChange={handleChange}
                    placeholder="+51 984 000 000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-morphia-white border border-morphia-beige text-morphia-dark placeholder:text-morphia-muted/60 focus:outline-none focus:ring-2 focus:ring-morphia-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-morphia-dark font-medium mb-1">
                    Dirección de Entrega *
                  </label>
                  <input
                    type="text"
                    required
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    placeholder="Av. El Sol 123, Dpto 4"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-morphia-white border border-morphia-beige text-morphia-dark placeholder:text-morphia-muted/60 focus:outline-none focus:ring-2 focus:ring-morphia-blue"
                  />
                </div>

                <div>
                  <label className="block text-morphia-dark font-medium mb-1">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Cusco, Lima..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-morphia-white border border-morphia-beige text-morphia-dark placeholder:text-morphia-muted/60 focus:outline-none focus:ring-2 focus:ring-morphia-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-morphia-dark font-medium mb-1">
                  Dedicatoria de Regalo (Opcional)
                </label>
                <textarea
                  name="gift_note"
                  rows="2"
                  value={formData.gift_note}
                  onChange={handleChange}
                  placeholder="Escribe un mensaje para incluirlo en la tarjeta de agradecimiento..."
                  className="w-full px-3.5 py-2 rounded-xl bg-morphia-white border border-morphia-beige text-morphia-dark placeholder:text-morphia-muted/60 focus:outline-none focus:ring-2 focus:ring-morphia-blue"
                />
              </div>

              {/* Price summary badge */}
              <div className="p-3 rounded-xl bg-morphia-white/90 border border-morphia-beige flex items-center justify-between font-semibold">
                <span>Total a Pagar:</span>
                <span className="text-base text-morphia-dark font-bold">
                  S/ {total} PEN
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-morphia-dark text-morphia-cream hover:bg-morphia-dark/90 hover:text-morphia-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
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
