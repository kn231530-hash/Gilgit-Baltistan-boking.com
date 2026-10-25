import React, { useState } from 'react';
import { LocalExpertItem } from '../types';
import { LOCAL_EXPERTS } from '../data/mockData';

interface ServicesViewProps {
  onShowToast: (message: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onShowToast }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [requestModalExpert, setRequestModalExpert] = useState<LocalExpertItem | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientLocation, setClientLocation] = useState('Attabad Lake / KKH Km 65');
  const [clientProblem, setClientProblem] = useState('');

  const serviceCategories = [
    { id: 'all', label: 'All Pros', icon: 'handyman' },
    { id: 'roadside', label: 'Roadside Rescue', icon: 'car_repair' },
    { id: 'guide', label: 'Mountain Guides', icon: 'hiking' },
    { id: 'electrical', label: 'Solar & Electrical', icon: 'bolt' },
    { id: 'medical', label: 'Emergency Medics', icon: 'medical_services' },
    { id: 'plumbing', label: 'Winter Plumbing', icon: 'plumbing' },
  ];

  const filteredExperts = LOCAL_EXPERTS.filter((expert) => {
    const matchesCategory = selectedCategory === 'all' || expert.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestModalExpert) return;
    onShowToast(`Dispatch request sent to ${requestModalExpert.name}! They will call you immediately.`);
    setRequestModalExpert(null);
    setClientName('');
    setClientProblem('');
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-4">
      {/* 24/7 Emergency Dispatch Banner */}
      <section className="px-4 pt-3">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px]">emergency</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-headline font-bold text-xs xs:text-sm text-red-950 truncate">
                  GB Alpine SOS Helpline
                </h4>
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              </div>
              <p className="text-[11px] text-red-900/80 truncate">
                Police • High Altitude Rescue • Road Clearance
              </p>
            </div>
          </div>
          <a
            href="tel:1122"
            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 active:scale-95 transition-transform shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span>Dial 1122</span>
          </a>
        </div>
      </section>

      {/* Search & Category Filter Ribbon */}
      <section className="px-4 flex flex-col gap-2">
        <div className="relative w-full">
          <div className="flex items-center w-full bg-surface-container-lowest rounded-full shadow-xs border border-surface-container/60 px-3.5 py-2 gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 outline-none text-xs xs:text-sm text-on-surface placeholder:text-outline font-medium"
              placeholder="Search mechanics, K2 leads, electricians, oxygen..."
              type="text"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-outline"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          {serviceCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
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

      {/* Pros Directory */}
      <section className="px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline font-bold text-base text-on-surface">
              Verified Regional Specialists
            </h3>
            <p className="text-xs text-on-surface-variant">
              On-ground verified credentials &amp; mountain-certified equipment
            </p>
          </div>
          <span className="text-xs font-bold text-primary bg-primary-fixed px-2.5 py-0.5 rounded-full">
            100% Vetted
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {filteredExperts.map((expert) => (
            <div
              key={expert.id}
              className="bg-surface-container-lowest p-3.5 rounded-2xl shadow-xs border border-surface-container/60 flex flex-col gap-2.5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary overflow-hidden">
                      <span className="material-symbols-outlined text-[26px]">
                        {expert.icon}
                      </span>
                    </div>
                    {expert.verified && (
                      <span className="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full p-0.5 text-[10px] ring-2 ring-white">
                        <span className="material-symbols-outlined text-[10px]">verified</span>
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-headline font-bold text-sm text-on-surface truncate">
                        {expert.name}
                      </h4>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                          expert.is24x7
                            ? 'bg-primary/10 text-primary'
                            : 'bg-secondary-fixed text-on-secondary-fixed'
                        }`}
                      >
                        {expert.status}
                      </span>
                    </div>
                    <p className="text-xs text-primary font-semibold mt-0.5">{expert.serviceType}</p>
                    <div className="flex items-center gap-1 text-[11px] text-outline mt-0.5">
                      <span className="material-symbols-outlined text-[13px]">location_on</span>
                      <span>{expert.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded-lg shrink-0">
                  <span
                    className="material-symbols-outlined text-[14px] text-secondary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-xs font-bold text-on-surface">{expert.rating}</span>
                </div>
              </div>

              {/* Specialty note */}
              <div className="bg-surface-container-low/70 px-3 py-1.5 rounded-xl text-xs text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-primary shrink-0">
                  military_tech
                </span>
                <span className="truncate">{expert.specialty}</span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-surface-container/40">
                <a
                  href={`tel:${expert.phone}`}
                  className="py-2 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>Call Pro</span>
                </a>

                <a
                  href={`https://wa.me/923000000000?text=Hi%20${encodeURIComponent(expert.name)},%20I%20need%20assistance%20via%20GB%20One`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => setRequestModalExpert(expert)}
                  className="py-2 px-2 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-1 shadow-xs hover:bg-primary-container active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Dispatch</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dispatch Modal */}
      {requestModalExpert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <form
            onSubmit={handleDispatch}
            className="bg-surface-container-lowest w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="w-12 h-1.5 bg-outline-variant/60 rounded-full mx-auto sm:hidden" />

            <div className="flex items-center justify-between pb-1 border-b border-surface-container">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                  Rapid Field Dispatch
                </span>
                <h3 className="font-headline font-bold text-base text-on-surface">
                  {requestModalExpert.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRequestModalExpert(null)}
                className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface-variant block mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Asad Mansoor"
                className="w-full bg-surface-container-low px-3 py-2 rounded-xl text-xs font-medium outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface-variant block mb-1">
                Current Location / Landmark
              </label>
              <input
                type="text"
                required
                value={clientLocation}
                onChange={(e) => setClientLocation(e.target.value)}
                className="w-full bg-surface-container-low px-3 py-2 rounded-xl text-xs font-medium outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface-variant block mb-1">
                Nature of Assistance Required
              </label>
              <textarea
                rows={2}
                value={clientProblem}
                onChange={(e) => setClientProblem(e.target.value)}
                placeholder="e.g. Broken 4x4 tie-rod / Radiator boil / Oxygen cylinder needed at camp"
                className="w-full bg-surface-container-low px-3 py-2 rounded-xl text-xs font-medium outline-none resize-none"
              />
            </div>

            <div className="bg-primary/5 p-2.5 rounded-xl flex items-center gap-2 text-xs text-primary">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>No pre-payment. Rates standard GB fixed tariff.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-headline font-bold text-xs shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Send Immediate Dispatch Request</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
