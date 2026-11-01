import { Sparkles, X } from 'lucide-react';

export default function Toast({ message, visible, onClose }) {
  if (!visible) return null;

  return (
    <aside
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-morphia-dark text-morphia-cream border border-morphia-beige/40 shadow-xl animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="w-6 h-6 rounded-full bg-morphia-gold/20 flex items-center justify-center text-morphia-gold shrink-0">
        <Sparkles className="w-3.5 h-3.5" />
      </div>
      <p className="text-xs font-medium tracking-wide">
        {message}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-morphia-cream/60 hover:text-morphia-cream p-1"
        aria-label="Cerrar notificación"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
