import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import ClassIcon from '@mui/icons-material/Class';
import ScienceIcon from '@mui/icons-material/Science';
import GroupsIcon from '@mui/icons-material/Groups';
import BackgroundGridComponent from '../components/BackgroundGrid';
import { getRooms, getBookings, addBooking } from '../utils/firebaseServices';
import { useAuth } from '../contexts/AuthContext';
import { Room, Booking, CustomUser } from '../data/types';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(10, 25, 41, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
  },
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #1976d2, #64b5f6)',
  },
}));

interface StyledButtonProps {
  customVariant?: 'occupied';
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'customVariant'
})<StyledButtonProps>(({ theme, customVariant }) => ({
  background: customVariant === 'occupied'
    ? 'linear-gradient(45deg, #f44336 30%, #d32f2f 90%)'
    : 'linear-gradient(45deg, #2196f3 30%, #1976d2 90%)',
  borderRadius: '8px',
  border: 'none',
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: customVariant === 'occupied'
    ? '0 3px 5px 2px rgba(244, 67, 54, .3)'
    : '0 3px 5px 2px rgba(33, 203, 243, .3)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: customVariant === 'occupied'
      ? 'linear-gradient(45deg, #d32f2f 30%, #c62828 90%)'
      : 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
    transform: 'translateY(-2px)',
    boxShadow: customVariant === 'occupied'
      ? '0 5px 15px rgba(244, 67, 54, .4)'
      : '0 5px 15px rgba(33, 203, 243, .4)',
  },
}));

const RoomBooking: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [newBooking, setNewBooking] = useState({
    purpose: '',
    startTime: '',
    endTime: ''
  });
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const [roomsData, bookingsData] = await Promise.all([
        getRooms(),
        getBookings()
      ]);
      setRooms(roomsData);
      setBookings(bookingsData);
    };
    fetchData();
  }, []);

  const isRoomAvailable = (room: Room, startTime: Date, endTime: Date) => {
    return !bookings.some(booking =>
      booking.roomId === room.id &&
      booking.status !== 'rejected' &&
      new Date(startTime) < new Date(booking.endTime) &&
      new Date(endTime) > new Date(booking.startTime)
    );
  };

  const getCurrentBooking = (room: Room) => {
    const now = new Date();
    return bookings.find(booking =>
      booking.roomId === room.id &&
      booking.status === 'approved' &&
      now >= new Date(booking.startTime) &&
      now <= new Date(booking.endTime)
    );
  };

  const handleBookRoom = async () => {
    if (!selectedRoom || !user) return;

    try {
      const currentUser = user as unknown as CustomUser;
      const booking: Omit<Booking, 'id'> = {
        roomId: selectedRoom.id,
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email || 'Unknown User',
        purpose: newBooking.purpose,
        startTime: new Date(newBooking.startTime),
        endTime: new Date(newBooking.endTime),
        status: isAdmin ? 'approved' : 'pending'
      };

      await addBooking(booking);

      // Refresh bookings
      const updatedBookings = await getBookings();
      setBookings(updatedBookings);

      setOpenDialog(false);
      setNewBooking({
        purpose: '',
        startTime: '',
        endTime: ''
      });
      setSelectedRoom(null);
    } catch (error) {
      console.error('Error booking room:', error);
    }
  };

  const getRoomIcon = (type: Room['type']) => {
    switch (type) {
      case 'classroom':
        return <ClassIcon sx={{ fontSize: 30, color: '#1976d2' }} />;
      case 'lab':
        return <ScienceIcon sx={{ fontSize: 30, color: '#2e7d32' }} />;
      case 'seminar':
        return <GroupsIcon sx={{ fontSize: 30, color: '#ed6c02' }} />;
      default:
        return null;
    }
  };

  return (
    <>
      <BackgroundGridComponent />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#fff', mb: 3 }}>
          Room Booking
        </Typography>

        <Grid container spacing={3}>
          {rooms.map((room) => {
            const currentBooking = getCurrentBooking(room);
            return (
              <Grid item xs={12} sm={6} md={4} key={room.id}>
                <StyledPaper sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ color: '#fff' }}>
                      {room.name}
                    </Typography>
                    <Chip
                      label={currentBooking ? 'Occupied' : 'Available'}
                      color={currentBooking ? 'error' : 'success'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                    Type: {room.type}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                    Capacity: {room.capacity} people
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {room.facilities.map((facility, index) => (
                      <Chip
                        key={index}
                        label={facility}
                        size="small"
                        sx={{ mr: 1, mb: 1, background: 'rgba(255, 255, 255, 0.1)' }}
                      />
                    ))}
                  </Box>
                  {currentBooking && (
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                      Current: {currentBooking.purpose}
                    </Typography>
                  )}
                  <StyledButton
                    fullWidth
                    onClick={() => {
                      setSelectedRoom(room);
                      setOpenDialog(true);
                    }}
                    disabled={!!currentBooking}
                  >
                    {currentBooking ? 'Occupied' : 'Book Room'}
                  </StyledButton>
                </StyledPaper>
              </Grid>
            );
          })}
        </Grid>

        {/* Booking Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          PaperProps={{
            sx: {
              background: 'rgba(10, 25, 41, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
            }
          }}
        >
          <DialogTitle sx={{ color: '#fff' }}>
            Book {selectedRoom?.name}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Purpose"
                fullWidth
                value={newBooking.purpose}
                onChange={(e) => setNewBooking({ ...newBooking, purpose: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
              <TextField
                label="Start Time"
                type="datetime-local"
                fullWidth
                value={newBooking.startTime}
                onChange={(e) => setNewBooking({ ...newBooking, startTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
              <TextField
                label="End Time"
                type="datetime-local"
                fullWidth
                value={newBooking.endTime}
                onChange={(e) => setNewBooking({ ...newBooking, endTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDialog(false)}
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Cancel
            </Button>
            <StyledButton
              onClick={handleBookRoom}
              disabled={!newBooking.purpose || !newBooking.startTime || !newBooking.endTime}
            >
              Book Room
            </StyledButton>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default RoomBooking; 