export interface Room {
  id: string;
  name: string;
  type: string;
  capacity: number;
  facilities: string[];
  isAvailable: boolean;
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

export interface Event {
  id?: string;
  title: string;
  date: Date;
  type: string;
  description: string;
  classroom?: string;
  backgroundColor?: string;
}

export interface StudySpot {
  id: string;
  name: string;
  location: string;
  capacity: number;
  amenities: string[];
  isAvailable: boolean;
  isOccupied: boolean;
  currentOccupancy: number;
}

export interface CustomUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'admin' | 'student';
} 