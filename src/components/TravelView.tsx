import React, { useState } from 'react';
import { RouteItem, JeepItem } from '../types';
import { SCHEDULED_ROUTES, JEEP_FLEET, MOUNTAIN_PASS_STATUSES } from '../data/mockData';

interface TravelViewProps {
  onOpenBookingModal: (title: string, rate: string, driver?: string, isSeat?: boolean) => void;
  onOpenMapModal: () => void;
  onShowToast: (message: string) => void;
}

export const TravelView: React.FC<TravelViewProps> = ({
  onOpenBookingModal,
  onOpenMapModal,
  onShowToast,
}) => {
  const [activeServiceTab, setActiveServiceTab] = useState<'scheduled' | 'jeeps' | 'airport'>('scheduled');
  const [pickupLocation, setPickupLocation] = useState('Islamabad / Rawalpindi (I-8 Terminal)');
  const [destination, setDestination] = useState('Hunza (Karimabad) & Skardu');
  const [departureDate, setDepartureDate] = useState('Tomorrow, 14 Oct');
  const [travelersCount, setTravelersCount] = useState('2 Adults • 1 Bag');
  const [activeFilter, setActiveFilter] = useState<'all' | 'ac' | 'offroad' | 'local'>('all');
  const [likedJeeps, setLikedJeeps] = useState<Record<string, boolean>>({});

  const handleSwap = () => {
    const temp = pickupLocation;
    setPickupLocation(destination);
    setDestination(temp);
    onShowToast('Route reversed: Returning transit selected');
  };

  const handleTabSwitch = (mode: 'scheduled' | 'jeeps' | 'airport') => {
    setActiveServiceTab(mode);
    if (mode === 'airport') {
      setDestination('Gilgit Airport (GIL) / Skardu Airport (KDU)');
      onShowToast('Switched to Airport Meet & Greet');
    } else if (mode === 'jeeps') {
      setDestination('Deosai Plains / Khunjerab Pass');
      onShowToast('Switched to 4x4 Mountain Fleet');
    } else {
      setDestination('Hunza (Karimabad) & Skardu');
      onShowToast('Switched to Inter-City Coach Transport');
    }
  };

  const toggleLikeJeep = (id: string) => {
    setLikedJeeps((prev) => {
      const state = !prev[id];
      onShowToast(state ? 'Added to your saved mountain vehicles' : 'Removed from saved vehicles');
      return { ...prev, [id]: state };
    });
  };

  const shareRoute = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'GB One Travel',
        text: `Check departure schedules for ${title} on Gilgit Baltistan One App.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      onShowToast(`Route details for ${title} copied to clipboard!`);
    }
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-5">
      {/* Alpine Ambient Live Status Banner */}
      <div className="px-4 pt-3">
        <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between shadow-xs border border-surface-container/60">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <div className="min-w-0">
              <p className="font-label-sm text-[11px] text-primary uppercase tracking-wider font-bold truncate">
                Karakoram Transit Clear
              </p>
              <p className="text-xs text-on-surface-variant truncate">
                Babusar Top: +11°C • KKH Smooth Flow
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-lowest px-2.5 py-1 rounded-full shadow-xs shrink-0 border border-surface-container/40">
            <span className="material-symbols-outlined text-[14px] text-secondary">wb_sunny</span>
            <span className="font-label-sm text-xs text-on-surface font-bold">Dry Roads</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Route & Booking Selector Box */}
      <section className="px-4">
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container/60 flex flex-col gap-3">
          {/* Segmented Service Toggle */}
          <div className="grid grid-cols-3 gap-1 bg-surface-container-low p-1 rounded-xl">
            <button
              onClick={() => handleTabSwitch('scheduled')}
              className={`py-2 rounded-lg font-label-md text-xs text-center transition-all flex items-center justify-center gap-1 font-bold ${
                activeServiceTab === 'scheduled'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">directions_bus</span>
              <span>Inter-City</span>
            </button>
            <button
              onClick={() => handleTabSwitch('jeeps')}
              className={`py-2 rounded-lg font-label-md text-xs text-center transition-all flex items-center justify-center gap-1 font-bold ${
                activeServiceTab === 'jeeps'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">minor_crash</span>
              <span>4x4 Jeeps</span>
            </button>
            <button
              onClick={() => handleTabSwitch('airport')}
              className={`py-2 rounded-lg font-label-md text-xs text-center transition-all flex items-center justify-center gap-1 font-bold ${
                activeServiceTab === 'airport'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">flight_land</span>
              <span>Airport VIP</span>
            </button>
          </div>

          {/* Departure & Arrival Pickers */}
          <div className="flex flex-col gap-1.5 relative">
            {/* Pick-up */}
            <div className="flex items-center gap-2.5 bg-surface-container-low px-3.5 py-2.5 rounded-xl border border-surface-container/40">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[18px]">trip_origin</span>
              </div>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">
                  Pick-Up Location
                </label>
                <input
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-transparent font-headline font-semibold text-xs xs:text-sm text-on-surface outline-none truncate"
                  type="text"
                />
              </div>
              <button
                type="button"
                onClick={() => onShowToast('GPS locked: I-8 Islamabad Terminal')}
                className="text-outline hover:text-primary p-1"
                title="Locate me"
              >
                <span className="material-symbols-outlined text-[20px]">my_location</span>
              </button>
            </div>

            {/* Swap Pin Button */}
            <div className="absolute right-6 top-[34px] z-10">
              <button
                type="button"
                onClick={handleSwap}
                className="w-7 h-7 rounded-full bg-surface-container-lowest shadow-md border border-surface-container flex items-center justify-center text-primary hover:scale-105 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">swap_vert</span>
              </button>
            </div>

            {/* Drop-off */}
            <div className="flex items-center gap-2.5 bg-surface-container-low px-3.5 py-2.5 rounded-xl border border-surface-container/40">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
              </div>
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">
                  Destination
                </label>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent font-headline font-semibold text-xs xs:text-sm text-on-surface outline-none truncate"
                  type="text"
                />
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Choose destination from Gilgit-Baltistan')}
                className="text-outline hover:text-primary p-1"
              >
                <span className="material-symbols-outlined text-[20px]">expand_circle_down</span>
              </button>
            </div>
          </div>

          {/* Departure Date & Passengers Dual Selectors */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-xl">
              <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold text-outline uppercase">Departure</p>
                <input
                  type="text"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="font-bold text-xs text-on-surface bg-transparent outline-none w-full truncate"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-xl">
              <span className="material-symbols-outlined text-primary text-[20px]">group</span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold text-outline uppercase">Travelers</p>
                <input
                  type="text"
                  value={travelersCount}
                  onChange={(e) => setTravelersCount(e.target.value)}
                  className="font-bold text-xs text-on-surface bg-transparent outline-none w-full truncate"
                />
              </div>
            </div>
          </div>

          {/* CTA Find Routes */}
          <button
            onClick={() => onShowToast('Scanning 48 available mountain transports across KKH & Skardu...')}
            className="w-full py-3.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-headline font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
            <span>Search Alpine Departures</span>
          </button>
        </div>
      </section>

      {/* High-Key Quick Filters Ribbon */}
      <div className="pl-4 overflow-x-auto flex items-center gap-1.5 no-scrollbar pr-4">
        <button
          onClick={() => {
            setActiveFilter('all');
            onShowToast('Showing all verified alpine transport');
          }}
          className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-sm text-xs flex items-center gap-1 shadow-xs transition-colors ${
            activeFilter === 'all'
              ? 'bg-primary text-on-primary font-bold'
              : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">stars</span>
          <span>All Verified</span>
        </button>
        <button
          onClick={() => {
            setActiveFilter('ac');
            onShowToast('Filtered by Executive AC Vehicles');
          }}
          className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-sm text-xs flex items-center gap-1 shadow-xs transition-colors ${
            activeFilter === 'ac'
              ? 'bg-primary text-on-primary font-bold'
              : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
          }`}
        >
          <span className="material-symbols-outlined text-[16px] text-primary">ac_unit</span>
          <span>Executive AC</span>
        </button>
        <button
          onClick={() => {
            setActiveFilter('offroad');
            onShowToast('Filtered by 4x4 Off-Road Jeeps');
          }}
          className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-sm text-xs flex items-center gap-1 shadow-xs transition-colors ${
            activeFilter === 'offroad'
              ? 'bg-primary text-on-primary font-bold'
              : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
          }`}
        >
          <span className="material-symbols-outlined text-[16px] text-secondary">terrain</span>
          <span>4x4 Off-Road</span>
        </button>
        <button
          onClick={() => {
            setActiveFilter('local');
            onShowToast('Filtered by Local Resident Drivers');
          }}
          className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-sm text-xs flex items-center gap-1 shadow-xs transition-colors ${
            activeFilter === 'local'
              ? 'bg-primary text-on-primary font-bold'
              : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
          }`}
        >
          <span className="material-symbols-outlined text-[16px] text-primary">shield_person</span>
          <span>Local Driver</span>
        </button>
      </div>

      {/* SECTION 2: Scheduled Transport (Buses & Coasters) */}
      <section className="px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline font-bold text-lg text-on-surface">Scheduled Mountain Coasters</h2>
            <p className="text-xs text-on-surface-variant">Daily regulated inter-district &amp; express coach lines</p>
          </div>
          <span className="text-[11px] text-primary font-bold bg-primary-fixed px-2 py-1 rounded-full">
            NATCO Sync
          </span>
        </div>

        {/* Bus Card 1: NATCO Luxury Coaster */}
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs border border-surface-container/60 flex flex-col">
          <div className="relative w-full h-40">
            <img
              className="w-full h-full object-cover"
              alt="NATCO luxury coaster on Karakoram Highway"
              src={SCHEDULED_ROUTES[0].image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs">
              <span className="material-symbols-outlined text-primary text-[14px]">verified</span>
              <span className="text-[10px] text-primary font-bold">NATCO &amp; Faisal Executive</span>
            </div>
            <div className="absolute top-3 right-3 bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">airline_seat_recline_normal</span>
              <span>12 seats left</span>
            </div>
            <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-on-primary">
              <div>
                <h3 className="font-headline font-bold text-sm xs:text-base text-white drop-shadow-sm">
                  Islamabad to Gilgit Central
                </h3>
                <p className="text-xs text-slate-200">Via KKH Babusar Pass • 14h 30m</p>
              </div>
              <div className="text-right">
                <p className="font-currency-pkr text-secondary-fixed font-black text-base">PKR 4,500</p>
                <p className="text-[10px] text-slate-300">per seat</p>
              </div>
            </div>
          </div>

          {/* Specs & Amenities Ribbon */}
          <div className="p-3.5 flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-y-2 gap-x-3 py-1.5 text-on-surface-variant text-xs bg-surface-container-low px-3 rounded-xl">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">schedule</span> Dep: 07:00 PM</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">wifi</span> Starlink Wi-Fi</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">power</span> 220V Outlets</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">airline_seat_recline_extra</span> Recliner</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-secondary text-[16px]">stars</span>
                <span className="text-xs text-on-surface font-bold">4.8</span>
                <span className="text-xs text-outline">(342 trips rated)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => shareRoute('Islamabad to Gilgit Express')}
                  className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                </button>
                <button
                  onClick={() => onOpenBookingModal('NATCO Executive Coaster (Islamabad ➔ Gilgit)', 'PKR 4,500', 'NATCO Assigned Captain', true)}
                  className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold shadow-xs transition-transform active:scale-95"
                >
                  Reserve Seat
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bus Card 2: Silk Route Hiace Express */}
        <div className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-xs border border-surface-container/60 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[28px]">airport_shuttle</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-headline font-bold text-sm text-on-surface truncate">
                    Silk Route Hiace Express
                  </h3>
                  <span className="bg-primary-fixed text-primary px-1.5 py-0.2 rounded text-[10px] font-bold">
                    High Freq
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant truncate">Gilgit Bus Stand ➔ Hunza Karimabad</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-currency-pkr text-primary font-bold text-sm">PKR 800</p>
              <p className="text-[10px] text-outline">seat / one-way</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-on-surface-variant text-xs py-1.5 bg-surface-container-low/60 px-3 rounded-lg">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">update</span> Departures Hourly</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">timelapse</span> 2h 15m duration</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">luggage</span> 1 Bag incl.</span>
          </div>

          <button
            onClick={() => onOpenBookingModal('Silk Route Hiace (Gilgit ➔ Karimabad)', 'PKR 800', 'Silk Route Line Driver', true)}
            className="w-full py-2 bg-surface-container text-primary text-xs font-bold rounded-xl hover:bg-primary hover:text-on-primary transition-colors text-center active:scale-95"
          >
            Instant Boarding Ticket
          </button>
        </div>
      </section>

      {/* SECTION 3 & 4: 4x4 Off-Road Jeeps & Mountain SUVs */}
      <section className="px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline font-bold text-lg text-on-surface">4x4 Mountain Fleet</h2>
            <p className="text-xs text-on-surface-variant">Rugged vehicles equipped for high-altitude passes</p>
          </div>
          <button
            onClick={() => onShowToast('Filters: Certified 4x4 low range transmission & high clearance')}
            className="text-xs text-primary font-bold flex items-center gap-0.5"
          >
            Filters <span className="material-symbols-outlined text-[14px]">tune</span>
          </button>
        </div>

        {/* JEEP CARD 1: Prado TZ Skardu & Deosai */}
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs border border-surface-container/60 flex flex-col">
          <div className="relative w-full h-48">
            <img
              className="w-full h-full object-cover"
              alt="Toyota Land Cruiser Prado TZ in Deosai"
              src={JEEP_FLEET[0].image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            <div className="absolute top-3 left-3 bg-surface-container-lowest/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[14px]">verified</span>
              <span className="text-[10px] text-primary font-bold">GB Tourism Registered</span>
            </div>
            <button
              onClick={() => toggleLikeJeep(JEEP_FLEET[0].id)}
              className={`absolute top-3 right-3 bg-surface-container-lowest/90 rounded-full w-8 h-8 flex items-center justify-center transition-colors shadow-xs ${
                likedJeeps[JEEP_FLEET[0].id] ? 'text-error' : 'text-on-surface-variant hover:text-secondary'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {likedJeeps[JEEP_FLEET[0].id] ? 'favorite' : 'favorite_border'}
              </span>
            </button>
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <span className="bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                Deosai &amp; Shigar Certified
              </span>
              <div className="flex items-center gap-1 bg-surface-container-lowest/90 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-secondary text-[14px]">star</span>
                <span className="text-xs text-on-surface font-bold">4.9</span>
                <span className="text-[10px] text-outline">(84)</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 flex flex-col gap-2.5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-headline font-bold text-sm text-on-surface">
                  Toyota Land Cruiser Prado TZ
                </h3>
                <p className="text-xs text-outline">Skardu • Deosai Plains • Khaplu Valley</p>
              </div>
              <div className="text-right">
                <p className="font-currency-pkr text-primary font-black text-base">PKR 18,500</p>
                <p className="text-[10px] text-outline">/ day + Driver</p>
              </div>
            </div>

            {/* Spec Badges Grid */}
            <div className="grid grid-cols-4 gap-1.5 py-1">
              <div className="bg-surface-container-low p-2 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-primary text-[18px]">airline_seat_recline_normal</span>
                <span className="text-[10px] text-on-surface-variant font-bold mt-0.5">5 Seats</span>
              </div>
              <div className="bg-surface-container-low p-2 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-primary text-[18px]">luggage</span>
                <span className="text-[10px] text-on-surface-variant font-bold mt-0.5">4 Large</span>
              </div>
              <div className="bg-surface-container-low p-2 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-primary text-[18px]">ac_unit</span>
                <span className="text-[10px] text-on-surface-variant font-bold mt-0.5">Dual AC</span>
              </div>
              <div className="bg-surface-container-low p-2 rounded-xl flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-primary text-[18px]">roofing</span>
                <span className="text-[10px] text-on-surface-variant font-bold mt-0.5">Roof Rack</span>
              </div>
            </div>

            {/* Driver Profile & Transparent Fuel Policy */}
            <div className="bg-surface-container-low rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                  alt="Ustad Karim"
                  src={JEEP_FLEET[0].driverAvatar}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold text-on-surface truncate">Ustad Karim Skardu</p>
                    <span className="material-symbols-outlined text-primary text-[15px]" title="GB Verified Veteran">verified</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant truncate">14 Yrs Snow &amp; River Crossings</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="inline-block bg-primary-fixed text-primary px-2 py-0.2 rounded text-[10px] font-bold">
                  Fuel as Used
                </span>
                <p className="text-[10px] text-outline mt-0.5">Start full / return full</p>
              </div>
            </div>

            {/* Action Row (Book Now + WhatsApp Inquiry) */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onOpenBookingModal('Toyota Land Cruiser Prado TZ', 'PKR 18,500', 'Ustad Karim Skardu', false)}
                className="flex-[65] py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-transform"
              >
                <span>Request Booking</span>
              </button>
              <a
                className="flex-[35] py-2.5 bg-surface-container-low text-[#128C7E] rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs hover:bg-surface-container transition-colors"
                href="https://wa.me/923000000000?text=Hi%20Ustad%20Karim,%20I%20am%20inquiring%20about%20Prado%20TZ%20Skardu%20rental%20on%20GB%20One"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[17px]">chat</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* JEEP CARD 2: Willys 4x4 Open Safari Jeep */}
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs border border-surface-container/60 flex flex-col">
          <div className="relative w-full h-44">
            <img
              className="w-full h-full object-cover"
              alt="Willys open safari jeep"
              src={JEEP_FLEET[1].image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 bg-secondary text-on-secondary px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs">
              Classic Open Safari
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-on-primary">
              <h3 className="font-headline font-bold text-sm xs:text-base text-white drop-shadow-sm">
                Willys 4x4 Mountain Cruiser
              </h3>
              <div className="text-right">
                <p className="font-currency-pkr text-secondary-fixed font-black text-base">PKR 12,000</p>
                <p className="text-[10px] text-slate-200">/ day + Driver</p>
              </div>
            </div>
          </div>

          <div className="p-3.5 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-on-surface-variant text-xs">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">groups</span> 6 Passengers</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">explore</span> Khunjerab &amp; Passu</span>
              <span className="flex items-center gap-1 text-secondary font-semibold"><span className="material-symbols-outlined text-[16px]">photo_camera</span> 360° Open View</span>
            </div>

            <div className="bg-surface-container-low rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary text-xs">
                  JA
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">Driver: Jamshed Ali (Hunza)</p>
                  <p className="text-[10px] text-outline">Attabad Lake &amp; Hopper Glacier Expert</p>
                </div>
              </div>
              <span className="text-[10px] bg-surface-container-lowest px-2 py-0.5 rounded-full text-primary font-bold">
                4.95 ★
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onOpenBookingModal('Willys 4x4 Open Safari Jeep', 'PKR 12,000', 'Jamshed Ali (Hunza)', false)}
                className="flex-[65] py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform"
              >
                <span>Book Open Jeep</span>
              </button>
              <a
                className="flex-[35] py-2.5 bg-surface-container-low text-[#128C7E] rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                href="https://wa.me/923000000000?text=Inquiring%20about%20Willys%20open%20jeep"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Inquire</span>
              </a>
            </div>
          </div>
        </div>

        {/* JEEP CARD 3: Toyota Hilux Revo 4x4 Expedition */}
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs border border-surface-container/60 flex flex-col">
          <div className="relative w-full h-44">
            <img
              className="w-full h-full object-cover"
              alt="Toyota Hilux Revo 4x4"
              src={JEEP_FLEET[2].image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 bg-primary text-on-primary px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs">
              Heavy Duty Expedition
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-on-primary">
              <h3 className="font-headline font-bold text-sm xs:text-base text-white drop-shadow-sm">
                Toyota Hilux Revo 4x4
              </h3>
              <div className="text-right">
                <p className="font-currency-pkr text-secondary-fixed font-black text-base">PKR 22,000</p>
                <p className="text-[10px] text-slate-200">/ day + Driver</p>
              </div>
            </div>
          </div>

          <div className="p-3.5 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-on-surface-variant text-xs">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">airline_seat_recline_normal</span> 5 Adults</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span> 800kg Bed Cargo</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">military_tech</span> K2 Base Shigar</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onOpenBookingModal('Toyota Hilux Revo 4x4 Expedition', 'PKR 22,000', 'Senior Fleet Driver', false)}
                className="flex-[65] py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform"
              >
                <span>Book Revo 4x4</span>
              </button>
              <a
                className="flex-[35] py-2.5 bg-surface-container-low text-[#128C7E] rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                href="https://wa.me/923000000000?text=Inquiring%20about%20Hilux%20Revo%204x4"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Popular Tourist Routes & Live Pass Status */}
      <section className="px-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline font-bold text-lg text-on-surface">Live Mountain Pass Status</h2>
            <p className="text-xs text-on-surface-variant">Real-time alerts verified by GB Traffic Police</p>
          </div>
          <span className="material-symbols-outlined text-primary text-[22px]">traffic</span>
        </div>

        {/* Route Status Cards */}
        <div className="flex flex-col gap-2">
          {MOUNTAIN_PASS_STATUSES.map((pass) => (
            <div
              key={pass.id}
              className="bg-surface-container-lowest p-3 rounded-2xl shadow-xs border border-surface-container/60 flex items-center justify-between gap-2.5"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    {pass.type === 'border' ? 'ac_unit' : pass.status === 'Slow Move' ? 'warning' : 'alt_route'}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-xs xs:text-sm text-on-surface truncate">
                    {pass.title}
                  </p>
                  <p className="text-[11px] text-on-surface-variant truncate">{pass.subtitle}</p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span
                  className={`inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-full ${
                    pass.status === 'Slow Move'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      pass.status === 'Slow Move' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                  />
                  {pass.status}
                </span>
                <p className="text-[10px] text-outline mt-0.5 truncate max-w-[100px]">{pass.conditionNote.split('•')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Map Exploration Teaser */}
      <section className="px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-xs border border-surface-container/60">
          <div
            className="w-full h-44 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5GCPec5z0T0lsvcxxA5SBmR0FRN2zkhtOt0iW6rgG3gExra2YHwOQlHNHkNgdLfXEOf_q-KHNn5JNvAov3PutJ2fcMS-iSn7y76H81ZaYkdH8k_e98nkdrtDIHYHgzxCxtYejzeYWesOGHjE8KflGvCfPoXTyireLYQ51OwT9BnS8VjdRz_N5Phq1MOxywydj1Wkfoy8qFiafAFtCTGbVyX41_Z8w0T1ayJ0pYCmqTeYpS_kQI6Tl')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent flex flex-col justify-end p-4 text-on-primary">
            <div className="flex items-center gap-1 text-secondary-fixed mb-1">
              <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Live Alpine GPS Grid</span>
            </div>
            <h4 className="font-headline font-bold text-base">Interactive Route Explorer</h4>
            <p className="text-xs text-slate-200 mt-0.5 line-clamp-1">
              Explore petrol pumps, mechanic stations, and mountain rest houses.
            </p>
            <button
              onClick={onOpenMapModal}
              className="mt-3 w-fit px-4 py-2 bg-surface-container-lowest text-primary rounded-xl font-headline font-bold text-xs shadow-md hover:bg-surface-container-low transition-colors flex items-center gap-1.5 active:scale-95"
            >
              <span>Launch Full Alpine Map</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
