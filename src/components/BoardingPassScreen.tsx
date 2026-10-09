import React, { useState } from 'react';
import { RouteTrip, AppScreen } from '../types';

interface BoardingPassScreenProps {
  trip: RouteTrip;
  seatId: number;
  passengerName: string;
  paymentMethod: 'Yape' | 'Plin' | 'Tarjeta';
  onNavigate: (screen: AppScreen) => void;
}

export const BoardingPassScreen: React.FC<BoardingPassScreenProps> = ({
  trip,
  seatId,
  passengerName = 'Rodrigo Mendoza',
  paymentMethod = 'Yape',
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);
  const [qrZoomed, setQrZoomed] = useState(false);
  const bookingCode = 'RS - 8492';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('RS-8492');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Mi Pase de Abordaje VIP Ruta Segura:\n` +
      `Código: RS-8492\n` +
      `Ruta: ${trip.origin} ➔ ${trip.destination}\n` +
      `Salida: ${trip.departureTime} (Abordaje 07:15 AM)\n` +
      `Asiento: #${seatId}\n` +
      `Chófer: ${trip.driverName} (Placa ${trip.plate})\n` +
      `Terminal: Terrapuerto Trujillo - Sala VIP Piso 1 (Puerta 4)\n` +
      `Seguimiento satelital en vivo activo SUTRAN.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleOpenMap = () => {
    window.open('https://maps.google.com/?q=Terrapuerto+Trujillo', '_blank');
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24 px-4 pt-2 gap-4">
      {/* Transaction Approved Alert */}
      <div className="bg-[#191c1e] border border-emerald-500/40 rounded-2xl p-4 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              TRANSACCIÓN APROBADA •
            </span>
            <h2 className="text-sm font-extrabold text-white">
              ¡PAGO CONFIRMADO VÍA {paymentMethod.toUpperCase()}!
            </h2>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#29486d] text-[#aac9f4] text-[10px] font-black uppercase tracking-wider">
          VIP
        </span>
      </div>

      {/* Main Boarding Pass Ticket Container */}
      <div className="relative bg-[#1d2022] border border-[#272a2c] rounded-2xl shadow-2xl overflow-hidden">
        {/* Golden Top Edge */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#261500] via-[#ffb95f] to-[#ffddb8]"></div>

        <div className="p-4 flex flex-col gap-4">
          {/* Booking Code & Brand Shield */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#8f9097] uppercase tracking-wider font-bold">
                CÓDIGO DE RESERVA
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xl font-black text-[#ffb95f] tracking-wide font-mono">
                  {bookingCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  aria-label="Copiar código"
                  className="p-1 rounded text-[#8f9097] hover:text-[#ffb95f] hover:bg-[#272a2c] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#261500] border border-[#ffb95f]/30">
              <span
                className="material-symbols-outlined text-[#ffb95f] text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield
              </span>
              <span className="text-[10px] font-black text-[#ffb95f] uppercase tracking-wider">
                RUTA SEGURA
              </span>
            </div>
          </div>

          {/* Route Visual Line */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#8f9097] uppercase tracking-wider font-bold">
                ORIGEN
              </span>
              <span className="text-lg font-black text-white">{trip.origin}</span>
              <span className="text-[11px] text-[#c5c6cd]">Terminal Terrapuerto</span>
            </div>

            {/* Travel Line */}
            <div className="flex-1 flex flex-col items-center px-3">
              <div className="w-full flex items-center justify-center relative">
                <div className="w-full h-0.5 bg-[#44474c] relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ffb95f]"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ffb95f]"></div>
                </div>
                <div className="absolute bg-[#1d2022] px-1 text-[#ffb95f]">
                  <span className="material-symbols-outlined text-[18px]">directions_bus</span>
                </div>
              </div>
              <span className="text-[10px] text-[#ffddb8] font-bold tracking-wider mt-1">
                Directo VIP
              </span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[10px] text-[#8f9097] uppercase tracking-wider font-bold">
                DESTINO
              </span>
              <span className="text-lg font-black text-white">{trip.destination}</span>
              <span className="text-[11px] text-[#c5c6cd]">Av. Bolognesi</span>
            </div>
          </div>

          {/* Departure & Boarding Times */}
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#272a2c] border border-[#323537]">
            <div className="flex items-center gap-1.5 text-xs text-white font-bold">
              <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">schedule</span>
              <span>{trip.departureTime}</span>
            </div>
            <span className="text-[#8f9097]">•</span>
            <div className="px-2 py-0.5 rounded bg-[#261500] text-[#ffb95f] border border-[#ffb95f]/30 text-xs font-black">
              Abordaje 07:15 AM
            </div>
          </div>

          {/* Passenger & Seat Info Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-[#191c1e] border border-[#272a2c] flex flex-col">
              <div className="flex items-center gap-1 text-[10px] text-[#8f9097] uppercase font-bold">
                <span className="material-symbols-outlined text-[14px]">person</span>
                PASAJERO
              </div>
              <span className="text-sm font-bold text-white mt-0.5 truncate">
                {passengerName}
              </span>
              <span className="text-[11px] text-[#8f9097]">DNI: 47291048</span>
            </div>

            <div className="p-3 rounded-xl bg-[#191c1e] border border-[#272a2c] flex flex-col">
              <div className="flex items-center gap-1 text-[10px] text-[#8f9097] uppercase font-bold">
                <span className="material-symbols-outlined text-[14px] text-[#ffb95f]">airline_seat_recline_extra</span>
                ASIENTO CONFIRMADO
              </div>
              <span className="text-base font-black text-[#ffb95f] mt-0.5">
                Asiento #{seatId}
              </span>
              <span className="text-[11px] text-[#aac9f4]">Ventana Ejecutiva</span>
            </div>
          </div>

          {/* Driver & Unit Row */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="p-2.5 rounded-xl bg-[#191c1e] border border-[#272a2c] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#272a2c] text-[#ffb95f] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">badge</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8f9097] uppercase font-bold">CONDUCTOR ASIGNADO</span>
                  <span className="text-xs font-bold text-white">{trip.driverName}</span>
                </div>
              </div>
              <a
                href="tel:948291034"
                className="px-2.5 py-1 rounded-lg bg-[#272a2c] hover:bg-[#323537] text-white text-[11px] font-bold flex items-center gap-1 border border-[#323537]"
              >
                <span className="material-symbols-outlined text-[14px] text-emerald-400">call</span>
                948 291 034
              </a>
            </div>

            <div className="p-2.5 rounded-xl bg-[#191c1e] border border-[#272a2c] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#272a2c] text-[#aac9f4] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">airport_shuttle</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8f9097] uppercase font-bold">VEHÍCULO HOMOLOGADO</span>
                  <span className="text-xs font-bold text-white">Van Sprinter VIP</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#272a2c] text-[#ffb95f] text-xs font-mono font-black border border-[#ffb95f]/30">
                PLACA: {trip.plate}
              </span>
            </div>
          </div>

          {/* Perforated Divider Line */}
          <div className="relative my-1 -mx-4">
            <div className="border-t-2 border-dashed border-[#323537]"></div>
            <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-[#101415] border border-[#272a2c]"></div>
            <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-[#101415] border border-[#272a2c]"></div>
          </div>

          {/* Digital QR Code Boarding Pass */}
          <div className="flex flex-col items-center text-center gap-2 pt-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#aac9f4] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
              PASE DE ABORDAJE DIGITAL
            </span>

            {/* High Contrast QR Code Canvas */}
            <div
              onClick={() => setQrZoomed(!qrZoomed)}
              className="p-3 bg-white rounded-2xl shadow-2xl cursor-pointer hover:scale-[1.02] transition-transform border-4 border-[#ffb95f]"
            >
              <div className="w-48 h-48 bg-white relative flex flex-col items-center justify-center p-1">
                {/* SVG High-Fidelity QR Code Pattern */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Outer Frame Top Left */}
                  <rect x="5" y="5" width="26" height="26" rx="4" fill="#0b192c" />
                  <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                  <rect x="13" y="13" width="10" height="10" rx="2" fill="#0b192c" />

                  {/* Outer Frame Top Right */}
                  <rect x="69" y="5" width="26" height="26" rx="4" fill="#0b192c" />
                  <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                  <rect x="77" y="13" width="10" height="10" rx="2" fill="#0b192c" />

                  {/* Outer Frame Bottom Left */}
                  <rect x="5" y="69" width="26" height="26" rx="4" fill="#0b192c" />
                  <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                  <rect x="13" y="77" width="10" height="10" rx="2" fill="#0b192c" />

                  {/* Data modules */}
                  <rect x="36" y="8" width="6" height="6" fill="#0b192c" />
                  <rect x="46" y="14" width="6" height="6" fill="#0b192c" />
                  <rect x="56" y="8" width="6" height="6" fill="#0b192c" />
                  <rect x="36" y="24" width="6" height="6" fill="#0b192c" />
                  <rect x="56" y="24" width="6" height="6" fill="#0b192c" />

                  <rect x="8" y="38" width="6" height="6" fill="#0b192c" />
                  <rect x="18" y="44" width="6" height="6" fill="#0b192c" />
                  <rect x="28" y="38" width="6" height="6" fill="#0b192c" />
                  <rect x="68" y="38" width="6" height="6" fill="#0b192c" />
                  <rect x="78" y="44" width="6" height="6" fill="#0b192c" />
                  <rect x="88" y="38" width="6" height="6" fill="#0b192c" />

                  <rect x="36" y="68" width="6" height="6" fill="#0b192c" />
                  <rect x="46" y="74" width="6" height="6" fill="#0b192c" />
                  <rect x="56" y="68" width="6" height="6" fill="#0b192c" />
                  <rect x="68" y="68" width="6" height="6" fill="#0b192c" />
                  <rect x="78" y="78" width="6" height="6" fill="#0b192c" />
                  <rect x="88" y="88" width="6" height="6" fill="#0b192c" />

                  {/* Center Circle Brand Badge */}
                  <circle cx="50" cy="50" r="11" fill="#0b192c" />
                  <circle cx="50" cy="50" r="8" fill="#ffb95f" />
                </svg>
              </div>
            </div>

            <p className="text-xs text-[#c5c6cd] mt-1 max-w-xs leading-snug">
              Muestra este QR al chófer al momento de subir a la van
            </p>

            <div className="w-full flex items-center justify-between pt-2 border-t border-[#323537] text-xs">
              <div className="flex items-center gap-1 text-[#8f9097]">
                <span className="material-symbols-outlined text-[16px] text-emerald-400">payments</span>
                <span>MONTO TOTAL: <strong className="text-white">S/ {trip.price.toFixed(2)}</strong></span>
              </div>
              <div className="text-[11px] text-[#8f9097]">
                REFERENCIA: <strong className="text-[#ffb95f]">YAPE-984210</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Punto de Embarque Card & Map */}
      <div className="rounded-2xl bg-[#191c1e] border border-[#272a2c] p-4 shadow-xl flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb95f] text-[22px]">location_on</span>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#8f9097] uppercase font-bold">PUNTO DE EMBARQUE</span>
              <span className="text-sm font-bold text-white">
                Terrapuerto Trujillo – Sala VIP Piso 1
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#272a2c] text-white text-xs font-bold border border-[#323537]">
            Puerta 4
          </span>
        </div>

        {/* Map Preview Container */}
        <div
          onClick={handleOpenMap}
          className="relative w-full h-28 rounded-xl overflow-hidden bg-[#243145] border border-[#323537] shadow-inner cursor-pointer group"
        >
          {/* Stylized vector map graphic */}
          <div className="absolute inset-0 bg-[#1e293b] opacity-90">
            <svg className="w-full h-full opacity-40" viewBox="0 0 400 160">
              <path d="M 0 40 Q 100 20, 200 60 T 400 80" stroke="#ffb95f" strokeWidth="4" fill="none" />
              <path d="M 50 160 Q 150 90, 250 120 T 400 30" stroke="#aac9f4" strokeWidth="3" fill="none" />
              <circle cx="200" cy="60" r="16" fill="#ffb95f" opacity="0.3" />
              <circle cx="200" cy="60" r="8" fill="#ffb95f" />
            </svg>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex items-end p-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101415]/90 border border-[#ffb95f]/40 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#ffb95f] animate-ping"></span>
              <span className="text-xs font-bold text-[#ffb95f]">
                Andén Asignado: Carril 2
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="w-full h-12 rounded-xl bg-[#272a2c] hover:bg-[#323537] text-white font-bold text-xs flex items-center justify-center gap-2 border border-[#323537] shadow-md active:scale-98 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px] text-emerald-400">share</span>
          <span>Compartir detalles con familiar vía WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={handleOpenMap}
          className="w-full h-12 rounded-xl bg-[#29486d] hover:bg-[#325a88] text-[#d6e3fe] font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">near_me</span>
          <span>Ver ubicación de recojo en mapa</span>
        </button>
      </div>

      {/* SUTRAN Cryptographic Proof Footer */}
      <div className="flex items-center justify-center gap-1.5 text-center text-[10px] text-[#8f9097] pt-1">
        <span className="material-symbols-outlined text-[14px] text-[#ffb95f]">lock</span>
        <span>Comprobante con firma criptográfica SUTRAN & MTC</span>
      </div>
    </div>
  );
};
