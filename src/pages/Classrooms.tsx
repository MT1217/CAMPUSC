import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import BackgroundGridComponent from '../components/BackgroundGrid';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  p: 2,
  background: 'rgba(10, 25, 41, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196f3 30%, #1976d2 90%)',
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
  },
}));

interface Classroom {
  id: string;
  name: string;
  capacity: number;
  isOccupied: boolean;
  currentEvent?: string;
  nextEvent?: string;
  nextEventTime?: string;
  eventDate?: Date;
}

const Classrooms: React.FC = () => {
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState('');
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    { 
      id: '1', 
      name: 'Room 101', 
      capacity: 40, 
      isOccupied: true, 
      currentEvent: 'Computer Science Class',
      nextEvent: 'Data Structures',
      nextEventTime: '14:00',
      eventDate: new Date()
    },
    { 
      id: '2', 
      name: 'Room 102', 
      capacity: 35, 
      isOccupied: false,
      nextEvent: 'Physics Lab',
      nextEventTime: '15:30',
      eventDate: new Date()
    },
    { 
      id: '3', 
      name: 'Room 103', 
      capacity: 50, 
      isOccupied: true, 
      currentEvent: 'Mathematics Lecture',
      nextEvent: 'Chemistry Lab',
      nextEventTime: '16:00',
      eventDate: new Date()
    },
    { 
      id: '4', 
      name: 'Room 104', 
      capacity: 45, 
      isOccupied: false,
      nextEvent: 'Biology Class',
      nextEventTime: '13:00',
      eventDate: new Date()
    },
  ]);

  const handleOpenDialog = (classroom: Classroom) => {
    setSelectedClassroom(classroom);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedClassroom(null);
    setNewEvent('');
    setEventDate(null);
  };

  const handleAddEvent = () => {
    if (selectedClassroom && newEvent && eventDate) {
      setClassrooms(classrooms.map(room => 
        room.id === selectedClassroom.id 
          ? { 
              ...room, 
              currentEvent: newEvent, 
              isOccupied: true,
              eventDate: eventDate
            }
          : room
      ));
      handleCloseDialog();
    }
  };

  return (
    <>
      <BackgroundGridComponent />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontWeight: 600 }}>
          Classroom Availability
        </Typography>
        <Grid container spacing={3}>
          {classrooms.map((classroom) => (
            <Grid item xs={12} sm={6} md={4} key={classroom.id}>
              <StyledPaper>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#fff' }}>{classroom.name}</Typography>
                  <Chip
                    label={classroom.isOccupied ? 'Occupied' : 'Available'}
                    color={classroom.isOccupied ? 'error' : 'success'}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Capacity: {classroom.capacity} students
                </Typography>
                {classroom.currentEvent && (
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
                    Current Event: {classroom.currentEvent}
                  </Typography>
                )}
                {classroom.eventDate && (
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
                    Date: {classroom.eventDate.toLocaleDateString()}
                  </Typography>
                )}
                {classroom.nextEvent && (
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
                    Next Event: {classroom.nextEvent} ({classroom.nextEventTime})
                  </Typography>
                )}
                <StyledButton
                  variant="contained"
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={() => handleOpenDialog(classroom)}
                  disabled={classroom.isOccupied}
                >
                  Schedule Event
                </StyledButton>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>

        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog}
          PaperProps={{
            sx: {
              background: 'rgba(10, 25, 41, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
            }
          }}
        >
          <DialogTitle sx={{ color: '#fff' }}>Schedule Event in {selectedClassroom?.name}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Event Name"
              fullWidth
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2196f3',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: '#2196f3',
                  },
                },
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Event Date"
                value={eventDate}
                onChange={(newValue: Date | null) => setEventDate(newValue)}
                sx={{
                  width: '100%',
                  mt: 2,
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2196f3',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-focused': {
                      color: '#2196f3',
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Cancel</Button>
            <StyledButton onClick={handleAddEvent} disabled={!newEvent || !eventDate}>
              Schedule
            </StyledButton>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Classrooms; 