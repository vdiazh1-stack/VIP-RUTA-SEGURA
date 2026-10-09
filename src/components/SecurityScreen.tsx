import React, { useState } from 'react';
import { RouteTrip, AppScreen } from '../types';
import { APP_IMAGES, DEFAULT_TRIP } from '../data/mockData';

interface SecurityScreenProps {
  trip?: RouteTrip;
  onNavigate: (screen: AppScreen) => void;
}

export const SecurityScreen: React.FC<SecurityScreenProps> = ({
  trip = DEFAULT_TRIP,
  onNavigate,
}) => {
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [silentAlarmActive, setSilentAlarmActive] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(78);

  const shareText = `Hola, estoy a bordo del servicio VIP Ruta Segura (${trip.origin} → ${trip.destination}). Chófer: ${trip.driverName} (⭐ ${trip.driverRating}). Placa: ${trip.plate}. Velocidad monitoreada por GPS. Llegada aprox: ${trip.arrivalEstimated}. Seguimiento en vivo: https://viprutasegura.pe/live/${trip.plate.replace('-', '')}`;

  const handleShareWhatsapp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleSilentAlarm = () => {
    setSilentAlarmActive(true);
    setTimeout(() => {
      setIsSosModalOpen(false);
      alert('Alerta silenciosa confirmada: La central satelital de monitoreo ha fijado el vehículo con prioridad máxima.');
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24 px-4 pt-2 gap-4">
      {/* Active Route Telemetry Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#272a2c] border border-[#323537] p-4 shadow-xl text-white">
        <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#ffb95f]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between pb-2 border-b border-[#323537]">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span className="text-[10px] text-[#ffb95f] uppercase tracking-wider font-extrabold">
              Monitoreo Satelital Activo
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-[#1d2022] text-[#c5c6cd] border border-[#323537] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">satellite_alt</span>
            GPS RTK ±1.2m
          </span>
        </div>

        <div className="flex flex-col gap-0.5 my-2.5">
          <span className="text-[10px] text-[#8f9097] uppercase tracking-wider font-bold">
            Viaje en Curso
          </span>
          <h2 className="text-xl font-black text-white tracking-tight">
            {trip.origin} ➔ {trip.destination}
          </h2>
          <div className="flex items-center gap-1 text-[#c5c6cd] text-xs mt-0.5">
            <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">location_on</span>
            <span className="text-xs">Km 42 Panamericana Norte • Paiján, La Libertad</span>
          </div>
        </div>

        {/* Live Speed & Telemetry Bar */}
        <div className="mt-2 p-3 rounded-xl bg-[#1d2022] border border-[#323537] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0b192c] border border-[#29486d] flex items-center justify-center text-[#ffb95f]">
              <span className="material-symbols-outlined text-[20px]">speed</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-white">{currentSpeed}</span>
                <span className="text-xs text-[#8f9097] font-bold">km/h</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">
                Dentro del límite seguro (máx. 90 km/h)
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-[#8f9097] uppercase font-bold">ETA {trip.destination}</span>
            <span className="text-xs font-black text-[#ffb95f] font-mono">
              {trip.arrivalEstimated}
            </span>
          </div>
        </div>
      </div>

      {/* Verified Crew & Executive Vehicle Card */}
      <div className="rounded-2xl bg-[#1d2022] border border-[#272a2c] p-4 shadow-md text-white flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={APP_IMAGES.driverPortrait}
                alt="Carlos Mendoza"
                className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-[#ffb95f]/50"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#101415] border border-emerald-500/50 flex items-center justify-center text-[#ffb95f]">
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white truncate">{trip.driverName}</h3>
                <span className="flex items-center text-[#ffb95f] text-xs font-bold">
                  <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  {trip.driverRating}
                </span>
              </div>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">shield</span>
                Antecedentes policiales y SOAT al día
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#272a2c] text-xs">
          <div className="p-2 rounded-lg bg-[#191c1e] border border-[#272a2c] flex flex-col">
            <span className="text-[10px] text-[#8f9097] uppercase font-bold">Vehículo VIP</span>
            <span className="text-xs text-white font-semibold truncate">Mercedes Sprinter '23</span>
          </div>
          <div className="p-2 rounded-lg bg-[#191c1e] border border-[#272a2c] flex flex-col">
            <span className="text-[10px] text-[#8f9097] uppercase font-bold">Placa Oficial</span>
            <span className="text-xs text-[#ffb95f] font-mono font-black">{trip.plate}</span>
          </div>
        </div>
      </div>

      {/* HIGH PRIORITY EMERGENCY SOS TRIGGER */}
      <div className="flex flex-col gap-2 items-center">
        <button
          type="button"
          onClick={() => setIsSosModalOpen(true)}
          aria-label="Botón de emergencia SOS"
          className="relative group w-full py-4 px-5 rounded-2xl bg-[#93000a] hover:bg-[#aa000c] text-white shadow-[0_8px_30px_rgba(147,0,10,0.6)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all overflow-hidden cursor-pointer border border-red-500/50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 via-red-500/10 to-red-600/30 animate-pulse"></div>
          <span
            className="material-symbols-outlined text-[34px] text-[#ffdad6] animate-bounce shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            emergency_home
          </span>
          <div className="flex flex-col text-left z-10">
            <span className="text-base text-white tracking-wide font-black leading-tight">
              BOTÓN DE EMERGENCIA SOS
            </span>
            <span className="text-[11px] text-[#ffdad6] font-medium">
              Presione para desplegar protocolo y auxilio inmediato
            </span>
          </div>
        </button>
        <p className="text-[11px] text-[#8f9097] text-center max-w-xs leading-snug">
          Transmite coordenadas en milisegundos a la central satelital y cuerpos policiales.
        </p>
      </div>

      {/* WhatsApp Trust Share Card */}
      <div className="rounded-2xl bg-[#1d2022] border border-[#272a2c] p-4 shadow-md text-white flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">share_location</span>
            </div>
            <h4 className="text-sm font-bold text-white">Contacto de Confianza</h4>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/30">
            1-Tap WhatsApp
          </span>
        </div>

        <p className="text-xs text-[#c5c6cd] leading-relaxed">
          Envía tu itinerario detallado, datos del conductor y enlace en vivo de telemetría a familiares antes de continuar la ruta.
        </p>

        {/* Message Preview Box */}
        <div className="p-3 rounded-xl bg-[#0b0f10] border border-[#272a2c] text-[#c5c6cd] text-xs flex flex-col gap-1">
          <div className="flex items-center gap-1 text-[#ffb95f] text-[10px] font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">chat</span>
            Vista previa del mensaje:
          </div>
          <p className="italic text-white select-all text-[11px] leading-relaxed">
            "{shareText}"
          </p>
        </div>

        <button
          type="button"
          onClick={handleShareWhatsapp}
          className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">send</span>
          <span>Compartir por WhatsApp</span>
        </button>
      </div>

      {/* Security Protocols & Cabin Audit */}
      <div className="rounded-2xl bg-[#191c1e] border border-[#272a2c] p-4 text-white flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[#8f9097] uppercase tracking-wider font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">verified_user</span>
            Auditoría de Cabina
          </span>
          <span className="text-[10px] text-[#ffb95f] font-semibold">Actualizado hace 1m</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1d2022] border border-[#272a2c]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">videocam</span>
              <span className="text-xs text-white font-medium">Cámara frontal y cabina</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-bold">GRABANDO HD</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1d2022] border border-[#272a2c]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">lock</span>
              <span className="text-xs text-white font-medium">Paradas no autorizadas</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-bold">BLOQUEO ACTIVO</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1d2022] border border-[#272a2c]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">radio</span>
              <span className="text-xs text-white font-medium">Enlace SUTRAN / PNP</span>
            </div>
            <span className="text-[11px] text-[#ffb95f] font-bold">CONECTADO</span>
          </div>
        </div>
      </div>

      {/* SOS Modal */}
      {isSosModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-[#191c1e] border-2 border-red-500/60 p-5 text-white flex flex-col gap-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-1 border-b border-[#323537]">
              <div className="flex items-center gap-2 text-red-400">
                <span
                  className="material-symbols-outlined text-[26px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  warning
                </span>
                <span className="text-base font-black tracking-tight">PROTOCOLO SOS VIP</span>
              </div>
              <button
                type="button"
                onClick={() => setIsSosModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#272a2c] flex items-center justify-center text-[#8f9097] hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#c5c6cd] leading-relaxed">
              Tu ubicación exacta (Km 42 Panamericana Norte) ya se encuentra transmitiéndose en prioridad alta. Selecciona la vía de respuesta:
            </p>

            <div className="flex flex-col gap-2.5">
              {/* Call Police 105 */}
              <a
                href="tel:105"
                className="w-full h-14 rounded-xl bg-[#93000a] text-white flex items-center justify-between px-4 shadow-lg active:scale-98 transition-all border border-red-500/50"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">local_police</span>
                  <div className="flex flex-col text-left">
                    <span className="font-extrabold text-sm leading-tight">Policía Nacional del Perú</span>
                    <span className="text-[10px] text-[#ffdad6]">Discar 105 de Emergencia</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px]">call</span>
              </a>

              {/* Alert Central VIP 24/7 */}
              <a
                href="tel:080011223"
                className="w-full h-14 rounded-xl bg-[#29486d] text-white flex items-center justify-between px-4 shadow-lg active:scale-98 transition-all border border-[#aac9f4]/30"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">support_agent</span>
                  <div className="flex flex-col text-left">
                    <span className="font-extrabold text-sm leading-tight">Central VIP Ruta Segura</span>
                    <span className="text-[10px] text-[#aac9f4]">Monitoreo Satelital 24/7</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px]">headset_mic</span>
              </a>

              {/* Silent Panic Button */}
              <button
                type="button"
                onClick={handleSilentAlarm}
                className={`w-full h-12 rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer border ${
                  silentAlarmActive
                    ? 'bg-[#261500] text-[#ffb95f] border-[#ffb95f]'
                    : 'bg-[#272a2c] hover:bg-[#323537] text-white border-[#323537]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] text-[#ffb95f]">sensors</span>
                <span>
                  {silentAlarmActive
                    ? '¡Alerta Silenciosa Emitida a Central!'
                    : 'Activar Alerta Silenciosa a Central'}
                </span>
              </button>
            </div>

            <div className="text-center text-[10px] text-[#8f9097]">
              Código de Telemetría: VIP-TRU-CHI-8842
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
