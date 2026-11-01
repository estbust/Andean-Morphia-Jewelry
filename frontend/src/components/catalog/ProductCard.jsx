import { Eye, ShoppingBag, Sparkles, Feather } from 'lucide-react';

export default function ProductCard({
  product,
  index = 0,
  total = 6,
  onOpenDetail,
  onAddToCart,
}) {
  const formattedPrice = Number(product.price).toFixed(2);
  const indexFormatted = String(index + 1).padStart(2, '0');
  const totalFormatted = String(total).padStart(2, '0');
  const museumIndex = `${indexFormatted} / ${totalFormatted}`;

  return (
    <article className="bg-[#FFFFFF] border border-morphia-beige/60 p-6 sm:p-7 flex flex-col justify-between group hover:border-morphia-dark/40 hover:shadow-lg transition-all duration-300 relative">
      {/* Top Header: Museum Index & Metal Type */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-morphia-beige/40">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.2em] text-morphia-muted font-medium tabular-nums">
            {museumIndex}
          </span>
          <span className="text-morphia-beige">·</span>
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-morphia-dark">
            {product.metal_type === 'ORO' ? 'ORO CUSQUEÑO' : 'PLATA 950 CUSQUEÑA'}
          </span>
        </div>

        {product.is_featured && (
          <span className="text-[10px] uppercase tracking-[0.18em] text-morphia-gold font-medium flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Atelier</span>
          </span>
        )}
      </div>

      {/* Seamless White Product Image Frame with CSS Inset Crop */}
      <div 
        onClick={() => onOpenDetail(product)}
        className="cursor-pointer relative w-full aspect-square bg-[#FFFFFF] overflow-hidden flex items-center justify-center p-4 group-hover:cursor-pointer"
      >
        <img
          src={product.image_path}
          alt={product.name}
          loading="lazy"
          style={{ clipPath: 'inset(2% 5% 2% 5%)' }}
          className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-700 ease-out [clip-path:inset(2%_5%_2%_5%)]"
        />

        {/* Quick View Architectural Plaque */}
        <div className="absolute inset-0 bg-morphia-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="bg-morphia-white/95 text-morphia-dark text-[10px] px-3.5 py-1.5 border border-morphia-beige shadow-sm font-medium tracking-[0.2em] uppercase transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5">
            <Eye className="w-3 h-3 text-morphia-dark" />
            Ver Pieza
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div className="mt-4 flex-1 flex flex-col pt-3 border-t border-morphia-beige/30">
        <h3 
          onClick={() => onOpenDetail(product)}
          className="font-serif text-lg text-morphia-dark hover:text-morphia-muted transition-colors cursor-pointer leading-snug font-normal"
        >
          {product.name}
        </h3>

        <p className="text-xs text-morphia-muted mt-1.5 line-clamp-2 leading-relaxed font-light">
          {product.short_description}
        </p>

        {/* Symbolic Concept Excerpt */}
        {product.symbolic_meaning && (
          <p className="text-[11px] text-morphia-dark/75 italic mt-2.5 line-clamp-1 border-l border-morphia-gold/60 pl-2.5 font-light">
            &ldquo;{product.symbolic_meaning}&rdquo;
          </p>
        )}

        {/* Packaging note */}
        <div className="mt-3 text-[10px] uppercase tracking-wider text-morphia-muted flex items-center gap-1.5">
          <Feather className="w-3 h-3 text-morphia-gold shrink-0" />
          <span className="truncate">Estuche gamuza celeste de cortesía</span>
        </div>
      </div>

      {/* Price & Action Row */}
      <div className="mt-5 pt-3.5 border-t border-morphia-beige/50 flex items-center justify-between gap-3">
        <div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-morphia-muted block font-medium">
            Precio Atelier
          </span>
          <span className="font-sans font-semibold text-base text-morphia-dark tabular-nums tracking-wide">
            S/ {formattedPrice} <span className="text-[10px] font-normal text-morphia-muted">PEN</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenDetail(product)}
            className="px-3.5 py-2 border border-morphia-beige hover:border-morphia-dark bg-morphia-cream/30 hover:bg-morphia-white text-morphia-dark text-[11px] uppercase tracking-[0.16em] font-medium transition-all duration-200"
            title="Ver significado simbólico y detalles"
          >
            Significado
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="px-3.5 py-2 bg-morphia-dark text-morphia-cream hover:bg-morphia-dark/90 hover:text-morphia-white border border-morphia-dark text-[11px] uppercase tracking-[0.16em] font-medium transition-all duration-200 shadow-sm flex items-center gap-1.5"
            title="Adquirir amuleto"
            aria-label={`Adquirir ${product.name}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Adquirir</span>
          </button>
        </div>
      </div>
    </article>
  );
}
