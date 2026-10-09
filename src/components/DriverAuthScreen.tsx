import React, { useState } from 'react';
import { AppScreen } from '../types';

interface DriverAuthScreenProps {
  onLoginSuccess: (driverName: string) => void;
  onNavigate: (screen: AppScreen) => void;
}

export const DriverAuthScreen: React.FC<DriverAuthScreenProps> = ({
  onLoginSuccess,
  onNavigate,
}) => {
  const [driverCode, setDriverCode] = useState('COND-8941');
  const [vehiclePlate, setVehiclePlate] = useState('T4B-912');
  const [pin, setPin] = useState('918234');
  const [showPin, setShowPin] = useState(false);
  const [biometricActive, setBiometricActive] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const handleDriverLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      onLoginSuccess('Carlos Mendoza');
      onNavigate('chofer');
    }, 1100);
  };

  const toggleBiometric = () => {
    setBiometricActive(!biometricActive);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-10 px-4 pt-3">
      {/* Status Badge & Security Authority */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#29486d] text-[#aac9f4] border border-[#aac9f4]/20 shadow-sm">
          <span
            className="material-symbols-outlined text-[16px] text-[#ffb95f]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            shield_with_heart
          </span>
          <span className="text-[10px] uppercase tracking-wider font-extrabold">
            Portal Exclusivo de Operadores
          </span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#e0e3e5]">
            Acceso para Conductores Homologados
          </h2>
          <p className="text-xs text-[#c5c6cd] mt-1 leading-relaxed">
            Identifícate para iniciar tu turno, verificar tu unidad y monitorear pasajeros con trazabilidad GPS.
          </p>
        </div>
      </div>

      {/* SUTRAN Warning Notice */}
      <div className="bg-[#261500] border border-[#ffb95f]/40 text-[#ffb95f] rounded-xl p-3.5 mb-5 shadow-md flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#ffb95f]/20 flex items-center justify-center shrink-0 mt-0.5">
          <span
            className="material-symbols-outlined text-[#ffb95f] text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-[#ffb95f] tracking-tight">
            Homologación Obligatoria SUTRAN
          </span>
          <p className="text-[11px] text-[#c5c6cd] leading-snug mt-0.5">
            Solo conductores con brevete <strong className="text-white font-semibold">A-IIIc vigente</strong> y credencial biométrica activa autorizada por la gerencia de operaciones.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleDriverLogin} className="bg-[#1d2022] border border-[#272a2c] rounded-xl p-4 shadow-xl flex flex-col gap-4 mb-5">
        {/* Input 1: DNI / Código Conductor */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#c5c6cd] flex items-center justify-between font-medium">
            <span>Código de Conductor o DNI</span>
            <span className="text-[#ffb95f] text-[10px] font-bold">Requerido</span>
          </label>
          <div className="relative flex items-center rounded-lg bg-[#272a2c] border border-[#323537] focus-within:border-[#ffb95f] focus-within:bg-[#323537] transition-all">
            <div className="w-10 h-11 flex items-center justify-center shrink-0 text-[#8f9097]">
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </div>
            <input
              type="text"
              required
              value={driverCode}
              onChange={(e) => setDriverCode(e.target.value)}
              placeholder="ej. COND-8941 o 45892011"
              className="w-full bg-transparent text-[#e0e3e5] placeholder:text-[#8f9097] text-sm py-2.5 pr-2 focus:outline-none font-medium"
            />
            <div className="pr-3 text-[#8f9097]">
              <span className="material-symbols-outlined text-[18px]">fingerprint</span>
            </div>
          </div>
        </div>

        {/* Input 2: Placa de Unidad Asignada */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#c5c6cd] flex items-center justify-between font-medium">
            <span>Placa de Unidad Asignada</span>
            <span className="text-[#aac9f4] text-[10px] font-bold">Sprinter VIP</span>
          </label>
          <div className="relative flex items-center rounded-lg bg-[#272a2c] border border-[#323537] focus-within:border-[#ffb95f] focus-within:bg-[#323537] transition-all">
            <div className="w-10 h-11 flex items-center justify-center shrink-0 text-[#8f9097]">
              <span className="material-symbols-outlined text-[20px]">directions_bus</span>
            </div>
            <input
              type="text"
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              placeholder="ej. T4B-912"
              className="w-full bg-transparent text-[#e0e3e5] uppercase tracking-wider text-sm py-2.5 pr-2 focus:outline-none font-bold"
            />
            <div className="pr-2 flex items-center gap-1.5 shrink-0">
              <span className="px-2 py-0.5 rounded bg-[#29486d] text-[#aac9f4] text-[10px] font-semibold">
                Mercedes 515
              </span>
              <button
                type="button"
                onClick={() => setVehiclePlate(vehiclePlate === 'T4B-912' ? 'T4C-501' : 'T4B-912')}
                aria-label="Cambiar unidad asignada"
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#8f9097] hover:text-white hover:bg-[#323537]"
              >
                <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
              </button>
            </div>
          </div>
        </div>

        {/* Input 3: PIN Operativo */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs text-[#c5c6cd] font-medium">PIN Operativo o Contraseña</label>
            <button
              type="button"
              onClick={() => alert('Contacta a Mesa de Ayuda / Despacho para restablecer tu PIN de guardia.')}
              className="text-[11px] text-[#ffb95f] hover:underline"
            >
              ¿Olvidaste tu PIN?
            </button>
          </div>
          <div className="relative flex items-center rounded-lg bg-[#272a2c] border border-[#323537] focus-within:border-[#ffb95f] focus-within:bg-[#323537] transition-all">
            <div className="w-10 h-11 flex items-center justify-center shrink-0 text-[#8f9097]">
              <span className="material-symbols-outlined text-[20px]">lock</span>
            </div>
            <input
              type={showPin ? 'text' : 'password'}
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••••"
              className="w-full bg-transparent text-[#e0e3e5] tracking-widest text-sm py-2.5 pr-3 focus:outline-none font-mono"
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="w-10 h-11 flex items-center justify-center shrink-0 text-[#8f9097] hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPin ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        {/* Biometric Check Card */}
        <div className="p-3 rounded-lg bg-[#191c1e] border border-[#272a2c] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-9 h-9 rounded-full bg-[#ffb95f]/15 text-[#ffb95f] flex items-center justify-center shrink-0 border border-[#ffb95f]/30">
              <span className="material-symbols-outlined text-[20px]">face</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-[#e0e3e5] font-bold truncate">
                Biometría Facial / Dactilar
              </span>
              <span className="text-[11px] text-[#8f9097]">
                Cotejo RENIEC en tiempo real
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleBiometric}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95 transition-all ${
              biometricActive
                ? 'bg-[#ffb95f] text-[#2a1700] shadow-[0_0_12px_rgba(255,185,95,0.4)] animate-pulse'
                : 'bg-[#323537] text-[#ffb95f] hover:bg-[#272a2c]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {biometricActive ? 'check_circle' : 'touch_app'}
            </span>
            <span>{biometricActive ? 'Verificado' : 'Activar'}</span>
          </button>
        </div>

        {/* Primary CTA Button */}
        <button
          type="submit"
          disabled={isValidating}
          className="w-full h-[52px] rounded-xl bg-gradient-to-r from-[#ffddb8] via-[#ffb95f] to-[#e59b38] text-[#2a1700] font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_8px_24px_-4px_rgba(255,185,95,0.35)] active:scale-[0.98] transition-all hover:brightness-105 cursor-pointer disabled:opacity-75"
        >
          {isValidating ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
              <span>COMPROBANDO SUTRAN & MTC...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[24px]">sports_motorsports</span>
              <span>VALIDAR E INICIAR TURNO</span>
            </>
          )}
        </button>
      </form>

      {/* Driver Help Desk */}
      <div className="flex flex-col gap-2.5">
        <div className="px-1 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-[#8f9097] font-bold">
            Mesa de Ayuda al Conductor
          </span>
          <span className="flex items-center gap-1 text-[#c5c6cd] text-[10px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#ffb95f] animate-pulse"></span>
            Despacho 24/7 Activo
          </span>
        </div>

        <div className="bg-[#1d2022] border border-[#272a2c] rounded-xl p-3.5 shadow-md flex flex-col gap-3">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0b192c] text-[#bac7e1] flex items-center justify-center shrink-0 mt-0.5 border border-[#29486d]">
              <span className="material-symbols-outlined text-[18px]">headset_mic</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white">
                ¿Inconvenientes con tu unidad o ruta?
              </span>
              <p className="text-[11px] text-[#c5c6cd] mt-0.5 leading-relaxed">
                Si la placa no coincide o tu credencial SUTRAN aparece bloqueada, enlaza de inmediato con el monitor de guardia.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href="tel:080010999"
              className="flex items-center justify-center gap-1.5 h-10 rounded-lg bg-[#272a2c] text-white text-xs font-bold hover:bg-[#323537] border border-[#323537] transition-colors"
            >
              <span className="material-symbols-outlined text-[#aac9f4] text-[16px]">call</span>
              <span>Central Radio</span>
            </a>
            <a
              href="https://wa.me/51999999999"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 h-10 rounded-lg bg-[#29486d] text-[#aac9f4] text-xs font-bold hover:bg-[#29486d]/80 transition-colors"
            >
              <span className="material-symbols-outlined text-[#ffb95f] text-[16px]">chat</span>
              <span>WhatsApp Guardia</span>
            </a>
          </div>
        </div>

        {/* Affiliation Link */}
        <div className="text-center py-2">
          <button
            type="button"
            onClick={() => alert('Redirigiendo al formulario de homologación de nuevas flotas Sprinter en SUTRAN...')}
            className="inline-flex items-center gap-1 text-[#aac9f4] hover:text-[#ffddb8] transition-colors text-xs font-semibold"
          >
            <span>Solicitar homologación de nueva unidad o cambio de chófer</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
