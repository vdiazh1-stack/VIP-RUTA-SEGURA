import React, { useState } from 'react';
import { RouteTrip, AppScreen } from '../types';
import { AVAILABLE_ROUTES } from '../data/mockData';

interface RoutesScreenProps {
  currentTrip: RouteTrip;
  onSelectTrip: (trip: RouteTrip) => void;
  onNavigate: (screen: AppScreen) => void;
}

export const RoutesScreen: React.FC<RoutesScreenProps> = ({
  currentTrip,
  onSelectTrip,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'all' | 'trujillo' | 'chiclayo'>('all');

  const filtered = AVAILABLE_ROUTES.filter((r) => {
    if (filter === 'trujillo') return r.origin.toLowerCase().includes('trujillo');
    if (filter === 'chiclayo') return r.origin.toLowerCase().includes('chiclayo');
    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24 px-4 pt-2 gap-4">
      {/* Header Banner */}
      <div className="rounded-2xl bg-[#191c1e] border border-[#272a2c] p-4 shadow-xl flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#ffb95f] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              map
            </span>
            <h2 className="text-base font-extrabold text-white">
              Rutas y Salidas Ejecutivas
            </h2>
          </div>
          <span className="text-[10px] uppercase font-bold text-[#aac9f4] bg-[#29486d] px-2 py-0.5 rounded">
            Norte Peruano
          </span>
        </div>
        <p className="text-xs text-[#c5c6cd]">
          Todas las salidas operan con unidades Mercedes-Benz Sprinter de 8 plazas VIP, aire acondicionado y seguimiento GPS.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-[#ffb95f] text-[#2a1700]'
                : 'bg-[#272a2c] text-[#c5c6cd] hover:text-white'
            }`}
          >
            Todas
          </button>
          <button
            type="button"
            onClick={() => setFilter('trujillo')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'trujillo'
                ? 'bg-[#ffb95f] text-[#2a1700]'
                : 'bg-[#272a2c] text-[#c5c6cd] hover:text-white'
            }`}
          >
            Desde Trujillo
          </button>
          <button
            type="button"
            onClick={() => setFilter('chiclayo')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'chiclayo'
                ? 'bg-[#ffb95f] text-[#2a1700]'
                : 'bg-[#272a2c] text-[#c5c6cd] hover:text-white'
            }`}
          >
            Desde Chiclayo
          </button>
        </div>
      </div>

      {/* List of Route Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((r) => {
          const isSelected = r.id === currentTrip.id;
          return (
            <div
              key={r.id}
              className={`rounded-2xl p-4 flex flex-col gap-3 transition-all border shadow-lg ${
                isSelected
                  ? 'bg-[#1d2022] border-[#ffb95f] ring-1 ring-[#ffb95f]/50'
                  : 'bg-[#191c1e] border-[#272a2c] hover:border-[#323537]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-bold text-white tracking-wide">
                    {r.departureTime}
                  </span>
                  <span className="text-[#8f9097] text-xs">•</span>
                  <span className="text-[11px] text-[#aac9f4] font-medium">{r.duration}</span>
                </div>
                <span className="text-base font-black text-[#ffb95f]">
                  S/ {r.price.toFixed(2)}
                </span>
              </div>

              {/* Origin -> Destination Line */}
              <div className="flex items-center justify-between py-1">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">{r.origin}</span>
                  <span className="text-[11px] text-[#8f9097]">{r.originStation}</span>
                </div>

                <div className="flex items-center px-2 text-[#ffb95f]">
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-white">{r.destination}</span>
                  <span className="text-[11px] text-[#8f9097]">{r.destinationStation}</span>
                </div>
              </div>

              {/* Vehicle & Chauffeur Footer */}
              <div className="pt-2 border-t border-[#272a2c] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#aac9f4]">
                    airport_shuttle
                  </span>
                  <span className="text-[11px] text-[#c5c6cd]">
                    Sprinter VIP ({r.plate}) • Chófer: {r.driverName}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectTrip(r);
                    onNavigate('mi_asiento');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#ffb95f] text-[#2a1700]'
                      : 'bg-[#29486d] hover:bg-[#355c8c] text-white'
                  }`}
                >
                  {isSelected ? 'Ver Mi Asiento' : 'Elegir Asiento'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
