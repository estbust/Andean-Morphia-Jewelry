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
    <section id="catalogo" className="py-20 sm:py-24 bg-morphia-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-morphia-white border border-morphia-beige text-xs tracking-widest uppercase font-semibold text-morphia-dark">
            <Sparkles className="w-3.5 h-3.5 text-morphia-gold" />
            <span>Colección 2026 · Plata 950</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-morphia-dark leading-tight">
            Anillos con Simbolismo y Alma
          </h2>

          <p className="text-sm sm:text-base text-morphia-muted font-light leading-relaxed">
            Cada diseño ha sido modelado en los talleres tradicionales de Cusco en Plata 950 de alta pureza. Portar un anillo Morphia es llevar consigo un amuleto de determinación, lealtad interior y renovación.
          </p>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-2xl bg-morphia-white/70 border border-morphia-beige/60 shadow-sm backdrop-blur-sm">
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setFilterType('ALL')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                filterType === 'ALL'
                  ? 'bg-morphia-dark text-morphia-cream shadow-sm'
                  : 'bg-morphia-white hover:bg-morphia-cream text-morphia-dark border border-morphia-beige/60'
              }`}
            >
              Todos ({products.length})
            </button>

            <button
              type="button"
              onClick={() => setFilterType('PLATA')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-1.5 ${
                filterType === 'PLATA'
                  ? 'bg-morphia-dark text-morphia-cream shadow-sm'
                  : 'bg-morphia-white hover:bg-morphia-cream text-morphia-dark border border-morphia-beige/60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-morphia-silver"></span>
              Plata 950
            </button>

            <button
              type="button"
              onClick={() => setFilterType('FEATURED')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-1.5 ${
                filterType === 'FEATURED'
                  ? 'bg-morphia-dark text-morphia-cream shadow-sm'
                  : 'bg-morphia-white hover:bg-morphia-cream text-morphia-dark border border-morphia-beige/60'
              }`}
            >
              <Sparkles className="w-3 h-3 text-morphia-gold" />
              Más Destacados
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[300px]">
            <Search className="w-4 h-4 text-morphia-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, serpiente, corona..."
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-morphia-white text-xs text-morphia-dark placeholder:text-morphia-muted/70 border border-morphia-beige focus:outline-none focus:ring-2 focus:ring-morphia-blue focus:border-transparent transition-all"
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
          /* Loading Skeletons */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-morphia-white rounded-2xl p-6 border border-morphia-beige/60 shadow-sm animate-pulse space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="h-4 w-20 bg-morphia-cream rounded-full"></div>
                  <div className="h-4 w-16 bg-morphia-cream rounded-full"></div>
                </div>
                <div className="w-full aspect-square bg-morphia-cream/60 rounded-xl"></div>
                <div className="h-5 bg-morphia-cream rounded w-3/4"></div>
                <div className="h-3 bg-morphia-cream rounded w-full"></div>
                <div className="h-3 bg-morphia-cream rounded w-2/3"></div>
                <div className="pt-4 border-t border-morphia-beige/40 flex justify-between items-center">
                  <div className="h-6 w-24 bg-morphia-cream rounded"></div>
                  <div className="h-8 w-20 bg-morphia-cream rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State with Retry */
          <div className="text-center py-16 bg-morphia-white rounded-3xl border border-red-200 p-8 max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="font-serif text-lg text-morphia-dark mb-2">{error}</h3>
            <p className="text-xs text-morphia-muted mb-6">
              Verifica tu conexión o vuelve a intentar en unos momentos.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-morphia-dark text-morphia-cream text-xs uppercase tracking-wider font-semibold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reintentar
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty Search State */
          <div className="text-center py-16 bg-morphia-white/80 rounded-3xl border border-morphia-beige/60 p-8 max-w-md mx-auto">
            <Filter className="w-8 h-8 text-morphia-muted mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl text-morphia-dark mb-2">
              No encontramos anillos con esa búsqueda
            </h3>
            <p className="text-xs text-morphia-muted mb-6">
              Intenta con otro término o restablece los filtros para ver la colección completa.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilterType('ALL');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-morphia-dark text-morphia-cream text-xs uppercase tracking-wider font-medium hover:bg-morphia-dark/90 transition-all"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          /* Official 3-Column Responsive Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id || product.slug}
                product={product}
                onOpenDetail={onOpenDetail}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}

        {/* Bottom Catalog Promise Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-morphia-white/90 border border-morphia-beige/80 text-center max-w-4xl mx-auto shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-[11px] uppercase tracking-widest text-morphia-muted font-semibold block">
                Garantía Morphia
              </span>
              <p className="font-serif text-lg text-morphia-dark mt-0.5">
                ¿No estás seguro de tu talla de anillo?
              </p>
              <p className="text-xs text-morphia-muted mt-1">
                Escríbenos y te guiaremos paso a paso para medir tu dedo con precisión o solicitar una pieza con ajuste personalizado.
              </p>
            </div>
            <a
              href="mailto:andeanmorphiajewelry@gmail.com?subject=Consulta%20de%20talla%20de%20anillo"
              className="shrink-0 px-6 py-3 rounded-full bg-morphia-cream hover:bg-morphia-beige text-morphia-dark border border-morphia-beige font-medium text-xs uppercase tracking-widest transition-all"
            >
              Asesoría de Tallas
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
