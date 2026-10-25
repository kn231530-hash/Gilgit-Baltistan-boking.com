import React, { useState } from 'react';
import { RegionInfo, StayItem, CartItem } from '../types';
import { REGIONS, ALPINE_MAP_CHECKPOINTS } from '../data/mockData';

// --- Region Picker Modal ---
interface RegionPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRegion: RegionInfo;
  onSelectRegion: (region: RegionInfo) => void;
}

export const RegionPickerModal: React.FC<RegionPickerModalProps> = ({
  isOpen,
  onClose,
  selectedRegion,
  onSelectRegion,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-outline-variant/60 rounded-full mx-auto sm:hidden" />
        
        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">
              explore
            </span>
            <div>
              <h3 className="font-headline font-bold text-lg text-on-surface">
                Select GB Region
              </h3>
              <p className="text-xs text-outline">
                Filters travel passes, lodges &amp; local pros
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-outline hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {REGIONS.map((region) => {
            const isSelected = selectedRegion.id === region.id;
            return (
              <button
                key={region.id}
                onClick={() => {
                  onSelectRegion(region);
                  onClose();
                }}
                className={`p-3 rounded-xl flex items-center justify-between text-left transition-all ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm tracking-tight">
                      {region.name}
                    </span>
                    {region.id === 'all' && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        isSelected ? 'bg-primary-fixed text-primary' : 'bg-primary/10 text-primary'
                      }`}>
                        All Valley
                      </span>
                    )}
                  </div>
                  <p className={`text-xs truncate mt-0.5 ${isSelected ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                    {region.tagline}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-xs font-bold block ${isSelected ? 'text-secondary-fixed' : 'text-secondary'}`}>
                    {region.temp}
                  </span>
                  <span className={`text-[10px] ${isSelected ? 'text-on-primary/70' : 'text-outline'}`}>
                    {region.weather}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Travel & 4x4 Booking Drawer ---
interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  rate: string;
  driver?: string;
  isPerSeat?: boolean;
  onSubmit: (details: { name: string; phone: string; date: string; duration: string; seats: number }) => void;
}

export const BookingDrawer: React.FC<BookingDrawerProps> = ({
  isOpen,
  onClose,
  title,
  rate,
  driver = 'Assigned Vetted Mountain Captain',
  isPerSeat = false,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-10-26');
  const [duration, setDuration] = useState('3 Days Expedition');
  const [seats, setSeats] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-t-3xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-outline-variant/60 rounded-full mx-auto" />

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
              {isPerSeat ? 'Coach Reservation' : 'Fast Vehicle Dispatch'}
            </span>
            <h3 className="font-headline font-bold text-lg text-on-surface leading-snug">
              {title}
            </h3>
            <p className="font-currency-pkr text-secondary font-bold text-base mt-0.5">
              {rate}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-outline hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Driver verification banner */}
        <div className="bg-surface-container-low p-3 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">verified_user</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-on-surface truncate">
              {isPerSeat ? 'Regulated Service Operator' : `Captain: ${driver}`}
            </p>
            <p className="text-xs text-outline truncate">
              GB Tourism Registered • Mountain Safety &amp; First Aid Ready
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">
              Your Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Asad Mansoor"
              className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm outline-none border border-transparent focus:border-primary transition-all font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">
              WhatsApp / Mobile Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0300-1234567"
              className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm outline-none border border-transparent focus:border-primary transition-all font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-on-surface-variant block mb-1">
                Departure Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl text-on-surface text-xs outline-none font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface-variant block mb-1">
                {isPerSeat ? 'Number of Seats' : 'Trip Duration'}
              </label>
              {isPerSeat ? (
                <div className="flex items-center justify-between bg-surface-container-low px-3 py-1.5 rounded-xl">
                  <span className="text-xs font-bold text-on-surface">{seats} Seat(s)</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSeats(Math.max(1, seats - 1))}
                      className="w-6 h-6 rounded bg-surface-container-lowest font-bold text-xs"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setSeats(Math.min(10, seats + 1))}
                      className="w-6 h-6 rounded bg-primary text-on-primary font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              ) : (
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl text-on-surface text-xs outline-none font-medium"
                >
                  <option>3 Days Expedition</option>
                  <option>5 Days Hunza &amp; Skardu</option>
                  <option>7 Days Grand Circuit</option>
                  <option>Single Day Trip</option>
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Assurance */}
        <div className="bg-primary/5 border border-primary/20 p-3 rounded-xl flex items-start gap-2">
          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
            verified
          </span>
          <p className="text-xs text-primary leading-relaxed">
            <strong>Zero Advance Payment:</strong> Pay directly to driver upon pickup. Guaranteed fuel transparency and GPS monitoring.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            onSubmit({ name: name || 'Valued Traveler', phone: phone || '0300-0000000', date, duration, seats });
            onClose();
          }}
          className="w-full py-3.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-headline font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">send</span>
          <span>Confirm Booking Request</span>
        </button>
      </div>
    </div>
  );
};

// --- Interactive Route Explorer Map Modal ---
interface InteractiveMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveMapModal: React.FC<InteractiveMapModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedPin, setSelectedPin] = useState(ALPINE_MAP_CHECKPOINTS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-fixed text-[24px]">
              satellite_alt
            </span>
            <div>
              <h3 className="font-headline font-bold text-base leading-tight">
                Live Alpine GPS Route Grid
              </h3>
              <p className="text-xs text-slate-200">
                Karakoram Highway (N-35) &amp; Skardu Strategic Route (S-1)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Map Visualization Container */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-65"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5GCPec5z0T0lsvcxxA5SBmR0FRN2zkhtOt0iW6rgG3gExra2YHwOQlHNHkNgdLfXEOf_q-KHNn5JNvAov3PutJ2fcMS-iSn7y76H81ZaYkdH8k_e98nkdrtDIHYHgzxCxtYejzeYWesOGHjE8KflGvCfPoXTyireLYQ51OwT9BnS8VjdRz_N5Phq1MOxywydj1Wkfoy8qFiafAFtCTGbVyX41_Z8w0T1ayJ0pYCmqTeYpS_kQI6Tl')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

          {/* Interactive Checkpoint Pins overlay */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-white/90 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Sat-Link Active
              </span>
              <span>Elevation: 1,500m - 4,693m</span>
            </div>

            {/* Checkpoint nodes visual badges */}
            <div className="grid grid-cols-3 gap-2">
              {ALPINE_MAP_CHECKPOINTS.slice(0, 3).map((cp) => (
                <button
                  key={cp.id}
                  onClick={() => setSelectedPin(cp)}
                  className={`px-2 py-1.5 rounded-lg text-left text-xs transition-all backdrop-blur-md ${
                    selectedPin.id === cp.id
                      ? 'bg-primary text-white ring-2 ring-emerald-300 shadow-md'
                      : 'bg-black/60 text-slate-200 hover:bg-black/80'
                  }`}
                >
                  <p className="font-bold truncate">{cp.name}</p>
                  <p className="text-[10px] text-emerald-300">{cp.status}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Checkpoint Detail */}
        <div className="p-4 flex flex-col gap-3 overflow-y-auto">
          <div className="flex items-start justify-between bg-surface-container-low p-3 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  {selectedPin.type === 'pass'
                    ? 'landscape'
                    : selectedPin.type === 'fuel'
                    ? 'local_gas_station'
                    : selectedPin.type === 'mechanic'
                    ? 'car_repair'
                    : 'navigation'}
                </span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-sm text-on-surface">
                  {selectedPin.name}
                </h4>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {selectedPin.desc}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary shrink-0">
              {selectedPin.status}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-outline px-1">
            <span>Tap checkpoints to inspect road condition:</span>
            <span>{ALPINE_MAP_CHECKPOINTS.length} monitored sectors</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {ALPINE_MAP_CHECKPOINTS.map((cp) => (
              <button
                key={cp.id}
                onClick={() => setSelectedPin(cp)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedPin.id === cp.id
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                {cp.name}
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-surface-container">
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">
                security
              </span>
              <span>GB Police Patrol: Radio VHF 145.500</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary-container"
            >
              Done Viewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- GB Bazaar Cart Checkout Drawer ---
interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalPrice: number;
  onConfirmOrder: (orderDetails: { name: string; phone: string; address: string; paymentMethod: string }) => void;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  totalPrice,
  onConfirmOrder,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('Gilgit City Center / Hotel Delivery');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-t-3xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-outline-variant/60 rounded-full mx-auto" />

        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">
              shopping_bag
            </span>
            <h3 className="font-headline font-bold text-lg text-on-surface">
              GB Bazaar Checkout
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-outline hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Order items summary */}
        <div className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-2 max-h-40 overflow-y-auto">
          <p className="text-xs font-bold text-outline uppercase tracking-wider">
            Order Items ({cart.reduce((a, b) => a + b.quantity, 0)})
          </p>
          {cart.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between text-xs py-1 border-b border-surface-container/40 last:border-0">
              <span className="text-on-surface truncate pr-2 font-medium">
                {item.quantity}x {item.product.title}
              </span>
              <span className="font-currency-pkr text-primary font-bold shrink-0">
                PKR {(item.product.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Delivery fields */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Asad Mansoor"
              className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm outline-none font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">
              Contact Phone (for rider dispatch)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0300-1234567"
              className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm outline-none font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">
              Delivery Address / Hotel Room
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm outline-none font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-low text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">payments</span>
                <span>Cash on Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('gbpay')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'gbpay'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-low text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
                <span>GB One Pay</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Total Row */}
        <div className="flex items-center justify-between pt-2 border-t border-surface-container">
          <div>
            <span className="text-xs text-outline block">Total Payable</span>
            <span className="font-currency-pkr text-xl text-primary font-black">
              PKR {totalPrice.toLocaleString()}
            </span>
          </div>
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
            Free Delivery GB
          </span>
        </div>

        <button
          onClick={() => {
            onConfirmOrder({
              name: name || 'Valued Customer',
              phone: phone || '0300-1112233',
              address,
              paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'GB One Pay',
            });
            onClose();
          }}
          className="w-full py-3.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-headline font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>Place Order Now</span>
        </button>
      </div>
    </div>
  );
};

// --- Notifications Center Drawer ---
interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'Babusar Pass Weather Advisory',
      desc: 'Daytime temperature +11°C. Smooth flow. GB Traffic Police advises crossing prior to 5:00 PM sunset.',
      time: '15m ago',
      icon: 'wb_sunny',
      type: 'weather',
    },
    {
      id: 2,
      title: 'Organic Walnut Harvest Batch Dispatched',
      desc: 'Autumn 2026 harvest from Karimabad orchards verified and stocked in GB Bazaar.',
      time: '1h ago',
      icon: 'nutrition',
      type: 'market',
    },
    {
      id: 3,
      title: 'Heated Lodges Guarantee Active',
      desc: 'All listed Hunza & Skardu accommodations have verified diesel generators and wood Bukhari stoves.',
      time: '3h ago',
      icon: 'fireplace',
      type: 'hotel',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-outline-variant/60 rounded-full mx-auto sm:hidden" />

        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">
              notifications_active
            </span>
            <h3 className="font-headline font-bold text-lg text-on-surface">
              GB One Dispatch Feed
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-outline hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-3 bg-surface-container-low rounded-xl flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">
                  {n.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-on-surface truncate">
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-outline shrink-0">
                    {n.time}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1 leading-snug">
                  {n.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-surface-container text-primary rounded-xl text-xs font-bold hover:bg-surface-container-high transition-colors"
        >
          Close Notifications
        </button>
      </div>
    </div>
  );
};

// --- Profile Modal ---
interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-outline-variant/60 rounded-full mx-auto sm:hidden" />

        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <h3 className="font-headline font-bold text-lg text-on-surface">
            User Profile
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-outline hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-2xl">
          <img
            alt="User Avatar"
            className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHZlfIfvo_ZKfpUDNHVIGTwJ7cOmrdRBnawDjmHO5Ta8pd2GllPDG1tJtbQKkGPFLkiKLD0P1jeIUm_6a8UBgJE540_DEUatYpdqD-MU9TYyZg1THVHkyNLpOuJOywdVXD9LPhPezJBp7nV0k_6hJ9iGih4ym3GQqoTBGqtvgoGkFQPbYj3AjNgelZOPUCVkK6zb43d_xG92MYxoVnhmmiNlwpnikrIBO1HqYz97tZGhOzjT94HEKP"
          />
          <div className="min-w-0">
            <h4 className="font-bold text-sm text-on-surface">Asad Mansoor</h4>
            <p className="text-xs text-outline truncate">kn231530@gmail.com</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-on-primary">
              GB Explorer Member
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
            <span className="text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">bookmark</span>
              Saved Itineraries &amp; Stays
            </span>
            <span className="font-bold text-primary">3 Saved</span>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
            <span className="text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">emergency</span>
              Emergency Roadside Hotline
            </span>
            <span className="font-bold text-primary">1122 / VHF-145</span>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
            <span className="text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">translate</span>
              Language Setting
            </span>
            <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">English (Active)</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold text-xs"
        >
          Close Profile
        </button>
      </div>
    </div>
  );
};
