import React, { useState } from 'react';
import { AppScreen, UserRole } from '../types';
import { APP_IMAGES } from '../data/mockData';

interface HeaderProps {
  currentScreen: AppScreen;
  userRole: UserRole;
  onNavigate: (screen: AppScreen) => void;
  onRoleChange: (role: UserRole) => void;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  userRole,
  onNavigate,
  onRoleChange,
  userName = 'Rodrigo M.',
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'welcome':
        return 'Inicio';
      case 'auth_passenger':
        return 'Verificación SMS';
      case 'auth_driver':
        return 'Acceso Conductor';
      case 'mi_asiento':
        return 'Mi Asiento';
      case 'pase_qr':
        return 'Pase De Abordaje Qr';
      case 'chofer':
        return 'Panel Chófer';
      case 'seguridad':
        return 'Seguridad';
      case 'rutas':
        return 'Rutas & Salidas';
      default:
        return 'Servicio';
    }
  };

  const handleBack = () => {
    if (currentScreen === 'auth_passenger' || currentScreen === 'auth_driver') {
      onNavigate('welcome');
    } else if (currentScreen === 'pase_qr') {
      onNavigate('mi_asiento');
    } else if (currentScreen === 'rutas') {
      onNavigate('mi_asiento');
    } else {
      onNavigate('welcome');
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0b192c]/90 backdrop-blur-xl border-b border-[#272a2c]/60 shadow-[0_2px_12px_rgba(0,0,0,0.5)] pt-safe">
      <div className="h-16 px-4 flex items-center justify-between max-w-lg mx-auto">
        {/* Left: Back button or Logo branding */}
        <div className="flex items-center gap-2">
          {currentScreen !== 'welcome' && (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Volver"
              className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#e0e3e5] hover:text-[#ffb95f] hover:bg-[#1d2022] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          )}

          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => onNavigate('welcome')}
          >
            <img
              src={APP_IMAGES.logo}
              alt="VIP Ruta Segura Logo"
              className="h-7 w-auto object-contain"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-[15px] font-extrabold tracking-tight text-[#e0e3e5]">VIP RUTA</span>
                <span className="text-[10px] font-extrabold text-[#ffb95f] uppercase tracking-wider bg-[#261500]/80 px-1.5 py-0.5 rounded border border-[#ffb95f]/30">
                  SEGURA
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wide">Servicio Activo</span>
                <span className="text-[#8f9097] text-[10px] mx-0.5">•</span>
                <span className="text-[11px] text-[#bac7e1] font-medium truncate max-w-[110px]">
                  {getScreenTitle()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Notifications & Profile Avatar */}
        <div className="flex items-center gap-1 relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Alertas operativas"
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#c5c6cd] hover:text-[#ffb95f] hover:bg-[#1d2022] transition-colors relative"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ffb95f] ring-2 ring-[#0b192c]"></span>
          </button>

          {/* Avatar button */}
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="Perfil y opciones"
            className="flex items-center pl-1 focus:outline-none"
          >
            <img
              src={userRole === 'driver' ? APP_IMAGES.driverAvatar : APP_IMAGES.userAvatar}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#ffb95f]/60 hover:ring-[#ffb95f] transition-all"
            />
          </button>

          {/* Notifications Modal Popup */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-72 bg-[#1d2022] border border-[#323537] rounded-xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#323537]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ffb95f]">
                  Alertas Operativas SUTRAN
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-[#8f9097] hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-2 text-xs">
                <div className="p-2 rounded-lg bg-[#272a2c] flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-sm mt-0.5">verified</span>
                  <div>
                    <span className="font-semibold text-white block">Unidad en Andén 04</span>
                    <span className="text-[#c5c6cd]">Mercedes Sprinter T4B-912 lista para abordaje.</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-[#272a2c] flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#ffb95f] text-sm mt-0.5">satellite_alt</span>
                  <div>
                    <span className="font-semibold text-white block">Telemetría RTK Activa</span>
                    <span className="text-[#c5c6cd]">Velocidad regulada en Panamericana Norte.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Menu Modal Popup */}
          {showUserMenu && (
            <div className="absolute right-0 top-12 w-56 bg-[#1d2022] border border-[#323537] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-[#323537]">
                <span className="text-xs text-[#8f9097] block">Sesión actual:</span>
                <span className="text-sm font-bold text-white block truncate">
                  {userRole === 'driver' ? 'Carlos Mendoza (Chófer)' : `${userName} (Pasajero)`}
                </span>
                <span className="inline-block mt-1 px-1.5 py-0.2 bg-[#29486d] text-[#aac9f4] text-[10px] rounded font-semibold uppercase">
                  {userRole === 'driver' ? 'Conductor Homologado' : 'Cliente VIP'}
                </span>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    onRoleChange('passenger');
                    onNavigate('mi_asiento');
                    setShowUserMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center gap-2 hover:bg-[#272a2c] transition-colors ${
                    userRole === 'passenger' ? 'text-[#ffb95f] font-bold' : 'text-[#e0e3e5]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">airline_seat_recline_extra</span>
                  Vista Pasajero (Mi Asiento)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onRoleChange('driver');
                    onNavigate('chofer');
                    setShowUserMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center gap-2 hover:bg-[#272a2c] transition-colors ${
                    userRole === 'driver' ? 'text-[#ffb95f] font-bold' : 'text-[#e0e3e5]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">badge</span>
                  Vista Conductor (Cabina & QR)
                </button>
                <div className="h-px bg-[#323537] my-1"></div>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('welcome');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-[#ffb4ab] hover:bg-[#93000a]/20 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  Cambiar / Salir al Portal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
