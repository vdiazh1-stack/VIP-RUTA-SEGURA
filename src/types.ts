export type AppScreen =
  | 'welcome'
  | 'auth_passenger'
  | 'auth_driver'
  | 'rutas'
  | 'mi_asiento'
  | 'pase_qr'
  | 'chofer'
  | 'seguridad';

export type UserRole = 'passenger' | 'driver' | 'guest';

export interface Seat {
  id: number;
  label: string;
  side: 'left' | 'right';
  window: boolean;
  status: 'available' | 'selected' | 'held' | 'occupied';
  price: number;
  passengerName?: string;
  holdTimeRemaining?: string;
}

export interface PassengerManifestItem {
  id: string;
  seatNumber: number;
  code: string;
  name: string;
  dni: string;
  paymentMethod: 'Yape' | 'Plin' | 'Efectivo' | 'Tarjeta';
  luggage: string;
  status: 'pending' | 'boarded';
  checkInTime?: string;
}

export interface RouteTrip {
  id: string;
  origin: string;
  originStation: string;
  destination: string;
  destinationStation: string;
  departureTime: string;
  duration: string;
  arrivalEstimated: string;
  price: number;
  vehicleModel: string;
  plate: string;
  driverName: string;
  driverRating: number;
  driverLicense: string;
  availableSeats: number;
  totalSeats: number;
}
