import React, { useState, useEffect, ReactElement } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  Rating,
  IconButton,
  Fade,
} from '@mui/material';
import {
  People as PeopleIcon,
  WifiRounded as WifiIcon,
  PowerRounded as PowerIcon,
  Restaurant as CafeIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import BackgroundGridComponent from '../components/BackgroundGrid';
import { getStudySpots } from '../utils/firebaseServices';
import { StudySpot } from '../data/types';

const StyledCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(10, 25, 41, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(3),
  transition: 'all 0.3s ease-in-out',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
    '&::before': {
      opacity: 1,
    },
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#fff',
  margin: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

const StudySpots: React.FC = () => {
  const [spots, setSpots] = useState<StudySpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const spotsData = await getStudySpots();
        setSpots(spotsData);
      } catch (error) {
        console.error('Error fetching study spots:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpots();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#fff' }}>Loading study spots...</Typography>
      </Container>
    );
  }

  const toggleFavorite = (spotId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(spotId)) {
        newFavorites.delete(spotId);
      } else {
        newFavorites.add(spotId);
      }
      return newFavorites;
    });
  };

  const getAmenityIcon = (amenity: string): ReactElement | undefined => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <WifiIcon />;
      case 'power outlets':
        return <PowerIcon />;
      case 'cafe nearby':
        return <CafeIcon />;
      default:
        return undefined;
    }
  };

  return (
    <>
      <BackgroundGridComponent />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Fade in timeout={800}>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontWeight: 600, mb: 3 }}>
              Study Spots
            </Typography>
            <Grid container spacing={3}>
              {spots.map((spot) => (
                <Grid item xs={12} sm={6} md={4} key={spot.id}>
                  <StyledCard>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                        {spot.name}
                      </Typography>
                      <IconButton
                        onClick={() => toggleFavorite(spot.id)}
                        sx={{ color: favorites.has(spot.id) ? '#ff1744' : 'rgba(255, 255, 255, 0.7)' }}
                      >
                        {favorites.has(spot.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                      {spot.location}
                    </Typography>
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PeopleIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Capacity: {spot.capacity}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                        Current Occupancy:
                      </Typography>
                      <Rating
                        value={spot.currentOccupancy || 0}
                        max={5}
                        readOnly
                        sx={{ color: '#2196f3' }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {spot.amenities.map((amenity: string, index: number) => (
                        <StyledChip
                          key={index}
                          label={amenity}
                          icon={getAmenityIcon(amenity)}
                          size="small"
                        />
                      ))}
                    </Box>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Container>
    </>
  );
};

export default StudySpots; 