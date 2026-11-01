import { Sparkles, X } from 'lucide-react';

export default function Toast({ message, visible, onClose }) {
  if (!visible) return null;

  return (
    <aside
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-morphia-dark text-morphia-cream border border-morphia-gold/30 shadow-2xl animate-in slide-in-from-bottom-5 duration-300 max-w-md"
    >
      <div className="p-1 border border-morphia-gold/40 text-morphia-gold shrink-0">
        <Sparkles className="w-3.5 h-3.5" />
      </div>
      <p className="text-xs font-light tracking-wide text-morphia-cream">
        {message}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-morphia-cream/60 hover:text-morphia-cream p-1 transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
