import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/home/HeroSection';
import ManifestoSection from './components/home/ManifestoSection';
import CatalogGrid from './components/catalog/CatalogGrid';
import PackagingSection from './components/home/PackagingSection';
import Footer from './components/layout/Footer';
import ProductDetailModal from './components/product/ProductDetailModal';
import SlideOverCart from './components/layout/SlideOverCart';
import CheckoutModal from './components/checkout/CheckoutModal';
import Toast from './components/common/Toast';

const CART_STORAGE_KEY = 'andean_morphia_cart_v1';

export default function App() {
  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeMetalFilter, setActiveMetalFilter] = useState('ALL');

  // Toast state
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast({ visible: false, message: '' });
  }, []);

  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast.visible, hideToast]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.warn('Unable to persist cart in localStorage:', err);
    }
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => (item.id || item.slug) === (product.id || product.slug));
      if (existing) {
        return prev.map((item) =>
          (item.id || item.slug) === (product.id || product.slug)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`¡"${product.name}" agregado a tu bolsa de joyas!`);
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        (item.id || item.slug) === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => (item.id || item.slug) !== productId)
    );
  };

  const handleCheckoutFromCart = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
    showToast('¡Gracias por tu compra! Tu amuleto está en preparación.');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-morphia-cream text-morphia-dark flex flex-col font-sans selection:bg-morphia-blue selection:text-morphia-dark">
      {/* Sticky Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectFilter={(metal) => setActiveMetalFilter(metal)}
      />

      {/* Main Experience Layout */}
      <main className="flex-1">
        {/* Editorial Hero Section */}
        <HeroSection
          onExploreClick={() => {
            const el = document.getElementById('catalogo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Catalog Showcase with Real-Time Filters & Skeletons */}
        <CatalogGrid
          onOpenDetail={(product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
          activeMetalFilter={activeMetalFilter}
          onFilterChange={setActiveMetalFilter}
        />

        {/* Brand Manifesto & Ancestral Storytelling */}
        <ManifestoSection />

        {/* Packaging Unboxing Ritual & Cusco Shipping Highlights */}
        <PackagingSection />
      </main>

      {/* Brand Footer */}
      <Footer />

      {/* Interactive Symbolic Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Slide-over Cart Drawer */}
      <SlideOverCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutFromCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderComplete={handleOrderCompleted}
      />

      {/* User Feedback Toast */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        onClose={hideToast}
      />
    </div>
  );
}
