import React, { useState } from 'react';
import { PassengerManifestItem, RouteTrip, AppScreen } from '../types';
import { INITIAL_MANIFEST, DEFAULT_TRIP } from '../data/mockData';
import { QrScannerModal } from './QrScannerModal';

interface DriverScreenProps {
  trip?: RouteTrip;
  onNavigate: (screen: AppScreen) => void;
}

export const DriverScreen: React.FC<DriverScreenProps> = ({
  trip = DEFAULT_TRIP,
  onNavigate,
}) => {
  const [manifest, setManifest] = useState<PassengerManifestItem[]>(INITIAL_MANIFEST);
  const [isGpsActive, setIsGpsActive] = useState(false);
  const [isStartingGps, setIsStartingGps] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const boardedCount = manifest.filter((m) => m.status === 'boarded').length;
  const totalPassengers = manifest.length;
  const totalRevenue = 210.0;

  const handleConfirmBoarding = (item: PassengerManifestItem) => {
    setManifest((prev) =>
      prev.map((p) =>
        p.id === item.id
          ? {
              ...p,
              status: 'boarded',
              checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          : p
      )
    );
    showToast(`✓ Abordaje confirmado para ${item.name} (Asiento ${item.seatNumber})`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStartRoute = () => {
    setIsStartingGps(true);
    setTimeout(() => {
      setIsStartingGps(false);
      setIsGpsActive(true);
      showToast('¡Ruta satelital iniciada! Transmitiendo telemetría a SUTRAN.');
    }, 1200);
  };

  const handleScanSuccess = (_code: string, passengerName: string, seatNumber: number) => {
    setManifest((prev) =>
      prev.map((p) =>
        p.seatNumber === seatNumber
          ? {
              ...p,
              status: 'boarded',
              checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          : p
      )
    );
    showToast(`Boleto QR verificado: ${passengerName} (Asiento ${seatNumber})`);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24 px-4 pt-2 gap-4">
      {/* Active Trip Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#272a2c] border border-[#323537] p-4 shadow-xl">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[#ffb95f] text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                near_me
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#ffb95f]">
                Viaje en Curso #{trip.id}
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-0.5">
              {trip.origin} ➔ {trip.destination}
            </h2>
            <div className="flex items-center gap-1.5 text-[#c5c6cd] mt-0.5 text-xs">
              <span className="material-symbols-outlined text-[15px]">schedule</span>
              <span>07:30 AM</span>
              <span className="text-[#8f9097]">•</span>
              <span className="material-symbols-outlined text-[15px]">directions_bus</span>
              <span className="truncate max-w-[150px]">Unidad {trip.plate} (Sprinter VIP)</span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="bg-[#0b0f10] px-2.5 py-1 rounded text-[#aac9f4] text-[10px] tracking-widest font-mono font-bold border border-[#29486d]">
              PLACA {trip.plate}
            </span>
            <span className="text-[10px] text-emerald-300 mt-1 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Terrapuerto
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#323537] flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30 text-xs">
            <span className="material-symbols-outlined text-emerald-400 text-[16px]">verified</span>
            <span className="text-emerald-300 font-bold">
              ¡LISTO PARA SALIR! (Mínimo 4 superado)
            </span>
          </div>
          <span className="text-[11px] text-[#8f9097]">Andén 04 - Puerta B</span>
        </div>
      </div>

      {/* Stats Cards Grid (Cabin Capacity & Revenue) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Capacity */}
        <div className="bg-[#1d2022] border border-[#272a2c] p-3.5 rounded-xl flex items-center justify-between shadow-md">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#8f9097] uppercase font-bold">Capacidad Cabin</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-white">{totalPassengers}</span>
              <span className="text-sm font-bold text-[#8f9097]">/ 8</span>
            </div>
            <span className="text-[11px] text-[#aac9f4] font-medium">Pasajeros Confirmados</span>
          </div>
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#323537]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-[#ffb95f]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="75, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="absolute text-[11px] text-white font-extrabold">75%</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-[#1d2022] border border-[#272a2c] p-3.5 rounded-xl flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#8f9097] uppercase font-bold">Total Recaudado</span>
            <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">payments</span>
          </div>
          <div className="flex flex-col mt-1">
            <span className="text-xl font-black text-[#ffb95f]">
              S/ {totalRevenue.toFixed(2)}
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] text-[#c5c6cd]">100% digitalizado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Schematic Van Cabin Map (8 Pax) */}
      <div className="bg-[#1d2022] border border-[#272a2c] p-4 rounded-xl flex flex-col gap-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#aac9f4] text-[18px]">
              airline_seat_recline_extra
            </span>
            <span className="text-xs font-bold text-white">Mapa Esquemático de Van (8 Pax)</span>
          </div>
          <span className="text-[11px] text-[#8f9097]">Cabina Ejecutiva</span>
        </div>

        <div className="bg-[#0b0f10] p-3 rounded-xl border border-[#272a2c] flex flex-col items-center">
          {/* Driver Cockpit Bar */}
          <div className="w-full max-w-[270px] flex justify-between items-center pb-1.5 mb-2 bg-[#1d2022] px-3 py-1 rounded-lg border border-[#323537]">
            <div className="flex items-center gap-1 text-[#c5c6cd] text-[11px]">
              <span className="material-symbols-outlined text-[15px]">airline_seat_recline_normal</span>
              <span className="font-semibold">Chofer (Usted)</span>
            </div>
            <div className="flex items-center gap-1 text-[#8f9097] text-[11px]">
              <span className="material-symbols-outlined text-[15px]">sensor_door</span>
              <span>Puerta VIP</span>
            </div>
          </div>

          {/* Seat Grid A1 to A8 */}
          <div className="grid grid-cols-4 gap-2 w-full max-w-[270px]">
            {/* A1 */}
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-red-950/80 border border-red-500/30 text-red-200">
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span className="text-[11px] font-bold">A1</span>
              <span className="text-[8px] uppercase tracking-wider font-semibold">Ocupado</span>
            </div>

            {/* A2 */}
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-red-950/80 border border-red-500/30 text-red-200">
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span className="text-[11px] font-bold">A2</span>
              <span className="text-[8px] uppercase tracking-wider font-semibold">Ocupado</span>
            </div>

            {/* Aisle */}
            <div className="flex items-center justify-center">
              <span className="text-[#44474c] rotate-90 tracking-widest text-[8px] font-bold">
                PASILLO
              </span>
            </div>

            {/* A3 */}
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-red-950/80 border border-red-500/30 text-red-200">
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span className="text-[11px] font-bold">A3</span>
              <span className="text-[8px] uppercase tracking-wider font-semibold">Ocupado</span>
            </div>

            {/* A4 */}
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-red-950/80 border border-red-500/30 text-red-200">
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span className="text-[11px] font-bold">A4</span>
              <span className="text-[8px] uppercase tracking-wider font-semibold">Ocupado</span>
            </div>

            {/* A5 */}
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-red-950/80 border border-red-500/30 text-red-200">
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span className="text-[11px] font-bold">A5</span>
              <span className="text-[8px] uppercase tracking-wider font-semibold">Ocupado</span>
            </div>

            {/* Spacer */}
            <div className="flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#323537]"></span>
            </div>

            {/* A6 */}
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-red-950/80 border border-red-500/30 text-red-200">
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span className="text-[11px] font-bold">A6</span>
              <span className="text-[8px] uppercase tracking-wider font-semibold">Ocupado</span>
            </div>

            {/* A7 (Reserva) */}
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#261500] border border-[#ffb95f]/40 text-[#ffb95f]">
              <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
              <span className="text-[11px] font-bold">A7</span>
              <span className="text-[8px] uppercase tracking-wider font-semibold">Reserva</span>
            </div>

            {/* A8 (Libre) */}
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
              <span className="material-symbols-outlined text-[16px]">event_seat</span>
              <span className="text-[11px] font-bold">A8</span>
              <span className="text-[8px] uppercase tracking-wider font-semibold">Libre</span>
            </div>
          </div>

          {/* Seat Status Legend */}
          <div className="flex items-center justify-center gap-4 mt-3 pt-2 border-t border-[#272a2c] w-full text-[10px]">
            <div className="flex items-center gap-1 text-[#c5c6cd]">
              <span className="w-2 h-2 rounded-sm bg-red-500"></span>
              <span>6 Ocupado</span>
            </div>
            <div className="flex items-center gap-1 text-[#c5c6cd]">
              <span className="w-2 h-2 rounded-sm bg-[#ffb95f]"></span>
              <span>1 Reservando</span>
            </div>
            <div className="flex items-center gap-1 text-[#c5c6cd]">
              <span className="w-2 h-2 rounded-sm bg-emerald-400"></span>
              <span>1 Disponible</span>
            </div>
          </div>
        </div>
      </div>

      {/* Passenger Manifest and Boarding Control */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">
              assignment_turned_in
            </span>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Manifiesto y Control de Abordaje
            </h3>
          </div>
          <span className="bg-[#1d2022] border border-[#272a2c] px-2 py-0.5 rounded text-[11px] text-[#c5c6cd] font-semibold">
            {boardedCount} de {totalPassengers} en terminal
          </span>
        </div>

        {/* List of Passengers */}
        <div className="flex flex-col gap-2.5">
          {manifest.map((item) => {
            const isBoarded = item.status === 'boarded';
            return (
              <div
                key={item.id}
                className="bg-[#1d2022] border border-[#272a2c] p-3.5 rounded-xl flex flex-col gap-2 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#29486d] text-[#aac9f4] flex items-center justify-center font-bold text-sm">
                      {item.seatNumber}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white leading-tight">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] mt-0.5">
                        <span className="text-[#aac9f4] font-mono">{item.code}</span>
                        <span className="text-[#8f9097]">•</span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                            item.paymentMethod === 'Yape'
                              ? 'bg-purple-950 text-purple-300'
                              : item.paymentMethod === 'Plin'
                              ? 'bg-cyan-950 text-cyan-300'
                              : 'bg-emerald-950 text-emerald-300'
                          }`}
                        >
                          Pagado {item.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs bg-[#272a2c] border border-[#323537] px-2 py-0.5 rounded text-white font-bold">
                    Asiento {item.seatNumber}
                  </span>
                </div>

                <div className="pt-1 flex items-center justify-between border-t border-[#272a2c] mt-1">
                  <div className="flex items-center gap-1 text-[11px] text-[#8f9097]">
                    <span className="material-symbols-outlined text-[15px] text-[#ffb95f]">luggage</span>
                    <span>{item.luggage}</span>
                  </div>

                  {isBoarded ? (
                    <div className="px-3 py-1 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>✓ ABORDADO {item.checkInTime ? `(${item.checkInTime})` : ''}</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleConfirmBoarding(item)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                      <span>CONFIRMAR ABORDAJE</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QR Scanner Card */}
      <div className="bg-[#272a2c] border border-[#323537] rounded-xl p-3.5 flex items-center gap-3 shadow-md">
        <div className="w-11 h-11 rounded-lg bg-[#0b0f10] flex items-center justify-center text-[#ffb95f]">
          <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs font-bold text-white truncate">
            Escanear Boleto Digital QR
          </span>
          <span className="text-[11px] text-[#c5c6cd]">
            Acerca la cámara al boleto del pasajero para validación SUTRAN
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsScannerOpen(true)}
          className="px-3 py-2 bg-[#29486d] hover:bg-[#355c8c] text-[#aac9f4] rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
        >
          Abrir Lector
        </button>
      </div>

      {/* Primary Actions: Start Route & Report Incident */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={handleStartRoute}
          disabled={isStartingGps}
          className={`w-full h-[52px] font-black text-sm tracking-wide rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] cursor-pointer ${
            isGpsActive
              ? 'bg-emerald-600 text-white border border-emerald-400/40'
              : 'bg-gradient-to-r from-[#ffddb8] via-[#ffb95f] to-[#e59b38] text-[#2a1700]'
          }`}
        >
          {isStartingGps ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
              <span>CONECTANDO TRANSMISOR SATELITAL SUTRAN...</span>
            </>
          ) : isGpsActive ? (
            <>
              <span className="material-symbols-outlined text-[24px]">satellite_alt</span>
              <span>MONITOREO EN VIVO ACTIVO • SALIENDO</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[24px]">navigation</span>
              <span>INICIAR RUTA OFICIAL GPS</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => alert('Incidencia Operativa enviada al Centro de Control de Despacho 24/7. Protocolo SUTRAN activado.')}
          className="w-full h-11 bg-[#1d2022] hover:bg-[#272a2c] text-[#ffb4ab] border border-[#ffb4ab]/20 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">warning</span>
          <span>Reportar Incidencia Operativa</span>
        </button>
      </div>

      {/* QR Scanner Camera Modal */}
      <QrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanResult={handleScanSuccess}
      />

      {/* Feedback Toast */}
      {toastMessage && (
        <div className="fixed inset-x-4 bottom-20 max-w-sm mx-auto bg-[#272a2c] text-white border border-[#323537] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <span className="text-xs font-semibold text-white">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
