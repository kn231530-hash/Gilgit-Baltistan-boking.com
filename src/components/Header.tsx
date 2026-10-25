import React from 'react';
import { TabType, RegionInfo } from '../types';
import { APP_LOGO, USER_AVATAR } from '../data/mockData';

interface HeaderProps {
  currentTab: TabType;
  selectedRegion: RegionInfo;
  onOpenRegionPicker: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  selectedRegion,
  onOpenRegionPicker,
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 2,
}) => {
  const getTabLabel = (tab: TabType) => {
    switch (tab) {
      case 'home':
        return 'Home';
      case 'travel':
        return 'Travel';
      case 'hotels':
        return 'Hotels';
      case 'shop':
        return 'Shop';
      case 'services':
        return 'Services';
      default:
        return 'Home';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 pt-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container/60">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Logo and Name */}
        <div className="flex items-center gap-1.5 cursor-pointer">
          <img
            alt="GB One Logo"
            className="h-8 w-auto object-contain"
            src={APP_LOGO}
          />
          <span className="font-headline font-bold text-lg text-primary hidden xs:inline tracking-tight">
            GB One
          </span>
        </div>

        {/* Region Switcher Pill */}
        <button
          onClick={onOpenRegionPicker}
          className="flex flex-col items-center justify-center group active:scale-95 transition-transform"
          aria-label="Select Region"
        >
          <div className="flex items-center gap-1 bg-surface-container-low hover:bg-surface-container px-3 py-1 rounded-full border border-surface-container transition-colors">
            <span className="material-symbols-outlined text-primary text-[15px]">
              location_on
            </span>
            <span className="font-label-sm text-xs font-bold text-on-surface">
              {selectedRegion.name}
            </span>
            <span className="material-symbols-outlined text-outline text-[13px] group-hover:text-primary transition-colors">
              expand_more
            </span>
          </div>
          <span className="font-label-sm text-[10px] text-outline mt-0.5 font-medium tracking-wide">
            {getTabLabel(currentTab)}
          </span>
        </button>

        {/* Right Actions: Notifications & Avatar */}
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenNotifications}
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors active:scale-95"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">
              notifications
            </span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary-container ring-2 ring-white"></span>
            )}
          </button>

          <button
            onClick={onOpenProfile}
            className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden p-0.5 hover:ring-2 hover:ring-primary/20 transition-all active:scale-95"
            aria-label="User Profile"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-sm"
              src={USER_AVATAR}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
