import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
  cartCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onChangeTab,
  cartCount = 0,
}) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'explore' },
    { id: 'travel', label: 'Travel', icon: 'directions_car' },
    { id: 'hotels', label: 'Hotels', icon: 'hotel' },
    { id: 'shop', label: 'Shop', icon: 'storefront' },
    { id: 'services', label: 'Services', icon: 'handyman' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.04)] border-t border-surface-container/60"
      aria-label="Main Navigation"
    >
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-1">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] transition-all duration-150 active:scale-90 ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[23px] transition-transform"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {tab.icon}
                </span>

                {/* Badge for Shop cart */}
                {tab.id === 'shop' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-secondary-container text-on-secondary-container text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>

              <span className={`text-[11px] leading-tight tracking-tight ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                {tab.label}
              </span>

              {isActive && (
                <span className="w-1 h-1 rounded-full bg-primary mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
