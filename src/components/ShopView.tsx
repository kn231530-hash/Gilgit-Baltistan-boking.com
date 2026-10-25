import React, { useState } from 'react';
import { ProductItem, CartItem } from '../types';
import { PRODUCTS_LIST } from '../data/mockData';

interface ShopViewProps {
  cart: CartItem[];
  onAddToCart: (product: ProductItem) => void;
  onOpenCheckout: () => void;
  onShowToast: (message: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  cart,
  onAddToCart,
  onOpenCheckout,
  onShowToast,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteProds, setFavoriteProds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Items', icon: 'apps' },
    { id: 'dry-fruits', label: 'Organic Dry Fruits', icon: 'nutrition' },
    { id: 'shawls', label: 'Woolen & Pakol', icon: 'styler' },
    { id: 'gemstones', label: 'Gemstones & Silver', icon: 'diamond' },
    { id: 'honey', label: 'Mountain Honey', icon: 'eco' },
    { id: 'tech', label: 'Camp Electronics', icon: 'devices' },
  ];

  const toggleFav = (id: string) => {
    setFavoriteProds((prev) => {
      const state = !prev[id];
      onShowToast(state ? 'Added item to your wishlist' : 'Removed from wishlist');
      return { ...prev, [id]: state };
    });
  };

  const filteredProducts = PRODUCTS_LIST.filter((prod) => {
    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col w-full pb-28 space-y-4">
      {/* Search & Alpine Location Pill Ribbon */}
      <section className="px-4 pt-3 flex flex-col gap-2">
        <div className="relative w-full">
          <div className="flex items-center w-full bg-surface-container-lowest rounded-full shadow-xs border border-surface-container/60 px-3.5 py-2 gap-2 focus-within:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-primary text-[20px]">search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 outline-none text-xs xs:text-sm text-on-surface placeholder:text-outline font-medium"
              placeholder="Search apricots, gemstones, pure shilajit..."
              type="text"
            />
            <button
              onClick={() => onShowToast('Voice search: Speak in English or Urdu')}
              aria-label="Voice Search"
              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </button>
            <button
              onClick={() => onShowToast('Filter by: Organic Certified, Valley Harvest, Price')}
              aria-label="Filter Options"
              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          </div>
        </div>

        {/* Category Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  onShowToast(`Filtered by ${cat.label}`);
                }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-md text-xs shadow-xs transition-all font-bold ${
                  isSelected
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Special GB Specialty Banner */}
      <section className="px-4">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-xs bg-primary-container text-on-primary border border-primary/20">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYGeSeQy1SsrEwP06wPCERs0xGIZv1odxL_NONAI4m7U8U_C6JflQM0z2NCIlEx1AJrdZGiIDP0F7RLcRIWYyTRyxd-v4zoSzUgicdag8x_J_2mBsgo5F7dHi0GG-Rjn-KigmAmzNgRywIJqymYwB-rQrVpSbIkFbXWUCF6v6tHa6wPORWCW4qKsgB4CDjv1k3Pm1aaX82fbm71wwmGb2yuGoiXqnqVyAzwXgEpqVsBaF7z-33ueOs')",
            }}
          />
          <div className="relative z-10 p-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-1 bg-primary-fixed text-on-primary-fixed w-max px-2.5 py-0.5 rounded-full shadow-xs">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              <span className="font-label-sm text-[10px] font-bold uppercase tracking-wide">
                Orchard Direct • Gilgit-Baltistan
              </span>
            </div>
            <h2 className="font-headline font-bold text-lg xs:text-xl text-on-primary leading-tight max-w-[280px]">
              100% Organic Hunza Dry Fruits &amp; Shilajit
            </h2>
            <p className="text-xs text-on-primary-container max-w-[280px] line-clamp-1 opacity-90">
              Hand-harvested by local alpine cooperative families. Lab tested purity.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveCategory('dry-fruits');
                  onShowToast('Showing organic alpine harvest products');
                }}
                className="px-3 py-1.5 bg-secondary-container text-on-secondary-container font-label-sm text-xs font-bold rounded-lg shadow-xs flex items-center gap-1 active:scale-95 transition-transform"
              >
                <span>Explore Harvest</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
              <span className="text-[11px] text-on-primary/90 font-medium">
                Dispatches in 24h
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Stats & Guarantee Strip */}
      <section className="px-4">
        <div className="flex items-center justify-between bg-surface-container-low px-3.5 py-2 rounded-xl text-on-surface-variant font-label-sm text-xs border border-surface-container/60">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
            <span className="font-semibold">Express GB &amp; Nationwide</span>
          </div>
          <div className="h-3 w-px bg-outline-variant" />
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary">format_image_left</span>
            <span className="font-semibold">100% Native GB Origin</span>
          </div>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="px-4">
        <div className="flex items-center justify-between pb-2">
          <div>
            <h3 className="font-headline font-bold text-base text-on-surface">Artisan &amp; Mountain Provisions</h3>
            <p className="text-xs text-outline">Direct trade supporting mountain artisans</p>
          </div>
          <span className="bg-surface-container px-2.5 py-0.5 rounded-full text-xs font-bold text-on-surface-variant">
            {filteredProducts.length} Available
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3" id="product-grid">
          {filteredProducts.map((p) => {
            const isFav = favoriteProds[p.id];
            return (
              <article
                key={p.id}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs border border-surface-container/60 flex flex-col justify-between group"
              >
                <div className="relative w-full aspect-[4/3] bg-surface-container">
                  <img
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={p.image}
                  />
                  {p.badge && (
                    <span className="absolute top-2 left-2 bg-error text-on-error font-label-sm text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {p.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleFav(p.id)}
                    aria-label="Favorite"
                    className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-lowest/90 backdrop-blur-xs flex items-center justify-center transition-colors ${
                      isFav ? 'text-error' : 'text-outline hover:text-error'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isFav ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>
                  <div className="absolute bottom-1.5 left-2 bg-surface-container-lowest/90 backdrop-blur-md px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                    <span
                      className="material-symbols-outlined text-[12px] text-secondary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-[10px] font-bold text-on-surface">{p.rating}</span>
                    <span className="text-[9px] text-outline">({p.reviewsCount})</span>
                  </div>
                </div>

                <div className="p-2.5 flex flex-col flex-1 justify-between gap-1.5">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-primary">verified</span>
                      <span className="text-[10px] text-primary font-bold truncate">{p.seller}</span>
                    </div>
                    <h4 className="font-headline font-bold text-xs text-on-surface line-clamp-2 leading-snug">
                      {p.title}
                    </h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary-container" />
                      <span className="text-[10px] text-secondary font-medium truncate">{p.stockNote}</span>
                    </div>
                  </div>

                  <div className="pt-1 flex flex-col gap-1.5 border-t border-surface-container/40">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-currency-pkr text-sm text-primary font-black">
                        PKR {p.price.toLocaleString()}
                      </span>
                      {p.originalPrice && (
                        <span className="text-[10px] line-through text-outline">
                          {p.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      <button
                        onClick={() => onAddToCart(p)}
                        className="col-span-3 bg-primary text-on-primary py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform shadow-xs hover:bg-primary-container"
                      >
                        <span className="material-symbols-outlined text-[15px]">add_shopping_cart</span>
                        <span>Add</span>
                      </button>
                      <a
                        aria-label="Direct WhatsApp Order"
                        className="col-span-1 bg-surface-container-high text-[#128C7E] rounded-xl flex items-center justify-center active:scale-95 transition-transform hover:bg-surface-container"
                        href={`https://wa.me/923000000000?text=I%20want%20to%20order%20${encodeURIComponent(p.title)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="material-symbols-outlined text-[18px]">chat</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Sticky Cart Bottom Bar */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-16 left-0 right-0 z-30 px-4 pb-2 transition-transform duration-300">
          <div className="max-w-2xl mx-auto bg-inverse-surface text-inverse-on-surface rounded-2xl p-3 shadow-xl flex items-center justify-between gap-3 border border-white/10">
            <div className="flex items-center gap-2.5 pl-1">
              <div className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span className="absolute -top-1 -right-1 bg-secondary-container text-on-secondary-container text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-inverse-on-surface">
                    {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
                  </span>
                  <span className="text-outline text-xs">•</span>
                  <span className="text-[10px] font-semibold text-inverse-primary">Free Local Pick</span>
                </div>
                <span className="font-currency-pkr text-base text-white font-black tracking-tight">
                  PKR {cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenCheckout}
              className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2.5 rounded-xl font-headline font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
            >
              <span>Checkout</span>
              <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
