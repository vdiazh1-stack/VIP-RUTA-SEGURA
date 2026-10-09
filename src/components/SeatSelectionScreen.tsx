import React, { useState, useEffect } from 'react';
import { Seat, RouteTrip, AppScreen } from '../types';
import { APP_IMAGES, DEFAULT_TRIP } from '../data/mockData';

interface SeatSelectionScreenProps {
  trip?: RouteTrip;
  selectedSeatId: number;
  onSelectSeat: (seatId: number) => void;
  onProceedToPayment: (method: 'Yape' | 'Plin') => void;
  onNavigate: (screen: AppScreen) => void;
}

export const SeatSelectionScreen: React.FC<SeatSelectionScreenProps> = ({
  trip = DEFAULT_TRIP,
  selectedSeatId,
  onSelectSeat,
  onProceedToPayment,
  onNavigate,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(19 * 60 + 55);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  // Countdown timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSeatClick = (seatId: number) => {
    if (seatId === 2 || seatId === 7) {
      showToast('Asiento Ocupado', 'Este asiento ya fue confirmado por otro pasajero.');
      return;
    }
    if (seatId === 4) {
      showToast('Bloqueo Temporal', 'Este asiento está retenido en proceso de pago bancario.');
      return;
    }

    onSelectSeat(seatId);
    showToast(`Asiento 0${seatId} Seleccionado`, `Tienes ${formatTimer(secondsLeft)} minutos para confirmar tu pago.`);
  };

  const showToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const getSeatPositionName = (id: number) => {
    switch (id) {
      case 1:
      case 5:
      case 7:
        return 'Ventana Izquierda';
      case 3:
      case 4:
      case 6:
      case 8:
        return 'Ventana Derecha';
      case 2:
        return 'Lado Pasillo';
      default:
        return 'Plaza Ejecutiva';
    }
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24 px-4 pt-2 gap-4">
      {/* Trip Summary Ticket Card */}
      <div className="relative bg-[#1d2022] border border-[#272a2c] rounded-2xl shadow-xl overflow-hidden mt-1">
        {/* Top Gold Edge Accent */}
        <div className="h-1 w-full bg-gradient-to-r from-[#261500] via-[#ffb95f] to-[#ffddb8]"></div>

        <div className="p-4 flex flex-col gap-3">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#261500] text-[#ffb95f] border border-[#ffb95f]/30 text-[10px] font-extrabold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] animate-ping"></span>
              SERVICIO DIRECTO VIP
            </span>
            <div className="flex items-center gap-1 bg-[#272a2c] px-2.5 py-1 rounded-lg text-[#c5c6cd] text-[11px] font-medium border border-[#323537]">
              <span className="material-symbols-outlined text-[14px] text-[#ffb95f]">departure_board</span>
              <span>{trip.departureTime}</span>
            </div>
          </div>

          {/* Origin & Destination Display */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#8f9097] uppercase tracking-wider font-bold">
                Origen
              </span>
              <span className="text-lg font-black text-white">{trip.origin}</span>
              <span className="text-[11px] text-[#c5c6cd]">{trip.originStation}</span>
            </div>

            <div className="flex flex-col items-center px-2">
              <span className="material-symbols-outlined text-[#ffb95f] text-[22px]">arrow_forward</span>
              <span className="text-[11px] text-[#ffddb8] font-bold">{trip.duration}</span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[10px] text-[#8f9097] uppercase tracking-wider font-bold">
                Destino
              </span>
              <span className="text-lg font-black text-white">{trip.destination}</span>
              <span className="text-[11px] text-[#c5c6cd]">{trip.destinationStation}</span>
            </div>
          </div>

          {/* Vehicle Specs & Price Pill */}
          <div className="flex items-center justify-between pt-2.5 border-t border-[#323537] bg-[#0b0f10]/60 -mx-4 -mb-4 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#aac9f4] text-[18px]">airport_shuttle</span>
              <div className="flex flex-col">
                <span className="text-xs text-white font-bold">{trip.vehicleModel}</span>
                <span className="text-[11px] text-[#8f9097]">
                  Placa: <strong className="text-white">{trip.plate}</strong>
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-[#8f9097]">Tarifa:</span>
              <span className="text-lg text-[#ffb95f] font-black">S/ {trip.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend Bar */}
      <div className="bg-[#191c1e] border border-[#272a2c] rounded-xl p-3 flex items-center justify-between shadow-sm text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-emerald-950 border border-emerald-500/50 flex items-center justify-center">
            <div className="w-2 h-2 rounded bg-emerald-400"></div>
          </div>
          <span className="text-[#c5c6cd] font-medium">Libre</span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-[#261500] border border-[#ffb95f]/50 flex items-center justify-center">
            <div className="w-2 h-2 rounded bg-[#ffb95f]"></div>
          </div>
          <span className="text-[#c5c6cd] font-medium">Retenido</span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-[#323537] border border-red-500/40 flex items-center justify-center">
            <div className="w-2 h-2 rounded bg-red-400"></div>
          </div>
          <span className="text-[#c5c6cd] font-medium">Ocupado</span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-[#ffb95f] flex items-center justify-center text-[#2a1700]">
            <span className="material-symbols-outlined text-[10px] font-black">check</span>
          </div>
          <span className="text-[#ffb95f] font-bold">Tu Asiento</span>
        </div>
      </div>

      {/* Van Cockpit & Cabin Architectural Card */}
      <div className="relative bg-[#191c1e] border border-[#272a2c] rounded-2xl p-4 shadow-xl flex flex-col items-center">
        {/* Front Cabin Hood Graphic Curve */}
        <div className="w-44 h-3 bg-[#323537] rounded-t-full mb-3 opacity-60"></div>

        {/* Driver & Co-Pilot Area */}
        <div className="w-full bg-[#1d2022] border border-[#272a2c] rounded-xl p-3 mb-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={APP_IMAGES.driverAvatar}
                alt="Carlos Mendoza"
                className="w-11 h-11 rounded-full object-cover shadow-md ring-2 ring-[#ffb95f]/40"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-950 text-emerald-400 p-0.5 rounded-full flex items-center justify-center border border-emerald-500/50">
                <span className="material-symbols-outlined text-[12px]">verified</span>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-[#8f9097] uppercase tracking-wider font-bold">
                  Chófer Asignado
                </span>
                <span className="inline-flex items-center text-[#ffb95f] text-xs font-bold">
                  <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  {trip.driverRating}
                </span>
              </div>
              <span className="text-sm text-white font-bold">{trip.driverName}</span>
              <span className="text-[11px] text-[#aac9f4] font-medium">{trip.driverLicense}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-[#272a2c] px-3 py-1.5 rounded-lg border border-[#323537]">
            <span className="material-symbols-outlined text-[#8f9097] text-[20px]">
              airline_seat_recline_normal
            </span>
            <span className="text-[10px] text-[#8f9097] font-semibold">Cabina</span>
          </div>
        </div>

        {/* Interior Cabin Aisle Header */}
        <div className="w-full flex justify-between items-center px-3 pb-2 text-[#8f9097] text-[10px] uppercase font-bold tracking-wider">
          <span>LADO VENTANA IZQ.</span>
          <span className="text-[#ffb95f] font-extrabold tracking-widest flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">keyboard_double_arrow_down</span>
            PASILLO VIP
          </span>
          <span>LADO VENTANA DER.</span>
        </div>

        {/* 8 Seats Layout Grid */}
        <div className="w-full flex flex-col gap-3 py-1">
          {/* Row 1: Seat 1 (Available) & Seat 2 (Occupied) */}
          <div className="flex items-center justify-between w-full">
            {/* Seat 1 */}
            <button
              type="button"
              onClick={() => handleSeatClick(1)}
              className={`flex-1 max-w-[44%] h-20 rounded-xl p-2.5 flex flex-col justify-between shadow-md transition-all active:scale-95 text-left cursor-pointer ${
                selectedSeatId === 1
                  ? 'bg-gradient-to-r from-[#ffb95f] to-[#ffaa3b] text-[#2a1700] ring-2 ring-[#ffb95f]'
                  : 'bg-[#1d2022] border border-emerald-500/30 hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    selectedSeatId === 1
                      ? 'bg-[#2a1700]/20 text-[#2a1700]'
                      : 'text-emerald-400 bg-emerald-950/80 border border-emerald-500/30'
                  }`}
                >
                  N° 01
                </span>
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    selectedSeatId === 1 ? 'text-[#2a1700]' : 'text-emerald-400'
                  }`}
                >
                  airline_seat_recline_extra
                </span>
              </div>
              <div className="flex items-center justify-between w-full">
                <span className={`text-xs font-semibold ${selectedSeatId === 1 ? 'text-[#2a1700]' : 'text-white'}`}>
                  {selectedSeatId === 1 ? 'Seleccionado' : 'Asiento 1'}
                </span>
                <span className={`text-xs font-bold ${selectedSeatId === 1 ? 'text-[#2a1700]' : 'text-emerald-300'}`}>
                  S/ 35
                </span>
              </div>
            </button>

            {/* Aisle Spacer */}
            <div className="w-[12%] flex flex-col items-center justify-center opacity-30">
              <div className="w-0.5 h-8 bg-[#8f9097]"></div>
            </div>

            {/* Seat 2 (Occupied) */}
            <div className="flex-1 max-w-[44%] h-20 bg-[#272a2c]/60 border border-[#323537] rounded-xl p-2.5 flex flex-col justify-between shadow-none opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-bold text-[#ffb4ab] bg-[#93000a]/60 px-2 py-0.5 rounded border border-[#ffb4ab]/20">
                  N° 02
                </span>
                <span className="material-symbols-outlined text-[#ffb4ab] text-[18px]">lock</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-[#8f9097]">Ocupado</span>
                <span className="text-xs text-[#8f9097] line-through">S/ 35</span>
              </div>
            </div>
          </div>

          {/* Row 2: Seat 3 (Current Selected) & Seat 4 (Held with timer) */}
          <div className="flex items-center justify-between w-full">
            {/* Seat 3 */}
            <button
              type="button"
              onClick={() => handleSeatClick(3)}
              className={`flex-1 max-w-[44%] h-20 rounded-xl p-2.5 flex flex-col justify-between shadow-lg transition-all text-left cursor-pointer ${
                selectedSeatId === 3
                  ? 'bg-gradient-to-r from-[#ffb95f] to-[#ffaa3b] text-[#2a1700] ring-2 ring-[#ffb95f] shadow-[0_4px_16px_rgba(255,185,95,0.35)]'
                  : 'bg-[#1d2022] border border-emerald-500/30 hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[11px] font-black px-2 py-0.5 rounded flex items-center gap-1 ${
                    selectedSeatId === 3
                      ? 'bg-[#2a1700]/25 text-[#2a1700]'
                      : 'text-emerald-400 bg-emerald-950/80'
                  }`}
                >
                  {selectedSeatId === 3 && (
                    <span className="material-symbols-outlined text-[12px] font-black">done</span>
                  )}
                  N° 03
                </span>
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    selectedSeatId === 3 ? 'text-[#2a1700]' : 'text-emerald-400'
                  }`}
                >
                  airline_seat_recline_extra
                </span>
              </div>
              <div className="flex items-center justify-between w-full">
                <span className={`text-xs font-bold ${selectedSeatId === 3 ? 'text-[#2a1700]' : 'text-white'}`}>
                  {selectedSeatId === 3 ? 'Seleccionado' : 'Asiento 3'}
                </span>
                <span className={`text-xs font-black ${selectedSeatId === 3 ? 'text-[#2a1700]' : 'text-emerald-300'}`}>
                  S/ 35.00
                </span>
              </div>
            </button>

            {/* Aisle Spacer */}
            <div className="w-[12%] flex flex-col items-center justify-center opacity-30">
              <div className="w-0.5 h-8 bg-[#8f9097]"></div>
            </div>

            {/* Seat 4 (Held / Retenido) */}
            <div
              onClick={() => handleSeatClick(4)}
              className="relative flex-1 max-w-[44%] h-20 bg-[#1d2022] border border-[#ffb95f]/40 rounded-xl p-2.5 flex flex-col justify-between shadow-md overflow-hidden cursor-pointer"
            >
              <div className="absolute -top-0.5 right-0 bg-[#261500] border-b border-l border-[#ffb95f]/30 px-2 py-0.5 rounded-bl text-[#ffb95f] text-[9px] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px] animate-pulse">timer</span>
                <span>18:42</span>
              </div>
              <div className="flex items-center justify-between w-full pt-1">
                <span className="text-[11px] font-bold text-[#ffb95f] bg-[#261500] px-2 py-0.5 rounded border border-[#ffb95f]/30">
                  N° 04
                </span>
                <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">hourglass_top</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] text-[#ffb95f] font-semibold truncate">Bloqueo temp.</span>
                <span className="text-[11px] text-[#8f9097]">S/ 35</span>
              </div>
            </div>
          </div>

          {/* Row 3: Seat 5 (Available) & Seat 6 (Available) */}
          <div className="flex items-center justify-between w-full">
            {/* Seat 5 */}
            <button
              type="button"
              onClick={() => handleSeatClick(5)}
              className={`flex-1 max-w-[44%] h-20 rounded-xl p-2.5 flex flex-col justify-between shadow-md transition-all active:scale-95 text-left cursor-pointer ${
                selectedSeatId === 5
                  ? 'bg-gradient-to-r from-[#ffb95f] to-[#ffaa3b] text-[#2a1700] ring-2 ring-[#ffb95f]'
                  : 'bg-[#1d2022] border border-emerald-500/30 hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    selectedSeatId === 5
                      ? 'bg-[#2a1700]/20 text-[#2a1700]'
                      : 'text-emerald-400 bg-emerald-950/80 border border-emerald-500/30'
                  }`}
                >
                  N° 05
                </span>
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    selectedSeatId === 5 ? 'text-[#2a1700]' : 'text-emerald-400'
                  }`}
                >
                  airline_seat_recline_extra
                </span>
              </div>
              <div className="flex items-center justify-between w-full">
                <span className={`text-xs font-semibold ${selectedSeatId === 5 ? 'text-[#2a1700]' : 'text-white'}`}>
                  {selectedSeatId === 5 ? 'Seleccionado' : 'Asiento 5'}
                </span>
                <span className={`text-xs font-bold ${selectedSeatId === 5 ? 'text-[#2a1700]' : 'text-emerald-300'}`}>
                  S/ 35
                </span>
              </div>
            </button>

            {/* Aisle Spacer */}
            <div className="w-[12%] flex flex-col items-center justify-center opacity-30">
              <div className="w-0.5 h-8 bg-[#8f9097]"></div>
            </div>

            {/* Seat 6 */}
            <button
              type="button"
              onClick={() => handleSeatClick(6)}
              className={`flex-1 max-w-[44%] h-20 rounded-xl p-2.5 flex flex-col justify-between shadow-md transition-all active:scale-95 text-left cursor-pointer ${
                selectedSeatId === 6
                  ? 'bg-gradient-to-r from-[#ffb95f] to-[#ffaa3b] text-[#2a1700] ring-2 ring-[#ffb95f]'
                  : 'bg-[#1d2022] border border-emerald-500/30 hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    selectedSeatId === 6
                      ? 'bg-[#2a1700]/20 text-[#2a1700]'
                      : 'text-emerald-400 bg-emerald-950/80 border border-emerald-500/30'
                  }`}
                >
                  N° 06
                </span>
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    selectedSeatId === 6 ? 'text-[#2a1700]' : 'text-emerald-400'
                  }`}
                >
                  airline_seat_recline_extra
                </span>
              </div>
              <div className="flex items-center justify-between w-full">
                <span className={`text-xs font-semibold ${selectedSeatId === 6 ? 'text-[#2a1700]' : 'text-white'}`}>
                  {selectedSeatId === 6 ? 'Seleccionado' : 'Asiento 6'}
                </span>
                <span className={`text-xs font-bold ${selectedSeatId === 6 ? 'text-[#2a1700]' : 'text-emerald-300'}`}>
                  S/ 35
                </span>
              </div>
            </button>
          </div>

          {/* Row 4: Seat 7 (Occupied) & Seat 8 (Available) */}
          <div className="flex items-center justify-between w-full">
            {/* Seat 7 (Occupied) */}
            <div className="flex-1 max-w-[44%] h-20 bg-[#272a2c]/60 border border-[#323537] rounded-xl p-2.5 flex flex-col justify-between shadow-none opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-bold text-[#ffb4ab] bg-[#93000a]/60 px-2 py-0.5 rounded border border-[#ffb4ab]/20">
                  N° 07
                </span>
                <span className="material-symbols-outlined text-[#ffb4ab] text-[18px]">lock</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-[#8f9097]">Ocupado</span>
                <span className="text-xs text-[#8f9097] line-through">S/ 35</span>
              </div>
            </div>

            {/* Aisle Spacer */}
            <div className="w-[12%] flex flex-col items-center justify-center opacity-30">
              <div className="w-0.5 h-8 bg-[#8f9097]"></div>
            </div>

            {/* Seat 8 */}
            <button
              type="button"
              onClick={() => handleSeatClick(8)}
              className={`flex-1 max-w-[44%] h-20 rounded-xl p-2.5 flex flex-col justify-between shadow-md transition-all active:scale-95 text-left cursor-pointer ${
                selectedSeatId === 8
                  ? 'bg-gradient-to-r from-[#ffb95f] to-[#ffaa3b] text-[#2a1700] ring-2 ring-[#ffb95f]'
                  : 'bg-[#1d2022] border border-emerald-500/30 hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    selectedSeatId === 8
                      ? 'bg-[#2a1700]/20 text-[#2a1700]'
                      : 'text-emerald-400 bg-emerald-950/80 border border-emerald-500/30'
                  }`}
                >
                  N° 08
                </span>
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    selectedSeatId === 8 ? 'text-[#2a1700]' : 'text-emerald-400'
                  }`}
                >
                  airline_seat_recline_extra
                </span>
              </div>
              <div className="flex items-center justify-between w-full">
                <span className={`text-xs font-semibold ${selectedSeatId === 8 ? 'text-[#2a1700]' : 'text-white'}`}>
                  {selectedSeatId === 8 ? 'Seleccionado' : 'Asiento 8'}
                </span>
                <span className={`text-xs font-bold ${selectedSeatId === 8 ? 'text-[#2a1700]' : 'text-emerald-300'}`}>
                  S/ 35
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Amenities Footer */}
        <div className="w-full flex items-center justify-between pt-3 mt-2 border-t border-[#323537] text-[#8f9097] text-xs">
          <span className="flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">luggage</span>
            Maletero Amplio Incluido (20kg)
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <span className="material-symbols-outlined text-[16px]">wifi</span>
            Wi-Fi 5G & AC
          </span>
        </div>
      </div>

      {/* Bottom Checkout & Instant Billeteras Digitales Card */}
      <div className="bg-[#1d2022] border border-[#272a2c] rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
        {/* Booking Lock Timer Pill */}
        <div className="flex items-center justify-between bg-[#272a2c] px-3.5 py-2 rounded-xl border border-[#323537]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb95f] text-[18px] animate-pulse">
              hourglass_bottom
            </span>
            <span className="text-xs text-[#e0e3e5] font-medium">
              Tiempo de reserva garantizada:
            </span>
          </div>
          <div className="bg-[#261500] border border-[#ffb95f]/30 px-2.5 py-0.5 rounded-md">
            <span className="text-sm font-black text-[#ffb95f] tracking-wider font-mono">
              {formatTimer(secondsLeft)}
            </span>
          </div>
        </div>

        {/* Active Seat Summary Row */}
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#8f9097] uppercase tracking-wider font-bold">
              Asiento confirmado
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black text-white">
                Asiento 0{selectedSeatId}
              </span>
              <span className="text-[#ffb95f] text-xs font-semibold">
                ({getSeatPositionName(selectedSeatId)})
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-[#8f9097] uppercase tracking-wider font-bold">
              Total a pagar
            </span>
            <span className="text-xl font-black text-[#ffb95f]">
              S/ {trip.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Instant Payment Badges */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-[10px] text-[#8f9097] uppercase tracking-wider font-bold">
            Paga al instante sin comisiones:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {/* Yape Button */}
            <button
              type="button"
              onClick={() => onProceedToPayment('Yape')}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#592383] hover:bg-[#6c2da0] text-white shadow-md active:scale-95 transition-all cursor-pointer border border-purple-400/30"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm font-black tracking-tight">Yape</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-bold text-white">
                QR / Cel
              </span>
            </button>

            {/* Plin Button */}
            <button
              type="button"
              onClick={() => onProceedToPayment('Plin')}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#00A9E0] hover:bg-[#00beff] text-white shadow-md active:scale-95 transition-all cursor-pointer border border-cyan-300/30"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
              <span className="text-sm font-black tracking-tight">Plin</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-bold text-white">
                Directo
              </span>
            </button>
          </div>
        </div>

        {/* Glowing Executive Primary CTA Button */}
        <button
          type="button"
          onClick={() => onProceedToPayment('Yape')}
          className="w-full h-[52px] bg-gradient-to-r from-[#ffddb8] via-[#ffb95f] to-[#e59b38] hover:brightness-105 text-[#2a1700] text-sm font-black tracking-wide rounded-xl shadow-[0_4px_24px_-2px_rgba(245,158,11,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">payments</span>
          <span>PAGAR CON YAPE / PLIN (S/ {trip.price.toFixed(0)})</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed inset-x-4 bottom-20 max-w-sm mx-auto bg-[#272a2c] text-white border border-[#323537] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-9 h-9 rounded-full bg-[#261500] text-[#ffb95f] border border-[#ffb95f]/30 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-xs font-bold text-white">{toastMessage.title}</span>
            <span className="text-[11px] text-[#c5c6cd]">{toastMessage.desc}</span>
          </div>
        </div>
      )}
    </div>
  );
};
