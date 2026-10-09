/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppScreen, UserRole, RouteTrip } from './types';
import { DEFAULT_TRIP } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PassengerAuthScreen } from './components/PassengerAuthScreen';
import { DriverAuthScreen } from './components/DriverAuthScreen';
import { SeatSelectionScreen } from './components/SeatSelectionScreen';
import { BoardingPassScreen } from './components/BoardingPassScreen';
import { DriverScreen } from './components/DriverScreen';
import { SecurityScreen } from './components/SecurityScreen';
import { RoutesScreen } from './components/RoutesScreen';
import { PaymentModal } from './components/PaymentModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [userRole, setUserRole] = useState<UserRole>('passenger');
  const [currentTrip, setCurrentTrip] = useState<RouteTrip>(DEFAULT_TRIP);
  const [selectedSeatId, setSelectedSeatId] = useState<number>(3);
  const [passengerName, setPassengerName] = useState<string>('Rodrigo Mendoza');
  const [paymentMethod, setPaymentMethod] = useState<'Yape' | 'Plin'>('Yape');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [hasConfirmedBooking, setHasConfirmedBooking] = useState(true);

  const handleSelectRole = (role: 'passenger' | 'driver') => {
    setUserRole(role);
  };

  const handlePassengerLogin = (name: string, _phoneOrDni: string) => {
    setUserRole('passenger');
    setPassengerName(name);
  };

  const handleDriverLogin = (name: string) => {
    setUserRole('driver');
  };

  const handleProceedToPayment = (method: 'Yape' | 'Plin') => {
    setPaymentMethod(method);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setHasConfirmedBooking(true);
    setCurrentScreen('pase_qr');
  };

  return (
    <div className="min-h-screen bg-[#101415] text-[#e0e3e5] flex flex-col font-sans selection:bg-[#ffb95f] selection:text-[#2a1700]">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        userRole={userRole}
        onNavigate={setCurrentScreen}
        onRoleChange={setUserRole}
        userName={passengerName}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 flex flex-col">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onSelectRole={handleSelectRole}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'auth_passenger' && (
          <PassengerAuthScreen
            onLoginSuccess={handlePassengerLogin}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'auth_driver' && (
          <DriverAuthScreen
            onLoginSuccess={handleDriverLogin}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'mi_asiento' && (
          <SeatSelectionScreen
            trip={currentTrip}
            selectedSeatId={selectedSeatId}
            onSelectSeat={setSelectedSeatId}
            onProceedToPayment={handleProceedToPayment}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'pase_qr' && (
          <BoardingPassScreen
            trip={currentTrip}
            seatId={selectedSeatId}
            passengerName={passengerName}
            paymentMethod={paymentMethod}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'chofer' && (
          <DriverScreen
            trip={currentTrip}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'seguridad' && (
          <SecurityScreen
            trip={currentTrip}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'rutas' && (
          <RoutesScreen
            currentTrip={currentTrip}
            onSelectTrip={setCurrentTrip}
            onNavigate={setCurrentScreen}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        hasConfirmedBooking={hasConfirmedBooking}
      />

      {/* Instant Yape / Plin Checkout Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        selectedSeatId={selectedSeatId}
        paymentMethod={paymentMethod}
        trip={currentTrip}
      />
    </div>
  );
}
