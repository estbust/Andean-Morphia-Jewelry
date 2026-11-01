import { Eye, ShoppingBag, Sparkles, Feather } from 'lucide-react';

export default function ProductCard({ product, onOpenDetail, onAddToCart }) {
  const formattedPrice = Number(product.price).toFixed(2);

  return (
    <article className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E6D8C3]/60 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between relative">
      {/* Top Header Tags */}
      <div className="flex items-center justify-between gap-2 mb-3 z-10">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-morphia-blue/25 text-morphia-dark border border-morphia-blue/50">
          <span className="w-1.5 h-1.5 rounded-full bg-morphia-silver"></span>
          {product.metal_type === 'ORO' ? 'Oro Cusqueño' : 'Plata 950'}
        </span>

        {product.is_featured && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium tracking-wider uppercase text-morphia-gold">
            <Sparkles className="w-3 h-3" />
            <span>Destacado</span>
          </span>
        )}
      </div>

      {/* Seamless White Product Image Frame with Smooth Micro-Interaction Zoom */}
      <div 
        onClick={() => onOpenDetail(product)}
        className="cursor-pointer relative w-full aspect-square bg-[#FFFFFF] rounded-xl overflow-hidden flex items-center justify-center p-2 group-hover:cursor-pointer"
      >
        <img
          src={product.image_path}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Quick View Hover Pill */}
        <div className="absolute inset-0 bg-morphia-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-morphia-white/95 text-morphia-dark text-xs px-3.5 py-1.5 rounded-full shadow-md font-medium tracking-wider uppercase transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5" />
            Ver Significado
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div className="mt-4 flex-1 flex flex-col">
        <h3 
          onClick={() => onOpenDetail(product)}
          className="font-serif text-lg text-morphia-dark hover:text-morphia-muted transition-colors cursor-pointer leading-snug"
        >
          {product.name}
        </h3>

        <p className="text-xs text-morphia-muted mt-1.5 line-clamp-2 leading-relaxed">
          {product.short_description}
        </p>

        {/* Symbolic Concept Excerpt */}
        {product.symbolic_meaning && (
          <p className="text-[11px] text-morphia-muted/80 italic mt-2 line-clamp-1 border-l-2 border-morphia-beige pl-2">
            &ldquo;{product.symbolic_meaning}&rdquo;
          </p>
        )}

        {/* Packaging note */}
        <div className="mt-3 text-[11px] text-morphia-muted/90 flex items-center gap-1.5">
          <Feather className="w-3 h-3 text-morphia-blue shrink-0" />
          <span className="truncate">Estuche gamuza celeste incluido</span>
        </div>
      </div>

      {/* Price & Action Row */}
      <div className="mt-5 pt-3 border-t border-[#E6D8C3]/40 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-morphia-muted block">
            Precio
          </span>
          <span className="font-sans font-semibold text-base sm:text-lg text-morphia-dark">
            S/ {formattedPrice} <span className="text-xs font-normal text-morphia-muted">PEN</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenDetail(product)}
            className="px-3 py-2 rounded-xl border border-morphia-beige/80 hover:border-morphia-dark/40 bg-morphia-cream/50 hover:bg-morphia-cream text-morphia-dark text-xs font-medium tracking-wider uppercase transition-all"
            title="Ver significado simbólico y detalles"
          >
            Detalles
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="p-2.5 rounded-xl bg-morphia-dark text-morphia-cream hover:bg-morphia-dark/90 hover:text-morphia-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-morphia-blue"
            title="Agregar a la bolsa de compras"
            aria-label={`Agregar ${product.name} a la bolsa`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
