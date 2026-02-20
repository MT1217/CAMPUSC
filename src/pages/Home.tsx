import React from 'react';
import { Container, Typography, Box, Paper, Grid, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClassIcon from '@mui/icons-material/Class';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SchoolIcon from '@mui/icons-material/School';
import { useAuth } from '../contexts/AuthContext';
import { styled, keyframes } from '@mui/material/styles';
import BackgroundGridComponent from '../components/BackgroundGrid';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(10, 25, 41, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${fadeInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
  opacity: 0,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(45deg, #2196f3, #64b5f6)',
  marginBottom: theme.spacing(2),
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  '& svg': {
    fontSize: '30px',
    color: '#fff',
  },
}));

const StyledButton = styled(Button)(() => ({
  background: 'linear-gradient(45deg, #2196f3 30%, #1976d2 90%)',
  borderRadius: '8px',
  border: 'none',
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(33, 203, 243, .4)',
  },
}));

const AnimatedTitle = styled(Typography)(({ theme }) => ({
  opacity: 0,
  fontFamily: '"Poppins", sans-serif',
  background: 'linear-gradient(to right, #ff6b6b, #4ecdc4, #45b7d1, #96c93d)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% auto',
  animation: `${fadeInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards, gradient 3s linear infinite`,
  '@keyframes gradient': {
    '0%': { backgroundPosition: '0% center' },
    '100%': { backgroundPosition: '200% center' },
  },
}));

const AnimatedSubtitle = styled(Typography)(({ theme }) => ({
  animation: `${fadeInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards`,
  opacity: 0,
  fontFamily: '"Poppins", sans-serif',
}));

const AnimatedDescription = styled(Typography)(({ theme }) => ({
  animation: `${fadeInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards`,
  opacity: 0,
  fontFamily: '"Inter", sans-serif',
}));

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const theme = useTheme();

  return (
    <>
      <BackgroundGridComponent />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{
          mt: 4,
          mb: 4,
          textAlign: 'center',
          position: 'relative',
        }}>
          <AnimatedTitle
            variant="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              letterSpacing: '-2px',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              mb: 2,
            }}
          >
            Welcome to CampusConnect
          </AnimatedTitle>
          <AnimatedSubtitle
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              letterSpacing: '-0.5px',
              mb: 2,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            National Institute of Technology, Warangal
          </AnimatedSubtitle>
          <AnimatedDescription
            variant="subtitle1"
            paragraph
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto',
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            Your one-stop solution for managing institutional events, room bookings, and study spot availability.
          </AnimatedDescription>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledPaper sx={{ p: 4, height: '100%' }}>
              <IconWrapper>
                <CalendarMonthIcon />
              </IconWrapper>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  letterSpacing: '-0.5px',
                  mb: 2,
                  color: '#fff',
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Event Calendar
              </Typography>
              <Typography
                paragraph
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 3,
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Stay updated with all campus events, academic schedules, and important dates.
              </Typography>
              <StyledButton
                fullWidth
                onClick={() => navigate('/calendar')}
                startIcon={<CalendarMonthIcon />}
              >
                View Calendar
              </StyledButton>
            </StyledPaper>
          </Grid>

          {isAdmin && (
            <Grid item xs={12} md={6}>
              <StyledPaper sx={{ p: 4, height: '100%' }}>
                <IconWrapper>
                  <ClassIcon />
                </IconWrapper>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    letterSpacing: '-0.5px',
                    mb: 2,
                    color: '#fff',
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  Room Booking
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 3,
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  Book classrooms, labs, and seminar halls for classes and events. Manage room schedules efficiently.
                </Typography>
                <StyledButton
                  fullWidth
                  onClick={() => navigate('/room-booking')}
                  startIcon={<ClassIcon />}
                >
                  Book Rooms
                </StyledButton>
              </StyledPaper>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <StyledPaper sx={{ p: 4, height: '100%' }}>
              <IconWrapper>
                <SchoolIcon />
              </IconWrapper>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  letterSpacing: '-0.5px',
                  mb: 2,
                  color: '#fff',
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Study Spots
              </Typography>
              <Typography
                paragraph
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 3,
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Find and reserve quiet study spaces across campus. View real-time availability and amenities.
              </Typography>
              <StyledButton
                fullWidth
                onClick={() => navigate('/study-spots')}
                startIcon={<SchoolIcon />}
              >
                Find Spots
              </StyledButton>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledPaper sx={{ p: 4, height: '100%' }}>
              <IconWrapper>
                <EventNoteIcon />
              </IconWrapper>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  letterSpacing: '-0.5px',
                  mb: 2,
                  color: '#fff',
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {isAdmin && (
                  <Grid item xs={12} sm={6}>
                    <StyledButton
                      fullWidth
                      onClick={() => navigate('/calendar')}
                      startIcon={<CalendarMonthIcon />}
                    >
                      Add New Event
                    </StyledButton>
                  </Grid>
                )}
                {isAdmin && (
                  <Grid item xs={12} sm={6}>
                    <StyledButton
                      fullWidth
                      onClick={() => navigate('/room-booking')}
                      startIcon={<ClassIcon />}
                    >
                      Book Room
                    </StyledButton>
                  </Grid>
                )}
                <Grid item xs={12} sm={6}>
                  <StyledButton
                    fullWidth
                    onClick={() => navigate('/study-spots')}
                    startIcon={<SchoolIcon />}
                  >
                    View Study Spots
                  </StyledButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledButton
                    fullWidth
                    onClick={() => navigate('/calendar')}
                    startIcon={<CalendarMonthIcon />}
                  >
                    View Calendar
                  </StyledButton>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home; 