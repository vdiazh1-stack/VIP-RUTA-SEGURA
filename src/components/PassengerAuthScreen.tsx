import React, { useState } from 'react';
import { APP_IMAGES } from '../data/mockData';
import { AppScreen } from '../types';

interface PassengerAuthScreenProps {
  onLoginSuccess: (name: string, phoneOrDni: string) => void;
  onNavigate: (screen: AppScreen) => void;
}

export const PassengerAuthScreen: React.FC<PassengerAuthScreenProps> = ({
  onLoginSuccess,
  onNavigate,
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');
  const [identifier, setIdentifier] = useState('987 654 321');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [otpValues, setOtpValues] = useState(['4', '8', '2', '9', '1', '0']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otpValues];
    newOtp[index] = val;
    setOtpValues(newOtp);

    // Focus next box
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      alert('Por favor ingresa tu número celular o DNI.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess('Rodrigo Mendoza', identifier);
      onNavigate('mi_asiento');
    }, 900);
  };

  const handleFastAccess = (provider: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess('Rodrigo Mendoza (Vía ' + provider + ')', '987 654 321');
      onNavigate('mi_asiento');
    }, 700);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-10 px-4 pt-3">
      {/* Luxury Sprinter Interior Hero Card */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-5 bg-[#191c1e] border border-[#272a2c] shadow-xl">
        <div
          className="h-36 w-full relative bg-cover bg-center"
          style={{ backgroundImage: `url("${APP_IMAGES.vanInterior}")` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#191c1e] via-[#191c1e]/70 to-transparent"></div>
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#323537]/80 backdrop-blur-md border border-[#44474c]/50 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#ffb95f] animate-pulse"></span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#ffb95f]">
              Portal Pasajeros
            </span>
          </div>
        </div>

        <div className="px-5 pb-5 -mt-5 relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="material-symbols-outlined text-[#ffb95f] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield_person
            </span>
            <h2 className="text-xl font-bold text-[#e0e3e5]">
              {tab === 'login' ? 'Bienvenido de nuevo' : 'Crea tu Cuenta VIP'}
            </h2>
          </div>
          <p className="text-xs text-[#c5c6cd] leading-relaxed">
            Ingresa para gestionar tus viajes interprovinciales, boletos con QR dinámico y asientos VIP reservados en tiempo real.
          </p>
        </div>
      </div>

      {/* Main Tabs (Iniciar Sesión / Registrarse) */}
      <div className="w-full bg-[#323537] p-1 rounded-xl mb-5 flex items-center">
        <button
          type="button"
          onClick={() => setTab('login')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
            tab === 'login'
              ? 'bg-[#29486d] text-[#aac9f4] shadow-md'
              : 'text-[#c5c6cd] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">login</span>
          Iniciar Sesión
        </button>
        <button
          type="button"
          onClick={() => setTab('register')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
            tab === 'register'
              ? 'bg-[#29486d] text-[#aac9f4] shadow-md'
              : 'text-[#c5c6cd] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Registrarse
        </button>
      </div>

      {/* Validation Method Selector */}
      <div className="flex items-center gap-2 mb-4 px-1">
        <span className="text-[10px] uppercase tracking-wider text-[#ffb95f] font-bold">
          Método de Validación
        </span>
        <div className="flex-1 h-px bg-[#323537]"></div>
        <div className="flex items-center gap-1 bg-[#272a2c] rounded-full p-0.5 border border-[#323537]">
          <button
            type="button"
            onClick={() => setAuthMethod('password')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
              authMethod === 'password'
                ? 'bg-[#261500] text-[#ffb95f] border border-[#ffb95f]/30'
                : 'text-[#c5c6cd] hover:text-white'
            }`}
          >
            Contraseña
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('otp')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
              authMethod === 'otp'
                ? 'bg-[#261500] text-[#ffb95f] border border-[#ffb95f]/30'
                : 'text-[#c5c6cd] hover:text-white'
            }`}
          >
            Código SMS
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-5">
        {/* Identifier (Celular o DNI) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#c5c6cd] flex items-center justify-between font-medium">
            <span>Número de Celular o DNI</span>
            <span className="text-[#ffb95f] text-[10px] font-bold">Validación RENIEC</span>
          </label>
          <div className="relative flex items-center rounded-xl bg-[#191c1e] border border-[#272a2c] focus-within:border-[#ffb95f] focus-within:ring-2 focus-within:ring-[#ffb95f]/20 transition-all overflow-hidden">
            <div className="flex items-center gap-1.5 pl-3.5 pr-2.5 py-3 bg-[#1d2022] border-r border-[#272a2c]">
              {/* Peru Flag */}
              <svg className="w-5 h-3.5 rounded-sm overflow-hidden flex-shrink-0" viewBox="0 0 900 600">
                <rect fill="#D91023" height="600" width="300"></rect>
                <rect fill="#FFFFFF" height="600" width="300" x="300"></rect>
                <rect fill="#D91023" height="600" width="300" x="600"></rect>
              </svg>
              <span className="text-xs text-[#e0e3e5] font-bold">+51</span>
              <span className="material-symbols-outlined text-[#8f9097] text-[16px]">expand_more</span>
            </div>
            <input
              type="tel"
              inputMode="numeric"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="987 654 321 / 72345678"
              className="w-full bg-transparent py-3 pl-3 pr-10 text-sm text-[#e0e3e5] placeholder:text-[#8f9097] focus:outline-none"
            />
            <span className="material-symbols-outlined text-[#8f9097] absolute right-3 pointer-events-none text-[20px]">
              badge
            </span>
          </div>
        </div>

        {/* Password vs OTP */}
        {authMethod === 'password' ? (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#c5c6cd] font-medium">Contraseña de Acceso</label>
            <div className="relative flex items-center rounded-xl bg-[#191c1e] border border-[#272a2c] focus-within:border-[#ffb95f] focus-within:ring-2 focus-within:ring-[#ffb95f]/20 transition-all">
              <span className="material-symbols-outlined text-[#8f9097] pl-3.5 text-[20px]">lock</span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full bg-transparent py-3 pl-2.5 pr-11 text-sm text-[#e0e3e5] placeholder:text-[#8f9097] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar u ocultar contraseña"
                className="absolute right-2 p-1.5 text-[#8f9097] hover:text-[#e0e3e5] rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs text-[#c5c6cd] font-medium">Código de Seguridad (OTP)</label>
              <button
                type="button"
                onClick={() => alert('Se ha reenviado un SMS de 6 dígitos a tu línea celular.')}
                className="text-[11px] text-[#ffb95f] hover:underline font-semibold"
              >
                Reenviar SMS
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {otpValues.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="h-12 text-center text-lg font-bold text-white bg-[#191c1e] border border-[#272a2c] rounded-xl focus:outline-none focus:border-[#ffb95f] focus:ring-2 focus:ring-[#ffb95f]/20 shadow-inner"
                />
              ))}
            </div>
            <p className="text-[11px] text-[#8f9097] mt-0.5">
              Enviamos un código SMS de 6 dígitos con validez de 5 minutos.
            </p>
          </div>
        )}

        {/* Options Row */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded bg-[#272a2c] border-[#44474c] accent-[#ffb95f] cursor-pointer"
            />
            <span className="text-xs text-[#c5c6cd]">Recordar en este equipo</span>
          </label>
          <button
            type="button"
            onClick={() => alert('Te enviaremos un enlace de recuperación seguro por SMS a tu número registrado.')}
            className="text-xs text-[#ffb95f] hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Main Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-1 h-[52px] rounded-xl bg-gradient-to-r from-[#ffddb8] via-[#ffb95f] to-[#e59b38] text-[#2a1700] font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_8px_24px_-4px_rgba(255,185,95,0.4)] active:scale-[0.98] transition-all hover:brightness-105 cursor-pointer disabled:opacity-75"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
              <span>VALIDANDO CREDENCIALES...</span>
            </>
          ) : (
            <>
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                directions_bus
              </span>
              <span>
                {tab === 'login' ? 'INGRESAR COMO PASAJERO' : 'CREAR CUENTA PASAJERO'}
              </span>
            </>
          )}
        </button>
      </form>

      {/* Social / Fast login divider */}
      <div className="relative flex items-center justify-center my-3">
        <div className="w-full h-px bg-[#323537]"></div>
        <span className="absolute px-3 bg-[#101415] text-[10px] uppercase tracking-wider text-[#8f9097] font-semibold">
          O continúa de forma rápida con
        </span>
      </div>

      {/* Fast Access Buttons */}
      <div className="flex flex-col gap-2.5 mb-5">
        <button
          type="button"
          onClick={() => handleFastAccess('WhatsApp')}
          className="w-full h-12 px-4 rounded-xl bg-[#272a2c] hover:bg-[#323537] text-white border border-[#323537] transition-all flex items-center justify-between shadow-sm cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#29486d] text-[#aac9f4] flex items-center justify-center">
              <span className="material-symbols-outlined text-[17px]">chat</span>
            </div>
            <span className="text-xs font-bold">Continuar con WhatsApp / Teléfono</span>
          </div>
          <span className="material-symbols-outlined text-[#8f9097] text-[18px]">chevron_right</span>
        </button>

        <button
          type="button"
          onClick={() => handleFastAccess('Google')}
          className="w-full h-12 px-4 rounded-xl bg-[#272a2c] hover:bg-[#323537] text-white border border-[#323537] transition-all flex items-center justify-between shadow-sm cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#1d2022] text-[#ffb95f] flex items-center justify-center font-black text-sm">
              G
            </div>
            <span className="text-xs font-bold">Acceso Rápido con Google</span>
          </div>
          <span className="material-symbols-outlined text-[#8f9097] text-[18px]">chevron_right</span>
        </button>
      </div>

      {/* Bank & RENIEC Encryption Badge */}
      <div className="rounded-xl p-3.5 bg-[#191c1e] border border-[#272a2c] shadow-md mb-4 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffb95f]"></div>
        <div className="flex items-start gap-3 pl-1">
          <div className="w-8 h-8 rounded-full bg-[#261500] text-[#ffb95f] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#ffb95f]/30">
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              Cifrado Bancario y RENIEC
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f]"></span>
            </h3>
            <p className="text-[11px] text-[#c5c6cd] leading-relaxed mt-0.5">
              Tus datos personales y DNI están cifrados y validados ante RENIEC para tu seguridad en ruta y control de abordaje VIP.
            </p>
          </div>
        </div>
      </div>

      {/* Nightly departure alert */}
      <div className="rounded-xl bg-[#0b0f10] border border-[#272a2c] p-3 mb-4 flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
          <span className="text-xs text-[#c5c6cd]">Próximas salidas nocturnas:</span>
        </div>
        <span className="text-xs text-[#ffb95f] font-bold tracking-wide">
          Trujillo ⇄ Chiclayo
        </span>
      </div>

      {/* Switch tab prompt */}
      <div className="text-center pt-1 pb-4">
        <p className="text-xs text-[#c5c6cd]">
          {tab === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes una cuenta?'}
          <button
            type="button"
            onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
            className="text-xs text-[#ffb95f] hover:underline font-bold ml-1"
          >
            {tab === 'login' ? 'Regístrate en 30 segundos' : 'Inicia Sesión aquí'}
          </button>
        </p>
      </div>
    </div>
  );
};
