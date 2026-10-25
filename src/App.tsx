import React, { useState } from 'react';
import { TabType, RegionInfo, CartItem, ProductItem } from './types';
import { REGIONS, PRODUCTS_LIST } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { TravelView } from './components/TravelView';
import { HotelsView } from './components/HotelsView';
import { ShopView } from './components/ShopView';
import { ServicesView } from './components/ServicesView';
import {
  RegionPickerModal,
  BookingDrawer,
  InteractiveMapModal,
  CheckoutDrawer,
  NotificationsModal,
  ProfileModal,
} from './components/Modals';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [selectedRegion, setSelectedRegion] = useState<RegionInfo>(REGIONS[1]); // Hunza & Gilgit
  
  // Cart state - initialized with the 2 items matching Image 7 / 8 (PKR 3,550 total)
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS_LIST[0], quantity: 1 }, // Hunza Apricots 1,450 (or similar)
    { product: PRODUCTS_LIST[1], quantity: 1 }, // Walnut kernels 2,100 -> 1,450 + 2,100 = 3,550!
  ]);

  // Modal states
  const [isRegionPickerOpen, setIsRegionPickerOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Travel / Jeep Booking Drawer state
  const [bookingDrawer, setBookingDrawer] = useState<{
    isOpen: boolean;
    title: string;
    rate: string;
    driver?: string;
    isSeat?: boolean;
  }>({
    isOpen: false,
    title: '',
    rate: '',
    driver: '',
    isSeat: false,
  });

  // Global Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  const handleAddToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added ${product.title.split(' ')[0]} to cart!`);
  };

  const handleOpenBooking = (
    title: string,
    rate: string,
    driver?: string,
    isSeat?: boolean
  ) => {
    setBookingDrawer({
      isOpen: true,
      title,
      rate,
      driver: driver || 'Verified Mountain Driver',
      isSeat: !!isSeat,
    });
  };

  const handleConfirmBooking = (details: { name: string; phone: string; date: string; duration: string; seats: number }) => {
    showToast(`Booking confirmed for ${details.name}! Driver dispatched notification sent.`);
  };

  const handleConfirmOrder = (details: { name: string; phone: string; address: string; paymentMethod: string }) => {
    setCart([]);
    showToast(`Order confirmed for ${details.name}! Rider dispatching from GB warehouse.`);
  };

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-start text-on-surface antialiased selection:bg-primary-fixed selection:text-primary">
      {/* Centered Mobile Container */}
      <div className="w-full max-w-md sm:max-w-lg min-h-screen bg-surface flex flex-col relative shadow-sm border-x border-surface-container/30">
        
        {/* Fixed Header */}
        <Header
          currentTab={currentTab}
          selectedRegion={selectedRegion}
          onOpenRegionPicker={() => setIsRegionPickerOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          unreadCount={2}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
          {currentTab === 'home' && (
            <HomeView
              selectedRegion={selectedRegion}
              onSelectRegion={setSelectedRegion}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenBookingModal={handleOpenBooking}
              onOpenStayDetails={() => {
                setCurrentTab('hotels');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onAddToCart={handleAddToCart}
              onShowToast={showToast}
            />
          )}

          {currentTab === 'travel' && (
            <TravelView
              onOpenBookingModal={handleOpenBooking}
              onOpenMapModal={() => setIsMapModalOpen(true)}
              onShowToast={showToast}
            />
          )}

          {currentTab === 'hotels' && (
            <HotelsView
              onShowToast={showToast}
              onOpenMapModal={() => setIsMapModalOpen(true)}
            />
          )}

          {currentTab === 'shop' && (
            <ShopView
              cart={cart}
              onAddToCart={handleAddToCart}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
              onShowToast={showToast}
            />
          )}

          {currentTab === 'services' && (
            <ServicesView onShowToast={showToast} />
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          onChangeTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          cartCount={cartCount}
        />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-full font-label-md text-xs sm:text-sm shadow-xl flex items-center gap-2 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
            <span className="material-symbols-outlined text-inverse-primary text-[18px]">
              check_circle
            </span>
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Modals & Drawers */}
        <RegionPickerModal
          isOpen={isRegionPickerOpen}
          onClose={() => setIsRegionPickerOpen(false)}
          selectedRegion={selectedRegion}
          onSelectRegion={(reg) => {
            setSelectedRegion(reg);
            showToast(`Switched region to ${reg.name}`);
          }}
        />

        <BookingDrawer
          isOpen={bookingDrawer.isOpen}
          onClose={() => setBookingDrawer((prev) => ({ ...prev, isOpen: false }))}
          title={bookingDrawer.title}
          rate={bookingDrawer.rate}
          driver={bookingDrawer.driver}
          isPerSeat={bookingDrawer.isSeat}
          onSubmit={handleConfirmBooking}
        />

        <InteractiveMapModal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
        />

        <CheckoutDrawer
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cart={cart}
          totalPrice={cartTotal}
          onConfirmOrder={handleConfirmOrder}
        />

        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
        />

        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      </div>
    </div>
  );
}
