import React, { useState } from 'react';
import { RouteTrip } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  selectedSeatId: number;
  paymentMethod: 'Yape' | 'Plin';
  trip: RouteTrip;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  selectedSeatId,
  paymentMethod,
  trip,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('987 654 321');
  const [approvalCode, setApprovalCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleConfirmPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      setTimeout(() => {
        onPaymentSuccess();
      }, 900);
    }, 1200);
  };

  const isYape = paymentMethod === 'Yape';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-3 animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-[#191c1e] border border-[#272a2c] rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-white relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isProcessing}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[#272a2c] text-[#8f9097] hover:text-white flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg ${
              isYape ? 'bg-[#592383] text-white' : 'bg-[#00A9E0] text-white'
            }`}
          >
            {isYape ? 'Y' : 'P'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#8f9097] uppercase font-bold tracking-wider">
                Pasarela Oficial
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </div>
            <h3 className="text-base font-extrabold text-white">
              Pagar con {paymentMethod}
            </h3>
          </div>
        </div>

        {/* Amount Card */}
        <div className="bg-[#1d2022] border border-[#272a2c] rounded-xl p-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#8f9097]">
              Asiento 0{selectedSeatId} • {trip.origin} ➔ {trip.destination}
            </span>
            <span className="text-xs text-[#c5c6cd]">Van Mercedes Sprinter ({trip.plate})</span>
          </div>
          <span className="text-xl font-black text-[#ffb95f]">
            S/ {trip.price.toFixed(2)}
          </span>
        </div>

        {/* QR Simulation or Number Display */}
        <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-inner my-1">
          {/* Simulated QR Code Canvas */}
          <div className="w-36 h-36 bg-white relative flex flex-col items-center justify-center p-1 border-4 border-[#0b192c]">
            <div className="grid grid-cols-7 gap-1 w-full h-full p-1 bg-white">
              {Array.from({ length: 49 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-xs ${
                    i % 2 === 0 || i % 7 === 0 || i % 5 === 0
                      ? isYape ? 'bg-[#592383]' : 'bg-[#00A9E0]'
                      : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
            <div className="absolute inset-0 m-auto w-8 h-8 rounded-lg bg-white shadow-md flex items-center justify-center p-0.5 border border-gray-200">
              <div
                className={`w-full h-full rounded flex items-center justify-center text-[10px] font-black text-white ${
                  isYape ? 'bg-[#592383]' : 'bg-[#00A9E0]'
                }`}
              >
                VIP
              </div>
            </div>
          </div>
          <span className="text-[11px] font-bold text-gray-800 mt-2">
            Escanea desde tu app {paymentMethod} o usa el número:
          </span>
          <span className="text-sm font-black text-[#0b192c] tracking-wider mt-0.5">
            948 291 034 (VIP Ruta Segura SAC)
          </span>
        </div>

        {/* Input Phone or Approval Code */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-[#c5c6cd] font-medium flex items-center justify-between">
            <span>Tu Celular {paymentMethod}</span>
            <span className="text-[11px] text-emerald-400 font-semibold">Validado</span>
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full bg-[#272a2c] border border-[#323537] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffb95f]"
          />
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={handleConfirmPay}
          disabled={isProcessing || isDone}
          className={`w-full h-12 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98 ${
            isDone
              ? 'bg-emerald-500 text-white'
              : isYape
              ? 'bg-[#592383] hover:bg-[#6e2ca3] text-white shadow-purple-950/50'
              : 'bg-[#00A9E0] hover:bg-[#00bfff] text-white shadow-cyan-950/50'
          }`}
        >
          {isProcessing ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
              <span>VERIFICANDO TRANSACCIÓN...</span>
            </>
          ) : isDone ? (
            <>
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>¡PAGO APROBADO EXITOSAMENTE!</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">check</span>
              <span>CONFIRMAR PAGO S/ {trip.price.toFixed(2)}</span>
            </>
          )}
        </button>

        <p className="text-[10px] text-center text-[#8f9097]">
          Transacción protegida con certificación bancaria y emisión inmediata de Boleto Electrónico SUTRAN.
        </p>
      </div>
    </div>
  );
};
