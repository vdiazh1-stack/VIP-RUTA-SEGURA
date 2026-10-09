import React, { useState, useRef } from 'react';
import { AppScreen } from '../types';

interface WelcomeScreenProps {
  onSelectRole: (role: 'passenger' | 'driver') => void;
  onNavigate: (screen: AppScreen) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSelectRole,
  onNavigate,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const width = sliderRef.current.offsetWidth * 0.75;
      const index = Math.round(scrollLeft / width);
      setActiveSlide(Math.min(Math.max(index, 0), 2));
    }
  };

  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.scrollWidth / 3;
      sliderRef.current.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth',
      });
      setActiveSlide(index);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-10 pt-4 px-4">
      {/* Official SUTRAN Header Card */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#191c1e] border border-[#272a2c] shadow-2xl p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b192c] border border-[#29486d]/50 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#ffb95f] animate-pulse"></span>
            <span className="text-[10px] text-[#ffddb8] font-bold tracking-wider uppercase">
              PERÚ • SERVICIO OFICIAL
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#272a2c] text-[#c5c6cd] text-[11px] font-semibold border border-[#323537]">
            <span
              className="material-symbols-outlined text-[16px] text-[#ffb95f]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span>SUTRAN MTC</span>
          </div>
        </div>

        {/* Brand Crest */}
        <div className="flex flex-col items-center text-center my-2">
          <div className="relative mb-3 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ffb95f] via-[#e59b38] to-[#261500] p-0.5 shadow-xl">
              <div className="w-full h-full bg-[#0b192c] rounded-[14px] flex flex-col items-center justify-center relative overflow-hidden">
                <span
                  className="material-symbols-outlined text-[38px] text-[#ffb95f]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield_with_heart
                </span>
                <div className="absolute -bottom-0.5 w-full text-center py-0.5 bg-[#ffb95f] text-[#2a1700] text-[9px] font-extrabold uppercase tracking-widest">
                  VIP
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-[#e0e3e5] tracking-tight mb-1">
            VIP RUTA <span className="text-[#ffb95f]">SEGURA</span>
          </h1>
          <p className="text-xs text-[#c5c6cd] max-w-xs px-2 leading-relaxed">
            Transporte Interprovincial Ejecutivo & Monitoreado en Tiempo Real
          </p>
        </div>

        {/* Satellite GPS Bar */}
        <div className="mt-4 p-2.5 rounded-xl bg-[#1d2022] border border-[#272a2c] flex items-center justify-center gap-2 shadow-inner text-center">
          <span
            className="material-symbols-outlined text-[#aac9f4] text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            fmd_good
          </span>
          <span className="text-xs text-[#aac9f4] font-semibold">
            Monitoreo Satelital GPS 24/7 • Autorizado por SUTRAN
          </span>
        </div>
      </div>

      {/* Value Proposition Slider */}
      <div className="w-full mb-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">verified_user</span>
            <span className="text-xs font-bold text-[#e0e3e5] uppercase tracking-wider">
              Garantía Ejecutiva
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === i ? 'w-5 bg-[#ffb95f]' : 'w-2 bg-[#323537]'
                }`}
              />
            ))}
          </div>
        </div>

        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 scroll-smooth"
        >
          {/* Card 1 */}
          <div className="min-w-[270px] flex-1 snap-center rounded-xl bg-[#272a2c] border border-[#323537] p-4 flex flex-col justify-between shadow-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#323537] text-[#ffb95f] shrink-0">
                <span className="material-symbols-outlined text-[24px]">airline_seat_recline_extra</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-[#ffb95f] font-bold uppercase tracking-wider">
                  Flota Premium
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">Vans Mercedes Sprinter</h3>
              </div>
            </div>
            <p className="text-xs text-[#c5c6cd] mt-2 leading-relaxed">
              Solo 8 asientos reclinables de cuero, conectividad USB individual y climatización controlada.
            </p>
            <div className="mt-3 pt-2 border-t border-[#323537] flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-[#aac9f4] font-semibold">
                <span className="material-symbols-outlined text-[14px]">airline_seat_individual_suite</span>
                Espacio VIP
              </span>
              <span className="font-bold text-[#ffb95f]">100% Garantizado</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="min-w-[270px] flex-1 snap-center rounded-xl bg-[#272a2c] border border-[#323537] p-4 flex flex-col justify-between shadow-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#323537] text-[#aac9f4] shrink-0">
                <span className="material-symbols-outlined text-[24px]">cell_tower</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-[#aac9f4] font-bold uppercase tracking-wider">
                  Telemetría Activa
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">Seguimiento y SOS</h3>
              </div>
            </div>
            <p className="text-xs text-[#c5c6cd] mt-2 leading-relaxed">
              Comparte tu ruta en vivo por WhatsApp a familiares, asistencia vial directa y botón de alerta.
            </p>
            <div className="mt-3 pt-2 border-t border-[#323537] flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-[#aac9f4] font-semibold">
                <span className="material-symbols-outlined text-[14px]">share_location</span>
                Enlace Familiar
              </span>
              <span className="font-bold text-[#ffb95f]">En Tiempo Real</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="min-w-[270px] flex-1 snap-center rounded-xl bg-[#272a2c] border border-[#323537] p-4 flex flex-col justify-between shadow-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#323537] text-[#ffb95f] shrink-0">
                <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-[#ffb95f] font-bold uppercase tracking-wider">
                  Pago Seguro
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">Yape, Plin y Tarjetas</h3>
              </div>
            </div>
            <p className="text-xs text-[#c5c6cd] mt-2 leading-relaxed">
              Reserva inmediata sin efectivo, emisión de boleto electrónico oficial con QR de abordaje.
            </p>
            <div className="mt-3 pt-2 border-t border-[#323537] flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-[#aac9f4] font-semibold">
                <span className="material-symbols-outlined text-[14px]">qr_code_2</span>
                Boleto Digital
              </span>
              <span className="font-bold text-[#ffb95f]">0% Comisiones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection Entry Section */}
      <div className="flex flex-col w-full gap-3.5 mb-6">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-[#e0e3e5] uppercase tracking-wide">
            ¿Cómo deseas ingresar hoy?
          </span>
          <span className="text-[11px] text-[#8f9097]">Paso 1 de 2</span>
        </div>

        {/* Passenger CTA Button */}
        <button
          type="button"
          onClick={() => {
            onSelectRole('passenger');
            onNavigate('auth_passenger');
          }}
          className="group relative w-full text-left rounded-xl p-4 bg-gradient-to-r from-[#ffb95f] to-[#ffaa3b] text-[#2a1700] shadow-[0_8px_24px_-4px_rgba(255,185,95,0.35)] hover:brightness-105 active:scale-[0.99] transition-all overflow-hidden flex flex-col gap-2.5 cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#2a1700]/15 flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-[26px] text-[#2a1700]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  person_pin_circle
                </span>
              </div>
              <div>
                <span className="text-[10px] tracking-wider uppercase opacity-85 font-extrabold block">
                  Acceso Clientes
                </span>
                <h2 className="text-lg font-black text-[#2a1700] leading-tight">
                  SOY PASAJERO
                </h2>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#2a1700]/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <span className="material-symbols-outlined text-[20px] text-[#2a1700]">arrow_forward</span>
            </div>
          </div>
          <p className="text-xs text-[#2a1700] opacity-90 leading-snug">
            Elige tu asiento en la Sprinter de 8 plazas, viaja monitoreado y confirma tu boleto con Yape o Plin.
          </p>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2a1700]/15 text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px]">event_seat</span>
              8 Plazas
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2a1700]/15 text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              Reserva Inmediata
            </span>
          </div>
        </button>

        {/* Driver CTA Button */}
        <button
          type="button"
          onClick={() => {
            onSelectRole('driver');
            onNavigate('auth_driver');
          }}
          className="group relative w-full text-left rounded-xl p-4 bg-[#272a2c] hover:bg-[#323537] text-white border border-[#323537] shadow-lg active:scale-[0.99] transition-all flex flex-col gap-2.5 cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#29486d] text-[#aac9f4] flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-[26px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sports_score
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#aac9f4] tracking-wider uppercase font-bold block">
                  Personal Acreditado
                </span>
                <h2 className="text-lg font-bold text-white leading-tight">
                  SOY CONDUCTOR / OPERADOR
                </h2>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#323537] flex items-center justify-center text-[#c5c6cd] group-hover:translate-x-0.5 transition-transform">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </div>
          </div>
          <p className="text-xs text-[#c5c6cd] leading-snug">
            Gestionar van asignada, validar lista de abordaje con escaneo de QR y sincronizar ruta de cabina.
          </p>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#323537] text-[11px] text-[#c5c6cd] font-semibold">
              <span className="material-symbols-outlined text-[14px]">badge</span>
              Brevete A-III
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#323537] text-[11px] text-[#c5c6cd] font-semibold">
              <span className="material-symbols-outlined text-[14px]">sensors</span>
              GPS Activo
            </span>
          </div>
        </button>
      </div>

      {/* Footer Info Links */}
      <div className="flex flex-col items-center gap-3 pt-2">
        <div className="flex items-center justify-center gap-4 w-full text-xs text-[#8f9097]">
          <button
            type="button"
            onClick={() => alert('SUTRAN / MTC: Empresa homologada en transporte terrestre interprovincial ejecutivo.')}
            className="flex items-center gap-1 hover:text-[#ffb95f] transition-colors py-1"
          >
            <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">security</span>
            <span>Términos y Seguridad SUTRAN</span>
          </button>
          <span>•</span>
          <a
            href="tel:080011223"
            className="flex items-center gap-1 hover:text-[#aac9f4] transition-colors py-1"
          >
            <span className="material-symbols-outlined text-[16px] text-[#aac9f4]">support_agent</span>
            <span>Central 24 Horas</span>
          </a>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191c1e] text-[10px] text-[#8f9097] border border-[#272a2c]">
          <span
            className="material-symbols-outlined text-[14px] text-[#ffb95f]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            lock
          </span>
          <span>Plataforma Encriptada de Movilidad Segura</span>
        </div>
      </div>
    </div>
  );
};
