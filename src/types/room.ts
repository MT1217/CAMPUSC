export interface Room {
  id: string;
  name: string;
  type: string;
  capacity: number;
  facilities: string[];
  isOccupied?: boolean;
  currentEvent?: string;
  nextEvent?: string;
  nextEventTime?: string;
}

export interface Booking {
  id?: string;
  roomId: string;
  userId: string;
  userName: string;
  purpose: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
} 