import React, { useState, useRef } from 'react';
import { StayItem } from '../types';
import { STAYS_LIST } from '../data/mockData';

interface HotelsViewProps {
  onShowToast: (message: string) => void;
  onOpenMapModal: () => void;
}

export const HotelsView: React.FC<HotelsViewProps> = ({
  onShowToast,
  onOpenMapModal,
}) => {
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');
  const [activeFilters, setActiveFilters] = useState<string[]>(['heater', 'generator']);
  const [selectedStay, setSelectedStay] = useState<StayItem>(STAYS_LIST[0]);
  const [favoriteStays, setFavoriteStays] = useState<Record<string, boolean>>({});

  // Booking Form State
  const [checkIn, setCheckIn] = useState('2026-10-27');
  const [checkOut, setCheckOut] = useState('2026-10-30');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [extraHeater, setExtraHeater] = useState(true);
  const [babyCot, setBabyCot] = useState(false);
  const [airportJeep, setAirportJeep] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const bookingFormRef = useRef<HTMLDivElement>(null);

  const regionPills = [
    { id: 'all', label: 'All Regions', icon: 'travel_explore' },
    { id: 'hunza', label: 'Karimabad Hunza', icon: 'landscape' },
    { id: 'attabad', label: 'Attabad Lake', icon: 'water' },
    { id: 'skardu', label: 'Skardu City', icon: 'sunny_snowing' },
    { id: 'phander', label: 'Phander Valley', icon: 'nature_people' },
    { id: 'nagar', label: 'Fairy Meadows & Nagar', icon: 'cabin' },
  ];

  const amenityFilters = [
    { id: 'heater', label: 'Room Heater', icon: 'heat' },
    { id: 'generator', label: '24/7 Generator', icon: 'electric_bolt' },
    { id: 'wifi', label: 'Fiber Wi-Fi', icon: 'wifi' },
    { id: 'view', label: 'Mountain View', icon: 'landscape' },
    { id: 'breakfast', label: 'Free Breakfast', icon: 'bakery_dining' },
  ];

  const toggleAmenity = (id: string) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFavorite = (id: string) => {
    setFavoriteStays((prev) => {
      const state = !prev[id];
      onShowToast(state ? 'Lodge saved to your favorites' : 'Removed from favorites');
      return { ...prev, [id]: state };
    });
  };

  const handlePrefillBooking = (stay: StayItem) => {
    setSelectedStay(stay);
    onShowToast(`Selected ${stay.title} for reservation`);
    if (bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      onShowToast(`Reservation request dispatched to ${selectedStay.title} host desk!`);
      setTimeout(() => {
        setIsConfirmed(false);
      }, 5000);
    }, 1000);
  };

  const filteredStays = STAYS_LIST.filter((stay) => {
    if (selectedRegionFilter === 'all') return true;
    if (selectedRegionFilter === 'hunza' && stay.region === 'hunza') return true;
    if (selectedRegionFilter === 'attabad' && (stay.id === 'stay-1' || stay.location.includes('Attabad'))) return true;
    if (selectedRegionFilter === 'skardu' && stay.region === 'skardu') return true;
    if (selectedRegionFilter === 'nagar' && stay.region === 'nagar') return true;
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-10 space-y-5">
      {/* Alpine Weather & Advisory Marquee */}
      <section className="px-4 pt-3">
        <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between shadow-xs border border-surface-container/60">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="material-symbols-outlined text-primary text-[20px] shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              ac_unit
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-[10px] text-primary uppercase tracking-wider font-bold">
                Alpine Winter Guide
              </span>
              <p className="text-xs text-on-surface truncate">
                Heated suites &amp; backup generators verified for cold nights
              </p>
            </div>
          </div>
          <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[12px]">verified</span> 100% Inspected
          </span>
        </div>
      </section>

      {/* Destination Pills Ribbon */}
      <section>
        <div className="flex items-center justify-between px-4 mb-2">
          <h2 className="font-headline font-bold text-base text-on-surface">Explore Valleys</h2>
          <button
            onClick={onOpenMapModal}
            className="font-label-md text-xs text-primary flex items-center font-bold hover:underline"
          >
            <span>Map View</span>
            <span className="material-symbols-outlined text-[16px] ml-0.5">map</span>
          </button>
        </div>

        <div className="flex overflow-x-auto gap-1.5 px-4 pb-1 no-scrollbar">
          {regionPills.map((pill) => {
            const isSelected = selectedRegionFilter === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => {
                  setSelectedRegionFilter(pill.id);
                  onShowToast(`Showing stays in ${pill.label}`);
                }}
                className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-md text-xs shadow-xs transition-all flex items-center gap-1 font-bold ${
                  isSelected
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{pill.icon}</span>
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Essential Mountain Amenities Quick Filter Bar */}
      <section className="px-4">
        <div className="bg-surface-container-lowest p-3 rounded-2xl shadow-xs border border-surface-container/60">
          <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-surface-container/40">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">tune</span>
              <span className="font-label-md text-xs font-bold text-on-surface">Alpine Stay Filters</span>
            </div>
            <span className="text-[11px] text-outline font-medium">
              {activeFilters.length} Active
            </span>
          </div>

          <div className="flex overflow-x-auto gap-1.5 no-scrollbar pb-0.5">
            {amenityFilters.map((amenity) => {
              const isActive = activeFilters.includes(amenity.id);
              return (
                <button
                  key={amenity.id}
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`shrink-0 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                    isActive
                      ? 'bg-primary-fixed text-on-primary-fixed-variant'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">{amenity.icon}</span>
                  <span>{amenity.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Stays Section */}
      <section className="px-4 flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-label-sm text-[10px] text-secondary font-bold tracking-wider uppercase">
              Verified Hospitality
            </span>
            <h3 className="font-display-lg-mobile text-xl font-extrabold text-on-surface mt-0.5">
              Top Lodges &amp; Resorts
            </h3>
          </div>
          <span className="text-xs text-outline">{filteredStays.length} Premier Picks</span>
        </div>

        {filteredStays.map((stay) => {
          const isFav = favoriteStays[stay.id];
          return (
            <article
              key={stay.id}
              className="bg-surface-container-lowest rounded-2xl shadow-xs border border-surface-container/60 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              {/* Media Header with Thumbnails */}
              <div className="relative w-full h-56 bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt={stay.title}
                  src={stay.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/70 via-transparent to-black/20 pointer-events-none" />

                {/* Status & Badge Overlays */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  <span className="bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {stay.badge}
                  </span>
                  {stay.highDemand && (
                    <span className="bg-secondary text-on-secondary font-label-sm text-[10px] font-bold px-2 py-1 rounded-full shadow-xs flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">local_fire_department</span> High Demand
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleFavorite(stay.id)}
                  aria-label="Add to favorites"
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center transition-colors shadow-xs ${
                    isFav ? 'text-error' : 'text-on-surface hover:text-error'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isFav ? 'favorite' : 'favorite_border'}
                  </span>
                </button>

                {/* Image Indicator Dots */}
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-surface-container-lowest" />
                  <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/50" />
                  <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/50" />
                </div>
              </div>

              {/* Content Body */}
              <div className="p-3.5 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-headline font-bold text-base text-on-surface leading-tight">
                      {stay.title}
                    </h4>
                    <div className="flex items-center gap-1 text-on-surface-variant text-xs mt-0.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">pin_drop</span>
                      <span>{stay.location}</span>
                    </div>
                  </div>

                  {/* Star Rating Pill */}
                  <div className="bg-secondary-fixed text-on-secondary-fixed flex items-center gap-1 px-2 py-1 rounded-lg shrink-0">
                    <span
                      className="material-symbols-outlined text-[16px] text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-currency-pkr text-xs font-bold">{stay.rating}</span>
                    <span className="text-[10px] text-on-secondary-fixed-variant font-medium">({stay.reviewsCount})</span>
                  </div>
                </div>

                {/* Amenities Chips */}
                <div className="flex flex-wrap gap-1.5 my-1">
                  {stay.amenities.map((amenity, i) => (
                    <span
                      key={i}
                      className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-md text-[11px] font-medium flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[13px] text-primary">check_circle</span>
                      <span>{amenity}</span>
                    </span>
                  ))}
                </div>

                {/* Pricing & Action Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-surface-container/60">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[10px] font-bold text-outline">PKR</span>
                      <span className="font-currency-pkr text-lg text-primary font-black">
                        {stay.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-xs text-outline font-normal"> / night</span>
                    </div>
                    <span className="text-[10px] text-secondary font-semibold block">{stay.tagNote}</span>
                  </div>

                  <button
                    onClick={() => handlePrefillBooking(stay)}
                    className="bg-primary hover:bg-primary-container text-on-primary font-headline font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs active:scale-95"
                  >
                    <span>Book Stay</span>
                    <span className="material-symbols-outlined text-[17px]">calendar_today</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Interactive Alpine Booking Request Card */}
      <section className="px-4" ref={bookingFormRef} id="bookingFormSection">
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-3">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-1 border-b border-surface-container/60">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[24px]">hotel_class</span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-base text-on-surface">Alpine Stay Request</h3>
                <p className="text-xs text-outline">Instant coordination with verified hosts</p>
              </div>
            </div>
            <span className="bg-surface-container-high text-tertiary text-[10px] font-bold px-2.5 py-1 rounded-full">
              Pay at Check-In
            </span>
          </div>

          {/* Selected Property Banner */}
          <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0">apartment</span>
              <div className="truncate">
                <span className="text-[10px] text-outline uppercase font-bold block">Selected Accommodation</span>
                <span className="font-bold text-xs text-on-surface truncate block">
                  {selectedStay.title} ({selectedStay.location})
                </span>
              </div>
            </div>
            <span className="font-currency-pkr text-xs text-primary font-bold shrink-0 ml-2">
              PKR {selectedStay.pricePerNight.toLocaleString()}/nt
            </span>
          </div>

          {/* Date & Room Matrix */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-surface-container-low rounded-xl p-2.5">
              <label className="text-[10px] font-bold text-outline block mb-0.5 uppercase">Check-In</label>
              <div className="flex items-center gap-1 text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">login</span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent font-bold text-xs text-on-surface w-full focus:outline-none"
                />
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl p-2.5">
              <label className="text-[10px] font-bold text-outline block mb-0.5 uppercase">Check-Out</label>
              <div className="flex items-center gap-1 text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">logout</span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent font-bold text-xs text-on-surface w-full focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Steppers: Guests & Rooms */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-surface-container-low rounded-xl p-2.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-outline block uppercase">Guests</span>
                <span className="font-bold text-xs text-on-surface">
                  {guests} {guests === 1 ? 'Adult' : 'Adults'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-7 h-7 rounded-lg bg-surface-container-lowest text-on-surface flex items-center justify-center font-bold shadow-xs active:scale-95"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setGuests(Math.min(10, guests + 1))}
                  className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold shadow-xs active:scale-95"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-2.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-outline block uppercase">Rooms</span>
                <span className="font-bold text-xs text-on-surface">
                  {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setRooms(Math.max(1, rooms - 1))}
                  className="w-7 h-7 rounded-lg bg-surface-container-lowest text-on-surface flex items-center justify-center font-bold shadow-xs active:scale-95"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setRooms(Math.min(5, rooms + 1))}
                  className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold shadow-xs active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Special Requests Chips */}
          <div>
            <span className="text-[11px] font-bold text-on-surface-variant block mb-1">
              Mountain Travel Add-ons:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <label className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1.5 rounded-xl text-on-surface text-xs cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={extraHeater}
                  onChange={(e) => setExtraHeater(e.target.checked)}
                  className="rounded text-primary focus:ring-0"
                />
                <span>Extra Wood Heater</span>
              </label>

              <label className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1.5 rounded-xl text-on-surface text-xs cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={babyCot}
                  onChange={(e) => setBabyCot(e.target.checked)}
                  className="rounded text-primary focus:ring-0"
                />
                <span>Baby Cot</span>
              </label>

              <label className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1.5 rounded-xl text-on-surface text-xs cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={airportJeep}
                  onChange={(e) => setAirportJeep(e.target.checked)}
                  className="rounded text-primary focus:ring-0"
                />
                <span>Skardu/Gilgit Airport Jeep</span>
              </label>
            </div>
          </div>

          {/* Payment Assurance & Action */}
          <div className="pt-2 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
                <span>No upfront credit card required</span>
              </div>
              <span className="text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full">
                Online Cards Q3
              </span>
            </div>

            <button
              onClick={handleSubmitBooking}
              disabled={isSubmitting}
              className={`w-full text-on-primary font-headline font-bold text-sm py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                isConfirmed ? 'bg-primary-container' : 'bg-primary hover:bg-primary-container'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                  <span>Confirming with Lodge Host Desk...</span>
                </>
              ) : isConfirmed ? (
                <>
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Inquiry Dispatched! Host Notified</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>Submit Booking Request</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Direct Host Contact & Emergency Support Dock */}
      <section className="px-4">
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-surface-container/60">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="font-label-lg text-sm font-bold text-on-surface">
                Urgent Booking or Road Inquiries?
              </h4>
            </div>
            <span className="text-[10px] text-outline font-bold uppercase">Hunza Host Desk</span>
          </div>
          <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
            Speak directly with on-ground hospitality managers for winter road passes, heater status, and immediate room confirmation.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {/* Direct WhatsApp */}
            <a
              className="bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-headline font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              href="https://wa.me/923000000000?text=Hello%20Hunza%20Host%20Desk,%20inquiring%20about%20winter%20lodge%20booking"
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>WhatsApp Host</span>
            </a>
            {/* Direct Helpline Call */}
            <a
              className="bg-primary hover:bg-primary-container text-on-primary font-headline font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              href="tel:+92581100000"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>Direct Call</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
