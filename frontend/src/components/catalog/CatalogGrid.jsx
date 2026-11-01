import { useState, useEffect, useMemo } from 'react';
import { Search, Sparkles, Filter, X, RefreshCw, AlertCircle } from 'lucide-react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../../services/api';

export default function CatalogGrid({
  onOpenDetail,
  onAddToCart,
  activeMetalFilter = 'ALL',
  onFilterChange,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localFilter, setLocalFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Use controlled or fallback filter
  const filterType = onFilterChange ? activeMetalFilter : localFilter;
  const setFilterType = (type) => {
    if (onFilterChange) {
      onFilterChange(type);
    } else {
      setLocalFilter(type);
    }
  };

  // Load products from API
  useEffect(() => {
    let isMounted = true;
    async function loadCatalog() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts();
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('[CatalogGrid] Error loading products:', err);
          setError('No fue posible cargar el catálogo. Por favor, intenta de nuevo.');
          setLoading(false);
        }
      }
    }
    loadCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter products locally for instantaneous responsiveness
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Metal / Featured Tab Filter
      if (filterType === 'PLATA' && product.metal_type !== 'PLATA') return false;
      if (filterType === 'FEATURED' && !product.is_featured) return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name?.toLowerCase().includes(query);
        const matchesDesc = product.short_description?.toLowerCase().includes(query);
        const matchesMeaning = product.symbolic_meaning?.toLowerCase().includes(query);
        const matchesTech = product.technical_details?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesMeaning && !matchesTech) {
          return false;
        }
      }

      return true;
    });
  }, [products, filterType, searchQuery]);

  return (
    <section id="catalogo" className="py-20 sm:py-28 bg-morphia-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs tracking-[0.28em] uppercase font-medium text-morphia-muted border-b border-morphia-gold/40 pb-1.5">
            <Sparkles className="w-3 h-3 text-morphia-gold" />
            <span>Colección 2026 · Plata 950 Cusqueña</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-morphia-dark leading-tight font-normal">
            Anillos con Simbolismo y Alma
          </h2>

          <p className="text-sm sm:text-base text-morphia-muted font-light leading-relaxed max-w-2xl mx-auto">
            Cada diseño ha sido modelado en los talleres tradicionales de Cusco en Plata 950 de alta pureza. Portar un anillo Morphia es llevar un amuleto de determinación, lealtad y renacimiento personal.
          </p>
        </div>

        {/* Filter Bar & Search Input (Minimalist Atelier Controls) */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-morphia-beige/70">
          
          {/* Architectural Filter Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setFilterType('ALL')}
              className={`px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium transition-all relative border ${
                filterType === 'ALL'
                  ? 'bg-morphia-dark text-morphia-cream border-morphia-dark shadow-sm'
                  : 'bg-white/80 hover:bg-white text-morphia-muted hover:text-morphia-dark border-morphia-beige/70'
              }`}
            >
              Todos ({products.length})
            </button>

            <button
              type="button"
              onClick={() => setFilterType('PLATA')}
              className={`px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium transition-all relative border flex items-center gap-1.5 ${
                filterType === 'PLATA'
                  ? 'bg-morphia-dark text-morphia-cream border-morphia-dark shadow-sm'
                  : 'bg-white/80 hover:bg-white text-morphia-muted hover:text-morphia-dark border-morphia-beige/70'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-morphia-silver"></span>
              Plata 950
            </button>

            <button
              type="button"
              onClick={() => setFilterType('FEATURED')}
              className={`px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium transition-all relative border flex items-center gap-1.5 ${
                filterType === 'FEATURED'
                  ? 'bg-morphia-dark text-morphia-cream border-morphia-dark shadow-sm'
                  : 'bg-white/80 hover:bg-white text-morphia-muted hover:text-morphia-dark border-morphia-beige/70'
              }`}
            >
              <Sparkles className="w-3 h-3 text-morphia-gold" />
              Destacados
            </button>
          </div>

          {/* Architectural Search Box */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-3.5 h-3.5 text-morphia-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por pieza, serpiente, corona..."
              className="w-full pl-9 pr-9 py-2.5 bg-white text-xs text-morphia-dark placeholder:text-morphia-muted/60 border border-morphia-beige/80 focus:outline-none focus:border-morphia-dark focus:ring-1 focus:ring-morphia-dark transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-morphia-muted hover:text-morphia-dark"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Content States */}
        {loading ? (
          /* Architectural Loading Skeletons */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white p-6 border border-morphia-beige/60 animate-pulse space-y-4"
              >
                <div className="flex justify-between items-center pb-3 border-b border-morphia-beige/30">
                  <div className="h-3 w-16 bg-morphia-cream"></div>
                  <div className="h-3 w-20 bg-morphia-cream"></div>
                </div>
                <div className="w-full aspect-square bg-morphia-cream/50"></div>
                <div className="h-4 bg-morphia-cream w-3/4"></div>
                <div className="h-3 bg-morphia-cream w-full"></div>
                <div className="h-3 bg-morphia-cream w-2/3"></div>
                <div className="pt-4 border-t border-morphia-beige/40 flex justify-between items-center">
                  <div className="h-5 w-24 bg-morphia-cream"></div>
                  <div className="h-7 w-20 bg-morphia-cream"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State with Retry */
          <div className="text-center py-16 bg-white border border-red-200 p-8 max-w-lg mx-auto">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
            <h3 className="font-serif text-lg text-morphia-dark mb-2 font-normal">{error}</h3>
            <p className="text-xs text-morphia-muted mb-6">
              Verifica tu conexión o vuelve a intentar en unos momentos.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-morphia-dark text-morphia-cream text-xs uppercase tracking-[0.18em] font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reintentar
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty Search State */
          <div className="text-center py-16 bg-white border border-morphia-beige/80 p-8 max-w-md mx-auto">
            <Filter className="w-7 h-7 text-morphia-muted mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl text-morphia-dark mb-2 font-normal">
              No encontramos anillos con esa búsqueda
            </h3>
            <p className="text-xs text-morphia-muted mb-6 leading-relaxed">
              Intenta con otro término o restablece los filtros para contemplar la colección completa.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilterType('ALL');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-morphia-dark text-morphia-cream text-xs uppercase tracking-[0.18em] font-medium hover:bg-morphia-dark/90 transition-all"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          /* Official 3-Column Responsive Product Grid with Museum Indexing */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id || product.slug}
                product={product}
                index={index}
                total={filteredProducts.length}
                onOpenDetail={onOpenDetail}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}

        {/* Bottom Catalog Atelier Banner */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 bg-white border border-morphia-beige/80 max-w-4xl mx-auto shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-[0.24em] text-morphia-gold font-semibold block mb-1">
                Garantía y Ajuste · Atelier Morphia
              </span>
              <p className="font-serif text-xl text-morphia-dark font-normal">
                ¿Deseas confirmar tu medida exacta de anillo?
              </p>
              <p className="text-xs text-morphia-muted mt-1 leading-relaxed max-w-lg">
                Nuestros maestros orfebres en Cusco pueden asesorarte personalmente para determinar la talla precisa antes del despacho o coordinar un ajuste especial.
              </p>
            </div>
            <a
              href="mailto:andeanmorphiajewelry@gmail.com?subject=Consulta%20de%20talla%20de%20anillo"
              className="shrink-0 whitespace-nowrap px-8 py-3.5 border border-morphia-dark bg-morphia-dark text-morphia-cream hover:bg-morphia-dark/90 hover:text-white font-medium text-xs uppercase tracking-[0.2em] transition-all"
            >
              Asesoría de Tallas
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
