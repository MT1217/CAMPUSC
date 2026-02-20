import { EventInput } from '@fullcalendar/core';
import type { Room as RoomType, Booking as BookingType } from './types';

export interface Room {
  id: string;
  name: string;
  capacity: number;
  isOccupied: boolean;
  currentEvent?: string;
  nextEvent?: string;
  nextEventTime?: string;
  type: 'classroom' | 'lab' | 'seminar';
  facilities: string[];
  isAvailable: boolean;
}

export interface StudySpot {
  id: string;
  name: string;
  location: string;
  capacity: number;
  isOccupied: boolean;
  isAvailable: boolean;
  currentOccupancy: number;
  amenities: string[];
}

export const sampleEvents: EventInput[] = [];

export const sampleRooms: RoomType[] = [
  {
    id: '1',
    name: 'Lecture Hall 101',
    type: 'Classroom',
    capacity: 120,
    facilities: ['Projector', 'Air Conditioning', 'Smart Board', 'Audio System'],
    isAvailable: true
  },
  {
    id: '2',
    name: 'Computer Lab A',
    type: 'Laboratory',
    capacity: 60,
    facilities: ['Computers', 'Projector', 'Air Conditioning', 'Internet'],
    isAvailable: true
  },
  {
    id: '3',
    name: 'Seminar Hall',
    type: 'Conference Room',
    capacity: 80,
    facilities: ['Projector', 'Video Conferencing', 'Air Conditioning', 'Sound System'],
    isAvailable: true
  },
  {
    id: '4',
    name: 'Physics Lab',
    type: 'Laboratory',
    capacity: 40,
    facilities: ['Lab Equipment', 'Smart Board', 'Air Conditioning'],
    isAvailable: true
  },
  {
    id: '5',
    name: 'Study Room 201',
    type: 'Study Room',
    capacity: 20,
    facilities: ['Whiteboard', 'Air Conditioning', 'Discussion Tables'],
    isAvailable: true
  }
];

export const sampleStudySpots: StudySpot[] = [
  {
    id: '1',
    name: 'Student Lounge',
    location: 'Near Food Court',
    capacity: 80,
    isOccupied: true,
    isAvailable: true,
    currentOccupancy: 30,
    amenities: ['Wi-Fi', 'Power Outlets', 'Cafe Nearby', 'Group Study']
  },
  {
    id: '2',
    name: 'Silent Study Area',
    location: 'Central Library First Floor',
    capacity: 150,
    isOccupied: true,
    isAvailable: true,
    currentOccupancy: 90,
    amenities: ['Wi-Fi', 'Power Outlets', 'Silent Zone', 'Air Conditioning', 'Individual Desks']
  },
  {
    id: '3',
    name: 'Outdoor Study Space',
    location: 'Near CRIF Building',
    capacity: 40,
    isOccupied: false,
    isAvailable: true,
    currentOccupancy: 10,
    amenities: ['Power Outlets', 'Open Air', 'Group Study']
  },
  {
    id: '4',
    name: 'Academic Commons',
    location: 'Academic Block',
    capacity: 120,
    isOccupied: true,
    isAvailable: true,
    currentOccupancy: 70,
    amenities: ['Wi-Fi', 'Power Outlets', 'Air Conditioning', 'Discussion Rooms']
  },
  {
    id: '5',
    name: 'Innovation Hub',
    location: 'Tech Park Ground Floor',
    capacity: 60,
    isOccupied: true,
    isAvailable: true,
    currentOccupancy: 45,
    amenities: ['Wi-Fi', 'Power Outlets', 'Whiteboard', 'Group Study', 'Cafe Nearby']
  }
];

export const sampleUsers = [
  {
    id: '1',
    email: 'admin@nitw.ac.in',
    password: 'Admin@123',
    name: 'Admin User',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'student@nitw.ac.in',
    password: 'Student@123',
    name: 'Student User',
    role: 'student' as const,
  }
];

export const sampleBookings: BookingType[] = [
  {
    id: '1',
    roomId: '1',
    userId: 'user1',
    userName: 'Dr. Smith',
    purpose: 'Digital Electronics Lecture',
    startTime: new Date('2024-01-20T09:00:00'),
    endTime: new Date('2024-01-20T11:00:00'),
    status: 'approved'
  },
  {
    id: '2',
    roomId: '2',
    userId: 'user2',
    userName: 'Prof. Johnson',
    purpose: 'Programming Lab',
    startTime: new Date('2024-01-20T14:00:00'),
    endTime: new Date('2024-01-20T16:00:00'),
    status: 'approved'
  }
]; 