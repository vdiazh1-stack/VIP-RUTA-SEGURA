import React from 'react';
import { AppScreen } from '../types';

interface BottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  hasConfirmedBooking?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  hasConfirmedBooking = true,
}) => {
  // If we are on welcome or auth screens, don't show the bottom tab bar
  if (currentScreen === 'welcome' || currentScreen === 'auth_passenger' || currentScreen === 'auth_driver') {
    return null;
  }

  const navItems = [
    {
      id: 'rutas' as AppScreen,
      label: 'Rutas',
      icon: 'directions_bus',
    },
    {
      id: 'mi_asiento' as AppScreen,
      label: 'Mi Asiento',
      icon: 'airline_seat_recline_extra',
    },
    ...(hasConfirmedBooking
      ? [
          {
            id: 'pase_qr' as AppScreen,
            label: 'Pase QR',
            icon: 'qr_code_2',
          },
        ]
      : []),
    {
      id: 'chofer' as AppScreen,
      label: 'Chófer',
      icon: 'badge',
    },
    {
      id: 'seguridad' as AppScreen,
      label: 'Seguridad',
      icon: 'shield_with_heart',
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#0b0f10]/95 backdrop-blur-xl border-t border-[#272a2c]/70 shadow-[0_-4px_24px_rgba(0,0,0,0.6)]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-1">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[48px] px-1 rounded-xl transition-all ${
                isActive
                  ? 'text-[#ffb95f] font-bold scale-105'
                  : 'text-[#8f9097] hover:text-[#e0e3e5] active:scale-95'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#ffb95f]"></span>
                )}
              </div>
              <span className="text-[10px] tracking-wide font-medium leading-none mt-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
