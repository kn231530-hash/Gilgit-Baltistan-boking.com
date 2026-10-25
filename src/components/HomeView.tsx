import React, { useState } from 'react';
import { RegionInfo, TabType, ProductItem } from '../types';
import { HERO_MOUNTAIN_IMG, REGIONS } from '../data/mockData';

interface HomeViewProps {
  selectedRegion: RegionInfo;
  onSelectRegion: (region: RegionInfo) => void;
  onNavigateTab: (tab: TabType) => void;
  onOpenBookingModal: (title: string, rate: string, driver?: string, isSeat?: boolean) => void;
  onOpenStayDetails: (stayId: string) => void;
  onAddToCart: (product: ProductItem) => void;
  onShowToast: (message: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  selectedRegion,
  onSelectRegion,
  onNavigateTab,
  onOpenBookingModal,
  onOpenStayDetails,
  onAddToCart,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const sampleProducts: ProductItem[] = [
    {
      id: 'prod-1',
      title: 'Hunza Walnuts & Apricots',
      seller: 'Mountain Harvest Hunza',
      category: 'dry-fruits',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHVGZMgmdeOOyl6W4dyXTq-d04hjWynPW3JMtuPBPctYwa1Tv8SwaoLQc6EmCA38UDZ5pxYm0q_vhKhyZoJUcqjnpa14R_vrxLslF9okNXrgbKnDttGe13KOQ-IHMJba7BwTJziprJP6s2uP2wDR2t0mQsb30hs8jFAZkvAaSHoIcNTW7RuQ7t0wlKCjAPVUzSUBt38XJn-V9pX_Fs4PCBJcGFzGVwAnNMiN9bFPWYL_fr7ego0dmQ',
      price: 1650,
      unit: '1kg sealed harvest pack',
      rating: 4.9,
      reviewsCount: 128,
      stockNote: '1kg sealed harvest pack',
      isOrganic: true,
    },
    {
      id: 'prod-3',
      title: 'Pure Woolen Pakol & Shawl',
      seller: 'Chitral & Nagar Guild',
      category: 'shawls',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYiTLoCpeANO6oIKROZY9MpqOpS4REszB5B7KtoTqfyabepQEtnlHHlFMMOxtXXWZxbLhd2ECFa9ZWvcUsuOciuhKojEuB6Ez_HnjSspPsfZejfs-bQB_bXE7SvGfIdEH3rgrzTXFl18XhrCW9yU6b_LmjtN7CDve9c2R-1BvMc2jG6B1xZd9qm_7czbcbG7-B1GTItxOXsa_JW_Y8w7ULn4Qbj990soSgXpZTpvpRNxdn4RndfkEc',
      price: 3200,
      unit: 'Natural sheep wool weave',
      rating: 5.0,
      reviewsCount: 62,
      stockNote: 'Natural sheep wool weave',
      isArtisan: true,
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onShowToast(`Searching across Gilgit-Baltistan for "${searchQuery}"...`);
      // route appropriately based on terms
      const q = searchQuery.toLowerCase();
      if (q.includes('hotel') || q.includes('room') || q.includes('resort') || q.includes('stay')) {
        onNavigateTab('hotels');
      } else if (q.includes('jeep') || q.includes('bus') || q.includes('car') || q.includes('transit') || q.includes('ride')) {
        onNavigateTab('travel');
      } else if (q.includes('apricot') || q.includes('fruit') || q.includes('honey') || q.includes('gem') || q.includes('pakol') || q.includes('shop')) {
        onNavigateTab('shop');
      } else if (q.includes('mechanic') || q.includes('guide') || q.includes('electric') || q.includes('doctor')) {
        onNavigateTab('services');
      }
    }
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-6">
      {/* 1. Universal Search & Regional Filter Ribbon */}
      <section className="px-4 pt-2 flex flex-col gap-2">
        {/* Search Pill */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative w-full flex items-center bg-surface-container-lowest shadow-xs rounded-full p-1.5 focus-within:shadow-md border border-surface-container transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 ml-1">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent px-3 text-sm text-on-surface placeholder:text-outline focus:outline-none"
            placeholder="Hotels, 4x4 jeeps, dry fruits, guides..."
            type="text"
          />
          <button
            type="button"
            onClick={() => onShowToast('Filters configured for GB Valleys')}
            className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors mr-1 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </form>

        {/* Quick Location Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          {REGIONS.map((region) => {
            const isSelected = selectedRegion.id === region.id;
            return (
              <button
                key={region.id}
                onClick={() => {
                  onSelectRegion(region);
                  onShowToast(`Selected ${region.name} Valley`);
                }}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-md text-xs shadow-xs transition-transform active:scale-95 ${
                  isSelected
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {region.id === 'all' && (
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                )}
                <span>{region.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Hero Promo Banner: Alpine Visual Storytelling */}
      <section className="px-4">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-inverse-surface min-h-[210px] flex flex-col justify-end p-5">
          {/* Background Scenic Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `url('${HERO_MOUNTAIN_IMG}')`,
            }}
          />
          {/* Dual Scrim Overlays for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary/60 to-transparent" />

          {/* Content Stack */}
          <div className="relative z-10 flex flex-col items-start gap-1">
            <div className="flex items-center gap-1.5 bg-secondary-container/90 backdrop-blur-md px-2.5 py-1 rounded-full text-on-secondary-container shadow-xs">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span className="font-label-sm text-[11px] font-bold uppercase tracking-wide">
                ALL IN ONE PLACE
              </span>
            </div>
            <h2 className="font-display-lg-mobile text-2xl xs:text-3xl font-extrabold text-on-primary leading-tight mt-1 drop-shadow-sm">
              Karakoram &amp; Himalayas
            </h2>
            <p className="font-body-sm text-xs text-inverse-on-surface line-clamp-1 opacity-90">
              Travel, handpicked stays, dry fruits &amp; vetted local guides.
            </p>
            <div className="mt-3 flex items-center gap-2 w-full flex-wrap">
              <button
                onClick={() => onNavigateTab('travel')}
                className="px-5 py-2.5 bg-primary-fixed text-on-primary-fixed font-label-lg text-xs font-bold rounded-xl shadow-xs hover:bg-white transition-colors flex items-center gap-1.5 active:scale-95"
              >
                <span>Explore Now</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
              <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-surface-container-lowest/20 backdrop-blur-md text-on-primary font-label-sm text-xs border border-white/10">
                <span className="material-symbols-outlined text-[15px] text-secondary-fixed">
                  wb_sunny
                </span>
                <span>{selectedRegion.name} {selectedRegion.temp} {selectedRegion.condition}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Four Core Ecosystem Pillars (2x2 Grid) */}
      <section className="px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-base text-on-surface">Explore GB One</h3>
          <span className="font-label-sm text-xs text-primary flex items-center font-bold">
            4 Services
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* 1. Travel & 4x4 */}
          <div
            onClick={() => onNavigateTab('travel')}
            className="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container/60 flex flex-col justify-between hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[26px]">directions_car</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-primary mt-1" />
            </div>
            <div className="mt-4">
              <h4 className="font-headline font-bold text-sm text-on-surface">Travel &amp; 4x4</h4>
              <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">
                Deosai safaris, Hiace &amp; rugged jeep hire.
              </p>
            </div>
          </div>

          {/* 2. Scenic Stays */}
          <div
            onClick={() => onNavigateTab('hotels')}
            className="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container/60 flex flex-col justify-between hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[26px]">hotel</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-secondary-container mt-1" />
            </div>
            <div className="mt-4">
              <h4 className="font-headline font-bold text-sm text-on-surface">Hotels &amp; Huts</h4>
              <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">
                Riverfront glamping, suites &amp; alpine huts.
              </p>
            </div>
          </div>

          {/* 3. Local Market */}
          <div
            onClick={() => onNavigateTab('shop')}
            className="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container/60 flex flex-col justify-between hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[26px]">shopping_basket</span>
              </div>
              <span className="font-label-sm text-[10px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded font-bold">
                Fresh
              </span>
            </div>
            <div className="mt-4">
              <h4 className="font-headline font-bold text-sm text-on-surface">GB Bazaar</h4>
              <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">
                Organic dry fruits, honey, Pakols &amp; gems.
              </p>
            </div>
          </div>

          {/* 4. Community Services */}
          <div
            onClick={() => onNavigateTab('services')}
            className="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container/60 flex flex-col justify-between hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[26px]">handyman</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
            </div>
            <div className="mt-4">
              <h4 className="font-headline font-bold text-sm text-on-surface">Local Pros</h4>
              <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">
                Mechanics, plumbers, K2 guides &amp; medics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trending Travel Routes & 4x4 Jeep Rentals */}
      <section className="flex flex-col gap-3">
        <div className="px-4 flex items-center justify-between">
          <div>
            <h3 className="font-headline font-bold text-base text-on-surface">
              Trending Routes &amp; 4x4s
            </h3>
            <p className="text-xs text-on-surface-variant">
              Guaranteed seats &amp; experienced mountain drivers
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('travel')}
            className="font-label-md text-xs text-primary flex items-center gap-0.5 font-bold hover:underline"
          >
            <span>See all</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Horizontal scroll cards */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 py-1">
          {/* Card 1: Coaster / Executive Hiace */}
          <div className="min-w-[280px] max-w-[280px] bg-surface-container-lowest rounded-2xl shadow-xs border border-surface-container/60 overflow-hidden flex flex-col shrink-0">
            <div className="relative h-36 w-full">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCH9mFPqpBJwm9m6fIr_37lcjkw5ULqv34TzFOlSwonTNfqE4J7KKVBoq5zgNmRuu3EJ7wiJqWrfBO-_Ae36JNycsxTZfX1nvzXbVHeOX7vl_wjBDx-29mMjLNoOZbrV-GjcsuFKSaLrluVXZ7BD3eeR09qhyRG_d9uBu-zrdL-1rhxNSwOC7Fpt3-YD1QckUVJXb1SbwiFz8m9G9iRCtYAqtxdbbdpwgHHmeixa-Q4bEZJREZNn_s6')",
                }}
              />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-[10px] font-bold flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[12px] text-primary">schedule</span>
                <span>Daily 7:00 AM</span>
              </div>
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-surface-container-highest/90 backdrop-blur-sm text-on-surface text-[10px] font-bold">
                  AC &amp; Wi-Fi
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-highest/90 backdrop-blur-sm text-on-surface text-[10px] font-bold">
                  Executive
                </span>
              </div>
            </div>
            <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
              <div>
                <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-[11px] font-medium">
                  <span>Islamabad</span>
                  <span className="material-symbols-outlined text-[14px]">trending_flat</span>
                  <span>Hunza / Aliabad</span>
                </div>
                <h4 className="font-headline font-bold text-sm text-on-surface mt-0.5">
                  Executive Hiace Transit
                </h4>
                <p className="text-xs text-on-surface-variant">
                  Includes Karakoram Highway stops &amp; tea
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-surface-container/60">
                <div>
                  <span className="font-currency-pkr text-base text-primary font-black">PKR 4,500</span>
                  <span className="text-xs text-outline font-normal"> / seat</span>
                </div>
                <button
                  onClick={() => onOpenBookingModal('Executive Hiace Transit (Islamabad ➔ Hunza)', 'PKR 4,500', 'NATCO Senior Driver', true)}
                  className="px-3 py-1.5 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold shadow-xs hover:bg-primary-container transition-colors active:scale-95"
                >
                  Book Seat
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: 4x4 Deosai Safari */}
          <div className="min-w-[280px] max-w-[280px] bg-surface-container-lowest rounded-2xl shadow-xs border border-surface-container/60 overflow-hidden flex flex-col shrink-0">
            <div className="relative h-36 w-full">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGcJ3FjMErXoPZi1tON_ygqFBPut79nKCC9PEx750Pr49aP67Dy8hgMAZyAMXBQmnqGnqRGzLQ6iF0-8in85XBb95IEu9pmUOwADKxy7cSkLrus4KvwX49LYDGtuvNgKZYttxs3uyFy7DByaAr-lT-qpGmGUikCAjTuISeo0SCE6_DZnTRHhM-1-IV8b6wFNIfVrfpPTmrjIrvksVhCTU7SGjDleiN2beSJv95_BZVaY5pSqqFsM9e')",
                }}
              />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-[10px] font-bold flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[12px]">local_fire_department</span>
                <span>Popular Route</span>
              </div>
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-surface-container-highest/90 backdrop-blur-sm text-on-surface text-[10px] font-bold">
                  Includes Driver
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-highest/90 backdrop-blur-sm text-on-surface text-[10px] font-bold">
                  7 Seater
                </span>
              </div>
            </div>
            <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
              <div>
                <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-[11px] font-medium">
                  <span>Skardu</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_right_alt</span>
                  <span>Deosai Plateau &amp; Plains</span>
                </div>
                <h4 className="font-headline font-bold text-sm text-on-surface mt-0.5">
                  Land Cruiser 4x4 Safari
                </h4>
                <p className="text-xs text-on-surface-variant">
                  Vetted mountain driver, fuel package optional
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-surface-container/60">
                <div>
                  <span className="font-currency-pkr text-base text-primary font-black">PKR 18,000</span>
                  <span className="text-xs text-outline font-normal"> / day</span>
                </div>
                <button
                  onClick={() => onOpenBookingModal('Land Cruiser 4x4 Deosai Safari', 'PKR 18,000', 'Ustad Karim Skardu', false)}
                  className="px-3 py-1.5 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold shadow-xs hover:bg-primary-container transition-colors active:scale-95"
                >
                  Rent 4x4
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Scenic Stays */}
      <section className="px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline font-bold text-base text-on-surface">Handpicked Stays</h3>
            <p className="text-xs text-on-surface-variant">Heated glamping domes &amp; heritage hotels</p>
          </div>
          <button
            onClick={() => onNavigateTab('hotels')}
            className="font-label-md text-xs text-primary flex items-center gap-0.5 font-bold hover:underline"
          >
            <span>Explore</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {/* Stay Item 1: Glamping Attabad */}
          <div className="bg-surface-container-lowest rounded-2xl p-3 shadow-xs border border-surface-container/60 flex gap-3 hover:shadow-md transition-all">
            <div className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDllojAEzphWOHgfHyin0_UzDS-yVAiMg9NUm2O-EzsWJOjAME1T9XB3VyUb1XT6POdJBBPYGUm7jnALySYk1OXiZKmQy894nwlv2XQjYlQFSueHfYB03C116psuZ43wbPk8KZW_ad4lFB0Y8hw8ko2hQtpcenVbSdMDTO1GaFY6y_s6R4kEuVFKTg1L5-NLltZxoj2G39JZFlrmzBcoo4JC_jgCEPX7tA6TOgoh586HgebMb9Zzuws')",
                }}
              />
              <div className="absolute bottom-1.5 left-1.5 bg-surface-container-lowest/90 backdrop-blur-xs px-1.5 py-0.5 rounded text-[11px] font-bold text-on-surface flex items-center gap-0.5 shadow-xs">
                <span className="material-symbols-outlined text-[13px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span>4.9</span>
              </div>
            </div>
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div>
                <div className="flex items-center gap-1 text-primary font-label-sm text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[13px]">location_on</span>
                  <span className="truncate">Attabad Lake, Gojal</span>
                </div>
                <h4 className="font-headline font-bold text-sm text-on-surface truncate mt-0.5">
                  Attabad Lake Glamping Pods
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-on-surface-variant flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px] text-primary">fireplace</span> Heated
                  </span>
                  <span className="text-xs text-on-surface-variant flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px] text-primary">wifi</span> Free Wi-Fi
                  </span>
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="font-currency-pkr text-sm text-primary font-black">PKR 14,000</span>
                  <span className="text-xs text-outline"> / night</span>
                </div>
                <button
                  onClick={() => onOpenStayDetails('stay-1')}
                  className="px-2.5 py-1 rounded-lg bg-surface-container-low text-primary font-label-md text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors active:scale-95"
                >
                  Details
                </button>
              </div>
            </div>
          </div>

          {/* Stay Item 2: Serena Gilgit */}
          <div className="bg-surface-container-lowest rounded-2xl p-3 shadow-xs border border-surface-container/60 flex gap-3 hover:shadow-md transition-all">
            <div className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRSue9NjCzYFR4xYVcVJ2cvykWF2luQm6Wi_IMirE2CAVOjux_HfC0nG3TwtRunfrm5x_NrT_kFu-zm4AXXJn4ggpww_2Qm-TFq8hBm_zvKgdhmE3W53KiHIutro5vwJV-z6RMq1ufhn1PqFaB93i8bcnQtNA4N2ukB-af9S6jWyACyqZzwPOL1smnALVEOEOYEyxirUsMRGHdczlR6hq4NLhmHadnE5b3H3WPEIVVPeGRNUuPHdTt')",
                }}
              />
              <div className="absolute bottom-1.5 left-1.5 bg-surface-container-lowest/90 backdrop-blur-xs px-1.5 py-0.5 rounded text-[11px] font-bold text-on-surface flex items-center gap-0.5 shadow-xs">
                <span className="material-symbols-outlined text-[13px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span>4.8</span>
              </div>
            </div>
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div>
                <div className="flex items-center gap-1 text-primary font-label-sm text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[13px]">location_on</span>
                  <span className="truncate">Gilgit City Center</span>
                </div>
                <h4 className="font-headline font-bold text-sm text-on-surface truncate mt-0.5">
                  Serena Gilgit Heritage Suite
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-on-surface-variant flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px] text-primary">restaurant</span> Breakfast
                  </span>
                  <span className="text-xs text-on-surface-variant flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px] text-primary">spa</span> Garden
                  </span>
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="font-currency-pkr text-sm text-primary font-black">PKR 22,000</span>
                  <span className="text-xs text-outline"> / night</span>
                </div>
                <button
                  onClick={() => onOpenStayDetails('stay-4')}
                  className="px-2.5 py-1 rounded-lg bg-surface-container-low text-primary font-label-md text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors active:scale-95"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Authentic GB Organic & Artisan Products */}
      <section className="px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline font-bold text-base text-on-surface">
              Pure Gilgit-Baltistan Produce
            </h3>
            <p className="text-xs text-on-surface-variant">
              Direct from valley farmers &amp; master weavers
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('shop')}
            className="font-label-md text-xs text-primary flex items-center gap-0.5 font-bold hover:underline"
          >
            <span>Shop all</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {sampleProducts.map((p) => (
            <div
              key={p.id}
              className="bg-surface-container-lowest rounded-2xl p-3 shadow-xs border border-surface-container/60 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-32 rounded-xl overflow-hidden mb-2">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${p.image}')` }}
                  />
                  <span
                    className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs ${
                      p.isOrganic
                        ? 'bg-primary text-on-primary'
                        : 'bg-secondary-container text-on-secondary-container'
                    }`}
                  >
                    {p.isOrganic ? 'Organic' : 'Artisan'}
                  </span>
                </div>
                <h4 className="font-label-lg text-xs font-bold text-on-surface line-clamp-1">
                  {p.title}
                </h4>
                <p className="text-[11px] text-on-surface-variant truncate">{p.unit}</p>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-surface-container/40">
                <span className="font-currency-pkr text-sm text-primary font-black">
                  PKR {p.price.toLocaleString()}
                </span>
                <button
                  onClick={() => onAddToCart(p)}
                  className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-primary hover:text-on-primary flex items-center justify-center text-primary transition-colors active:scale-95"
                  aria-label="Add to cart"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Verified Local Experts (On-Demand Help) */}
      <section className="px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-headline font-bold text-base text-on-surface">
                Verified Local Experts
              </h3>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Immediate roadside help, electricians &amp; K2 guides
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Expert 1: Mechanic */}
          <div className="bg-surface-container-lowest p-3 rounded-2xl shadow-xs border border-surface-container/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary overflow-hidden">
                  <span className="material-symbols-outlined text-[24px]">car_repair</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 bg-primary text-on-primary rounded-full p-0.5 text-[10px]">
                  <span className="material-symbols-outlined text-[10px]">verified</span>
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h5 className="font-label-lg text-xs font-bold text-on-surface truncate">
                    Juglot 4x4 Roadside Rescue
                  </h5>
                  <span className="px-1.5 py-0.2 bg-primary/10 text-primary font-label-sm text-[10px] font-bold rounded">
                    24/7
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant truncate">
                  Brake, engine, &amp; towing support on KKH
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-primary transition-colors active:scale-95"
                href="tel:1122"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </a>
              <button
                onClick={() => onShowToast('Connecting with Juglot Roadside Dispatcher...')}
                className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center transition-transform active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </button>
            </div>
          </div>

          {/* Expert 2: Mountain Guide */}
          <div className="bg-surface-container-lowest p-3 rounded-2xl shadow-xs border border-surface-container/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary overflow-hidden">
                  <span className="material-symbols-outlined text-[24px]">hiking</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 bg-primary text-on-primary rounded-full p-0.5 text-[10px]">
                  <span className="material-symbols-outlined text-[10px]">verified</span>
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h5 className="font-label-lg text-xs font-bold text-on-surface truncate">
                    Rashid Balti • K2 Trek Lead
                  </h5>
                  <span className="px-1.5 py-0.2 bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold rounded">
                    Licensed
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant truncate">
                  High altitude guide • Baltoro &amp; Concordia
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-primary transition-colors active:scale-95"
                href="tel:1122"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </a>
              <button
                onClick={() => onShowToast('Opening direct channel to Rashid Balti...')}
                className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center transition-transform active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </button>
            </div>
          </div>

          {/* Expert 3: Electrician / Solar Tech */}
          <div className="bg-surface-container-lowest p-3 rounded-2xl shadow-xs border border-surface-container/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-tertiary overflow-hidden">
                  <span className="material-symbols-outlined text-[24px]">bolt</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 bg-primary text-on-primary rounded-full p-0.5 text-[10px]">
                  <span className="material-symbols-outlined text-[10px]">verified</span>
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h5 className="font-label-lg text-xs font-bold text-on-surface truncate">
                    Karim Electric &amp; Solar
                  </h5>
                  <span className="px-1.5 py-0.2 bg-primary/10 text-primary font-label-sm text-[10px] font-bold rounded">
                    Gilgit City
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant truncate">
                  Inverter, wiring &amp; emergency backup
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-primary transition-colors active:scale-95"
                href="tel:1122"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </a>
              <button
                onClick={() => onShowToast('Connecting with Karim Solar technician...')}
                className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center transition-transform active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Trust & Local Verification Badges Footer Bar */}
      <section className="px-4 pt-1">
        <div className="bg-primary/5 rounded-2xl p-4 flex flex-col gap-3 border border-primary/15">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
            <h4 className="font-label-lg text-sm font-bold text-primary">The GB One Guarantee</h4>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center gap-1 p-2 bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container/40">
              <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
              <span className="font-label-sm text-[11px] font-semibold text-on-surface leading-tight">
                100% Vetted GB Providers
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container/40">
              <span className="material-symbols-outlined text-secondary text-[20px]">handshake</span>
              <span className="font-label-sm text-[11px] font-semibold text-on-surface leading-tight">
                Direct Local Contact
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container/40">
              <span className="material-symbols-outlined text-primary text-[20px]">price_check</span>
              <span className="font-label-sm text-[11px] font-semibold text-on-surface leading-tight">
                Zero Hidden Commission
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
