import React, { useState } from 'react';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanResult: (code: string, passengerName: string, seat: number) => void;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  onScanResult,
}) => {
  const [scanning, setScanning] = useState(true);
  const [simulatedSuccess, setSimulatedSuccess] = useState(false);

  if (!isOpen) return null;

  const simulateScan = () => {
    setScanning(false);
    setSimulatedSuccess(true);
    setTimeout(() => {
      onScanResult('RS-8492', 'Rodrigo Mendoza', 3);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-[#191c1e] border border-[#272a2c] rounded-2xl p-5 shadow-2xl flex flex-col items-center gap-4 text-white relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[#272a2c] text-[#8f9097] hover:text-white flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          <span className="text-[10px] text-[#ffb95f] uppercase tracking-wider font-extrabold">
            Validador Óptico SUTRAN
          </span>
          <h3 className="text-base font-extrabold text-white">
            Escanear Boleto Digital QR
          </h3>
        </div>

        {/* Viewfinder simulation */}
        <div className="relative w-64 h-64 bg-black rounded-xl overflow-hidden border-2 border-[#323537] flex items-center justify-center shadow-inner">
          {/* Laser Scanning Bar */}
          {scanning && (
            <div className="absolute inset-x-0 h-1 bg-[#ffb95f] shadow-[0_0_12px_#ffb95f] animate-pulse transition-all"></div>
          )}

          {/* Viewfinder Corners */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#ffb95f]"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#ffb95f]"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#ffb95f]"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#ffb95f]"></div>

          {simulatedSuccess ? (
            <div className="flex flex-col items-center text-emerald-400 gap-2 animate-in zoom-in-75 duration-200">
              <span className="material-symbols-outlined text-[48px]">check_circle</span>
              <span className="text-xs font-bold">¡Boleto Validado!</span>
              <span className="text-[11px] text-white">Rodrigo Mendoza (Asiento 3)</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center text-[#8f9097] gap-2 p-4">
              <span className="material-symbols-outlined text-[36px] text-[#ffb95f]">qr_code_scanner</span>
              <span className="text-xs">Enfoca el código QR del pasajero</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={simulateScan}
          disabled={!scanning}
          className="w-full h-11 rounded-xl bg-[#ffb95f] text-[#2a1700] text-xs font-bold flex items-center justify-center gap-2 active:scale-95 shadow-lg transition-transform cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">camera</span>
          <span>Simular Detección de Boleto</span>
        </button>

        <span className="text-[10px] text-[#8f9097] text-center">
          Verifica firma digital oficial de SUTRAN y cotejo con el manifiesto en tiempo real.
        </span>
      </div>
    </div>
  );
};
