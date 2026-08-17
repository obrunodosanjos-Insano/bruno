import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ItemModal } from './components/ItemModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReservationModal } from './components/ReservationModal';
import { ProfileModal } from './components/ProfileModal';
import { CoffeeMethods } from './components/CoffeeMethods';
import { SpaceSection } from './components/SpaceSection';
import { LoyaltySection } from './components/LoyaltySection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';

import { MenuItem, CustomizationOption, CartItem, CategoryId, UserProfile } from './types';
import { CheckCircle, Coffee, Laptop, Sparkles, Gift, MapPin, Star } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('menu');
  
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('tostado_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tostado_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tostado_theme', 'light');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  
  // Category & Tag filter states for Menu
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // User Profile state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Load User Profile from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tostado_user_profile');
    if (saved) {
      try {
        setUserProfile(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse user profile', e);
      }
    }
  }, []);

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    localStorage.setItem('tostado_user_profile', JSON.stringify(updatedProfile));
    showToast(`Perfil de ${updatedProfile.name.split(' ')[0]} salvo com sucesso!`);
  };

  const handleDeleteProfile = () => {
    setUserProfile(null);
    localStorage.removeItem('tostado_user_profile');
    setIsProfileOpen(false);
    showToast('Seu perfil foi excluído.');
  };

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Checkout params
  const [checkoutParams, setCheckoutParams] = useState<{
    deliveryType: 'retirada' | 'entrega';
    discountAmount: number;
    couponApplied: string;
  }>({
    deliveryType: 'retirada',
    discountAmount: 0,
    couponApplied: '',
  });

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Add Item to Cart
  const handleAddToCart = (
    item: MenuItem,
    customization: CustomizationOption,
    quantity: number
  ) => {
    // calculate price
    let extraCost = 0;
    if (customization.milk === 'aveia' || customization.milk === 'amendoas') extraCost += 3.00;
    if (customization.extraShot) extraCost += 4.00;
    if (customization.whippedCream) extraCost += 2.50;

    const unitPrice = item.price + extraCost;
    const totalPrice = unitPrice * quantity;

    // generate unique key
    const cartId = `${item.id}-${customization.milk || 'def'}-${customization.sweetness || 'def'}-${
      customization.extraShot ? 'shot' : 'noshot'
    }-${customization.whippedCream ? 'cream' : 'nocream'}-${Date.now()}`;

    const newCartItem: CartItem = {
      cartId,
      item,
      quantity,
      customization,
      totalPrice,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    showToast(`"${item.name}" adicionado ao seu pedido!`);
  };

  // Quick Add non-customizable
  const handleQuickAdd = (item: MenuItem) => {
    handleAddToCart(item, {}, 1);
  };

  // Cart quantity controls
  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((c) => {
        if (c.cartId === cartId) {
          const unitPrice = c.totalPrice / c.quantity;
          return {
            ...c,
            quantity,
            totalPrice: unitPrice * quantity,
          };
        }
        return c;
      })
    );
  };

  // Remove Cart Item
  const handleRemoveCartItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((c) => c.cartId !== cartId));
  };

  // Open Checkout
  const handleOpenCheckout = (
    deliveryType: 'retirada' | 'entrega',
    discountAmount: number,
    couponApplied: string
  ) => {
    setCheckoutParams({ deliveryType, discountAmount, couponApplied });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Total cart count
  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0c0a09] text-stone-900 dark:text-stone-100 font-sans antialiased selection:bg-stone-900 dark:selection:bg-amber-400 selection:text-white dark:selection:text-stone-950 pb-16 transition-colors duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-stone-950 dark:bg-stone-900 text-white dark:text-stone-100 px-4 py-3 rounded-2xl border border-stone-800 shadow-2xl flex items-center gap-3 animate-slide-up">
          <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        userProfile={userProfile}
        onOpenProfile={() => setIsProfileOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Hero Section */}
      <Hero
        onExploreMenu={() => {
          setActiveSection('menu');
          const el = document.getElementById('main-content-view');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenReservation={() => setIsReservationOpen(true)}
        onSelectCategory={(cat) => {
          setActiveSection('menu');
          setSelectedCategory(cat as any);
        }}
        onSelectTag={(tag) => {
          setActiveSection('menu');
          setActiveTag(tag);
        }}
        onSelectSection={(sec) => setActiveSection(sec)}
      />

      {/* Sticky Shortcuts Bar for Content Views */}
      <div id="main-content-view" className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-y border-stone-200 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveSection('menu')}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                activeSection === 'menu'
                  ? 'bg-stone-950 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 border border-transparent'
              }`}
            >
              <Coffee className="w-3.5 h-3.5 text-amber-300" />
              <span>Cardápio</span>
            </button>

            <button
              onClick={() => setActiveSection('espaco')}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                activeSection === 'espaco'
                  ? 'bg-stone-950 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 border border-transparent'
              }`}
            >
              <Laptop className="w-3.5 h-3.5 text-stone-300" />
              <span>O Espaço & Co-Working</span>
            </button>

            <button
              onClick={() => setActiveSection('metodos')}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                activeSection === 'metodos'
                  ? 'bg-stone-950 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 border border-transparent'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Métodos de Extração</span>
            </button>

            <button
              onClick={() => setActiveSection('fidelidade')}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                activeSection === 'fidelidade'
                  ? 'bg-stone-950 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 border border-transparent'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>Clube Fidelidade</span>
            </button>

            <button
              onClick={() => setActiveSection('localizacao')}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                activeSection === 'localizacao'
                  ? 'bg-stone-950 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 border border-transparent'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Avaliações & Localização</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Content Container - Renders ONLY the active section selected by shortcuts */}
      <main className="min-h-[450px]">
        {activeSection === 'menu' && (
          <MenuSection
            onSelectItem={(item) => setSelectedMenuItem(item)}
            onQuickAdd={handleQuickAdd}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
          />
        )}

        {activeSection === 'espaco' && (
          <SpaceSection onOpenReservation={() => setIsReservationOpen(true)} />
        )}

        {activeSection === 'metodos' && (
          <CoffeeMethods />
        )}

        {activeSection === 'fidelidade' && (
          <LoyaltySection />
        )}

        {activeSection === 'localizacao' && (
          <LocationSection />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={userProfile}
        onSaveProfile={handleSaveProfile}
        onDeleteProfile={handleDeleteProfile}
      />

      {/* Item Customization Modal */}
      <ItemModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        deliveryType={checkoutParams.deliveryType}
        discountAmount={checkoutParams.discountAmount}
        couponApplied={checkoutParams.couponApplied}
        onClearCart={() => setCartItems([])}
        userProfile={userProfile}
      />

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        userProfile={userProfile}
      />

    </div>
  );
}
